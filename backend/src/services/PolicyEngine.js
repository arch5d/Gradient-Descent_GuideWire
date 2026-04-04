const EXCLUSION_RULES = [
  { key: 'war', label: 'War Exclusion' },
  { key: 'pandemic', label: 'Pandemic Exclusion' },
  { key: 'nuclearHazard', label: 'Nuclear Hazard Exclusion' },
];

export default class PolicyEngine {
  evaluate(eventData) {
    const triggeredExclusions = EXCLUSION_RULES.filter((rule) => Boolean(eventData?.exclusions?.[rule.key]));

    if (triggeredExclusions.length > 0) {
      return {
        isEligible: false,
        reason: `Claim blocked by exclusions: ${triggeredExclusions
          .map((rule) => rule.label)
          .join(', ')}`,
        triggeredExclusions: triggeredExclusions.map((rule) => rule.key),
      };
    }

    return {
      isEligible: true,
      reason: 'No policy exclusions triggered',
      triggeredExclusions: [],
    };
  }
}
