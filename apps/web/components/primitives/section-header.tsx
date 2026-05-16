import type { ReactNode } from 'react';
import { Reveal } from './reveal';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Standard top-of-section header — eyebrow, headline, optional intro.
 * Used by every Home section to keep cadence consistent.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: Props) {
  return (
    <Reveal>
      <div
        className={cn(
          'mb-14 md:mb-20',
          align === 'center' && 'mx-auto max-w-3xl text-center',
          align === 'left' && 'max-w-3xl',
          className,
        )}
      >
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-5 text-balance text-lg leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}
