"use server";

import type {
  Agent,
  Issue,
  IssueComment,
  DashboardSummary,
  CostSummary,
  ActivityEvent,
  HeartbeatRun,
} from "../types/paperclip";

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RETRIES = 1;
const TRANSIENT_STATUS_CODES = new Set([502, 503, 504, 408, 429]);

function getApiUrl(): string {
  const url = process.env.PAPERCLIP_API_URL;
  if (!url) throw new Error("PAPERCLIP_API_URL is not set");
  return url.replace(/\/+$/, "");
}

function getApiKey(): string {
  const key = process.env.PAPERCLIP_API_KEY;
  if (!key) throw new Error("PAPERCLIP_API_KEY is not set");
  return key;
}

export class PaperclipApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`Paperclip API ${status} ${statusText}: ${body}`);
    this.name = "PaperclipApiError";
  }

  get isTransient(): boolean {
    return TRANSIENT_STATUS_CODES.has(this.status);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getApiUrl()}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${getApiKey()}`,
    Accept: "application/json",
    ...((init?.headers as Record<string, string>) ?? {}),
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        const err = new PaperclipApiError(res.status, res.statusText, body);
        if (err.isTransient && attempt < MAX_RETRIES) {
          lastError = err;
          await sleep(1000 * (attempt + 1));
          continue;
        }
        throw err;
      }

      return (await res.json()) as T;
    } catch (err) {
      if (err instanceof PaperclipApiError) throw err;

      const isAbort =
        err instanceof DOMException && err.name === "AbortError";
      const wrapped = isAbort
        ? new Error(`Paperclip API request timed out after ${REQUEST_TIMEOUT_MS}ms: ${path}`)
        : (err as Error);

      if (attempt < MAX_RETRIES) {
        lastError = wrapped;
        await sleep(1000 * (attempt + 1));
        continue;
      }
      throw wrapped;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError ?? new Error("Unexpected retry exhaustion");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getHealth(): Promise<{ status: string }> {
  return request<{ status: string }>("/api/health");
}

export async function getDashboard(
  companyId: string,
): Promise<DashboardSummary> {
  return request<DashboardSummary>(
    `/api/companies/${encodeURIComponent(companyId)}/dashboard`,
  );
}

export async function getAgents(companyId: string): Promise<Agent[]> {
  return request<Agent[]>(
    `/api/companies/${encodeURIComponent(companyId)}/agents`,
  );
}

export async function getIssues(
  companyId: string,
  params?: { status?: string; assigneeAgentId?: string; limit?: number },
): Promise<Issue[]> {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.assigneeAgentId)
    query.set("assigneeAgentId", params.assigneeAgentId);
  if (params?.limit) query.set("limit", String(params.limit));

  const qs = query.toString();
  return request<Issue[]>(
    `/api/companies/${encodeURIComponent(companyId)}/issues${qs ? `?${qs}` : ""}`,
  );
}

export async function getIssueComments(
  issueId: string,
): Promise<IssueComment[]> {
  return request<IssueComment[]>(
    `/api/issues/${encodeURIComponent(issueId)}/comments`,
  );
}

export async function getCostSummary(
  companyId: string,
): Promise<CostSummary> {
  return request<CostSummary>(
    `/api/companies/${encodeURIComponent(companyId)}/costs`,
  );
}

export async function getActivity(
  companyId: string,
  limit = 50,
): Promise<ActivityEvent[]> {
  return request<ActivityEvent[]>(
    `/api/companies/${encodeURIComponent(companyId)}/activity?limit=${limit}`,
  );
}

export async function getAgentRuns(
  agentId: string,
  limit = 20,
): Promise<HeartbeatRun[]> {
  return request<HeartbeatRun[]>(
    `/api/agents/${encodeURIComponent(agentId)}/runs?limit=${limit}`,
  );
}
