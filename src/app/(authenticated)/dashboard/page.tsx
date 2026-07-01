import { KPICard } from "@/components/kpi-card";
import { StatusBadge } from "@/components/status-badge";
import { getAgents, getTasks, type Agent, type Task } from "@/lib/paperclip";

export const metadata = { title: "Value Dashboard | ATLAS" };

async function fetchDashboardData() {
  try {
    const [agents, tasks] = await Promise.all([getAgents(), getTasks()]);
    return { agents, tasks, error: false };
  } catch {
    return { agents: [] as Agent[], tasks: [] as Task[], error: true };
  }
}

export default async function DashboardPage() {
  const { agents, tasks, error } = await fetchDashboardData();

  const completedTasks = tasks.filter((t) => t.status === "done");
  const totalTasks = tasks.length;
  const successRate =
    totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;
  const totalCostCents = tasks.reduce((s, t) => s + (t.costCents || 0), 0);
  const avgCost =
    completedTasks.length > 0
      ? (totalCostCents / 100 / completedTasks.length).toFixed(2)
      : "0.00";

  const timeSavedHours = completedTasks.length * 4;

  const recentCompleted = completedTasks
    .sort(
      (a, b) =>
        new Date(b.completedAt || b.createdAt || 0).getTime() -
        new Date(a.completedAt || a.createdAt || 0).getTime()
    )
    .slice(0, 10);

  const budgetTotal = 500;
  const budgetUsed = totalCostCents / 100;
  const budgetPct = Math.min(
    100,
    budgetTotal > 0 ? Math.round((budgetUsed / budgetTotal) * 100) : 0
  );

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-atlas-text">Value Dashboard</h1>
        <p className="mt-1 text-sm text-atlas-text-muted">
          Live operational metrics from Paperclip
        </p>
        {error && (
          <p className="mt-2 text-xs text-amber-400">
            Could not reach Paperclip API — showing cached or empty data.
          </p>
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Tasks This Month"
          value={totalTasks}
          accentColor="border-blue-500"
        />
        <KPICard
          label="Success Rate"
          value={`${successRate}%`}
          accentColor="border-emerald-500"
        />
        <KPICard
          label="Avg Cost / Task"
          value={`$${avgCost}`}
          accentColor="border-purple-500"
        />
        <KPICard
          label="Time Saved Estimate"
          value={`${timeSavedHours}h`}
          subtitle="Based on 4h manual avg"
          accentColor="border-amber-500"
        />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-atlas-text">
          Agent Utilization
        </h2>
        <div className="overflow-hidden rounded-lg border border-atlas-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-atlas-border bg-atlas-card">
                <th className="px-4 py-3 text-left font-medium text-atlas-text-muted">
                  Agent
                </th>
                <th className="px-4 py-3 text-left font-medium text-atlas-text-muted">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-atlas-text-muted">
                  Tasks Completed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-atlas-border">
              {agents.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-atlas-text-muted"
                  >
                    No agents found.
                  </td>
                </tr>
              )}
              {agents.map((agent) => {
                const agentTasks = completedTasks.filter(
                  (t) => t.agentId === agent.id || t.agentName === agent.name
                ).length;
                return (
                  <tr key={agent.id} className="bg-atlas-bg hover:bg-atlas-card">
                    <td className="px-4 py-3 font-medium text-atlas-text">
                      {agent.name}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={agent.status} />
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-atlas-text">
                      {agent.tasksCompleted ?? agentTasks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-atlas-text">
          Recent Completed Tasks
        </h2>
        <div className="space-y-2">
          {recentCompleted.length === 0 && (
            <p className="text-sm text-atlas-text-muted">
              No completed tasks yet.
            </p>
          )}
          {recentCompleted.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border border-atlas-border bg-atlas-card px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {task.identifier && (
                    <span className="shrink-0 font-mono text-xs text-atlas-text-muted">
                      {task.identifier}
                    </span>
                  )}
                  <span className="truncate text-sm font-medium text-atlas-text">
                    {task.title}
                  </span>
                </div>
                {task.agentName && (
                  <p className="mt-0.5 text-xs text-atlas-text-muted">
                    {task.agentName}
                  </p>
                )}
              </div>
              <span className="ml-4 shrink-0 text-xs text-atlas-text-muted">
                {task.completedAt
                  ? new Date(task.completedAt).toLocaleDateString()
                  : "—"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-atlas-text">Cost</h2>
        <div className="rounded-lg border border-atlas-border bg-atlas-card p-6">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-atlas-text-muted">
              Total Spend This Month
            </p>
            <p className="text-2xl font-semibold tabular-nums text-atlas-text">
              ${budgetUsed.toFixed(2)}
            </p>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-atlas-text-muted">
              <span>Budget Utilization</span>
              <span>{budgetPct}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full rounded-full bg-atlas-border">
              <div
                className="h-2 rounded-full bg-atlas-accent transition-all"
                style={{ width: `${budgetPct}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
