import ClaimService from '../services/ClaimService.js';
import PolicyEngine from '../services/PolicyEngine.js';
import RiskScoringService from '../services/RiskScoringService.js';
import TriggerService from '../services/TriggerService.js';
import GuidewireClient from '../integrations/GuidewireClient.js';

const triggerService = new TriggerService();
const policyEngine = new PolicyEngine();
const claimService = new ClaimService();
const riskScoringService = new RiskScoringService();
const guidewireClient = new GuidewireClient();

export async function evaluateClaim(req, res, next) {
  try {
    const { policyId, freelancer = {}, event = {} } = req.body ?? {};

    const eventData = await triggerService.fetchAndEvaluateTrigger(event);
    const policyDecision = policyEngine.evaluate(eventData);
    const riskScore = await riskScoringService.predictRiskScore(freelancer.gigHistory ?? {});

    const claim = claimService.createClaim({
      policyId,
      freelancer,
      eventData,
      policyDecision,
      riskScore,
    });

    const guidewirePayload = guidewireClient.mapClaim(claim);
    const guidewireSubmission =
      claim.autoFlaggedForPayout ? await guidewireClient.submitClaim(claim) : null;

    res.status(200).json({
      claim,
      guidewirePayload,
      guidewireSubmission,
    });
  } catch (error) {
    next(error);
  }
}

export async function predictRisk(req, res, next) {
  try {
    const riskScore = await riskScoringService.predictRiskScore(req.body?.gigHistory ?? {});

    res.status(200).json({
      riskScore,
      modelVersion: 'sklearn-linear-risk-v1',
    });
  } catch (error) {
    next(error);
  }
}
