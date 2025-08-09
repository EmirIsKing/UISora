import {uploadUiJson} from "@/actions/firebaseUpload";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {auth} from '@/utils/firebase'
import { v4 as uuidv4 } from 'uuid';
import {ProjectSettings} from "@/types/types";

export async function createNewProject(userId?: string): Promise<string> {
    let uid = userId;
    
    if (!uid) {
        // Wait for auth to be ready
        await new Promise<void>((resolve) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
                resolve();
            });
        });

        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');
        uid = user.uid;
    }

    // Double-check authentication before proceeding
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.uid !== uid) {
        throw new Error('Authentication verification failed');
    }

    const projectId = uuidv4();
    const emptyUiJson: any[] = [];
    const settings: ProjectSettings = {
        projectName: "New Project",
        visibility: "private"
    };

    // 1. Upload uiJson to Firebase Storage
    const uiJsonUrl = await uploadUiJson(emptyUiJson, uid, projectId);

    const db = getFirestore();

    // 2. Save to user's personal project
    const userProjectRef = doc(db, 'users', uid, 'projects', projectId);
    await setDoc(userProjectRef, {
        id: projectId,
        chat: { user: [], ai: [] },
        settings,
        uiJsonUrl,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    // 3. Save to global 'projects' collection (id + settings only)
    const globalProjectRef = doc(db, 'projects', projectId);
    await setDoc(globalProjectRef, {
        id: projectId,
        owner: uid,
        settings
    });

    return projectId;
}
