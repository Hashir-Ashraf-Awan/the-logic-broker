import { PageShell } from '@/components/marketing/page-shell';
import { ComingSoonSection } from '@/components/marketing/coming-soon-section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Client portal',
  path: '/portal',
  noIndex: true,
});

export default function PortalPage() {
  return (
    <PageShell
      eyebrow="Client portal"
      title="Your engagement, in one place."
      intro="Not yet protected. Clerk auth + role gate lands in session 6."
    >
      <ComingSoonSection
        eyebrow="Modules"
        title="Projects / Files / Messages / Invoices / Calendar"
        body="Vertical slices from session 8 onward."
      />
    </PageShell>
  );
}
