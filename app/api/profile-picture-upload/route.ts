import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { put, del } from "@vercel/blob";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";

// ✅ Initialize Firebase Admin (only once)
if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID!,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
    });
}

const db = getFirestore();

export async function POST(req: NextRequest) {
    try {
        // 🔒 Verify Firebase Auth token
        const authHeader = req.headers.get("authorization");
        if (!authHeader)
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const idToken = authHeader.split("Bearer ")[1];
        const decoded = await getAuth().verifyIdToken(idToken);

        // 📦 Parse file from form data
        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file)
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

        const userRef = db.collection("users").doc(decoded.uid);
        const userDoc = await userRef.get();

        // 🗑️ If user has existing photo, delete it from Vercel Blob
        if (userDoc.exists) {
            const existingUrl = userDoc.data()?.photoURL;
            if (existingUrl && existingUrl.includes("vercel-storage.com")) {
                try {
                    await del(existingUrl);
                    console.log(`Deleted old profile picture: ${existingUrl}`);
                } catch (deleteErr) {
                    console.warn("Failed to delete old image:", deleteErr);
                }
            }
        }

        // ☁️ Upload new file to Vercel Blob
        const uniqueName = `${decoded.uid}-${uuidv4()}.${file.name.split(".").pop()}`;
        const blob = await put(`images/${uniqueName}`, file, { access: "public" });

        // 🗄️ Save the new URL in Firestore
        await userRef.set({ photoURL: blob.url }, { merge: true });

        // ✅ Return response
        return NextResponse.json({
            success: true,
            uid: decoded.uid,
            url: blob.url,
            message: "File uploaded, old one deleted, and Firestore updated.",
        });
    } catch (err: unknown) {
        console.error("Upload error:", err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
