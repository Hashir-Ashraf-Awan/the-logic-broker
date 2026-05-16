import { PageShell } from '@/components/marketing/page-shell';
import { ComingSoonSection } from '@/components/marketing/coming-soon-section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="Blog"
      title="Notes on shipping production AI."
      intro="Field reports, frameworks, and the occasional sharp opinion."
    >
      <ComingSoonSection
        eyebrow="Index"
        title="Post grid + filters"
        body="Backed by the Post model in Postgres with tag filters and search. Session 4."
      />
    </PageShell>
  );
}
