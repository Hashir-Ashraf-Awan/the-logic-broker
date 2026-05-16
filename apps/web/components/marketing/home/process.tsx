'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Compass, Map, Hammer, Rocket, TrendingUp } from 'lucide-react';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';

const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    body: 'Two weeks. We map your stack, your data, and the failure modes nobody talks about. Outcome: an honest opportunity map.',
    icon: Compass,
  },
  {
    num: '02',
    title: 'Strategy',
    body: 'Solution architecture, success metrics, the build-vs-buy calls, and an ROI model your CFO will actually sign.',
    icon: Map,
  },
  {
    num: '03',
    title: 'Development',
    body: 'Senior engineering pods working in your stack. Weekly demos, working software from week one — not slides.',
    icon: Hammer,
  },
  {
    num: '04',
    title: 'Deployment',
    body: 'CI/CD, evals, observability, and the runbook for the 03:00 alert. The boring parts are where reliability lives.',
    icon: Rocket,
  },
  {
    num: '05',
    title: 'Scaling',
    body: 'Knowledge transfer, hiring plan, and the operating model that makes the system compound rather than rot.',
    icon: TrendingUp,
  },
];

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 60%', 'end 40%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" className="section bg-background-2/40">
      <div className="container-wide">
        <SectionHeader
          eyebrow="04 / Process"
          title={
            <>
              From first call to compounding ROI —{' '}
              <span className="text-gradient">five honest steps</span>.
            </>
          }
          intro="No mystery, no methodology theatre. Each stage has a clear deliverable, a clock, and the artefact that comes next."
        />

        <div ref={trackRef} className="relative mx-auto max-w-4xl">
          {/* spine */}
          <div
            aria-hidden
            className="absolute left-[28px] top-2 hidden h-[calc(100%-2rem)] w-px bg-white/[0.08] md:block"
          />
          <m.div
            aria-hidden
            style={reduce ? { height: '100%' } : { height: lineHeight }}
            className="absolute left-[28px] top-2 hidden w-px origin-top bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan md:block"
          />

          <ol className="space-y-7">
            {STEPS.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <Reveal key={step.num} delay={i * 0.04}>
                  <li className="group relative grid grid-cols-[auto,1fr] gap-5 md:gap-7">
                    <div className="relative">
                      <div className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-background ring-1 ring-inset ring-white/[0.04] transition-all duration-control ease-soft group-hover:border-white/[0.18]">
                        <StepIcon className="h-5 w-5 text-foreground/80 transition-colors duration-control ease-soft group-hover:text-foreground" />
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                          {step.num}
                        </span>
                        <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
