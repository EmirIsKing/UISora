'use server';

import { NextResponse } from 'next/server';
import { adminDb, adminIncrement } from '@/utils/firebaseAdmin';
import PromptFattening from '@/actions/promptFattening';
import ImageGeneration from '@/actions/imageGen';
import UiGeneration from '@/actions/uiGeneration';
import HtmlToJson from '@/actions/HtmlToJson';
import { put } from '@vercel/blob';
import { calculateActualCredits } from '@/utils/creditCalculator';
import { getSubscriptionStatus } from '@/actions/getSubscriptionStatus';

type UIComponent = {
  screen: { name: string; width: number; height: number };
  component: string;
  message: string;
};

export async function POST(request: Request) {
  const { prompt, previousUI, imageHolder, uid, projectId } = await request.json();
  try {
    
    const idToken = request.headers.get('Authorization')?.replace('Bearer ', '') || undefined;

    const projectStateRef = adminDb.doc(`projects/${projectId}`);
    await projectStateRef.update({ state: "generating" });
    
    if (!uid || !projectId) {
      return NextResponse.json({ message: 'Missing uid or projectId' }, { status: 400 });
    }

    const userRef = adminDb.doc(`users/${uid}`);
    const projectRef = adminDb.doc(`users/${uid}/projects/${projectId}`);
    
    // Parallelize subscription status check and project data fetch
    const [subStatus, projectSnap] = await Promise.all([
      getSubscriptionStatus(idToken),
      projectRef.get()
    ]);

    if (!subStatus) {
      return NextResponse.json({ message: 'Subscription Status could not be determined.' }, { status: 400 });
    }

    const subHelper = subStatus.subscribed && subStatus.subscription?.status === 'Active'
      ? 'User is subscribed, you can create more than 7 screens if needed but cap at 10 unless user asks for more than 10 screens.'
      : 'User is not subscribed, so create only seven screens. Don not go over even if the user asks for more.';

    const blobUrl = projectSnap.data()?.uiBlobUrl;

    const history = blobUrl
      ? await fetch(blobUrl).then(r => r.text()).then(t => JSON.parse(t)).catch(() => [])
      : [];

    const images: string[] = Array.isArray(imageHolder) ? [...imageHolder] : (imageHolder ? [imageHolder] : []);
    let fattenedPrompt = Array.isArray(prompt) ? prompt.join('\n') : prompt || '';
    let fattenedTokens = 0;
    let title:string = "New Project Title";

    const isChainMode = Boolean(previousUI && (imageHolder?.length ?? 0) > 0);

    if (!isChainMode) {
      console.log("Prompt Fattening");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fattenedResult = await PromptFattening(prompt, subHelper).then(async (res: any) => {
        const json = await res.json();
        const tokens = res?.usage?.total_tokens || 0;
        return { json, tokens };
      });

      fattenedTokens = fattenedResult.tokens || 0;
      const fattenedJson = fattenedResult.json;
      fattenedPrompt = fattenedJson?.ui?.[0]?.ui ?? fattenedPrompt;
      console.log("Prompt Fattening done");

      console.log("setting project title and Image Generation");
      title = fattenedJson?.ui?.[0]?.title ?? "New project Title"
      
      // Run project title update and image generation in parallel
      const globalProjectRef = adminDb.doc(`projects/${projectId}`);
      const imageGenerationPromise = images.length === 0
        ? Promise.all([
            ImageGeneration(fattenedPrompt + ' splash', 1).then(r => r?.json()),
            ImageGeneration(fattenedPrompt + ' supporting images', 4).then(r => r?.json())
          ])
        : Promise.resolve(null);
      
      const titleUpdatePromise = (async () => {
        const [projectData, globalData] = await Promise.all([
          projectRef.get(),
          globalProjectRef.get()
        ]);
        
        const projectSettings = projectData.data()?.settings || {};
        const globalSettings = globalData.data()?.settings || {};
        
        await Promise.all([
          projectRef.update({ 
            settings: { ...projectSettings, projectName: title }
          }),
          globalProjectRef.update({ 
            settings: { ...globalSettings, projectName: title }
          })
        ]);
      })();

      // Wait for both to complete
      const [imageResults] = await Promise.all([
        imageGenerationPromise,
        titleUpdatePromise
      ]);

      if (imageResults) {
        const [splashResult, otherResult] = imageResults;
        if (splashResult?.images?.[0]) images.push(`${splashResult.images[0].url} - Splash`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (otherResult?.images) otherResult.images.forEach((img: any) => images.push(`${img.url} - Supporting image`));
      }
      console.log("setting project title and Image Generation done");

    }
    console.log("Ui Generation");
    const uiResponse = await UiGeneration(fattenedPrompt, images, previousUI, subHelper);
    console.log("Ui Generation done");
    const data = await uiResponse.json();
    const uiData: UIComponent[] = data.ui || [];

    console.log("Converting UI");
    const convertedUI = await Promise.all(
      uiData.map(async (item) => ({
        screen: item.screen,
        component: JSON.parse(await HtmlToJson(item.component) as string)
      }))
    );
    console.log("Converting UI Done");


    console.log("Calculating Actual Credits");
    const actualCredits = calculateActualCredits(
      fattenedTokens,
      images.length - (imageHolder?.length || 0),
      data.creditUsed,
      convertedUI.length
    );

    console.log("Calculating Actual Credits Done");
    
    const newEntry = {
      createdAt: new Date().toISOString(),
      prompt: Array.isArray(prompt) ? prompt : [prompt],
      aiResponse: Array.isArray(data.message) ? data.message : [data.message],
      creditUsed: actualCredits.total,
      ui: convertedUI,
      imageHolder: images
    };

    if (isChainMode && history.length > 0) {
      const last = history[history.length - 1];
      last.prompt.push(...newEntry.prompt);
      last.aiResponse.push(...newEntry.aiResponse);
      last.creditUsed += actualCredits.total;
      last.ui = convertedUI;
      last.imageHolder = images;
    } else {
      history.push(newEntry);
    }

    console.log("Updating User Credits, Blob, and Project in parallel");
    
    // Prepare project update data (without blob URL first)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseUpdate: Record<string, any> = {
      updatedAt: new Date(),
      lastUsedPrompt: prompt
    };
    
    // If blob URL already exists, we can update project in parallel
    // Otherwise, we need to wait for blob upload
    const needsBlobUrl = !projectSnap.data()?.uiBlobUrl;
    
    const blobPromise = put(`project-ui/${projectId}.json`, JSON.stringify(history), {
      access: 'public',
      allowOverwrite: true
    });
    
    const roundedCredits = Math.ceil(actualCredits.total);

    const parallelOps: Promise<unknown>[] = [
      blobPromise,
      userRef.update({ credits: adminIncrement(-roundedCredits) })
    ];

    
    // If blob URL exists, update project in parallel too
    if (!needsBlobUrl) {
      parallelOps.push(projectRef.update(baseUpdate));
    }
    
    const results = await Promise.all(parallelOps);
    const blob = results[0] as Awaited<typeof blobPromise>;
    
    // If we needed the blob URL, update project now
    if (needsBlobUrl && blob?.url) {
      baseUpdate.uiBlobUrl = blob.url;
      await projectRef.update(baseUpdate);
    }
    
    console.log("Updating User Credits, Blob, and Project Done");

    console.log("actual credit:",actualCredits.total)
    return NextResponse.json({
      message: data.message,
      imageHolder: images,
      ui: convertedUI,
      creditUsed: actualCredits.total,
      creditBreakdown: actualCredits,
      projectName: title,
    });

  } catch (error) {
    console.error('[ERROR]', error);
    return NextResponse.json({ message: String(error ?? 'Error generating UI') }, { status: 500 });
  } finally {
    const projectStateRef = adminDb.doc(`projects/${projectId}`);
    await projectStateRef.update({ state: "unlocked" });
  }
}