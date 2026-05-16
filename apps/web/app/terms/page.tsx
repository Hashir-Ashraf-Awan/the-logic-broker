import { PageShell } from '@/components/marketing/page-shell';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms & conditions',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <PageShell eyebrow="Legal" title="Terms & conditions">
      <section className="section pt-0">
        <div className="container-narrow prose prose-invert max-w-none text-foreground/85">
          <p className="text-muted-foreground">Last updated: 2026-05-16</p>
          <p>
            Placeholder terms. The full document — drafted with legal review — lands in
            session 5. Use of this site implies acceptance of the
            forthcoming terms.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
