import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// ---- INIT FIREBASE ADMIN ----
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

export async function GET() {
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7); // "2025-11"
    const todayISO = now.toISOString();

    const snapshot = await db.collection("users")
        .where("subscription.plan", "==", "Pro Annually")
        .get();

    let processed = 0;

    for (const doc of snapshot.docs) {
        const user = doc.data();
        const { subscription } = user;

        if (!subscription?.renewsAt) continue;

        const renewsAt = new Date(subscription.renewsAt);

        // ❌ STOP if contract is over (user didn't renew)
        if (renewsAt < now) continue;

        // ❌ STOP if already topped up this month
        if (subscription.lastTopupAt) {
            const lastMonth = subscription.lastTopupAt.slice(0, 7);
            if (lastMonth === currentMonth) continue;
        }

        // 🔥 RESET CREDITS TO EXACT 50,000
        await doc.ref.update({
            credits: 50000,
            "subscription.lastTopupAt": todayISO,
        });

        processed++;
    }

    return NextResponse.json({ success: true, processed });
}
