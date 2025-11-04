'use server';
export const runtime = "nodejs";

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
  try {
    const { prompt, previousUI, imageHolder, uid, projectId } = await request.json();
    const idToken = request.headers.get('Authorization')?.replace('Bearer ', '') || undefined;

    const subStatus = await getSubscriptionStatus(idToken);

    if (!subStatus) {
      return NextResponse.json({ message: 'Subscription Status could not be determined.' }, { status: 400 });
    }

    if (!uid || !projectId) {
      return NextResponse.json({ message: 'Missing uid or projectId' }, { status: 400 });
    }

    const subHelper = subStatus.subscribed && subStatus.subscription?.status === 'Active'
      ? 'User is subscribed, you can create more than 7 screens if needed but cap at 10 unless user asks for more than 10 screens.'
      : 'User is not subscribed, so create only seven screens. Don not go over even if the user asks for more.';

    const userRef = adminDb.doc(`users/${uid}`);
    const projectRef = adminDb.doc(`users/${uid}/projects/${projectId}`);

    const projectSnap = await projectRef.get();
    const blobUrl = projectSnap.data()?.uiBlobUrl;

    const history = blobUrl
      ? await fetch(blobUrl).then(r => r.text()).then(t => JSON.parse(t)).catch(() => [])
      : [];

    const images: string[] = Array.isArray(imageHolder) ? [...imageHolder] : (imageHolder ? [imageHolder] : []);
    let fattenedPrompt = Array.isArray(prompt) ? prompt.join('\n') : prompt || '';
    let fattenedTokens = 0;

    const isChainMode = Boolean(previousUI && (imageHolder?.length ?? 0) > 0);

    if (!isChainMode) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fattenedResult = await PromptFattening(prompt, subHelper).then(async (res: any) => {
        const json = await res.json();
        const tokens = res?.usage?.total_tokens || 0;
        return { json, tokens };
      });

      fattenedTokens = fattenedResult.tokens || 0;
      const fattenedJson = fattenedResult.json;
      fattenedPrompt = fattenedJson?.ui?.[0]?.ui ?? fattenedPrompt;

      if (images.length === 0) {
        const splash = await ImageGeneration(fattenedPrompt + ' splash', 1).then(r => r?.json());
        const other = await ImageGeneration(fattenedPrompt + ' supporting images', 4).then(r => r?.json());

        if (splash?.images?.[0]) images.push(`${splash.images[0].url} - Splash`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (other?.images) other.images.forEach((img: any) => images.push(`${img.url} - Supporting image`));
      }
    }

    const uiResponse = await UiGeneration(fattenedPrompt, images, previousUI, subHelper);
    const data = await uiResponse.json();
    const uiData: UIComponent[] = data.ui || [];

    const convertedUI = await Promise.all(
      uiData.map(async (item) => ({
        screen: item.screen,
        component: JSON.parse(await HtmlToJson(item.component) as string)
      }))
    );

    const actualCredits = calculateActualCredits(
      fattenedTokens,
      images.length - (imageHolder?.length || 0),
      data.creditUsed,
      convertedUI.length
    );

    // --- DIRECT CREDIT SUBTRACTION ---
    await userRef.update({ credits: adminIncrement(-actualCredits.total) });

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

    const blob = await put(`project-ui/${projectId}.json`, JSON.stringify(history), {
      access: 'public',
      allowOverwrite: true
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const update: Record<string, any> = {
      updatedAt: new Date(),
      lastUsedPrompt: prompt
    };
    if (!projectSnap.data()?.uiBlobUrl && blob?.url) update.uiBlobUrl = blob.url;
    await projectRef.update(update);

    console.log("actual credit:",actualCredits.total)
    return NextResponse.json({
      message: data.message,
      imageHolder: images,
      ui: convertedUI,
      creditUsed: actualCredits.total,
      creditBreakdown: actualCredits
    });

  } catch (error) {
    console.error('[ERROR]', error);
    return NextResponse.json({ message: String(error ?? 'Error generating UI') }, { status: 500 });
  }
}