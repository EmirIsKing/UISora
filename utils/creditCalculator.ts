import { encoding_for_model } from '@dqbd/tiktoken';

// Credit pricing constants
export const CREDIT_PRICING = {
  // Per-image generation cost
  IMAGE_GENERATION: 100,
  
  // Per HTML-to-JSON conversion cost
  HTML_TO_JSON: 25,
  
  // Per token cost for different models
  GPT4_PER_TOKEN: 1.5,    // GPT-4 is more expensive
  O3_MINI_PER_TOKEN: 1,   // O3-mini is cheaper
  
  // Fixed costs for different operations
  PROMPT_FATTENING_BASE: 50,
  UI_GENERATION_BASE: 100,
} as const;

// Token estimation for different models
export const TOKEN_ESTIMATORS = {
  'gpt-4': (text: string) => encoding_for_model('gpt-4').encode(text).length,
  'o3-mini': (text: string) => encoding_for_model('gpt-4').encode(text).length,
  'gpt-4o-latest': (text: string) => encoding_for_model('gpt-4').encode(text).length,
} as const;

export interface CreditEstimate {
  promptFattening: number;
  imageGeneration: number;
  uiGeneration: number;
  htmlToJson: number;
  total: number;
}

export interface CreditCheck {
  estimated: CreditEstimate;
  balance: number;
  hasEnough: boolean;
  shortfall: number;
}

/**
 * Estimate credits needed for a UI generation request
 */
export function estimateCredits(
  prompt: string,
  imageHolder: string[] = [],
  previousUI: string = '',
  estimatedScreens: number = 6 // Default: splash + onboarding + 4 other screens
): CreditEstimate {
  // Prompt fattening estimation
  const promptTokens = TOKEN_ESTIMATORS['gpt-4o-latest'](prompt);
  const promptFattening = CREDIT_PRICING.PROMPT_FATTENING_BASE + (promptTokens * CREDIT_PRICING.GPT4_PER_TOKEN);
  
  // Image generation estimation
  const imagesToGenerate = imageHolder.length === 0 ? 5 : 0; // 1 splash + 4 other images
  const imageGeneration = imagesToGenerate * CREDIT_PRICING.IMAGE_GENERATION;
  
  // UI generation estimation
  const estimatedFattenedPrompt = prompt.length * 3; // Rough estimate of fattened prompt
  const uiTokens = TOKEN_ESTIMATORS['o3-mini'](estimatedFattenedPrompt + previousUI);
  const uiGeneration = CREDIT_PRICING.UI_GENERATION_BASE + (uiTokens * CREDIT_PRICING.O3_MINI_PER_TOKEN);
  
  // HTML-to-JSON conversion estimation
  const htmlToJson = estimatedScreens * CREDIT_PRICING.HTML_TO_JSON;
  
  return {
    promptFattening: Math.ceil(promptFattening),
    imageGeneration,
    uiGeneration: Math.ceil(uiGeneration),
    htmlToJson,
    total: Math.ceil(promptFattening + imageGeneration + uiGeneration + htmlToJson)
  };
}

/**
 * Check if user has enough credits for the estimated operation
 */
export function checkCredits(estimated: CreditEstimate, balance: number): CreditCheck {
  const hasEnough = balance >= estimated.total;
  const shortfall = hasEnough ? 0 : estimated.total - balance;
  
  return {
    estimated,
    balance,
    hasEnough,
    shortfall
  };
}

/**
 * Calculate actual credits used after completion
 */
export function calculateActualCredits(
  promptFatteningTokens: number,
  imageGenerationCount: number,
  uiGenerationTokens: number,
  htmlToJsonCount: number
): CreditEstimate {
  const promptFattening = CREDIT_PRICING.PROMPT_FATTENING_BASE + (promptFatteningTokens * CREDIT_PRICING.GPT4_PER_TOKEN);
  const imageGeneration = imageGenerationCount * CREDIT_PRICING.IMAGE_GENERATION;
  const uiGeneration = CREDIT_PRICING.UI_GENERATION_BASE + (uiGenerationTokens * CREDIT_PRICING.O3_MINI_PER_TOKEN);
  const htmlToJson = htmlToJsonCount * CREDIT_PRICING.HTML_TO_JSON;
  
  return {
    promptFattening: Math.ceil(promptFattening),
    imageGeneration,
    uiGeneration: Math.ceil(uiGeneration),
    htmlToJson,
    total: Math.ceil(promptFattening + imageGeneration + uiGeneration + htmlToJson)/10
  };
} 