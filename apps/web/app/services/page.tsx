import { PageShell } from '@/components/marketing/page-shell';
import { ComingSoonSection } from '@/components/marketing/coming-soon-section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services',
  path: '/services',
  description:
    'Eight production-grade AI capabilities — from automation and ML to generative systems, computer vision, and workflow automation.',
});

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Eight ways we ship AI to production."
      intro="Each engagement combines discovery, strategy, build, and the operating model needed to keep it running. Pick a starting point — we will design the rest with you."
    >
      <ComingSoonSection
        eyebrow="Capabilities"
        title="Detailed capability pages"
        body="Service deep-dives with deliverables, timelines, and case examples. Session 3."
      />
    </PageShell>
  );
}
