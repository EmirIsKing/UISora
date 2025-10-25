'use server';

import { adminDb } from '@/utils/firebaseAdmin';

export interface ProjectSettingsWithId {
    id: string;
    settings: {
        description: string;
        projectName: string;
        visibility: string;
    };
    blobUrl: string;
}

export async function getProjectViewDetails(
    projectId: string
): Promise<ProjectSettingsWithId | { error: string } | null> {
    try {
        // 🔹 Fetch the public reference to find the owner
        const ownerRef = adminDb.doc(`projects/${projectId}`);
        const docSnap = await ownerRef.get();

        if (!docSnap.exists) {
            return { error: 'Project not found.' };
        }

        const temp = docSnap.data();
        if (!temp?.owner) {
            return { error: 'Project owner not found.' };
        }

        // 🔹 Fetch the owner-specific project
        const projectRef = adminDb.doc(`users/${temp.owner}/projects/${projectId}`);
        const projectSnap = await projectRef.get();

        if (!projectSnap.exists) {
            return { error: 'Project not found or has been deleted.' };
        }

        const data = projectSnap.data();

        // 🔒 Check visibility
        if (data?.settings?.visibility === 'private') {
            return { error: 'This project is private or cannot be viewed.' };
        }

        return {
            id: projectSnap.id,
            settings: {
                description: data?.settings?.description ?? '',
                projectName: data?.settings?.projectName ?? '',
                visibility: data?.settings?.visibility ?? 'public',
            },
            blobUrl: data?.uiBlobUrl as string,
        };
    } catch (err) {
        console.error('Error fetching project details:', err);
        return { error: 'Failed to fetch project details.' };
    }
}
