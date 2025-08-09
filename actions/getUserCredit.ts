import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '@/utils/firebase';

export async function getUserCredits(): Promise<number | null> {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userDocRef);

    if (snapshot.exists()) {
        const credit = snapshot.get('credits');
        console.log(credit);
        return credit as number;
    } else {
        console.error("No document found!");
        return null;
    }
}
