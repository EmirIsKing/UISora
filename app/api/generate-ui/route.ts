'use server';

import { NextResponse } from 'next/server';
import { adminDb, adminIncrement } from '@/utils/firebaseAdmin'; // ✅ using Admin SDK now
import PromptFattening from "@/actions/promptFattening";
import ImageGeneration from "@/actions/imageGen";
import UiGeneration from "@/actions/uiGeneration";
import HtmlToJson from "@/actions/HtmlToJson";
import { put } from '@vercel/blob';
import { estimateCredits, checkCredits, calculateActualCredits } from '@/utils/creditCalculator';

type UIComponent = {
    screen: { name: string; width: number; height: number };
    component: string;
    message: string;
};

export async function POST(request: Request) {
    try {
        const { prompt, previousUI, imageHolder, uid, projectId } = await request.json();

        if (!uid || !projectId) {
            return NextResponse.json({ message: 'Missing uid or projectId' }, { status: 400 });
        }

        // Step 0: Credit Preflight Check
        const userRef = adminDb.doc(`users/${uid}`);
        const userSnap = await userRef.get();
        
        if (!userSnap.exists) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const userData = userSnap.data();
        const balance = userData?.credits || 0;

        const estimated = estimateCredits(prompt, imageHolder, previousUI);
        const creditCheck = checkCredits(estimated, balance);

        if (!creditCheck.hasEnough) {
            return NextResponse.json({
                message: 'Insufficient credits',
                shortfall: creditCheck.shortfall,
                estimated: creditCheck.estimated,
                balance: creditCheck.balance
            }, { status: 402 });
        }

        // Reserve credits using transaction
        const transactionResult = await adminDb.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            const currentBalance = userDoc.data()?.credits || 0;
            
            if (currentBalance < estimated.total) {
                throw new Error('Insufficient credits');
            }
            
            transaction.update(userRef, {
                credits: currentBalance - estimated.total
            });
            
            return { reserved: estimated.total, balance: currentBalance };
        });

        // Step 1: Prompt Fattening
        const fattenedRes:any = await PromptFattening(prompt);
        const fattenedJson = await fattenedRes.json();

        // Step 2: Image Generation
        let images: string[] = imageHolder ?? [];

        if (images.length === 0) {
            //@ts-ignore
            const splashJson = await (await ImageGeneration(fattenedJson.ui[0].splashImagePrompt, 1)).json();
            images.push(`${splashJson.images[0].url} - Image of ${splashJson.prompt}`);

            //@ts-ignore
            const otherJson = await (await ImageGeneration(fattenedJson.ui[0].otherImagesPrompt, 4)).json();
            for (let i = 0; i < 4; i++) {
                images.push(`${otherJson.images[i].url} - Image of ${otherJson.prompt}`);
            }
        }

        // Step 3: UI Generation
        const fattenedPrompt = fattenedJson.ui[0].ui;
        const response = await UiGeneration(fattenedPrompt, images, previousUI);
        const data = await response.json();
        const uiData: UIComponent[] = data.ui;

        const convertedUI = await Promise.all(
            uiData.map(async item => ({
                screen: item.screen,
                component: JSON.parse(await HtmlToJson(item.component))
            }))
        );

        // Calculate actual credits used
        const actualCredits = calculateActualCredits(
            fattenedRes.usage?.total_tokens || 0,
            images.length - (imageHolder?.length || 0),
            data.creditUsed,
            convertedUI.length
        );

        const newEntry = {
            createdAt: new Date().toISOString(),
            prompt,
            aiResponse: data.message || "No response generated",
            creditUsed: actualCredits.total,
            ui: convertedUI,
            imageHolder: images
        };

        // Step 4: Read existing blob (if it exists)
        const projectRef = adminDb.doc(`users/${uid}/projects/${projectId}`);
        const projectSnap = await projectRef.get();
        const projectData = projectSnap.data();
        const blobUrl = projectData?.uiBlobUrl;

        let history: any[] = [];

        if (blobUrl) {
            try {
                const blobRes = await fetch(blobUrl);
                history = JSON.parse(await blobRes.text());
            } catch {
                history = [];
            }
        }

        history.push(newEntry);

        // Step 5: Upload updated blob to Vercel
        const blob = await put(`project-ui/${projectId}.json`, JSON.stringify(history), {
            access: 'public'
        });

        // Step 6: Update Firestore (if first time)
        await projectRef.update({
            updatedAt: new Date(),
            lastUsedPrompt: prompt,
            ...(blobUrl ? {} : { uiBlobUrl: blob.url })
        });

        // Step 7: Reconcile actual credits used vs reserved
        const creditDifference = actualCredits.total - transactionResult.reserved;
        
        if (creditDifference !== 0) {
            await userRef.update({
                credits: adminIncrement(-creditDifference)
            });
        }

        return NextResponse.json({
            message: data.message,
            imageHolder: images,
            ui: convertedUI,
            creditUsed: actualCredits.total,
            creditBreakdown: {
                promptFattening: actualCredits.promptFattening,
                imageGeneration: actualCredits.imageGeneration,
                uiGeneration: actualCredits.uiGeneration,
                htmlToJson: actualCredits.htmlToJson,
                total: actualCredits.total
            }
        });

    } catch (error) {
        console.error('[ERROR]', error);
        return NextResponse.json({ message: 'Error generating UI' }, { status: 500 });
    }
}
