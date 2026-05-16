import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2.5 font-display text-base font-semibold tracking-tight',
        className,
      )}
      aria-label="The Logic Broker — home"
    >
      <span
        aria-hidden
        className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-aurora ring-1 ring-white/10 transition-transform duration-control ease-soft group-hover:scale-105"
      >
        <span className="absolute inset-[2px] rounded-[5px] bg-background" />
        <span className="relative font-mono text-[0.7rem] font-bold leading-none">
          <span className="text-gradient">L/B</span>
        </span>
      </span>
      <span className="inline-flex items-baseline gap-1.5">
        <span>The Logic Broker</span>
      </span>
    </Link>
  );
}
