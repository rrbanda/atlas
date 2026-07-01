"use client";

import { useState } from "react";
import { StatusBadge } from "./status-badge";

interface AgentCardProps {
  name: string;
  title?: string;
  role?: string;
  status: string;
  capabilities?: string;
}

const ROLE_COLORS: Record<string, string> = {
  sales: "bg-blue-500/20 text-blue-400",
  technical: "bg-purple-500/20 text-purple-400",
  support: "bg-teal-500/20 text-teal-400",
  lead: "bg-amber-500/20 text-amber-400",
  engineer: "bg-indigo-500/20 text-indigo-400",
};

const STATUS_DOTS: Record<string, string> = {
  active: "bg-emerald-400",
  idle: "bg-zinc-500",
  error: "bg-red-400",
  paused: "bg-amber-400",
};

export function AgentCard({
  name,
  title,
  role,
  status,
  capabilities,
}: AgentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const normalizedStatus = status.toLowerCase().replace(/[\s-]/g, "_");
  const dotColor = STATUS_DOTS[normalizedStatus] || "bg-zinc-500";
  const roleColor =
    ROLE_COLORS[role?.toLowerCase() || ""] || "bg-zinc-500/20 text-zinc-400";

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full rounded-lg border border-atlas-border bg-atlas-card p-5 text-left transition-colors hover:bg-atlas-card-hover"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${dotColor}`} />
            <h3 className="truncate font-semibold text-atlas-text">{name}</h3>
          </div>
          {title && (
            <p className="mt-1 text-sm text-atlas-text-muted">{title}</p>
          )}
        </div>
        <div className="ml-3 flex flex-shrink-0 items-center gap-2">
          {role && (
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColor}`}
            >
              {role}
            </span>
          )}
          <StatusBadge status={status} />
        </div>
      </div>
      {capabilities && (
        <p
          className={`mt-3 text-sm text-atlas-text-muted ${expanded ? "" : "line-clamp-2"}`}
        >
          {capabilities}
        </p>
      )}
    </button>
  );
}
