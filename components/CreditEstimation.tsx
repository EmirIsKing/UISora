'use client';

import { useState } from 'react';

interface CreditBreakdown {
  promptFattening: number;
  imageGeneration: number;
  uiGeneration: number;
  htmlToJson: number;
  total: number;
}

interface CreditEstimationProps {
  prompt: string;
  imageHolder?: string[];
  previousUI?: string;
  uid: string;
  onEstimateComplete?: (hasEnough: boolean, shortfall?: number) => void;
  onGenerate?: () => void;
}

export default function CreditEstimation({
  prompt,
  imageHolder = [],
  previousUI = '',
  uid,
  onEstimateComplete,
  onGenerate
}: CreditEstimationProps) {
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimation, setEstimation] = useState<{
    hasEnough: boolean;
    shortfall: number;
    estimated: CreditBreakdown;
    balance: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const estimateCredits = async () => {
    if (!prompt.trim()) return;

    setIsEstimating(true);
    setError(null);

    try {
      const response = await fetch('/api/estimate-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageHolder,
          previousUI,
          uid
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to estimate credits');
      }

      setEstimation({
        hasEnough: data.hasEnough,
        shortfall: data.shortfall,
        estimated: data.breakdown,
        balance: data.balance
      });

      onEstimateComplete?.(data.hasEnough, data.shortfall);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      onEstimateComplete?.(false);
    } finally {
      setIsEstimating(false);
    }
  };

  const handleGenerate = () => {
    if (estimation?.hasEnough) {
      onGenerate?.();
    }
  };

  return (
    <div className="space-y-4">
      {/* Estimate Button */}
      <button
        onClick={estimateCredits}
        disabled={isEstimating || !prompt.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isEstimating ? 'Estimating...' : 'Estimate Credits'}
      </button>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Estimation Results */}
      {estimation && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Credit Estimation</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              estimation.hasEnough 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {estimation.hasEnough ? 'Sufficient Credits' : 'Insufficient Credits'}
            </div>
          </div>

          {/* Credit Breakdown */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Prompt Fattening:</span>
              <span className="font-medium">{estimation.estimated.promptFattening} credits</span>
            </div>
            <div className="flex justify-between">
              <span>Image Generation:</span>
              <span className="font-medium">{estimation.estimated.imageGeneration} credits</span>
            </div>
            <div className="flex justify-between">
              <span>UI Generation:</span>
              <span className="font-medium">{estimation.estimated.uiGeneration} credits</span>
            </div>
            <div className="flex justify-between">
              <span>HTML to JSON:</span>
              <span className="font-medium">{estimation.estimated.htmlToJson} credits</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total Estimated:</span>
              <span>{estimation.estimated.total} credits</span>
            </div>
            <div className="flex justify-between">
              <span>Current Balance:</span>
              <span className="font-medium">{estimation.balance} credits</span>
            </div>
          </div>

          {/* Action Buttons */}
          {estimation.hasEnough ? (
            <button
              onClick={handleGenerate}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Generate UI ({estimation.estimated.total} credits)
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                You need {estimation.shortfall} more credits to generate this UI.
              </div>
              <button
                onClick={() => window.location.href = '/dashboard/billing'}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Credits
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 