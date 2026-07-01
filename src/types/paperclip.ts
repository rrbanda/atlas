export interface Agent {
  id: string;
  name: string;
  role: string;
  title: string | null;
  icon: string | null;
  status: string;
  capabilities: string | null;
  reportsTo: string | null;
  budgetMonthlyCents: number;
  spentMonthlyCents: number;
  lastHeartbeatAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Issue {
  id: string;
  identifier: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assigneeAgentId: string | null;
  parentId: string | null;
  workMode: string;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IssueComment {
  id: string;
  issueId: string;
  body: string;
  authorAgentId: string | null;
  authorUserId: string | null;
  createdAt: string;
}

export interface DashboardSummary {
  agents: {
    active: number;
    paused: number;
    idle: number;
    error: number;
    total: number;
  };
  issues: {
    backlog: number;
    todo: number;
    inProgress: number;
    inReview: number;
    done: number;
    blocked: number;
    cancelled: number;
    total: number;
  };
  monthToDate: {
    spentCents: number;
    budgetCents: number;
  };
  pendingApprovals: number;
  runActivity?: Array<{ date: string; succeeded: number; failed: number }>;
}

export interface CostSummary {
  totalCents: number;
  byAgent: Array<{
    agentId: string;
    agentName: string;
    totalCents: number;
  }>;
  byProvider?: Array<{
    provider: string;
    totalCents: number;
  }>;
}

export interface HeartbeatRun {
  id: string;
  agentId: string;
  status: string;
  startedAt: string | null;
  finishedAt: string | null;
  error: string | null;
  createdAt: string;
}

export interface ActivityEvent {
  id: string;
  actorType: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  details: Record<string, unknown> | null;
  createdAt: string;
}

export interface KPIData {
  agentsActive: number;
  agentsTotal: number;
  tasksCompletedThisMonth: number;
  tasksCompletedTotal: number;
  successRate: number;
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  costThisMonthCents: number;
  budgetCents: number;
  avgCompletionMinutes: number;
  costPerTaskCents: number;
}
