import { prisma, Role, PostStatus } from '../src';

async function main() {
  // Admin user (replace email after first Clerk sign-in)
  const admin = await prisma.user.upsert({
    where: { email: 'taha.dar@norstella.com' },
    update: { role: Role.ADMIN },
    create: {
      email: 'taha.dar@norstella.com',
      name: 'Taha Dar',
      role: Role.ADMIN,
    },
  });

  // Services
  const services = [
    {
      slug: 'data-engineering',
      title: 'Data Engineering',
      tagline: 'Warehouses, pipelines, and the plumbing that makes AI possible.',
      icon: 'Database',
      features: ['Snowflake / BigQuery / Redshift', 'dbt + Airflow pipelines', 'Lakehouse architecture'],
      order: 1,
    },
    {
      slug: 'ai-automation',
      title: 'AI Automation',
      tagline: 'Replace manual workflows with autonomous agents.',
      icon: 'Workflow',
      features: ['Process discovery', 'Agent orchestration', 'Human-in-the-loop'],
      order: 2,
    },
    {
      slug: 'machine-learning',
      title: 'Machine Learning Solutions',
      tagline: 'Predictive models tuned for your domain.',
      icon: 'BrainCircuit',
      features: ['Forecasting', 'Anomaly detection', 'Recommendation engines'],
      order: 3,
    },
    {
      slug: 'generative-ai',
      title: 'Generative AI',
      tagline: 'LLM-powered products built for production.',
      icon: 'Sparkles',
      features: ['Retrieval pipelines', 'Fine-tuning', 'Eval frameworks'],
      order: 4,
    },
    {
      slug: 'ai-chatbots',
      title: 'AI Chatbots',
      tagline: 'Conversational interfaces that actually work.',
      icon: 'MessagesSquare',
      features: ['Domain-grounded', 'Multilingual', 'Voice + text'],
      order: 5,
    },
    {
      slug: 'computer-vision',
      title: 'Computer Vision',
      tagline: 'See, count, classify, and act in real time.',
      icon: 'Eye',
      features: ['Object detection', 'OCR & document AI', 'Edge deployment'],
      order: 6,
    },
    {
      slug: 'nlp-systems',
      title: 'NLP Systems',
      tagline: 'Extract structure from unstructured text.',
      icon: 'Languages',
      features: ['Entity extraction', 'Summarisation', 'Sentiment'],
      order: 7,
    },
    {
      slug: 'ai-consulting',
      title: 'AI Consulting',
      tagline: 'Strategy from boardroom to production.',
      icon: 'Compass',
      features: ['Opportunity mapping', 'ROI modelling', 'Vendor selection'],
      order: 8,
    },
    {
      slug: 'workflow-automation',
      title: 'Workflow Automation',
      tagline: 'Connect every tool. Remove every handoff.',
      icon: 'GitBranch',
      features: ['Integration', 'Approval flows', 'Observability'],
      order: 9,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: { ...s, description: s.tagline },
    });
  }

  // Sample testimonials
  const testimonials = [
    {
      authorName: 'Sara Chen',
      authorTitle: 'VP Engineering',
      company: 'Northwind Logistics',
      quote:
        'The Logic Broker rebuilt our routing engine in eight weeks. Latency is down 60% and we finally trust the numbers.',
      featured: true,
    },
    {
      authorName: 'Marcus Patel',
      authorTitle: 'CTO',
      company: 'Lumen Health',
      quote:
        'They embedded with our data team and shipped a generative-AI intake assistant that our clinicians actually use.',
      featured: true,
    },
    {
      authorName: 'Aria Vasquez',
      authorTitle: 'Head of Operations',
      company: 'Vertex Manufacturing',
      quote:
        'Best-in-class delivery. The kind of partner you call when the stakes are real.',
      featured: false,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { authorName: t.authorName, company: t.company },
    });
    if (!existing) await prisma.testimonial.create({ data: t });
  }

  // One sample blog post
  await prisma.post.upsert({
    where: { slug: 'beyond-the-demo-shipping-ai-that-survives-contact-with-reality' },
    update: {},
    create: {
      slug: 'beyond-the-demo-shipping-ai-that-survives-contact-with-reality',
      title: 'Beyond the Demo: Shipping AI That Survives Contact With Reality',
      excerpt:
        'Most AI proofs-of-concept never reach production. Here is what changes when you build for the last mile.',
      body: '# Beyond the Demo\n\nProduction AI is a different sport.\n\n## The hard parts\n\n- Latency budgets\n- Evals you actually trust\n- Failure modes nobody warned you about\n',
      coverImage: null,
      readingTime: 6,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
