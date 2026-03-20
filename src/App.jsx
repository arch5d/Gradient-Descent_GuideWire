import { useEffect, useState } from 'react';

const riskEvents = [
  'Heavy Rain Detected',
  'High Wind Alert',
  'Localized Flooding Warning',
  'Storm Cell Monitoring Active',
];

const fraudLogs = [
  {
    label: 'IMU Sensor Data',
    status: 'Verified',
    detail: 'Motion vectors match active route telemetry and rider cadence.',
  },
  {
    label: 'GPS Status',
    status: 'Spoofing Check Passed',
    detail: 'Location integrity cross-check cleared against network and device signals.',
  },
  {
    label: 'Device Trust',
    status: 'Secure Session',
    detail: 'Root detection and mock-location scan report no anomalies.',
  },
];

function StatPill({ label, value, tone = 'indigo' }) {
  const tones = {
    indigo: 'bg-indigo-500/15 text-indigo-200 border-indigo-400/20',
    blue: 'bg-blue-500/15 text-blue-200 border-blue-400/20',
    emerald: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/20',
  };

  return (
    <div className={`rounded-2xl border px-4 py-3 ${tones[tone]}`}>
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function App() {
  const [riskIndex, setRiskIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRiskIndex((current) => (current + 1) % riskEvents.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!toastVisible) return undefined;
    const timeout = window.setTimeout(() => setToastVisible(false), 3200);
    return () => window.clearTimeout(timeout);
  }, [toastVisible]);

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.85)]" />
              Gradient Descent Command Center
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              GigGuard AI Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              AI-driven weekly income protection for delivery workers, blending live disruption detection,
              fraud-resistant telemetry, and instant payout confidence.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatPill label="Coverage Window" value="7 Days Active" />
            <StatPill label="Risk Engine" value="Realtime Sync" tone="blue" />
            <StatPill label="Payout SLA" value="&lt; 90 Seconds" tone="emerald" />
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="card p-6 sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Worker Status</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Active Weekly Coverage</h2>
                  <p className="mt-3 max-w-xl text-slate-300">
                    Coverage is live for the current weekly cycle with AI-backed monitoring across weather,
                    route viability, and workforce disruption triggers.
                  </p>
                </div>
                <div className="rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-blue-500/10 p-6 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Protected Earnings</p>
                  <p className="mt-3 text-5xl font-semibold text-white">₹7,500</p>
                  <p className="mt-2 text-sm text-slate-300">Estimated weekly income floor</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="card p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Live Risk Monitor</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{riskEvents[riskIndex]}</h3>
                  </div>
                  <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
                    Weather AI Live
                  </span>
                </div>
                <div className="mt-6 h-40 rounded-3xl bg-gradient-to-br from-blue-500/15 via-slate-900 to-indigo-500/10 p-5">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Zone: Bengaluru Central</span>
                      <span>Updated 5s ago</span>
                    </div>
                    <div>
                      <div className="mb-3 h-3 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500" />
                      </div>
                      <p className="text-sm text-slate-300">
                        Trigger confidence is elevated due to sustained rain intensity and route slowdown anomalies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Instant Payout</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Zero-touch compensation</h3>
                <p className="mt-3 text-slate-300">
                  Once a verified trigger is confirmed, GigGuard AI initiates an automated payout to the worker wallet.
                </p>
                <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Eligible payout</span>
                    <span>UPI linked</span>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-4xl font-semibold text-white">₹1,250</p>
                      <p className="mt-2 text-sm text-slate-400">Auto-calculated for 4 peak-hour loss</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setToastVisible(true)}
                      className="rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:scale-[1.02] hover:shadow-blue-900/40"
                    >
                      Send Instant Payout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="card p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Fraud Prevention</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Integrity logs</h3>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                Secure
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {fraudLogs.map((log) => (
                <div key={log.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{log.label}</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {log.label}: {log.status}
                      </p>
                    </div>
                    <span className="mt-1 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.9)]" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{log.detail}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>

      <div
        className={`pointer-events-none fixed bottom-6 right-6 transition duration-300 ${
          toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-emerald-400/30 bg-slate-900/95 px-5 py-4 shadow-2xl shadow-emerald-950/50 backdrop-blur">
          <p className="text-sm font-semibold text-emerald-300">Payout successful</p>
          <p className="mt-1 text-sm text-slate-300">₹1,250 has been queued to the worker’s linked wallet.</p>
        </div>
      </div>
    </main>
  );
}

export default App;
