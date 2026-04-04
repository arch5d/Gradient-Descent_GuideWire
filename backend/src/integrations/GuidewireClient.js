import { mapClaimToGuidewire } from './GuidewireClaimMapper.js';

export default class GuidewireClient {
  constructor({ baseUrl, authToken } = {}) {
    this.baseUrl = baseUrl ?? process.env.GUIDEWIRE_API_BASE_URL ?? 'https://guidewire.example.invalid';
    this.authToken = authToken ?? process.env.GUIDEWIRE_API_TOKEN ?? 'replace-me';
  }

  mapClaim(claim) {
    return mapClaimToGuidewire(claim);
  }

  async submitClaim(claim) {
    const payload = this.mapClaim(claim);

    // This is a scaffold: replace with real HTTP calls to ClaimCenter/InsuranceSuite APIs.
    return {
      endpoint: `${this.baseUrl}/claims`,
      method: 'POST',
      accepted: true,
      message: 'Guidewire scaffold accepted payload (no external call executed).',
      payload,
      submittedAt: new Date().toISOString(),
      authHeaderConfigured: this.authToken !== 'replace-me',
    };
  }
}
