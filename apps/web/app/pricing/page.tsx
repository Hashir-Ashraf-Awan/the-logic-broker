import { PageShell } from '@/components/marketing/page-shell';
import { ComingSoonSection } from '@/components/marketing/coming-soon-section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pricing',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Three engagements. Honest pricing."
      intro="Pick the shape that matches your stage. Custom programs are always available."
    >
      <ComingSoonSection
        eyebrow="Tiers"
        title="Foundations / Growth / Enterprise"
        body="Annual & monthly toggle, feature matrix, FAQ. Session 4."
      />
    </PageShell>
  );
}
