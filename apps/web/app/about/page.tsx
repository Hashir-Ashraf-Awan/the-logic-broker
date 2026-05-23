import { PageShell } from '@/components/marketing/page-shell';
import { SITE_EXPLORE } from '@/components/marketing/hero-explore-strip';
import { Mission } from '@/components/marketing/about/mission';
import { Principles } from '@/components/marketing/about/principles';
import { Team } from '@/components/marketing/about/team';
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
      explore={SITE_EXPLORE}
      exploreActive="about"
    >
      <Mission />
      <Principles />
      <Team />
    </PageShell>
  );
}
