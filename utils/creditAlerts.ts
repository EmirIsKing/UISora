import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export interface CreditAlert {
  type: 'low' | 'critical' | 'depleted';
  message: string;
  remainingCredits: number;
  threshold: number;
}

export const CREDIT_THRESHOLDS = {
  LOW: 200,      // Alert at 200 credits
  CRITICAL: 50,  // Alert at 50 credits
  DEPLETED: 0    // Alert at 0 credits
} as const;

/**
 * Check if user needs credit alerts and return appropriate alert
 */
export async function checkCreditAlerts(uid: string): Promise<CreditAlert | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }

    const userData = userSnap.data();
    const credits = userData.credits || 0;

    if (credits <= CREDIT_THRESHOLDS.DEPLETED) {
      return {
        type: 'depleted',
        message: 'You have no credits remaining. Please add credits to continue using the service.',
        remainingCredits: credits,
        threshold: CREDIT_THRESHOLDS.DEPLETED
      };
    }

    if (credits <= CREDIT_THRESHOLDS.CRITICAL) {
      return {
        type: 'critical',
        message: 'You have very few credits remaining. Consider adding more credits soon.',
        remainingCredits: credits,
        threshold: CREDIT_THRESHOLDS.CRITICAL
      };
    }

    if (credits <= CREDIT_THRESHOLDS.LOW) {
      return {
        type: 'low',
        message: 'You are running low on credits. Consider adding more credits.',
        remainingCredits: credits,
        threshold: CREDIT_THRESHOLDS.LOW
      };
    }

    return null;
  } catch (error) {
    console.error('Error checking credit alerts:', error);
    return null;
  }
}

/**
 * Mark an alert as shown to prevent showing it repeatedly
 */
export async function markAlertShown(uid: string, alertType: CreditAlert['type']): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      [`lastAlertShown.${alertType}`]: new Date()
    });
  } catch (error) {
    console.error('Error marking alert as shown:', error);
  }
}

/**
 * Check if an alert should be shown (not shown recently)
 */
export async function shouldShowAlert(uid: string, alertType: CreditAlert['type']): Promise<boolean> {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return true;
    }

    const userData = userSnap.data();
    const lastShown = userData.lastAlertShown?.[alertType];
    
    if (!lastShown) {
      return true;
    }

    // Don't show the same alert type more than once per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return new Date(lastShown.toDate()) < oneHourAgo;
  } catch (error) {
    console.error('Error checking if alert should be shown:', error);
    return true;
  }
}

/**
 * Get credit usage statistics for the user
 */
export async function getCreditStats(uid: string) {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }

    const userData = userSnap.data();
    const credits = userData.credits || 0;
    const createdAt = userData.createdAt?.toDate() || new Date();
    const daysSinceCreation = Math.ceil((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate average daily usage (assuming 1000 starting credits)
    const startingCredits = 1000;
    const creditsUsed = startingCredits - credits;
    const averageDailyUsage = daysSinceCreation > 0 ? creditsUsed / daysSinceCreation : 0;

    return {
      currentCredits: credits,
      creditsUsed: creditsUsed,
      daysSinceCreation,
      averageDailyUsage: Math.round(averageDailyUsage),
      estimatedDaysRemaining: averageDailyUsage > 0 ? Math.floor(credits / averageDailyUsage) : null
    };
  } catch (error) {
    console.error('Error getting credit stats:', error);
    return null;
  }
} 