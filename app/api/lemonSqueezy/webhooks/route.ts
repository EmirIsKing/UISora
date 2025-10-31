import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

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

// ---- WEBHOOK HANDLER ----
export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SIGNATURE;

  if (!secret) {
    return NextResponse.json("Required env secrets not set!", { status: 400 });
  }

  const rawBody = await request.text();
  const signature = Buffer.from(request.headers.get("X-Signature") ?? "", "hex");

  if (signature.length === 0 || rawBody.length === 0) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  // Verify signature
  const hmac = Buffer.from(
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
    "hex"
  );

  if (!crypto.timingSafeEqual(hmac, signature)) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const data = JSON.parse(rawBody);

  const eventName = data.meta.event_name;
  const attributes = data.data.attributes;

  const userId = data.meta.custom_data.user_id;
  const subscriptionId = data.data.id;
  const status = attributes.status_formatted;
  const plan = attributes.product_name;
  const customerId = attributes.customer_id;
  const renewsAt = attributes.renews_at; // ✅ Add renewal date

  console.log("Event:", eventName);

  const userRef = db.collection("users").doc(userId);

  try {
    switch (eventName) {
      case "order_created":
        await userRef.set({
          lastOrderId: subscriptionId,
          customerId,
          lastOrderAt: new Date().toISOString(),
        }, { merge: true });
        break;

      case "subscription_created":
        await userRef.set({
          subscription: {
            id: subscriptionId,
            status,
            plan,
            customerId,
            renewsAt,
            createdAt: new Date().toISOString(),
          }
        }, { merge: true });
        break;

      case "subscription_updated":
        await userRef.update({
          "subscription.status": status,
          "subscription.plan": plan,
          "subscription.renewsAt": renewsAt,
          "subscription.updatedAt": new Date().toISOString(),
        });
        break;

      case "subscription_cancelled":
        await userRef.update({
          "subscription.status": "cancelled",
          "subscription.cancelledAt": new Date().toISOString(),
        });
        break;

      case "subscription_resumed":
      case "subscription_unpaused":
        await userRef.update({
          "subscription.status": "active",
          "subscription.renewsAt": renewsAt,
          "subscription.resumedAt": new Date().toISOString(),
        });
        break;

      case "subscription_expired":
        await userRef.update({
          "subscription.status": "expired",
          "subscription.expiredAt": new Date().toISOString(),
        });
        break;

      case "subscription_paused":
        await userRef.update({
          "subscription.status": "paused",
          "subscription.pausedAt": new Date().toISOString(),
        });
        break;

      default:
        console.log("Unhandled event:", eventName);
    }

    return NextResponse.json("OK", { status: 200 });
  } catch (err) {
    console.error("Firestore Write Error:", err);
    return NextResponse.json("Firestore error", { status: 500 });
  }
}
