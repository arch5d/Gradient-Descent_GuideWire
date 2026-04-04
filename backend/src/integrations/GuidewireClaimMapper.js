export function mapClaimToGuidewire(claim) {
  return {
    claimNumber: claim.claimId,
    policyNumber: claim.policyId,
    lossDate: claim.eventData.timestamp,
    reportedDate: claim.createdAt,
    lossCause: 'LOSS_OF_INCOME',
    description: claim.eventData.triggerReason,
    insured: {
      publicId: claim.claimant.freelancerId,
      displayName: claim.claimant.fullName,
    },
    customFields: {
      gigguardStatus: claim.status,
      autoFlaggedForPayout: claim.autoFlaggedForPayout,
      payoutAmountInr: claim.payoutAmountInr,
      triggerEventOccurred: claim.eventData.triggerEventOccurred,
      incomeDropPercent: claim.eventData.incomeDropPercent,
      policyExclusions: claim.policyDecision.triggeredExclusions,
      aiRiskScore: claim.aiAssessment.riskScore,
      aiModelVersion: claim.aiAssessment.modelVersion,
    },
  };
}
