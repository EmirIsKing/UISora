import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {auth} from '@/utils/firebase'

export async function saveProjectMetadata(
    projectId: string,
    chat: any,
    settings: any,
    uiJsonUrl: string
): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const db = getFirestore();
    const ref = doc(db, 'users', user.uid, 'projects', projectId);

    await setDoc(ref, {
        chat,
        settings,
        uiJsonUrl,
        updatedAt: new Date()
    });
}
