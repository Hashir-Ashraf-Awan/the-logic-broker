import { Reveal } from '@/components/primitives/reveal';
import { SectionHeader } from '@/components/primitives/section-header';

const POINTS = [
  {
    label: 'Operators, not vendors',
    body: 'Senior engineers and product leaders who have shipped, scaled, and lived with the consequences. We embed with your team rather than throw plans over a wall.',
  },
  {
    label: 'Production over prototypes',
    body: 'A demo that wows in a boardroom but melts under traffic is worse than no demo. We build for the 03:00 alert from day one.',
  },
  {
    label: 'Honest economics',
    body: 'We will tell you when AI is not the answer, and we will not invent timelines to win a deal. Long-term partnerships compound; theatrics do not.',
  },
];

export function Mission() {
  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeader
          eyebrow="01 / Mission"
          title={
            <>
              We exist to make enterprise AI <span className="text-gradient">survive the messy middle</span>.
            </>
          }
          intro="Between the boardroom pitch and the production runbook is where most AI initiatives quietly die. We are the team that holds the line through that stretch."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.06}>
              <div className="relative h-full overflow-hidden rounded-3xl surface p-7">
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-px h-px bg-aurora opacity-50"
                />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                  {p.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
