import { getFirestore, doc, updateDoc, setDoc } from 'firebase/firestore'
import { auth } from '@/utils/firebase'

interface UserDetails {
  name?: string
  email?: string
  phoneNumber?: string
  preferences?: {
    newsletter?: boolean
  }
  department?: string
  credits?: number
}

/**
 * Update one or more user fields in Firestore.
 * Accepts a userId (uid) to avoid "not authenticated" errors.
 */
export async function setUserDetail(uid: string, updates: Partial<UserDetails>): Promise<void> {
  if (!uid) {
        // Wait for auth to be ready
        await new Promise<void>((resolve) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
                resolve();
            });
        });

        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');
        uid = user.uid;
    }

  const db = getFirestore();

  const userDocRef = doc(db, 'users', uid)
  console.log("Current user:", auth.currentUser?.uid);
  console.log("Writing to path:", `users/${auth.currentUser?.uid}`);
  console.log("Data being written:", updates);
  try {
    await updateDoc(userDocRef, updates as Record<string, any>)
    console.log('✅ User details updated successfully:', updates)
    

  } catch (error: any) {
    // If doc doesn't exist, create it instead of failing
    if (error.code === 'not-found') {
      await setDoc(userDocRef, updates, { merge: true })
      console.log('🆕 User document created and updated:', updates)
    } else {
      console.error('❌ Error updating user details:', error)
      throw error
    }
  }
}
