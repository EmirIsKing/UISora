'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import {nanoid} from 'nanoid';


// Initialize Firebase Admin
if (getApps().length === 0) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID!,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        }),
    });
}

const auth = getAuth();
const db = getFirestore();

export async function createUser(email: string, password: string, name?: string) {
    try {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: name || '',
        });

        // ✅ Using admin SDK syntax to set user document
        await db.collection('users').doc(userRecord.uid).set({
            uid: userRecord.uid,
            email: userRecord.email,
            name: userRecord.displayName,
            createdAt: new Date(),
            credits: 2000,
            notifications: [{id: nanoid(), date: new Date(), message: "Welcome to UISora 🎉 You’ve been awarded 2,000 free credits to start generating beautiful UIs. Let’s build something amazing! 🚀"}]
        });

        return {
            success: true,
            uid: userRecord.uid,
        };
    } catch (error: any) {
        console.error('Error creating user:', error);
        return {
            success: false,
            message: error.message || 'Failed to create user',
        };
    }
}
