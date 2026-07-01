export const metadata = { title: "Business Case | ATLAS" };

const SCORING = [
  { platform: "Paperclip", score: 3.95, highlight: true },
  { platform: "CrewAI", score: 3.53, highlight: false },
  { platform: "Microsoft Autogen", score: 3.43, highlight: false },
  { platform: "OpenClaw", score: 3.25, highlight: false },
  { platform: "LangGraph", score: 3.18, highlight: false },
  { platform: "Custom Build", score: 2.90, highlight: false },
];

const STRENGTHS = [
  "Enterprise-grade governance with approval gates, budget controls, and full audit trails — critical for regulated environments.",
  "Immediate time-to-value: 14 agents operational in days, not months, with zero custom infrastructure required.",
  "Agent-agnostic orchestration supports Claude, GPT, Codex, Gemini, and custom adapters without vendor lock-in.",
];

const RISKS = [
  "Early-stage platform — dependency on a startup for mission-critical workflows requires contractual safeguards.",
  "Per-task cost model introduces variable OpEx that needs monitoring as usage scales beyond pilot volumes.",
  "Team adoption depends on change management; agents augment but do not replace human judgment in complex deals.",
];

export default function BusinessCasePage() {
  const teamSize = 8;
  const tasksPerMonth = 120;
  const avgManualHours = 4.5;
  const hourlyRate = 95;
  const avgAgentMinutes = 3;

  const manualCostMonthly = teamSize * tasksPerMonth * avgManualHours * hourlyRate / teamSize;
  const agentCostMonthly = tasksPerMonth * 0.5;
  const monthlySavings = manualCostMonthly - agentCostMonthly;
  const annualSavings = monthlySavings * 12;
  const hoursSavedMonthly = tasksPerMonth * (avgManualHours - avgAgentMinutes / 60);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-atlas-text">Business Case</h1>
        <p className="mt-1 text-sm text-atlas-text-muted">
          Platform evaluation, scoring, and projected ROI
        </p>
      </section>

      <section className="rounded-lg border-l-2 border-atlas-accent bg-atlas-card p-6">
        <p className="text-sm font-medium uppercase tracking-wider text-atlas-accent">
          Hypothesis
        </p>
        <p className="mt-2 leading-relaxed text-atlas-text">
          An AI agent orchestration platform can reduce sales-engineering
          deliverable cycle time by 90%+, recover $600K–$1.1M in annual labor
          capacity, and provide enterprise governance that manual or ad-hoc AI
          usage cannot.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-atlas-text">
          Platform Scoring Matrix
        </h2>
        <div className="overflow-hidden rounded-lg border border-atlas-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-atlas-border bg-atlas-card">
                <th className="px-4 py-3 text-left font-medium text-atlas-text-muted">
                  Platform
                </th>
                <th className="px-4 py-3 text-right font-medium text-atlas-text-muted">
                  Score (1–5)
                </th>
                <th className="px-4 py-3 text-left font-medium text-atlas-text-muted">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-atlas-border">
              {SCORING.map((row) => (
                <tr
                  key={row.platform}
                  className={
                    row.highlight
                      ? "bg-atlas-accent/5"
                      : "bg-atlas-bg hover:bg-atlas-card"
                  }
                >
                  <td
                    className={`px-4 py-3 font-medium ${
                      row.highlight ? "text-atlas-accent" : "text-atlas-text"
                    }`}
                  >
                    {row.platform}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-atlas-text">
                    {row.score.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 rounded-full bg-atlas-border">
                        <div
                          className={`h-2 rounded-full ${
                            row.highlight ? "bg-atlas-accent" : "bg-blue-500"
                          }`}
                          style={{ width: `${(row.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-emerald-400">
            Strengths
          </h2>
          <div className="space-y-3">
            {STRENGTHS.map((s, i) => (
              <div
                key={i}
                className="rounded-lg border border-atlas-border bg-atlas-card p-4"
              >
                <p className="text-sm leading-relaxed text-atlas-text-muted">
                  {s}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-amber-400">Risks</h2>
          <div className="space-y-3">
            {RISKS.map((r, i) => (
              <div
                key={i}
                className="rounded-lg border border-atlas-border bg-atlas-card p-4"
              >
                <p className="text-sm leading-relaxed text-atlas-text-muted">
                  {r}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-atlas-text">
          ROI Projection
        </h2>
        <div className="rounded-lg border border-atlas-border bg-atlas-card p-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-atlas-text-muted">
                Team Size
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-atlas-text">
                {teamSize}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-atlas-text-muted">
                Tasks / Month
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-atlas-text">
                {tasksPerMonth}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-atlas-text-muted">
                Avg Manual Hours
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-atlas-text">
                {avgManualHours}h
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-atlas-text-muted">
                Hourly Rate
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-atlas-text">
                ${hourlyRate}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-atlas-border pt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-atlas-border bg-atlas-bg p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-atlas-text-muted">
                  Monthly Savings
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-400">
                  ${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="rounded-lg border border-atlas-border bg-atlas-bg p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-atlas-text-muted">
                  Annual Savings
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-400">
                  ${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="rounded-lg border border-atlas-border bg-atlas-bg p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-atlas-text-muted">
                  Hours Recovered / Month
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-blue-400">
                  {hoursSavedMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}h
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
