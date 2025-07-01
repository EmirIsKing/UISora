import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { auth } from '@/utils/firebase';
import { JsonToHtmlRendererProps } from '@/types/types';

export async function getUserProjects(): Promise<JsonToHtmlRendererProps[]> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const db = getFirestore();
    const userProjectsRef = collection(db, 'users', user.uid, 'projects');
    const snapshot = await getDocs(userProjectsRef);

    if (snapshot.empty) return [] as JsonToHtmlRendererProps[];

    return snapshot.docs.map(doc => doc.data() as JsonToHtmlRendererProps);
}
