interface KPICardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  accentColor?: string;
}

export function KPICard({
  label,
  value,
  subtitle,
  accentColor = "border-atlas-accent",
}: KPICardProps) {
  return (
    <div
      className={`rounded-lg border-t-2 ${accentColor} bg-atlas-card p-6`}
    >
      <p className="text-3xl font-semibold tracking-tight text-atlas-text">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-atlas-text-muted">{label}</p>
      {subtitle && (
        <p className="mt-2 text-xs text-atlas-text-muted">{subtitle}</p>
      )}
    </div>
  );
}
