const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  running: "bg-emerald-500/20 text-emerald-400",
  done: "bg-emerald-500/20 text-emerald-400",
  idle: "bg-zinc-500/20 text-zinc-400",
  todo: "bg-zinc-500/20 text-zinc-400",
  error: "bg-red-500/20 text-red-400",
  failed: "bg-red-500/20 text-red-400",
  paused: "bg-amber-500/20 text-amber-400",
  blocked: "bg-amber-500/20 text-amber-400",
  in_progress: "bg-blue-500/20 text-blue-400",
  in_review: "bg-blue-500/20 text-blue-400",
};

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase().replace(/[\s-]/g, "_");
  const colors = STATUS_COLORS[normalized] || "bg-zinc-500/20 text-zinc-400";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors}`}
    >
      {status}
    </span>
  );
}
