'use client';

import { m, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Soft, animated aurora blobs for cinematic backdrops.
 * Pure CSS + Framer; no canvas, GPU friendly.
 */
export function AnimatedGradient({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      <m.div
        className="absolute -top-1/3 left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, hsl(217 91% 60% / 0.6), transparent 70%)',
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ['-50%', '-40%', '-60%', '-50%'],
                y: ['0%', '6%', '-4%', '0%'],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className="absolute -bottom-1/3 left-1/4 h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, hsl(262 83% 58% / 0.55), transparent 70%)',
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ['0%', '8%', '-6%', '0%'],
                y: ['0%', '-6%', '4%', '0%'],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className="absolute right-0 top-1/4 h-[45vmax] w-[45vmax] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, hsl(188 94% 56% / 0.5), transparent 70%)',
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ['0%', '-6%', '6%', '0%'],
                y: ['0%', '4%', '-4%', '0%'],
              }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid bg-[size:64px_64px] opacity-[0.12] mask-fade-y" />
      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.18] mix-blend-overlay" />
    </div>
  );
}
