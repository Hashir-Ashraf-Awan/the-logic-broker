import { PageShell } from '@/components/marketing/page-shell';
import { SITE_EXPLORE } from '@/components/marketing/hero-explore-strip';
import { FeaturedStudy } from '@/components/marketing/case-studies/featured';
import { FilterGrid } from '@/components/marketing/case-studies/filter-grid';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Case studies',
  path: '/case-studies',
  description:
    'Selected engagements with measurable outcomes — across telecoms, financial services, retail, healthcare, and beyond.',
});

export default function CaseStudiesPage() {
  return (
    <PageShell
      eyebrow="Case studies"
      title="Work that shipped. Numbers that held up."
      intro="Selected engagements with measurable outcomes. Hover a tile for the stack; click for the full story."
      explore={SITE_EXPLORE}
      exploreActive="case-studies"
    >
      <FeaturedStudy />
      <FilterGrid />
    </PageShell>
  );
}
