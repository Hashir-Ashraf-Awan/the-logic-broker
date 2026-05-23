import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/primitives/reveal';

export function EngagementCta() {
  return (
    <section className="section">
      <div className="container-wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-10 md:p-14">
            <span
              aria-hidden
              className="absolute inset-x-0 -top-px h-px bg-aurora opacity-60"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-aurora opacity-20 blur-3xl"
            />

            <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end">
              <div>
                <p className="eyebrow mb-4">Not sure where to start?</p>
                <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  A two-week discovery sprint resolves it.
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  Fixed scope, fixed price, fixed outcome — an honest opportunity
                  map, prioritised by ROI, with the build-vs-buy calls already
                  made. Worst case: you have clarity. Best case: you have us.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-aurora px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-8px_hsl(var(--accent-blue)/0.6)] transition-shadow duration-control ease-soft hover:shadow-[0_12px_40px_-8px_hsl(var(--accent-purple)/0.7)]"
                >
                  Start a discovery
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3 text-sm font-medium text-foreground/90 transition-colors duration-control ease-soft hover:bg-white/[0.06] hover:text-foreground"
                >
                  See the work
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
