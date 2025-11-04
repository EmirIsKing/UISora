"use server";

import admin from "firebase-admin";
import { adminDb } from "@/utils/firebaseAdmin";

export async function getSubscriptionStatus(idToken: string | undefined) {
  // No token = user not logged in
  if (!idToken) {
    return { authenticated: false, subscribed: false, subscription: null };
  }

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);

  } catch {
    return { authenticated: false, subscribed: false, subscription: null };
  }

  const uid = decoded.uid;

  const userRef = adminDb.collection("users").doc(uid);
  const docSnap = await userRef.get();

  if (!docSnap.exists) {
    return { authenticated: true, subscribed: false, subscription: null };
  }

  const data = docSnap.data();
  const subscription = data?.subscription;

  // NEW USERS: subscription = undefined
  if (!subscription) {
    return {
      authenticated: true,
      subscribed: false,
      subscription: null,
    };
  }

  // USER HAS SUBSCRIPTION
  return {
    authenticated: true,
    subscribed: true,
    subscription: {
      status: subscription.status ?? "unknown",
      customerId: subscription.customerId ?? null,
      planId: subscription.planId ?? null,
      renewsAt: subscription.renewsAt ?? null,
    },
  };
}
