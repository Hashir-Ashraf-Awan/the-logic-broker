import { cn } from '@/lib/utils';
import { Reveal } from '@/components/primitives/reveal';

interface Props {
  eyebrow: string;
  title: string;
  body: string;
  className?: string;
}

/**
 * Polished placeholder used while a section's full implementation is queued
 * for a later session. Honest about being in-progress; still feels designed.
 */
export function ComingSoonSection({ eyebrow, title, body, className }: Props) {
  return (
    <section className={cn('section', className)}>
      <div className="container-wide">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-14">
            <div className="absolute inset-x-0 -top-px h-px bg-aurora opacity-50" />
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow mb-3">{eyebrow}</p>
                <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {title}
                </h2>
                <p className="mt-3 text-muted-foreground">{body}</p>
              </div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                In progress
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
