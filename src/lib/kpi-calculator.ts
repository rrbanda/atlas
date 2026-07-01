import type {
  DashboardSummary,
  Agent,
  Issue,
  CostSummary,
  HeartbeatRun,
  KPIData,
} from "../types/paperclip";

export function calculateKPIs(
  dashboard: DashboardSummary,
  agents: Agent[],
  issues: Issue[],
  costs: CostSummary,
): KPIData {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const completedThisMonth = issues.filter(
    (i) =>
      i.status === "done" &&
      i.completedAt &&
      new Date(i.completedAt) >= monthStart,
  );

  const completedTotal = issues.filter((i) => i.status === "done");

  const completionTimesMinutes = completedTotal
    .filter((i) => i.startedAt && i.completedAt)
    .map((i) => {
      const start = new Date(i.startedAt!).getTime();
      const end = new Date(i.completedAt!).getTime();
      return (end - start) / 60_000;
    });

  const avgCompletionMinutes =
    completionTimesMinutes.length > 0
      ? completionTimesMinutes.reduce((a, b) => a + b, 0) /
        completionTimesMinutes.length
      : 0;

  const runActivity = dashboard.runActivity ?? [];
  const totalRuns = runActivity.reduce(
    (sum, r) => sum + r.succeeded + r.failed,
    0,
  );
  const successfulRuns = runActivity.reduce((sum, r) => sum + r.succeeded, 0);
  const failedRuns = runActivity.reduce((sum, r) => sum + r.failed, 0);
  const successRate = totalRuns > 0 ? successfulRuns / totalRuns : 0;

  const costPerTaskCents =
    completedTotal.length > 0
      ? Math.round(costs.totalCents / completedTotal.length)
      : 0;

  return {
    agentsActive: dashboard.agents.active,
    agentsTotal: agents.length,
    tasksCompletedThisMonth: completedThisMonth.length,
    tasksCompletedTotal: completedTotal.length,
    successRate,
    totalRuns,
    successfulRuns,
    failedRuns,
    costThisMonthCents: dashboard.monthToDate.spentCents,
    budgetCents: dashboard.monthToDate.budgetCents,
    avgCompletionMinutes: Math.round(avgCompletionMinutes),
    costPerTaskCents,
  };
}

export function estimateTimeSavedHours(
  tasksCompleted: number,
  avgManualHours: number,
): number {
  return tasksCompleted * avgManualHours;
}

export function calculateROI(
  timeSavedHours: number,
  hourlyRate: number,
  llmCostCents: number,
): {
  savedDollars: number;
  costDollars: number;
  netDollars: number;
  roiPercent: number;
} {
  const savedDollars = timeSavedHours * hourlyRate;
  const costDollars = llmCostCents / 100;
  const netDollars = savedDollars - costDollars;
  const roiPercent = costDollars > 0 ? (netDollars / costDollars) * 100 : 0;

  return {
    savedDollars: Math.round(savedDollars * 100) / 100,
    costDollars: Math.round(costDollars * 100) / 100,
    netDollars: Math.round(netDollars * 100) / 100,
    roiPercent: Math.round(roiPercent * 10) / 10,
  };
}

export function getSuccessRate(runs: HeartbeatRun[]): number {
  if (runs.length === 0) return 0;
  const succeeded = runs.filter((r) => r.status === "succeeded").length;
  return succeeded / runs.length;
}
