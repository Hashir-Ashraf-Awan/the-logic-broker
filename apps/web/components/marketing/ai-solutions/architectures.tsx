import { Reveal } from '@/components/primitives/reveal';
import { SectionHeader } from '@/components/primitives/section-header';
import {
  RagDiagram,
  AgenticDiagram,
  EvalDiagram,
  RealtimeDiagram,
} from './diagrams';

const PATTERNS = [
  {
    slug: 'rag',
    eyebrow: '01 / RAG',
    title: 'Retrieval-augmented generation',
    body: 'Grounded answers over proprietary corpora. Hybrid retrieval, citations, and a faithfulness eval that runs on every model swap.',
    bullets: [
      'Hybrid vector + lexical retrieval with reranking',
      'Guardrails for prompt injection and policy',
      'Audit-ready citations with span-level provenance',
      'Faithfulness eval running on every PR',
    ],
    Diagram: RagDiagram,
  },
  {
    slug: 'agentic',
    eyebrow: '02 / Agentic',
    title: 'Multi-step agentic workflows',
    body: 'Planner-led agents that decompose a goal, call tools, and surface a critic + replay timeline for every decision they made.',
    bullets: [
      'LangGraph or OpenAI Agents under Temporal',
      'Critic verifier + automatic replay tooling',
      'Human-in-the-loop gates for high-impact steps',
      'Cost and latency budgeting per workflow',
    ],
    Diagram: AgenticDiagram,
  },
  {
    slug: 'evals',
    eyebrow: '03 / Eval loop',
    title: 'Continuous evaluation',
    body: 'A model without graded benchmarks is a liability. Every prompt, model, or data change runs through judges, programmatic checks, and human SMEs.',
    bullets: [
      'LLM-judge + programmatic + SME triangulation',
      'PR-gated regression suite (ship / block)',
      'Eval drift dashboard alongside model drift',
      'Run logs persisted to Postgres for forensic review',
    ],
    Diagram: EvalDiagram,
  },
  {
    slug: 'realtime',
    eyebrow: '04 / Real-time',
    title: 'Real-time inference',
    body: 'Streaming events, online features, shadow models, and a decisioning surface that fuses rules with model output. P99 below 200ms.',
    bullets: [
      'Kafka or Pulsar event ingest',
      'Online feature store with L1 cache',
      'Shadow models for safe rollout',
      'Full observability via OpenTelemetry',
    ],
    Diagram: RealtimeDiagram,
  },
];

export function Architectures() {
  return (
    <>
      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Reference architectures"
            title={
              <>
                Four patterns that cover{' '}
                <span className="text-gradient">most production AI</span>.
              </>
            }
            intro="These are the systems we build, refined across dozens of engagements. Each diagram is a starting point — we adapt the components to your stack, constraints, and risk profile."
            align="center"
            className="text-center"
          />
        </div>
      </section>

      {PATTERNS.map((pattern, i) => {
        const { Diagram } = pattern;
        const flip = i % 2 === 1;
        return (
          <section
            key={pattern.slug}
            id={pattern.slug}
            className={`section scroll-mt-32 ${flip ? 'bg-background-2/30' : ''}`}
          >
            <div className="container-wide">
              <Reveal>
                <div
                  className={`grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center ${
                    flip ? 'lg:[&>div:first-child]:order-2' : ''
                  }`}
                >
                  <div className="lg:col-span-5">
                    <p className="eyebrow mb-4">{pattern.eyebrow}</p>
                    <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                      {pattern.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                      {pattern.body}
                    </p>

                    <ul className="mt-8 space-y-2.5">
                      {pattern.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80"
                        >
                          <span
                            aria-hidden
                            className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-6">
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -top-px h-px bg-aurora opacity-50"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-aurora opacity-10 blur-3xl"
                      />
                      <Diagram />
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
