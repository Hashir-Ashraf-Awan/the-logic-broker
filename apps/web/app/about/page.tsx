import { PageShell } from '@/components/marketing/page-shell';
import { ComingSoonSection } from '@/components/marketing/coming-soon-section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  path: '/about',
  description:
    'The Logic Broker is a senior AI delivery team. We help ambitious enterprises ship AI that holds up under real-world load.',
});

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="A senior AI delivery team for ambitious enterprises."
      intro="We are operators turned builders. The Logic Broker exists to make AI projects that survive the messy middle — from boardroom buy-in to the 03:00 alert."
    >
      <ComingSoonSection
        eyebrow="Mission"
        title="Why we exist"
        body="Full mission, principles, and team bios land in session 3."
      />
      <ComingSoonSection
        eyebrow="Team"
        title="The people"
        body="Leadership grid with bios and outbound links."
      />
      <ComingSoonSection
        eyebrow="Principles"
        title="How we work"
        body="Five operating principles with illustrative micro-stories."
      />
    </PageShell>
  );
}
