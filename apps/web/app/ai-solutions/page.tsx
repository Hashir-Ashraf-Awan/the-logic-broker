import { PageShell } from '@/components/marketing/page-shell';
import { Architectures } from '@/components/marketing/ai-solutions/architectures';
import { ArchitecturePrinciples } from '@/components/marketing/ai-solutions/principles';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'AI Solutions',
  path: '/ai-solutions',
  description:
    'Reference architectures for production AI — RAG, agentic workflows, evaluation loops, and real-time inference.',
});

export default function AiSolutionsPage() {
  return (
    <PageShell
      eyebrow="AI Solutions"
      title="Reference architectures for the systems we build."
      intro="From retrieval to evaluation, here is how production AI actually fits together — and how we adapt these patterns to your stack."
    >
      <Architectures />
      <ArchitecturePrinciples />
    </PageShell>
  );
}
