export default class TriggerService {
  static INCOME_DROP_TRIGGER_PERCENT = 40;

  fetchEventSnapshot(eventInput = {}) {
    const baselineIncome = Number(eventInput.baselineIncome ?? 0);
    const currentIncome = Number(eventInput.currentIncome ?? 0);

    const computedIncomeDrop =
      baselineIncome > 0 ? Math.max(0, ((baselineIncome - currentIncome) / baselineIncome) * 100) : 0;

    const incomeDropPercent = Number(
      eventInput.incomeDropPercent ?? eventInput.incomeDropPercentage ?? computedIncomeDrop,
    );

    return {
      eventId: eventInput.eventId ?? `EVT-${Date.now()}`,
      source: eventInput.source ?? 'simulated-gig-platform-feed',
      zone: eventInput.zone ?? 'Bengaluru-Central',
      timestamp: new Date().toISOString(),
      baselineIncome,
      currentIncome,
      incomeDropPercent,
      triggerReason: `${incomeDropPercent.toFixed(2)}% income contraction detected`,
      exclusions: {
        war: Boolean(eventInput?.exclusions?.war),
        pandemic: Boolean(eventInput?.exclusions?.pandemic),
        nuclearHazard: Boolean(eventInput?.exclusions?.nuclearHazard),
      },
    };
  }

  evaluateTrigger(eventSnapshot) {
    return {
      ...eventSnapshot,
      triggerEventOccurred:
        eventSnapshot.incomeDropPercent >= TriggerService.INCOME_DROP_TRIGGER_PERCENT,
      triggerThresholdPercent: TriggerService.INCOME_DROP_TRIGGER_PERCENT,
    };
  }

  async fetchAndEvaluateTrigger(eventInput = {}) {
    // Simulate latency from an upstream weather/gig-platform API.
    await new Promise((resolve) => setTimeout(resolve, 120));

    const eventSnapshot = this.fetchEventSnapshot(eventInput);
    return this.evaluateTrigger(eventSnapshot);
  }
}
