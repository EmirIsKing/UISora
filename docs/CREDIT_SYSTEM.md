# Credit System Implementation

## Overview

This document describes the credit system implementation for the AI-powered UI generation app. The system provides preflight credit checks, accurate cost estimation, and user-friendly credit management.

## Architecture

### Core Components

1. **Credit Calculator** (`utils/creditCalculator.ts`)
   - Token estimation using `@dqbd/tiktoken`
   - Credit pricing constants
   - Estimation and calculation functions

2. **Credit Estimation API** (`app/api/estimate-credits/route.ts`)
   - Preflight endpoint for credit estimation
   - User balance checking
   - Credit sufficiency validation

3. **Enhanced UI Generation** (`app/api/generate-ui/route.ts`)
   - Credit reservation using Firestore transactions
   - Actual credit usage calculation
   - Credit reconciliation after completion

4. **Credit Alerts** (`utils/creditAlerts.ts`)
   - Low credit warnings
   - Usage statistics
   - Alert management

5. **UI Components**
   - `CreditEstimation.tsx` - Preflight estimation UI
   - `CreditAlert.tsx` - Credit warning notifications
   - `BillingPage.tsx` - Credit purchase interface

## Credit Pricing

### Current Pricing Structure

```typescript
CREDIT_PRICING = {
  IMAGE_GENERATION: 100,        // Per image
  HTML_TO_JSON: 25,             // Per screen conversion
  GPT4_PER_TOKEN: 1.5,          // GPT-4 token cost
  O3_MINI_PER_TOKEN: 1,         // O3-mini token cost
  PROMPT_FATTENING_BASE: 50,    // Base cost for prompt fattening
  UI_GENERATION_BASE: 100,      // Base cost for UI generation
}
```

### Typical Credit Usage

- **Simple UI Generation**: 300-600 credits
- **Complex UI with Images**: 500-800 credits
- **Multi-screen App**: 800-1200 credits

## Implementation Flow

### 1. Credit Estimation (Preflight)

```typescript
// User requests credit estimation
POST /api/estimate-credits
{
  prompt: string,
  imageHolder: string[],
  previousUI: string,
  uid: string
}

// Response
{
  hasEnough: boolean,
  shortfall: number,
  estimated: CreditBreakdown,
  balance: number
}
```

### 2. Credit Reservation

```typescript
// Firestore transaction reserves estimated credits
await runTransaction(db, async (transaction) => {
  const userDoc = await transaction.get(userRef);
  const currentBalance = userDoc.data()?.credits || 0;
  
  if (currentBalance < estimated.total) {
    throw new Error('Insufficient credits');
  }
  
  transaction.update(userRef, {
    credits: currentBalance - estimated.total
  });
});
```

### 3. Actual Usage Calculation

```typescript
// After completion, calculate actual credits used
const actualCredits = calculateActualCredits(
  fattenedRes.usage?.total_tokens || 0,
  images.length - (imageHolder?.length || 0),
  data.creditUsed,
  convertedUI.length
);
```

### 4. Credit Reconciliation

```typescript
// Reconcile actual vs estimated usage
const creditDifference = actualCredits.total - transactionResult.reserved;

if (creditDifference !== 0) {
  await updateDoc(doc(db, 'users', uid), {
    credits: increment(-creditDifference)
  });
}
```

## User Experience

### Credit Estimation UI

The `CreditEstimation` component provides:
- Real-time credit estimation
- Detailed cost breakdown
- Sufficient/insufficient credit status
- Direct purchase flow for insufficient credits

### Credit Alerts

Automatic alerts at:
- **200 credits** - Low credit warning
- **50 credits** - Critical credit warning
- **0 credits** - No credits remaining

### Billing Page

Features:
- Current credit balance
- Usage statistics
- Credit purchase packages
- Usage tips and guidelines

## Database Schema

### User Document
```typescript
{
  uid: string,
  email: string,
  name: string,
  credits: number,
  createdAt: Timestamp,
  lastAlertShown: {
    low?: Timestamp,
    critical?: Timestamp,
    depleted?: Timestamp
  }
}
```

### Project History Entry
```typescript
{
  createdAt: string,
  prompt: string,
  creditUsed: number,
  ui: UIComponent[],
  imageHolder: string[]
}
```

## Security Considerations

1. **Server-side Validation**: All credit checks happen server-side
2. **Transaction Safety**: Firestore transactions prevent race conditions
3. **Credit Reservation**: Credits are reserved before expensive operations
4. **Reconciliation**: Actual usage is calculated and reconciled after completion

## Monitoring and Analytics

### Credit Usage Tracking
- Per-operation credit consumption
- User credit balance history
- Average daily usage patterns
- Credit purchase patterns

### Alert System
- Automated low credit warnings
- Usage pattern analysis
- Credit depletion predictions

## Future Enhancements

1. **Subscription Plans**: Monthly credit allocations
2. **Credit Rollover**: Unused credits carry over
3. **Team Credits**: Shared credit pools
4. **Usage Analytics**: Detailed usage reports
5. **Credit Gifting**: Referral and promotional credits

## Testing

### Unit Tests
- Credit calculation accuracy
- Token estimation precision
- Alert threshold validation

### Integration Tests
- End-to-end credit flow
- Transaction rollback scenarios
- Concurrent user scenarios

### Load Tests
- High-volume credit operations
- Database transaction performance
- API response times

## Deployment Notes

1. **Environment Variables**: Ensure all API keys are configured
2. **Database Indexes**: Optimize Firestore queries for credit operations
3. **Monitoring**: Set up alerts for credit system failures
4. **Backup**: Regular backup of user credit data
5. **Rate Limiting**: Implement rate limits for credit estimation API 