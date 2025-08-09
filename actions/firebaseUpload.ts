import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '@/utils/firebase';
import { auth } from '@/utils/firebase';

export async function uploadUiJson(uiJsonArray: any, userId: string, projectId: string) {
    // Ensure user is authenticated
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error('User not authenticated');
    }

    // Verify the userId matches the current user
    if (currentUser.uid !== userId) {
        throw new Error('User ID mismatch');
    }

    const fileRef = ref(storage, `uiJson/${userId}/${projectId}.json`);
    const jsonString = JSON.stringify(uiJsonArray);

    try {
        await uploadString(fileRef, jsonString, 'raw'); // 'raw' for plain JSON
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error: any) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload file: ${error.message}`);
    }
}
