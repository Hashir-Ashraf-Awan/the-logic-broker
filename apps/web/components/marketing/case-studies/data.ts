export type CaseStudy = {
  slug: string;
  industry: 'Telecoms' | 'Financial Services' | 'Retail' | 'Healthcare' | 'Manufacturing' | 'Legal';
  client: string;
  headline: string;
  body: string;
  metric: { value: number; suffix?: string; prefix?: string; label: string };
  stack: string[];
  timeline: string;
  featured?: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'telecom-lakehouse',
    industry: 'Telecoms',
    client: 'South Asian telecom operator',
    headline: 'Customer-360 lakehouse on Snowflake + dbt',
    body: 'Migrated twelve disconnected source systems into a single customer-grain lakehouse. Replaced overnight ETL with hourly incremental loads and gave the BI team a model layer they could actually trust.',
    metric: { value: 70, suffix: '%', label: 'lower BI query latency' },
    stack: ['Snowflake', 'dbt', 'Airflow', 'Fivetran'],
    timeline: '10 weeks',
    featured: true,
  },
  {
    slug: 'ride-hailing-fraud',
    industry: 'Financial Services',
    client: 'Global ride-hailing platform',
    headline: 'Real-time fraud detection',
    body: 'Built a streaming fraud model on top of Kafka + Flink with sub-200ms inference. Senior MLEs embedded with the in-house team — eval harness ships every PR.',
    metric: { value: 11, prefix: '$', suffix: 'M', label: 'annualised fraud loss prevented' },
    stack: ['Kafka', 'Flink', 'PyTorch', 'BentoML'],
    timeline: '14 weeks',
  },
  {
    slug: 'consumer-rag',
    industry: 'Retail',
    client: 'Consumer-goods multinational',
    headline: 'Domain-grounded research assistant',
    body: 'RAG system over twenty years of internal product research, regulatory filings, and competitor briefs. Graded against an expert-curated benchmark; updated on every model change.',
    metric: { value: 92, suffix: '%', label: 'answer faithfulness on expert evals' },
    stack: ['Azure OpenAI', 'pgvector', 'LangGraph', 'Ragas'],
    timeline: '12 weeks',
  },
  {
    slug: 'insurer-triage',
    industry: 'Financial Services',
    client: 'European insurer',
    headline: 'Autonomous claims triage agent',
    body: 'Multi-step agent that classifies, enriches, and routes inbound claims with human-in-the-loop for low-confidence cases. Replay tooling for every decision.',
    metric: { value: 5.4, suffix: '×', label: 'throughput per claims analyst' },
    stack: ['OpenAI Agents', 'Temporal', 'Postgres', 'Sentry'],
    timeline: '14 weeks',
  },
  {
    slug: 'packaging-vision',
    industry: 'Manufacturing',
    client: 'European packaging manufacturer',
    headline: 'Edge vision for defect detection',
    body: 'Detection models running on factory-floor edge devices, beating the manual inspection baseline. Continuous improvement loop with on-floor labelling app.',
    metric: { value: 99.4, suffix: '%', label: 'defect catch rate' },
    stack: ['YOLOv8', 'ONNX Runtime', 'NVIDIA Jetson', 'MLflow'],
    timeline: '16 weeks',
  },
  {
    slug: 'legal-contracts',
    industry: 'Legal',
    client: 'Global law firm',
    headline: 'Contract review pipeline',
    body: 'Extraction + summarisation pipeline for high-value commercial contracts. Audit-ready evidence storage so every clause has a citation back to the source.',
    metric: { value: 93, suffix: '%', label: 'review-time reduction' },
    stack: ['Claude 3.5', 'pgvector', 'LangChain', 'AWS S3'],
    timeline: '10 weeks',
  },
  {
    slug: 'health-records',
    industry: 'Healthcare',
    client: 'Hospital network',
    headline: 'Clinical-note summarisation',
    body: 'Domain-adapted summarisation with strict citation requirements and HIPAA-compliant deployment. Co-designed evals with the clinical informatics team.',
    metric: { value: 38, suffix: '%', label: 'clinician documentation time saved' },
    stack: ['Llama 3.1', 'AWS Bedrock', 'Snowflake', 'Datadog'],
    timeline: '18 weeks',
  },
  {
    slug: 'retail-workflow',
    industry: 'Retail',
    client: 'B2B SaaS retail platform',
    headline: 'Quote-to-cash automation',
    body: 'End-to-end workflow rebuild on Temporal. Approval flows, exception handling, full observability across pricing, approvals, and invoicing.',
    metric: { value: 4.2, suffix: '×', label: 'cycle-time improvement' },
    stack: ['Temporal', 'Postgres', 'Stripe', 'Slack'],
    timeline: '12 weeks',
  },
];

export const INDUSTRIES = [
  'All',
  'Telecoms',
  'Financial Services',
  'Retail',
  'Healthcare',
  'Manufacturing',
  'Legal',
] as const;

export type Industry = (typeof INDUSTRIES)[number];
