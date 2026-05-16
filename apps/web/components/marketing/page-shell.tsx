import type { ReactNode } from 'react';
import { Reveal } from '@/components/primitives/reveal';
import { AnimatedGradient } from '@/components/primitives/animated-gradient';

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

/**
 * Standard top-of-page hero used by inner marketing routes (About, Services,
 * etc.). Lets us stand the routes up immediately with the right design
 * language while detailed content lands in later sessions.
 */
export function PageShell({ eyebrow, title, intro, children }: Props) {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-40 pb-24">
        <AnimatedGradient className="opacity-60" />
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
      </section>
      {children}
    </>
  );
}
