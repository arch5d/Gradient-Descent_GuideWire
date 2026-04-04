function buildClaimStatus({ triggerEventOccurred, policyEligible }) {
  if (!triggerEventOccurred) {
    return 'NO_TRIGGER_NO_PAYOUT';
  }

  if (!policyEligible) {
    return 'REJECTED_EXCLUSION';
  }

  return 'FLAGGED_FOR_PAYOUT';
}

export default class ClaimService {
  createClaim({ policyId, freelancer, eventData, policyDecision, riskScore }) {
    const status = buildClaimStatus({
      triggerEventOccurred: eventData.triggerEventOccurred,
      policyEligible: policyDecision.isEligible,
    });

    return {
      claimId: `CLM-${Date.now()}`,
      policyId: policyId ?? 'POLICY-UNKNOWN',
      createdAt: new Date().toISOString(),
      status,
      autoFlaggedForPayout: status === 'FLAGGED_FOR_PAYOUT',
      payoutRecommendation: status === 'FLAGGED_FOR_PAYOUT' ? 'APPROVE' : 'DENY',
      payoutAmountInr: status === 'FLAGGED_FOR_PAYOUT' ? 1250 : 0,
      claimant: {
        freelancerId: freelancer?.freelancerId ?? 'FREELANCER-UNKNOWN',
        fullName: freelancer?.fullName ?? 'Unknown claimant',
      },
      eventData,
      policyDecision,
      aiAssessment: {
        riskScore,
        modelVersion: 'sklearn-linear-risk-v1',
      },
    };
  }
}
