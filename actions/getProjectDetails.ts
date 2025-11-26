'use server';

import { adminDb } from '@/utils/firebaseAdmin';
import { ProjectSettings } from '@/types/types';

export interface ProjectSettingsWithId {
    id: string;
    settings: ProjectSettings;
    blobUrl: string;
}

export async function getProjectDetails(
    uid: string,
    projectId: string
): Promise<ProjectSettingsWithId | null> {
    if (!uid) throw new Error('User ID is required');

    const projectRef = adminDb.doc(`users/${uid}/projects/${projectId}`);
    const projectSnap = await projectRef.get();

    if (!projectSnap.exists) return null;

    const data = projectSnap.data();

    return {
        id: projectSnap.id,
        settings: data?.settings as ProjectSettings,
        blobUrl: data?.uiBlobUrl as string
    };
}
