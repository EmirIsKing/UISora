'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCreditStats } from '@/utils/creditAlerts';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';

interface CreditStats {
  currentCredits: number;
  creditsUsed: number;
  daysSinceCreation: number;
  averageDailyUsage: number;
  estimatedDaysRemaining: number | null;
}

const CREDIT_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 1000,
    price: 9.99,
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    credits: 5000,
    price: 39.99,
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 15000,
    price: 99.99,
    popular: false
  }
];

export default function BillingPage() {
  const { user } = useAuth();
  const [creditStats, setCreditStats] = useState<CreditStats | null>(null);
  const [currentCredits, setCurrentCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCreditInfo = async () => {
      if (!user?.uid) return;

      try {
        // Get current credits
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCurrentCredits(userData.credits || 0);
        }

        // Get credit stats
        const stats = await getCreditStats(user.uid);
        setCreditStats(stats);
      } catch (error) {
        console.error('Error loading credit info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCreditInfo();
  }, [user?.uid]);

  const handlePurchase = (packageId: string) => {
    // TODO: Implement actual payment processing
    alert(`Purchase ${packageId} - This would integrate with your payment processor`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading billing information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Billing & Credits</h1>
          <p className="mt-2 text-gray-600">Manage your credits and subscription</p>
        </div>

        {/* Current Credit Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Credit Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{currentCredits}</div>
              <div className="text-sm text-gray-600">Available Credits</div>
            </div>
            
            {creditStats && (
              <>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{creditStats.averageDailyUsage}</div>
                  <div className="text-sm text-gray-600">Avg. Daily Usage</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {creditStats.estimatedDaysRemaining || '∞'}
                  </div>
                  <div className="text-sm text-gray-600">Days Remaining</div>
                </div>
              </>
            )}
          </div>

          {creditStats && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Usage Statistics</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Total credits used: {creditStats.creditsUsed}</div>
                <div>Account age: {creditStats.daysSinceCreation} days</div>
                <div>Average daily usage: {creditStats.averageDailyUsage} credits</div>
              </div>
            </div>
          )}
        </div>

        {/* Credit Packages */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Purchase Credits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CREDIT_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative border rounded-lg p-6 ${
                  pkg.popular 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {pkg.credits.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">credits</div>
                  
                  <div className="text-2xl font-bold text-blue-600 mb-6">
                    ${pkg.price}
                  </div>
                  
                  <button
                    onClick={() => handlePurchase(pkg.id)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      pkg.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Usage Guide */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Credit Usage Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">What costs credits?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Prompt fattening: 50-100 credits</li>
                <li>• UI generation: 200-500 credits</li>
                <li>• Image generation: 100 credits per image</li>
                <li>• HTML to JSON conversion: 25 credits per screen</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Tips to save credits</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Reuse existing images when possible</li>
                <li>• Be specific in your prompts</li>
                <li>• Iterate on existing designs rather than starting fresh</li>
                <li>• Monitor your usage in the dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 