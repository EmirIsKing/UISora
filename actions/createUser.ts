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

export async function createUser(email: string, password?: string, name?: string | null) {
    try {
        let userRecord;

        try {
            userRecord = await auth.getUserByEmail(email); // Existing user
        } catch (err: any) {
            // User doesn't exist in Auth → create only if password (email signup)
            if (password) {
                userRecord = await auth.createUser({
                    email,
                    password,
                    displayName: name || undefined,
                });
            } else {
                // Google login + user missing in Auth should never happen
                throw new Error("User does not exist in Auth and no password provided.");
            }
        }

        const uid = userRecord.uid;

        // Check if Firestore user doc already exists
        const userDoc = await db.collection("users").doc(uid).get();
        const exists = userDoc.exists;

        //Only create Firestore doc for NEW users
        if (!exists) {
            await db.collection("users").doc(uid).set({
                uid,
                email: userRecord.email,
                name: name || userRecord.displayName || "",
                createdAt: new Date(),
                boughtCredits: 0,
                credits: 2000,
                notifications: [
                    {
                        id: nanoid(),
                        date: new Date(),
                        message:
                            "Welcome to UISora 🎉 You’ve been credited 2,000 free credits to start generating beautiful UIs. Let’s build something amazing! 🚀",
                    },
                ],
            });

            return {
                success: true,
                uid,
                isNewUser: true,
            };
        }

        // Existing user
        return {
            success: true,
            uid,
            isNewUser: false,
        };

    } catch (error: any) {
        console.error("Error creating user:", error);
        return {
            success: false,
            message: error.message || "Failed to create user",
        };
    }
}

