"use server";

import { adminDb } from "@/utils/firebaseAdmin";

export default async function getProjectState(uid: string) {
  try {
    const docRef = adminDb.doc(`projects/${uid}`);
    const snap = await docRef.get();

    if (!snap.exists) {
      return { state: null, found: false };
    }

    const data = snap.data();
    return { state: data?.state ?? null, found: true };

  } catch (error) {
    console.error("getProjectState error:", error);
    return { state: null, found: false, error: true };
  }
}
