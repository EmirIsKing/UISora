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
    const today = new Date().toISOString().split("T")[0];
    const snapshot = await db.collection("users")
        .where("subscription.plan", "==", "Pro Annually")
        .get();

    let processed = 0;

    for (const doc of snapshot.docs) {
        const user = doc.data();
        const { subscription, credits = 0 } = user;

        if (!subscription?.renewsAt || !subscription?.createdAt) continue;

        const renewsAt = new Date(subscription.renewsAt).toISOString().split("T")[0];
        const createdAt = new Date(subscription.createdAt);

        // Only top up if today == renewsAt
        if (renewsAt !== today) continue;

        // Stop if it has been 1 year since creation
        const monthsSinceCreated =
            (new Date().getFullYear() - createdAt.getFullYear()) * 12 +
            (new Date().getMonth() - createdAt.getMonth());
        if (monthsSinceCreated >= 12) continue;

        const nextRenewDate = addOneMonth(renewsAt);

        await doc.ref.update({
            credits: 50000, // 💎 Add monthly credits (adjust amount)
            "subscription.renewsAt": nextRenewDate,
            "subscription.lastTopupAt": new Date().toISOString(),
        });

        processed++;
    }

    return NextResponse.json({ success: true, processed });
}

function addOneMonth(dateStr: string) {
    const d = new Date(dateStr);
    d.setMonth(d.getMonth() + 1);
    return d.toISOString().split("T")[0];
}
