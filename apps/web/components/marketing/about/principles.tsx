import { Reveal } from '@/components/primitives/reveal';
import { SectionHeader } from '@/components/primitives/section-header';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Working software from week one',
    body: 'No three-month strategy decks. By the end of the first sprint there is something running you can poke at, break, and steer.',
    moment:
      'A retail client signed off a six-month roadmap on day 11 — because the v0 retrieval pipeline already ran on their real catalogue.',
  },
  {
    num: '02',
    title: 'Evals are the product',
    body: 'A model without a regression suite is a liability. Every system we ship has graded benchmarks the business cares about, run on every change.',
    moment:
      'When a vendor pushed an underlying model upgrade, our eval harness caught a 6-point quality regression before it touched a single customer.',
  },
  {
    num: '03',
    title: 'Boring infra, then magic',
    body: 'CI, observability, secrets, runbooks — the unglamorous foundations. Without them, an LLM is just a way to fail at scale.',
    moment:
      'We spent week one on logging schemas. Week eight, when fraud detection misfired in production, we had the offending span in minutes.',
  },
  {
    num: '04',
    title: 'Disagree, then commit',
    body: 'We push back when we think a direction is wrong, then row hard once the call is made. Yes-people produce mediocre AI products.',
    moment:
      'We walked away from a "GPT wrapper" brief that would have failed. Six months later the client returned with a real problem worth solving.',
  },
  {
    num: '05',
    title: 'Hand it off cleanly',
    body: 'A successful engagement ends with your team owning the system. Knowledge transfer, hiring runway, the next-twelve-months plan.',
    moment:
      'Two engineers we hired and trained for a client are now running their AI platform. We are off the payroll. The system compounds.',
  },
];

export function Principles() {
  return (
    <section className="section bg-background-2/40">
      <div className="container-wide">
        <SectionHeader
          eyebrow="02 / Principles"
          title={
            <>
              Five operating principles — <span className="text-gradient">non-negotiable</span>.
            </>
          }
          intro="Each one earned its place by surviving a project that almost did not. They are how we work; the micro-story tells you why."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.05}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-3xl surface p-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                    {p.num}
                  </span>
                  <span
                    aria-hidden
                    className="h-px w-12 self-center bg-gradient-to-r from-accent-blue/0 via-accent-blue/40 to-accent-purple/40"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <blockquote className="mt-5 border-l border-border pl-4 text-sm italic leading-relaxed text-foreground/70">
                  {p.moment}
                </blockquote>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
