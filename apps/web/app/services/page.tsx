import { PageShell } from '@/components/marketing/page-shell';
import { SITE_EXPLORE } from '@/components/marketing/hero-explore-strip';
import { JumpNav } from '@/components/marketing/services/jump-nav';
import { DeepDives } from '@/components/marketing/services/deep-dives';
import { EngagementCta } from '@/components/marketing/services/engagement-cta';
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
      explore={SITE_EXPLORE}
      exploreActive="services"
    >
      <JumpNav />
      <DeepDives />
      <EngagementCta />
    </PageShell>
  );
}
