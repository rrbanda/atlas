"use client";

import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/status-badge";

interface GalleryTask {
  id: string;
  identifier?: string;
  title: string;
  status: string;
  agentName?: string;
  completedAt?: string;
  description?: string;
}

export default function GalleryPage() {
  const [tasks, setTasks] = useState<GalleryTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [agentFilter, setAgentFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => (res.ok ? res.json() : { tasks: [] }))
      .then((data) => {
        const all: GalleryTask[] = data.tasks || data.data || [];
        setTasks(all.filter((t) => t.status === "done"));
      })
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, []);

  const agentNames = [...new Set(tasks.map((t) => t.agentName).filter(Boolean))];
  const filtered =
    agentFilter === "all"
      ? tasks
      : tasks.filter((t) => t.agentName === agentFilter);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-atlas-text">Output Gallery</h1>
        <p className="mt-1 text-sm text-atlas-text-muted">
          Completed task outputs and deliverables
        </p>
      </section>

      {agentNames.length > 0 && (
        <div>
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="rounded-md border border-atlas-border bg-atlas-card px-3 py-2 text-sm text-atlas-text outline-none"
          >
            <option value="all">All Agents</option>
            {agentNames.map((name) => (
              <option key={name} value={name!}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading && (
        <p className="text-sm text-atlas-text-muted">Loading outputs…</p>
      )}

      {!loading && filtered.length === 0 && (
        <div className="rounded-lg border border-atlas-border bg-atlas-card p-10 text-center">
          <p className="text-atlas-text-muted">
            Assign tasks to agents in Paperclip to see outputs here.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((task) => (
          <button
            key={task.id}
            onClick={() =>
              setExpandedId(expandedId === task.id ? null : task.id)
            }
            className="rounded-lg border border-atlas-border bg-atlas-card p-5 text-left transition-colors hover:bg-atlas-card-hover"
          >
            <div className="flex items-start justify-between gap-2">
              {task.identifier && (
                <span className="font-mono text-xs text-atlas-text-muted">
                  {task.identifier}
                </span>
              )}
              <StatusBadge status={task.status} />
            </div>
            <h3 className="mt-2 font-semibold text-atlas-text">{task.title}</h3>
            {task.agentName && (
              <p className="mt-1 text-xs text-atlas-text-muted">
                {task.agentName}
              </p>
            )}
            {task.completedAt && (
              <p className="mt-1 text-xs text-atlas-text-muted">
                {new Date(task.completedAt).toLocaleDateString()}
              </p>
            )}
            {expandedId === task.id && task.description && (
              <p className="mt-3 border-t border-atlas-border pt-3 text-sm leading-relaxed text-atlas-text-muted">
                {task.description}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
