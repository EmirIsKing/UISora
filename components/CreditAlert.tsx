'use client';

import { useState, useEffect } from 'react';
import { checkCreditAlerts, shouldShowAlert, markAlertShown, CreditAlert } from '@/utils/creditAlerts';

interface CreditAlertProps {
  uid: string;
  onDismiss?: () => void;
}

export default function CreditAlertComponent({ uid, onDismiss }: CreditAlertProps) {
  const [alert, setAlert] = useState<CreditAlert | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAlerts = async () => {
      try {
        const creditAlert = await checkCreditAlerts(uid);
        
        if (creditAlert) {
          const shouldShow = await shouldShowAlert(uid, creditAlert.type);
          
          if (shouldShow) {
            setAlert(creditAlert);
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error('Error checking credit alerts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAlerts();
  }, [uid]);

  const handleDismiss = async () => {
    if (alert) {
      await markAlertShown(uid, alert.type);
    }
    setIsVisible(false);
    onDismiss?.();
  };

  const handleAddCredits = () => {
    window.location.href = '/dashboard/billing';
  };

  if (isLoading || !isVisible || !alert) {
    return null;
  }

  const getAlertStyles = () => {
    switch (alert.type) {
      case 'depleted':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'critical':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'low':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (alert.type) {
      case 'depleted':
        return '🚨';
      case 'critical':
        return '⚠️';
      case 'low':
        return '💡';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full p-4 border rounded-lg shadow-lg ${getAlertStyles()}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 text-2xl">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium mb-1">
            {alert.type === 'depleted' && 'No Credits Remaining'}
            {alert.type === 'critical' && 'Critical Credit Level'}
            {alert.type === 'low' && 'Low Credit Warning'}
          </h3>
          
          <p className="text-sm mb-3">
            {alert.message}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs opacity-75">
              {alert.remainingCredits} credits remaining
            </span>
            
            <div className="flex space-x-2">
              {(alert.type === 'depleted' || alert.type === 'critical') && (
                <button
                  onClick={handleAddCredits}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Add Credits
                </button>
              )}
              
              <button
                onClick={handleDismiss}
                className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-lg opacity-50 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  );
} 