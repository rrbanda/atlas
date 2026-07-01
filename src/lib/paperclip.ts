const API_BASE = process.env.PAPERCLIP_API_URL || "http://localhost:3100/api";
const API_KEY = process.env.PAPERCLIP_API_KEY || "";

async function apiFetch<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Paperclip API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export interface Agent {
  id: string;
  name: string;
  title?: string;
  role?: string;
  status: string;
  capabilities?: string;
  team?: string;
  tasksCompleted?: number;
}

export interface Task {
  id: string;
  identifier?: string;
  title: string;
  status: string;
  agentName?: string;
  agentId?: string;
  completedAt?: string;
  createdAt?: string;
  description?: string;
  costCents?: number;
}

export interface CompanyStats {
  agentsActive: number;
  tasksCompleted: number;
  successRate: number;
  monthlyCost: number;
}

export async function getAgents(): Promise<Agent[]> {
  const data = await apiFetch<{ agents?: Agent[]; data?: Agent[] }>("/agents");
  return data.agents || data.data || [];
}

export async function getTasks(): Promise<Task[]> {
  const data = await apiFetch<{ issues?: Task[]; data?: Task[] }>("/issues");
  return data.issues || data.data || [];
}

export async function getCompanyStats(): Promise<CompanyStats> {
  try {
    const [agents, tasks] = await Promise.all([getAgents(), getTasks()]);

    const activeAgents = agents.filter(
      (a) => a.status === "active" || a.status === "idle"
    ).length;
    const completedTasks = tasks.filter((t) => t.status === "done").length;
    const totalTasks = tasks.length;
    const successRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const monthlyCost = tasks.reduce((sum, t) => sum + (t.costCents || 0), 0) / 100;

    return {
      agentsActive: activeAgents || agents.length,
      tasksCompleted: completedTasks,
      successRate,
      monthlyCost,
    };
  } catch {
    return { agentsActive: 0, tasksCompleted: 0, successRate: 0, monthlyCost: 0 };
  }
}
