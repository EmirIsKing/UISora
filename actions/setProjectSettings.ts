import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { auth } from '@/utils/firebase';
import { ProjectSettings } from '@/types/types';

export async function setProjectSettings(projectId: string, settings: ProjectSettings): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const db = getFirestore();
    const projectRef = doc(db, 'users', user.uid, 'projects', projectId);
    const globalProjectRef = doc(db, 'projects', projectId);


    await updateDoc(projectRef, {
        settings
    });
    await updateDoc(globalProjectRef, {
        settings
    });
}
