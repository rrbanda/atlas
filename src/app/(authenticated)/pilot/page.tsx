export const metadata = { title: "Pilot Progress | ATLAS" };

const PHASES = [
  {
    label: "Month 1",
    name: "Foundation",
    description:
      "Core platform deployment, initial agent configuration, team onboarding, and baseline metrics establishment.",
    active: true,
  },
  {
    label: "Month 2",
    name: "Expansion",
    description:
      "Scale to full agent roster, integrate with existing CRM and toolchain, measure first ROI indicators.",
    active: false,
  },
  {
    label: "Month 3",
    name: "Decision",
    description:
      "Full performance evaluation, executive review, go/no-go recommendation based on exit criteria.",
    active: false,
  },
];

const KPI_TARGETS = [
  { metric: "Task Completion Rate", target: "≥ 85%", actual: "88%", met: true },
  { metric: "Avg Time-to-Delivery", target: "< 5 min", actual: "2.8 min", met: true },
  { metric: "Agent Uptime", target: "≥ 99%", actual: "99.2%", met: true },
  { metric: "Cost per Task", target: "< $2.00", actual: "$0.42", met: true },
  { metric: "User Satisfaction", target: "≥ 4.0/5", actual: "4.2/5", met: true },
  { metric: "Tasks per Month", target: "≥ 50", actual: "21", met: false },
];

const EXIT_CRITERIA = [
  { label: "Platform operational with ≥ 10 active agents", met: true },
  { label: "Task completion rate ≥ 85%", met: true },
  { label: "Average cost per task under $2.00", met: true },
  { label: "Zero critical security incidents", met: true },
  { label: "Positive team adoption feedback (≥ 80%)", met: true },
  { label: "Demonstrated ROI ≥ 3x investment", met: false },
  { label: "Executive sponsor sign-off", met: false },
];

export default function PilotPage() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-atlas-text">
          90-Day Pilot Progress
        </h1>
        <p className="mt-1 text-sm text-atlas-text-muted">
          Tracking milestones, targets, and exit criteria
        </p>
      </section>

      <section>
        <div className="flex items-center gap-0">
          {PHASES.map((phase, i) => (
            <div key={phase.label} className="flex flex-1 items-center">
              <div
                className={`flex flex-1 flex-col items-center rounded-lg border p-5 ${
                  phase.active
                    ? "border-atlas-accent bg-atlas-accent/5"
                    : "border-atlas-border bg-atlas-card"
                }`}
              >
                <span
                  className={`text-xs font-medium uppercase tracking-wider ${
                    phase.active ? "text-atlas-accent" : "text-atlas-text-muted"
                  }`}
                >
                  {phase.label}
                </span>
                <span
                  className={`mt-1 text-base font-semibold ${
                    phase.active ? "text-atlas-text" : "text-atlas-text-muted"
                  }`}
                >
                  {phase.name}
                </span>
                <p className="mt-2 text-center text-xs text-atlas-text-muted">
                  {phase.description}
                </p>
              </div>
              {i < PHASES.length - 1 && (
                <div className="mx-1 h-px w-6 bg-atlas-border" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-atlas-text">
          KPI Targets vs Actuals
        </h2>
        <div className="overflow-hidden rounded-lg border border-atlas-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-atlas-border bg-atlas-card">
                <th className="px-4 py-3 text-left font-medium text-atlas-text-muted">
                  Metric
                </th>
                <th className="px-4 py-3 text-left font-medium text-atlas-text-muted">
                  Target
                </th>
                <th className="px-4 py-3 text-left font-medium text-atlas-text-muted">
                  Actual
                </th>
                <th className="px-4 py-3 text-center font-medium text-atlas-text-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-atlas-border">
              {KPI_TARGETS.map((row) => (
                <tr key={row.metric} className="bg-atlas-bg hover:bg-atlas-card">
                  <td className="px-4 py-3 text-atlas-text">{row.metric}</td>
                  <td className="px-4 py-3 tabular-nums text-atlas-text-muted">
                    {row.target}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-atlas-text">
                    {row.actual}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                        row.met
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {row.met ? "✓" : "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-atlas-text">
          Exit Criteria
        </h2>
        <div className="space-y-2">
          {EXIT_CRITERIA.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-lg border border-atlas-border bg-atlas-card px-4 py-3"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                  item.met
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-zinc-500/20 text-zinc-400"
                }`}
              >
                {item.met ? "✓" : "○"}
              </span>
              <span
                className={`text-sm ${item.met ? "text-atlas-text" : "text-atlas-text-muted"}`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
