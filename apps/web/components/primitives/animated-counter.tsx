'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface Props {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
  className?: string;
}

/**
 * Counts up from 0 → value once the element enters the viewport.
 * Uses spring physics so it feels mechanical, not linear.
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  format,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 20, mass: 1 });

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(value);
      return;
    }
    mv.set(value);
  }, [inView, mv, reduce, value]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      const el = ref.current;
      if (!el) return;
      const rounded = Math.round(latest);
      el.textContent = `${prefix}${format ? format(rounded) : rounded.toLocaleString()}${suffix}`;
    });
  }, [spring, prefix, suffix, format]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
