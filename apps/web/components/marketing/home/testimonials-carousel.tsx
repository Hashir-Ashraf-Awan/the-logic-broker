'use client';

import { useCallback, useEffect, useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import type { TestimonialCard } from '@/lib/data';
import { cn } from '@/lib/utils';
import { EASE_SOFT } from '@/lib/animations';

interface Props {
  items: TestimonialCard[];
  autoMs?: number;
}

export function TestimonialsCarousel({ items, autoMs = 6500 }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback(
    (delta: number) => setI((cur) => (cur + delta + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (paused || reduce || items.length < 2) return;
    const id = setInterval(() => setI((cur) => (cur + 1) % items.length), autoMs);
    return () => clearInterval(id);
  }, [paused, reduce, items.length, autoMs]);

  if (!items.length) return null;
  const current = items[i]!;

  return (
    <div
      className="relative mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Testimonials"
      aria-roledescription="carousel"
    >
      <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-14">
        <Quote
          aria-hidden
          className="absolute right-8 top-8 h-10 w-10 text-foreground/10"
        />
        <AnimatePresence mode="wait">
          <m.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE_SOFT }}
          >
            <blockquote className="relative font-display text-2xl font-medium leading-snug tracking-tight text-balance md:text-3xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-aurora text-sm font-semibold text-white ring-1 ring-border"
              >
                {current.authorName
                  .split(' ')
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{current.authorName}</p>
                <p className="text-xs text-muted-foreground">
                  {[current.authorTitle, current.company].filter(Boolean).join(' · ')}
                </p>
              </div>
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === i}
              aria-label={`Testimonial ${idx + 1}`}
              onClick={() => setI(idx)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-control ease-soft',
                idx === i ? 'w-8 bg-aurora' : 'w-3 bg-foreground/15 hover:bg-foreground/25',
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full surface text-foreground/80 transition-all duration-control ease-soft hover:bg-muted/80 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full surface text-foreground/80 transition-all duration-control ease-soft hover:bg-muted/80 hover:text-foreground"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
