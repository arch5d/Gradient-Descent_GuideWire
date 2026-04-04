import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PYTHON_SCRIPT_PATH = path.resolve(__dirname, '../../python/risk_model_service.py');

export default class RiskScoringService {
  async predictRiskScore(gigHistory = {}) {
    const payload = {
      weekly_jobs_completed: Number(gigHistory.weeklyJobsCompleted ?? 30),
      on_time_rate: Number(gigHistory.onTimeRate ?? 0.9),
      cancellation_rate: Number(gigHistory.cancellationRate ?? 0.08),
      income_volatility: Number(gigHistory.incomeVolatility ?? 0.22),
    };

    return this.#executePythonInference(payload);
  }

  #executePythonInference(payload) {
    return new Promise((resolve, reject) => {
      const pythonBin = process.env.PYTHON_BIN ?? 'python';
      const child = spawn(pythonBin, [PYTHON_SCRIPT_PATH], {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let stdout = '';
      let stderr = '';

      const timeout = setTimeout(() => {
        child.kill('SIGTERM');
        reject(new Error('Risk scoring process timeout after 10s'));
      }, 10000);

      child.stdout.on('data', (chunk) => {
        stdout += chunk.toString();
      });

      child.stderr.on('data', (chunk) => {
        stderr += chunk.toString();
      });

      child.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });

      child.on('close', (code) => {
        clearTimeout(timeout);

        if (code !== 0) {
          reject(new Error(`Risk scoring failed with code ${code}: ${stderr || 'unknown error'}`));
          return;
        }

        try {
          const parsed = JSON.parse(stdout);
          resolve(parsed.riskScore);
        } catch (parseError) {
          reject(new Error(`Unable to parse risk scoring output: ${stdout}. ${parseError.message}`));
        }
      });

      child.stdin.write(JSON.stringify(payload));
      child.stdin.end();
    });
  }
}
