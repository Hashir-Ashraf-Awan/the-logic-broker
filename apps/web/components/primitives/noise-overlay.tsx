import { cn } from '@/lib/utils';

export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay',
        className,
      )}
    />
  );
}
