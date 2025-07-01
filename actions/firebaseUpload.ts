import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import {storage} from '@/utils/firebase'


export async function uploadUiJson(uiJsonArray: any, userId:string, projectId: string) {
    const fileRef = ref(storage, `uiJson/${userId}/${projectId}.json`);
    const jsonString = JSON.stringify(uiJsonArray);

    await uploadString(fileRef, jsonString, 'raw'); // 'raw' for plain JSON
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
}
