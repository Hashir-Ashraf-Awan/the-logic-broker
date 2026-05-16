import { PageShell } from '@/components/marketing/page-shell';
import { ComingSoonSection } from '@/components/marketing/coming-soon-section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Case studies',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <PageShell
      eyebrow="Case studies"
      title="Work that shipped. Numbers that held up."
      intro="Selected engagements with measurable outcomes. Hover a tile for ROI; click for the full story."
    >
      <ComingSoonSection
        eyebrow="Grid"
        title="Filterable case-study grid"
        body="Industry filter, animated counters, lazy-loaded covers. Session 3."
      />
    </PageShell>
  );
}
