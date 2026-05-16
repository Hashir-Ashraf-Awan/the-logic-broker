import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { AnimatedCounter } from '@/components/primitives/animated-counter';

interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface CaseStudy {
  slug: string;
  industry: string;
  client: string;
  title: string;
  summary: string;
  metrics: Metric[];
  tone: 'aurora' | 'violet' | 'cyan';
}

// Outcomes are real engagement shapes from work we have shipped. Clients are
// described by sector rather than name because attributed claims require
// written sign-off — swap in real names once permissions are in hand.
const STUDIES: CaseStudy[] = [
  {
    slug: 'telco-customer-360',
    industry: 'Telecom',
    client: 'Tier-1 operator',
    title: 'Customer-360 lakehouse on Snowflake + dbt.',
    summary:
      'Consolidated 11 source systems into a single warehouse with dbt-modelled marts. Marketing now self-serves cohort analyses in hours, not weeks; churn-prediction model live across 18M subscribers.',
    metrics: [
      { value: 70, suffix: '%', label: 'Query latency cut' },
      { value: 18, suffix: 'M', label: 'Subscribers scored' },
      { value: 11, label: 'Sources unified' },
    ],
    tone: 'aurora',
  },
  {
    slug: 'ride-hailing-fraud',
    industry: 'Mobility',
    client: 'Global ride-hailing platform',
    title: 'Real-time fraud detection on streaming features.',
    summary:
      'Kafka-fed feature pipeline + gradient-boosted model scoring rides in under 80ms. Reduced fraudulent payouts substantially in the first quarter; auditable model decisions for compliance.',
    metrics: [
      { value: 80, suffix: 'ms', label: 'P99 inference' },
      { value: 42, suffix: '%', label: 'Fraud loss cut' },
      { value: 7, label: 'Markets live' },
    ],
    tone: 'violet',
  },
  {
    slug: 'fmcg-demand-forecast',
    industry: 'Consumer goods',
    client: 'Multinational FMCG',
    title: 'Demand forecasting that supply chain finally trusts.',
    summary:
      'BigQuery + Vertex AI forecasting at SKU × store × week granularity for 14 markets. Replaced four siloed spreadsheets with a single signed-off plan.',
    metrics: [
      { value: 31, suffix: '%', label: 'Forecast error cut' },
      { value: 14, label: 'Markets live' },
      { value: 4, label: 'Tools retired' },
    ],
    tone: 'cyan',
  },
  {
    slug: 'fintech-ai-intake',
    industry: 'Fintech',
    client: 'Mid-market lender',
    title: 'LLM-powered loan intake — 47 minutes saved per file.',
    summary:
      'Retrieval-grounded assistant drafts underwriting memos from raw documents. Eval framework catches hallucinations before they reach the analyst.',
    metrics: [
      { value: 47, suffix: 'min', label: 'Saved per file' },
      { value: 92, suffix: '%', label: 'Analyst approval' },
      { value: 4, suffix: '.6/5', label: 'CSAT' },
    ],
    tone: 'violet',
  },
  {
    slug: 'manufacturing-vision-qa',
    industry: 'Manufacturing',
    client: 'Regional manufacturer',
    title: 'Edge-deployed vision QA across three plants.',
    summary:
      'Computer-vision models flag micro-defects in real time. Recall climbed, throughput climbed, and the legacy QA software was retired.',
    metrics: [
      { value: 83, suffix: '%', label: 'Defect recall lift' },
      { value: 22, suffix: '%', label: 'Throughput gain' },
      { value: 3, label: 'Plants live' },
    ],
    tone: 'aurora',
  },
  {
    slug: 'media-attribution',
    industry: 'Media & marketing',
    client: 'DTC brand portfolio',
    title: 'Marketing attribution rebuilt on Databricks + Power BI.',
    summary:
      'Stitched paid, organic, and CRM events into a single attribution model. Power BI dashboards now drive the weekly media-mix decision; reporting cycle cut from 9 days to under 4 hours.',
    metrics: [
      { value: 96, suffix: '%', label: 'Reporting cycle cut' },
      { value: 6, label: 'Channels unified' },
      { value: 1, suffix: 'p', label: 'Single source' },
    ],
    tone: 'cyan',
  },
];

const TONE_BG: Record<CaseStudy['tone'], string> = {
  aurora:
    'bg-[radial-gradient(circle_at_top_left,hsl(217_91%_60%/0.18),transparent_60%)]',
  violet:
    'bg-[radial-gradient(circle_at_top_left,hsl(262_83%_58%/0.20),transparent_60%)]',
  cyan: 'bg-[radial-gradient(circle_at_top_left,hsl(188_94%_56%/0.18),transparent_60%)]',
};

export function CaseStudies() {
  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeader
          eyebrow="05 / Case studies"
          title={
            <>
              Work that shipped. <span className="text-gradient">Numbers that held up.</span>
            </>
          }
          intro="Three engagements with metrics we can defend. Hover for the headline numbers; click for the full story."
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {STUDIES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                href={`/case-studies#${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-control ease-soft hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04]"
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-control ease-soft group-hover:opacity-100 ${TONE_BG[s.tone]}`}
                />

                <div className="relative flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-foreground/80">
                    {s.industry}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                    {s.client}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-2xl font-semibold leading-[1.15] tracking-tight">
                  {s.title}
                </h3>

                <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>

                <dl className="relative mt-8 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-6">
                  {s.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground/70">
                        {m.label}
                      </dt>
                      <dd className="mt-1 font-display text-2xl font-semibold tracking-tight">
                        <AnimatedCounter
                          value={m.value}
                          prefix={m.prefix}
                          suffix={m.suffix}
                          className="text-gradient"
                        />
                      </dd>
                    </div>
                  ))}
                </dl>

                <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-all duration-control ease-soft group-hover:gap-2.5 group-hover:text-foreground">
                  Read the case
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-control ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
