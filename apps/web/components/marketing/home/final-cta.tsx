import { ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/primitives/magnetic-button';
import { AnimatedGradient } from '@/components/primitives/animated-gradient';
import { Reveal } from '@/components/primitives/reveal';

export function FinalCta() {
  return (
    <section className="section relative isolate overflow-hidden">
      <AnimatedGradient className="opacity-80" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade"
      />

      <div className="container-wide relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-5">Next step</p>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Tell us where you want AI to land —{' '}
              <span className="text-gradient">we will tell you honestly</span>{' '}
              whether we are the right partner.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
              A 30-minute call. No deck. We listen, sketch the shape, and either
              point you to someone better or get to work.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton
                href="/contact"
                size="lg"
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Book a consultation
              </MagneticButton>
              <MagneticButton href="/case-studies" variant="ghost" size="lg">
                See the work
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
