import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { auth } from '@/utils/firebase';
import { ProjectSettings } from '@/types/types';

interface ProjectSettingsWithId {
    id: string;
    settings: ProjectSettings;
}

export async function getUserProjectSettings(): Promise<ProjectSettingsWithId[]> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const db = getFirestore();
    const userProjectsRef = collection(db, 'users', user.uid, 'projects');
    const snapshot = await getDocs(userProjectsRef);

    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            settings: data.settings as ProjectSettings,
        };
    });
}
