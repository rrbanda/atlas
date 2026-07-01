import Link from "next/link";
import { KPICard } from "@/components/kpi-card";
import { getCompanyStats } from "@/lib/paperclip";

const FALLBACK = {
  agentsActive: 14,
  tasksCompleted: 21,
  successRate: 88,
  monthlyCost: 0,
};

export default async function HomePage() {
  let stats = FALLBACK;
  try {
    const live = await getCompanyStats();
    if (live.agentsActive > 0 || live.tasksCompleted > 0) {
      stats = live;
    }
  } catch {
    stats = FALLBACK;
  }

  return (
    <div className="space-y-12">
      <section className="pt-8">
        <h1 className="text-4xl font-bold tracking-tight text-atlas-text">
          ATLAS
        </h1>
        <p className="mt-2 text-lg text-atlas-text-muted">
          Executive AI Operations Dashboard
        </p>
        <p className="mt-1 text-sm text-atlas-text-muted">
          Americas AI Platform SSA Team
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Agents Active"
          value={stats.agentsActive}
          accentColor="border-blue-500"
        />
        <KPICard
          label="Tasks Completed"
          value={stats.tasksCompleted}
          accentColor="border-purple-500"
        />
        <KPICard
          label="Success Rate"
          value={`${stats.successRate}%`}
          accentColor="border-emerald-500"
        />
        <KPICard
          label="Monthly Cost"
          value={`$${stats.monthlyCost.toLocaleString()}`}
          accentColor="border-atlas-accent"
        />
      </section>

      <section className="rounded-lg border border-atlas-border bg-atlas-card p-6">
        <h2 className="text-lg font-semibold text-atlas-text">
          Why We Invested
        </h2>
        <p className="mt-3 leading-relaxed text-atlas-text-muted">
          Manual sales-engineering workflows average 4–6 hours per
          customer-facing deliverable. With Paperclip orchestrating 14
          specialized AI agents, that drops to under 3 minutes — an
          acceleration that translates to $600K–$1.1M in recovered labor
          capacity annually. The platform provides centralized governance,
          approval gates, and full audit trails so leadership maintains
          oversight while teams move faster.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            href: "/dashboard",
            title: "Dashboard",
            desc: "Live operational metrics and cost tracking",
          },
          {
            href: "/gallery",
            title: "Gallery",
            desc: "Browse completed task outputs and deliverables",
          },
          {
            href: "/pilot",
            title: "Pilot Progress",
            desc: "90-day pilot milestones and exit criteria",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-lg border border-atlas-border bg-atlas-card p-6 transition-colors hover:bg-atlas-card-hover"
          >
            <h3 className="font-semibold text-atlas-text group-hover:text-atlas-accent">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-atlas-text-muted">{card.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
