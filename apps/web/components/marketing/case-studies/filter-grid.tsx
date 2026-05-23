'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/primitives/reveal';
import { AnimatedCounter } from '@/components/primitives/animated-counter';
import { EASE_SOFT } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { CASE_STUDIES, INDUSTRIES, type Industry } from './data';

export function FilterGrid() {
  const [active, setActive] = useState<Industry>('All');
  const reduce = useReducedMotion();

  const items = useMemo(
    () => (active === 'All' ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.industry === active)),
    [active],
  );

  return (
    <section className="section bg-background-2/40">
      <div className="container-wide">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">All work</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Filter by industry.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Each tile shows the headline outcome. Hover for the engagement
                shape and stack — click for the full story.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setActive(ind)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-all duration-control ease-soft',
                    active === ind
                      ? 'border-white/[0.18] bg-white/[0.06] text-foreground'
                      : 'border-white/[0.06] bg-white/[0.02] text-foreground/70 hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-foreground',
                  )}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <m.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((study) => (
              <m.article
                key={study.slug}
                layout
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE_SOFT }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-control ease-soft hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-px h-px bg-aurora opacity-0 transition-opacity duration-control ease-soft group-hover:opacity-70"
                />

                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-xs text-foreground/70">
                    {study.industry}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-all duration-control ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold leading-snug tracking-tight">
                  {study.headline}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {study.client}
                </p>

                <div className="mt-6 border-t border-white/[0.06] pt-5">
                  <p className="font-display text-4xl font-semibold leading-none tracking-tight text-gradient">
                    <AnimatedCounter
                      value={study.metric.value}
                      prefix={study.metric.prefix}
                      suffix={study.metric.suffix}
                    />
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {study.metric.label}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="hidden gap-1.5 transition-all duration-control ease-soft group-hover:flex">
                    {study.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/[0.06] bg-background/60 px-2.5 py-0.5 text-[0.7rem] text-foreground/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="block text-xs text-muted-foreground group-hover:hidden">
                    {study.timeline} engagement
                  </div>
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </m.div>

        {items.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No case studies in that industry yet. Try another filter.
          </p>
        )}
      </div>
    </section>
  );
}
