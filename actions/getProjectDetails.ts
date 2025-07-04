import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '@/utils/firebase';
import { ProjectSettings } from '@/types/types';

export interface ProjectSettingsWithId {
    id: string;
    settings: ProjectSettings;
}

export async function getProjectDetails(projectId: string): Promise<ProjectSettingsWithId | null> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const db = getFirestore();
    const projectRef = doc(db, 'users', user.uid, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) return null;

    const data = projectSnap.data();

    return {
        id: projectSnap.id,
        settings: data.settings as ProjectSettings,
    };
}
