import { Hero } from '@/components/marketing/home/hero';
import { TrustedBy } from '@/components/marketing/home/trusted-by';
import { Services } from '@/components/marketing/home/services';
import { Tools } from '@/components/marketing/home/tools';
import { Process } from '@/components/marketing/home/process';
import { CaseStudies } from '@/components/marketing/home/case-studies';
import { AIShowcase } from '@/components/marketing/home/ai-showcase';
import { Testimonials } from '@/components/marketing/home/testimonials';
import { Pricing } from '@/components/marketing/home/pricing';
import { Faq } from '@/components/marketing/home/faq';
import { FinalCta } from '@/components/marketing/home/final-cta';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'AI & data engineering, built for the enterprise',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <Tools />
      <Process />
      <CaseStudies />
      <AIShowcase />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
