import { Reveal } from '@/components/primitives/reveal';
import { Icon } from '@/components/primitives/icon';
import { getServices } from '@/lib/data';

type ServiceDetail = {
  deliverables: string[];
  timeline: string;
  ideal: string;
  outcome: { metric: string; detail: string };
};

const DETAILS: Record<string, ServiceDetail> = {
  'data-engineering': {
    deliverables: [
      'Reference architecture for warehouse and lakehouse',
      'Production dbt project with CI checks',
      'Orchestration on Airflow or Dagster',
      'Lineage, freshness, and quality dashboards',
    ],
    timeline: '8–16 weeks',
    ideal: 'You have data in twelve places, ten owners, and one increasingly anxious CFO.',
    outcome: {
      metric: '70% lower BI latency',
      detail: 'Rebuilt customer-360 on Snowflake + dbt for a South Asian telecom; query times dropped from minutes to seconds.',
    },
  },
  'ai-automation': {
    deliverables: [
      'Process discovery report with ROI ranking',
      'Agent orchestration on LangGraph or OpenAI Agents',
      'Human-in-the-loop review surface',
      'Observability and replay tooling',
    ],
    timeline: '10–14 weeks',
    ideal: 'Teams drowning in repeatable knowledge work — claims triage, contract review, ticket routing.',
    outcome: {
      metric: '5.4× throughput',
      detail: 'Autonomous claims triage agent for an insurer cleared 5.4× more cases per analyst without quality loss.',
    },
  },
  'machine-learning': {
    deliverables: [
      'Baseline + champion models with documented evals',
      'Feature store and feedback loops',
      'Drift monitoring and retraining cadence',
      'Production handover with runbook',
    ],
    timeline: '12–20 weeks',
    ideal: 'You have signal in your data but no production model — or one that has quietly rotted.',
    outcome: {
      metric: '$11M annualised lift',
      detail: 'Fraud detection model paid back its build cost in the first quarter at a ride-hailing platform.',
    },
  },
  'generative-ai': {
    deliverables: [
      'Retrieval pipeline (vector + lexical hybrid)',
      'Fine-tuned or prompted models with eval suite',
      'Guardrails, citations, and audit log',
      'Cost and latency budgeting',
    ],
    timeline: '10–16 weeks',
    ideal: 'Domain-rich documents, regulated outputs, and a board sceptical of "AI hallucinations".',
    outcome: {
      metric: '92% answer faithfulness',
      detail: 'Domain-grounded retrieval system for a consumer-goods multinational, measured against expert-graded benchmarks.',
    },
  },
  'ai-chatbots': {
    deliverables: [
      'Conversation design + intent taxonomy',
      'Multimodal channel integrations (web, WhatsApp, voice)',
      'Escalation rules with human handover',
      'Quality eval pipeline with rolling benchmarks',
    ],
    timeline: '6–12 weeks',
    ideal: 'High-volume support, multilingual customers, and a CX team that wants leverage rather than replacement.',
    outcome: {
      metric: '38% deflection',
      detail: 'Conversational support assistant for a telecom resolved 38% of tier-1 contacts before human handover.',
    },
  },
  'computer-vision': {
    deliverables: [
      'Annotated dataset and labelling SOP',
      'Detection / OCR / segmentation models',
      'Edge or cloud deployment with monitoring',
      'Continuous improvement loop',
    ],
    timeline: '10–16 weeks',
    ideal: 'Physical-world processes where humans are counting, checking, or classifying at scale.',
    outcome: {
      metric: '99.4% defect catch rate',
      detail: 'Edge vision system on a packaging line outperformed the previous manual inspection by 11 points.',
    },
  },
  'nlp-systems': {
    deliverables: [
      'Entity, relation, and sentiment extractors',
      'Domain-adapted summarisation pipeline',
      'Document classification with confidence scoring',
      'Audit-ready evidence storage',
    ],
    timeline: '8–14 weeks',
    ideal: 'Mountains of unstructured text — contracts, claims, research, regulatory filings — that nobody can read fast enough.',
    outcome: {
      metric: '14 hrs → 9 minutes',
      detail: 'Contract review pipeline for a global legal team turned a 14-hour manual workflow into a 9-minute review.',
    },
  },
  'ai-consulting': {
    deliverables: [
      'AI opportunity map across the business',
      'Build-vs-buy decision framework',
      'ROI model and prioritised roadmap',
      'Hiring and operating model recommendations',
    ],
    timeline: '4–8 weeks',
    ideal: 'A board mandate to "do something with AI" and no honest answer to how.',
    outcome: {
      metric: '£18M roadmap',
      detail: 'Strategic AI roadmap for a FTSE-listed retailer prioritised the seven initiatives now in production.',
    },
  },
  'workflow-automation': {
    deliverables: [
      'Integration audit and connector map',
      'Workflow engine deployment (Temporal, n8n, or custom)',
      'Approval and exception flows',
      'Observability across the chain',
    ],
    timeline: '8–14 weeks',
    ideal: 'Manual handoffs between teams that everyone agrees are wasteful but nobody owns end-to-end.',
    outcome: {
      metric: '4.2× cycle time',
      detail: 'Quote-to-cash workflow rebuild for a B2B SaaS dropped average cycle time from 19 days to 4.5.',
    },
  },
};

export async function DeepDives() {
  const services = await getServices();

  return (
    <>
      {services.map((service, i) => {
        const detail = DETAILS[service.slug];
        if (!detail) return null;
        const flip = i % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`section scroll-mt-32 ${i % 2 === 1 ? 'bg-background-2/30' : ''}`}
          >
            <div className="container-wide">
              <Reveal>
                <div
                  className={`grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 ${
                    flip ? 'lg:[&>div:first-child]:order-2' : ''
                  }`}
                >
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-aurora/15 ring-1 ring-border">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                        {String(i + 1).padStart(2, '0')} / {service.slug.replace(/-/g, ' ')}
                      </span>
                    </div>
                    <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                      {service.tagline}
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                          Typical engagement
                        </p>
                        <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
                          {detail.timeline}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                          Ideal when
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                          {detail.ideal}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                        Deliverables
                      </p>
                      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {detail.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80"
                          >
                            <span
                              aria-hidden
                              className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative overflow-hidden rounded-3xl surface p-8">
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -top-px h-px bg-aurora opacity-50"
                      />
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                        Illustrative outcome
                      </p>
                      <p className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight text-gradient md:text-5xl">
                        {detail.outcome.metric}
                      </p>
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        {detail.outcome.detail}
                      </p>

                      <div className="mt-6 border-t border-border pt-5">
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                          Capability stack
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {service.features.map((f) => (
                            <li
                              key={f}
                              className="rounded-full surface px-3 py-1 text-xs text-foreground/70"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}
