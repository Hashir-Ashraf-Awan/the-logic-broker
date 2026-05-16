import { PageShell } from '@/components/marketing/page-shell';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy policy',
  path: '/privacy',
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Legal" title="Privacy policy">
      <section className="section pt-0">
        <div className="container-narrow prose prose-invert max-w-none text-foreground/85">
          <p className="text-muted-foreground">Last updated: 2026-05-16</p>
          <p>
            This is the placeholder privacy policy for The Logic Broker. The full
            policy — drafted with legal review — lands in session 5. Until then,
            assume the following:
          </p>
          <ul>
            <li>We collect only the data necessary to respond to inbound contact and bookings.</li>
            <li>We do not sell personal data.</li>
            <li>You can request deletion at any time by emailing hello@thelogicbroker.com.</li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
