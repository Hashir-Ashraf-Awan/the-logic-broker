import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { AnimatedCounter } from '@/components/primitives/animated-counter';
import { CASE_STUDIES } from './data';

export function FeaturedStudy() {
  const study = CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0];
  if (!study) return null;

  return (
    <section className="section">
      <div className="container-wide">
        <Reveal>
          <article className="relative grid grid-cols-1 gap-10 overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12 lg:grid-cols-12 lg:gap-14">
            <span
              aria-hidden
              className="absolute inset-x-0 -top-px h-px bg-aurora opacity-60"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-aurora opacity-25 blur-3xl"
            />

            <div className="relative lg:col-span-7">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                Featured · {study.industry}
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {study.headline}
              </h2>
              <p className="mt-3 text-sm uppercase tracking-wider text-muted-foreground">
                {study.client}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {study.body}
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {study.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-xs text-foreground/70"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative lg:col-span-5">
              <div className="rounded-2xl border border-white/[0.06] bg-background/40 p-8">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                  Headline outcome
                </p>
                <p className="mt-4 font-display text-6xl font-semibold leading-none tracking-tight text-gradient md:text-7xl">
                  <AnimatedCounter
                    value={study.metric.value}
                    prefix={study.metric.prefix}
                    suffix={study.metric.suffix}
                  />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {study.metric.label}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                      Timeline
                    </p>
                    <p className="mt-1 text-base font-medium text-foreground">
                      {study.timeline}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                    Read story
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
