"use server";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export async function deleteProject(uid: string, projectId: string) {
    const userProjectRef = doc(db, 'users', uid, 'projects', projectId);
    const sharedProjectRef = doc(db, 'projects', projectId);

    await Promise.all([
        deleteDoc(userProjectRef),
        deleteDoc(sharedProjectRef)
    ]);
}
