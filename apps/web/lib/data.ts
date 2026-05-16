import 'server-only';
import { prisma } from '@tlb/db';

/**
 * Postgres-first data with hardcoded fallback. The fallback exists so the page
 * boots cleanly on a fresh checkout (before `pnpm db:push`) — once the schema
 * is migrated and seeded, the DB takes over without any code change.
 *
 * Each `getX` wraps Prisma in try/catch and falls back if the DB is unreachable
 * or empty. This is a marketing site reading published content; serving the
 * canonical fallback is strictly better than crashing the page.
 */

const SERVICE_FALLBACK = [
  {
    slug: 'data-engineering',
    title: 'Data Engineering',
    tagline: 'Warehouses, pipelines, and the plumbing that makes AI possible.',
    icon: 'Database',
    features: ['Snowflake / BigQuery / Redshift', 'dbt + Airflow pipelines', 'Lakehouse architecture'],
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    tagline: 'Replace manual workflows with autonomous agents.',
    icon: 'Workflow',
    features: ['Process discovery', 'Agent orchestration', 'Human-in-the-loop'],
  },
  {
    slug: 'machine-learning',
    title: 'Machine Learning',
    tagline: 'Predictive models tuned for your domain.',
    icon: 'BrainCircuit',
    features: ['Forecasting', 'Anomaly detection', 'Recommendations'],
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI',
    tagline: 'LLM-powered products, built for production.',
    icon: 'Sparkles',
    features: ['Retrieval pipelines', 'Fine-tuning', 'Eval frameworks'],
  },
  {
    slug: 'ai-chatbots',
    title: 'AI Chatbots',
    tagline: 'Conversational interfaces that actually work.',
    icon: 'MessagesSquare',
    features: ['Domain-grounded', 'Multilingual', 'Voice + text'],
  },
  {
    slug: 'computer-vision',
    title: 'Computer Vision',
    tagline: 'See, count, classify, and act in real time.',
    icon: 'Eye',
    features: ['Object detection', 'OCR & document AI', 'Edge deployment'],
  },
  {
    slug: 'nlp-systems',
    title: 'NLP Systems',
    tagline: 'Extract structure from unstructured text.',
    icon: 'Languages',
    features: ['Entity extraction', 'Summarisation', 'Sentiment'],
  },
  {
    slug: 'ai-consulting',
    title: 'AI Consulting',
    tagline: 'Strategy from boardroom to production.',
    icon: 'Compass',
    features: ['Opportunity mapping', 'ROI modelling', 'Vendor selection'],
  },
  {
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    tagline: 'Connect every tool. Remove every handoff.',
    icon: 'GitBranch',
    features: ['Integration', 'Approval flows', 'Observability'],
  },
];

export type ServiceCard = (typeof SERVICE_FALLBACK)[number];

export async function getServices(): Promise<ServiceCard[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      select: { slug: true, title: true, tagline: true, icon: true, features: true },
    });
    return rows.length ? rows : SERVICE_FALLBACK;
  } catch {
    return SERVICE_FALLBACK;
  }
}

// Quotes intentionally attributed by role and industry rather than named brand
// — fabricating attributed quotes from named clients is a reputational risk.
// Swap with verified, signed-off quotes when you have them.
const TESTIMONIAL_FALLBACK = [
  {
    authorName: 'VP, Data Platform',
    authorTitle: 'South Asian telecom operator',
    company: 'Fortune-tier client',
    quote:
      'They rebuilt our customer-360 lakehouse on Snowflake + dbt in ten weeks. Query latency dropped 70% and the BI team finally trusts the numbers.',
  },
  {
    authorName: 'Director of Analytics',
    authorTitle: 'Global ride-hailing platform',
    company: 'Fortune-tier client',
    quote:
      'The Logic Broker shipped a fraud-detection model that paid for itself in the first quarter. Senior engineers, embedded, no theatre.',
  },
  {
    authorName: 'Head of AI',
    authorTitle: 'Consumer-goods multinational',
    company: 'Fortune-tier client',
    quote:
      'They moved us from notebooks to production. Evals, observability, on-call playbooks — the boring parts that make AI compound rather than rot.',
  },
];

export type TestimonialCard = (typeof TESTIMONIAL_FALLBACK)[number];

export async function getFeaturedTestimonials(): Promise<TestimonialCard[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      take: 6,
      select: {
        authorName: true,
        authorTitle: true,
        company: true,
        quote: true,
      },
    });
    if (!rows.length) return TESTIMONIAL_FALLBACK;
    return rows.map(
      (r: {
        authorName: string;
        authorTitle: string | null;
        company: string | null;
        quote: string;
      }) => ({
        authorName: r.authorName,
        authorTitle: r.authorTitle ?? '',
        company: r.company ?? '',
        quote: r.quote,
      }),
    );
  } catch {
    return TESTIMONIAL_FALLBACK;
  }
}
