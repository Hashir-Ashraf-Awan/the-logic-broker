import { Shield, Activity, GitMerge, Gauge } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';
import { SectionHeader } from '@/components/primitives/section-header';

const PRINCIPLES = [
  {
    icon: Shield,
    title: 'Guardrails first',
    body: 'Prompt injection, policy, PII redaction, and rate limits wired before the first model call goes live.',
  },
  {
    icon: Activity,
    title: 'Observability before features',
    body: 'Traces, prompt logs, and a dashboard the on-call engineer can actually read. Otherwise you fly blind.',
  },
  {
    icon: GitMerge,
    title: 'Eval-gated CI',
    body: 'Every PR runs the graded benchmark. Regressions block merge — the same rigour code reviews get.',
  },
  {
    icon: Gauge,
    title: 'Budget, then build',
    body: 'Cost and latency budgets defined up front. Cheaper-and-good often beats best-and-untenable in production.',
  },
];

export function ArchitecturePrinciples() {
  return (
    <section className="section bg-background-2/40">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Design principles"
          title={
            <>
              The same four rules apply <span className="text-gradient">to every architecture above</span>.
            </>
          }
          intro="The model is the smallest part of a production AI system. These are the surrounding choices that decide whether it lives past three months."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => {
            const PIcon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="relative h-full overflow-hidden rounded-3xl surface p-7">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -top-px h-px bg-aurora opacity-50"
                  />
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-aurora/15 ring-1 ring-border">
                    <PIcon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
