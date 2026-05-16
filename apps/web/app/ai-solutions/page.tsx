import { PageShell } from '@/components/marketing/page-shell';
import { ComingSoonSection } from '@/components/marketing/coming-soon-section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'AI Solutions',
  path: '/ai-solutions',
});

export default function AiSolutionsPage() {
  return (
    <PageShell
      eyebrow="AI Solutions"
      title="Reference architectures for the systems we build."
      intro="From retrieval to evaluation, here is how production AI actually fits together — and how we adapt these patterns to your stack."
    >
      <ComingSoonSection
        eyebrow="Patterns"
        title="Interactive architecture diagrams"
        body="Animated SVG diagrams for RAG, agentic workflows, eval loops, and real-time inference. Session 3."
      />
    </PageShell>
  );
}
