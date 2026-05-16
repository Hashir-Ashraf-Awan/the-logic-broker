import { PageShell } from '@/components/marketing/page-shell';
import { ComingSoonSection } from '@/components/marketing/coming-soon-section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Careers',
  path: '/careers',
});

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Senior people. High agency. Real work."
      intro="We hire infrequently and carefully. If you want to ship AI that matters, we would love to hear from you."
    >
      <ComingSoonSection
        eyebrow="Open roles"
        title="Roles grid"
        body="Live openings synced to the careers ATS. Session 4."
      />
    </PageShell>
  );
}
