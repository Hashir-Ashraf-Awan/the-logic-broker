import { PageShell } from '@/components/marketing/page-shell';
import { ComingSoonSection } from '@/components/marketing/coming-soon-section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Admin',
  path: '/admin',
  noIndex: true,
});

export default function AdminPage() {
  return (
    <PageShell
      eyebrow="Internal"
      title="Admin dashboard"
      intro="Not yet protected. Clerk auth + role gate lands in session 6."
    >
      <ComingSoonSection
        eyebrow="Modules"
        title="Analytics / Leads / CMS / Users"
        body="Each module ships as a vertical slice from session 6 onward."
      />
    </PageShell>
  );
}
