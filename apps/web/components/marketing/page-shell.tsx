import type { ReactNode } from 'react';
import { Reveal } from '@/components/primitives/reveal';
import { AnimatedGradient } from '@/components/primitives/animated-gradient';
import { HeroExploreStrip, type ExploreItem } from './hero-explore-strip';

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Optional numbered carousel/strip rendered at the foot of the hero. */
  explore?: ExploreItem[];
  /** Slug of the active item — given a soft highlight in the strip. */
  exploreActive?: string;
  children?: ReactNode;
}

/**
 * Standard top-of-page hero used by inner marketing routes. Optionally
 * renders a numbered "explore" strip across the bottom of the hero —
 * mirrors the Addo-style hero/section pattern.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  explore,
  exploreActive,
  children,
}: Props) {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-40 pb-20 md:pb-28">
        <AnimatedGradient className="opacity-60" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-radial-fade"
        />

        <div className="container-wide relative">
          <Reveal>
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {intro}
              </p>
            )}
          </Reveal>
        </div>

        {explore && explore.length > 0 && (
          <div className="container-wide relative mt-16 md:mt-24">
            <HeroExploreStrip items={explore} activeSlug={exploreActive} />
          </div>
        )}
      </section>
      {children}
    </>
  );
}
