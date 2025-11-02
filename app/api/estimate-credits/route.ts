'use server';

import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { estimateCredits, checkCredits } from '@/utils/creditCalculator';

export async function POST(request: Request) {
    try {
        const { prompt, imageHolder, previousUI, uid } = await request.json();

        if (!uid) {
            return NextResponse.json({ message: 'Missing uid' }, { status: 400 });
        }

        if (!prompt) {
            return NextResponse.json({ message: 'Missing prompt' }, { status: 400 });
        }

        // Get user's current credit balance
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const userData = userSnap.data();
        const balance = userData.credits || 0;

        // Estimate credits needed for this request
        const estimated = estimateCredits(prompt, imageHolder, previousUI);
        
        // Check if user has enough credits
        const creditCheck = checkCredits(estimated, balance);

        return NextResponse.json({
            success: true,
            ...creditCheck,
            breakdown: {
                promptFattening: estimated.promptFattening,
                imageGeneration: estimated.imageGeneration,
                uiGeneration: estimated.uiGeneration,
                htmlToJson: estimated.htmlToJson,
                total: estimated.total
            }
        });

    } catch (error) {
        console.error('[ERROR] Estimating credits:', error);
        return NextResponse.json({ 
            message: 'Error estimating credits',
            success: false 
        }, { status: 500 });
    }
} 