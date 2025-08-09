import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { auth } from "@/utils/firebase";

export async function deleteProject(uid: string, projectId: string) {
    // Verify authentication
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error('User not authenticated');
    }

    // Verify the user owns the project
    if (currentUser.uid !== uid) {
        throw new Error('User not authorized to delete this project');
    }

    // Check if the project exists and user owns it
    const sharedProjectRef = doc(db, 'projects', projectId);
    const projectDoc = await getDoc(sharedProjectRef);
    
    if (!projectDoc.exists()) {
        throw new Error('Project not found');
    }

    const projectData = projectDoc.data();
    if (projectData.owner !== uid) {
        throw new Error('User not authorized to delete this project');
    }

    const userProjectRef = doc(db, 'users', uid, 'projects', projectId);

    try {
        await Promise.all([
            deleteDoc(userProjectRef),
            deleteDoc(sharedProjectRef)
        ]);
    } catch (error: any) {
        console.error('Delete project error:', error);
        throw new Error(`Failed to delete project: ${error.message}`);
    }
}
