'use server';

import { adminDb, adminIncrement } from '@/utils/firebaseAdmin';
import GenerateSingleScreen from '@/actions/generateSingleScreen';
import HtmlToJson from '@/actions/HtmlToJson';
import { put } from '@vercel/blob';
import { getSubscriptionStatus } from '@/actions/getSubscriptionStatus';

export async function POST(request: Request) {
    try {
        const { prompt, previousUI, uid, projectId, title } = await request.json();
        const idToken = request.headers.get('Authorization')?.replace('Bearer ', '') || undefined;

        if (!uid || !projectId || !prompt || !title) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const userRef = adminDb.doc(`users/${uid}`);
        const projectRef = adminDb.doc(`users/${uid}/projects/${projectId}`);

        // Set project state
        await adminDb.doc(`projects/${projectId}`).update({ state: "generating" });

        // 1. Check subscription + load history in parallel
        const [subStatus, projectSnap] = await Promise.all([
            getSubscriptionStatus(idToken),
            projectRef.get()
        ]);

        if (!subStatus) {
            await adminDb.doc(`projects/${projectId}`).update({ state: "unlocked" });
            return Response.json({ error: "Subscription status unavailable" }, { status: 400 });
        }

        // Load UI blob history
        const blobURL:string = projectSnap.data()?.uiBlobUrl;
    //@ts-expect-error format changes
        let history: any = {};

        if (blobURL) {
            try {
                history = await fetch(blobURL).then(r => r.text()).then(t => JSON.parse(t));
            } catch (e:unknown) {
                console.error(e);
                history = {};
            }
        }

        const prevUI = history.ui || previousUI || [];
        const styleGuide = history.styleGuide;
        const imageHolder = history.imageHolder;

        // 2. Generate the screen
        const { screen, creditUsed } = await GenerateSingleScreen(
            prompt,
            title,
            imageHolder,
            prevUI,
            styleGuide
        );

        // 3. Convert HTML component to JSON
        const convertedComponent = JSON.parse(await HtmlToJson(screen.component) as string);

        // 4. Replace UI inside history
        // @ts-expect-error item format too nested
        const updatedUI = prevUI.map((item: any) =>
            item.screen.name === title
                ? { screen: screen.screen, component: convertedComponent }
                : item
        );

        // 5. Credit calculation
        const calculateCredits = (tokens: number) =>
            Math.ceil(tokens / 10 + 50);

        const creditsDeducted = calculateCredits(creditUsed);
        const newTotalCredits = Number(history.creditUsed || 0) + creditsDeducted;

        // 6. Save updated history into blob storage
        const newEntry = {
            createdAt: new Date().toISOString(),
            prompt: history.prompt,
            aiResponse: history.aiResponse,
            creditUsed: newTotalCredits,
            ui: updatedUI,
            imageHolder,
            styleGuide,
        };

        await put(`project-ui/${projectId}.json`, JSON.stringify(newEntry), {
            access: 'public',
            allowOverwrite: true
        });

        // 7. Deduct credits
        await userRef.update({ credits: adminIncrement(-creditsDeducted) });

        // Unlock the project
        await adminDb.doc(`projects/${projectId}`).update({ state: "unlocked" });

        // 8. Return the new screen
        return Response.json({
            success: true,
            screen: screen.screen,
            component: convertedComponent,
            creditsDeducted: creditsDeducted
        });

    } catch (error) {
        console.error("UI generation error:", error);

        // Unlock the project on fail
        if (request) {
            const body = await request.json().catch(() => null);
            const projectId = body?.projectId;
            if (projectId) {
                adminDb.doc(`projects/${projectId}`).update({ state: "unlocked" }).catch(() => {});
            }
        }

        return Response.json({ error: String(error) }, { status: 500 });
    }
}
