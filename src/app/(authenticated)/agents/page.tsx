import { AgentCard } from "@/components/agent-card";
import { getAgents, type Agent } from "@/lib/paperclip";

export const metadata = { title: "Agents | ATLAS" };

const SALES_AGENTS: Agent[] = [
  {
    id: "sales-1",
    name: "Deal Strategist",
    title: "Sales Strategy Lead",
    role: "Sales",
    status: "active",
    capabilities:
      "Analyzes deal pipeline, generates win strategies, prepares competitive positioning documents, and identifies upsell opportunities.",
  },
  {
    id: "sales-2",
    name: "Proposal Writer",
    title: "Proposal Automation",
    role: "Sales",
    status: "active",
    capabilities:
      "Drafts customer-facing proposals, SOWs, and executive summaries tailored to prospect requirements and RFP responses.",
  },
  {
    id: "sales-3",
    name: "Demo Builder",
    title: "Demo Preparation",
    role: "Sales",
    status: "idle",
    capabilities:
      "Creates demo environments, talking points, and customized showcase materials for customer presentations.",
  },
  {
    id: "sales-4",
    name: "Competitive Analyst",
    title: "Market Intelligence",
    role: "Sales",
    status: "active",
    capabilities:
      "Monitors competitive landscape, produces battlecards, and provides real-time intelligence on competitor pricing and positioning.",
  },
  {
    id: "sales-5",
    name: "Account Researcher",
    title: "Account Intelligence",
    role: "Sales",
    status: "active",
    capabilities:
      "Deep-dives into target accounts, identifies stakeholders, maps organizational structure, and surfaces recent news and triggers.",
  },
  {
    id: "sales-6",
    name: "ROI Modeler",
    title: "Value Engineering",
    role: "Sales",
    status: "idle",
    capabilities:
      "Builds customer-specific ROI models, TCO comparisons, and business case documents with quantified value propositions.",
  },
  {
    id: "sales-7",
    name: "Follow-up Coordinator",
    title: "Post-Meeting Actions",
    role: "Sales",
    status: "active",
    capabilities:
      "Generates meeting summaries, action items, follow-up emails, and tracks commitments across the sales cycle.",
  },
];

const TECH_AGENTS: Agent[] = [
  {
    id: "tech-1",
    name: "Architecture Reviewer",
    title: "Solution Architecture",
    role: "Technical",
    status: "active",
    capabilities:
      "Reviews customer architecture diagrams, identifies integration points, and produces technical feasibility assessments.",
  },
  {
    id: "tech-2",
    name: "Benchmark Runner",
    title: "Performance Testing",
    role: "Technical",
    status: "active",
    capabilities:
      "Executes standardized benchmarks, generates performance comparison reports, and validates scalability claims.",
  },
  {
    id: "tech-3",
    name: "Doc Generator",
    title: "Technical Documentation",
    role: "Technical",
    status: "active",
    capabilities:
      "Creates API documentation, integration guides, runbooks, and technical reference materials for customer engagements.",
  },
  {
    id: "tech-4",
    name: "Security Auditor",
    title: "Security & Compliance",
    role: "Technical",
    status: "idle",
    capabilities:
      "Conducts security questionnaire responses, compliance mapping, and generates audit-ready documentation for enterprise deals.",
  },
  {
    id: "tech-5",
    name: "POC Builder",
    title: "Proof of Concept",
    role: "Technical",
    status: "active",
    capabilities:
      "Scaffolds proof-of-concept environments, sample integrations, and demo workflows for technical evaluations.",
  },
  {
    id: "tech-6",
    name: "Migration Planner",
    title: "Migration Strategy",
    role: "Technical",
    status: "idle",
    capabilities:
      "Assesses existing infrastructure, plans migration paths, estimates effort, and produces phased migration documents.",
  },
  {
    id: "tech-7",
    name: "Training Content Creator",
    title: "Enablement",
    role: "Technical",
    status: "active",
    capabilities:
      "Develops training materials, workshop agendas, hands-on labs, and certification prep content for customer teams.",
  },
];

export default async function AgentsPage() {
  let liveAgents: Agent[] = [];
  try {
    liveAgents = await getAgents();
  } catch {
    // fall through to static
  }

  const salesTeam =
    liveAgents.length > 0
      ? liveAgents.filter(
          (a) =>
            a.team?.toLowerCase().includes("sales") ||
            a.role?.toLowerCase().includes("sales")
        )
      : SALES_AGENTS;

  const techTeam =
    liveAgents.length > 0
      ? liveAgents.filter(
          (a) =>
            a.team?.toLowerCase().includes("tech") ||
            a.role?.toLowerCase().includes("tech")
        )
      : TECH_AGENTS;

  const showStaticFallback = liveAgents.length === 0;

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-atlas-text">Agents Overview</h1>
        <p className="mt-1 text-sm text-atlas-text-muted">
          {showStaticFallback
            ? "Showing planned agent roster"
            : `${liveAgents.length} agents connected`}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-atlas-text">
          Sales Support Team
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(showStaticFallback ? SALES_AGENTS : salesTeam).map((agent) => (
            <AgentCard
              key={agent.id}
              name={agent.name}
              title={agent.title}
              role={agent.role}
              status={agent.status}
              capabilities={agent.capabilities}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-atlas-text">
          RHOAI Technical Team
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(showStaticFallback ? TECH_AGENTS : techTeam).map((agent) => (
            <AgentCard
              key={agent.id}
              name={agent.name}
              title={agent.title}
              role={agent.role}
              status={agent.status}
              capabilities={agent.capabilities}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
