import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '@/utils/firebase';

export async function getUser() {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const db = getFirestore();
  const userDocRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userDocRef);

  if (snapshot.exists()) {
    const userData = snapshot.data();
    return userData;
  } else {
    console.error('No user document found!');
    return null;
  }
}
