'use client';

import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_SOFT } from '@/lib/animations';

export type ExploreItem = {
  slug: string;
  label: string;
  href: string;
};

interface Props {
  items: ExploreItem[];
  activeSlug?: string;
}

/**
 * Hero-foot numbered strip, modelled on the Addo-style "01 / Strategy →
 * 02 / AI & GenAI" carousel. Each item is a navigable link; the active one
 * gets the gradient bar above it.
 */
export function HeroExploreStrip({ items, activeSlug }: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* base hairline */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {items.map((item, i) => {
          const active = activeSlug === item.slug;
          return (
            <li key={item.slug} className="relative">
              {/* active gradient bar above item */}
              {active && (
                <m.span
                  layoutId="hero-explore-active"
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-aurora"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 360, damping: 30 }
                  }
                />
              )}
              <Link
                href={item.href}
                className={cn(
                  'group flex flex-col gap-1 px-4 py-5 transition-colors duration-control ease-soft md:px-6',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="font-mono text-xs tracking-[0.18em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-sm font-semibold leading-snug tracking-tight md:text-base">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Default site-wide explore items — used by inner pages so each PageShell
 * gets the same five-step navigation pattern as the home reference.
 */
export const SITE_EXPLORE: ExploreItem[] = [
  { slug: 'about', label: 'Strategy & Approach', href: '/about' },
  { slug: 'ai-solutions', label: 'AI & Generative AI', href: '/ai-solutions' },
  { slug: 'services', label: 'Data & Services', href: '/services' },
  { slug: 'case-studies', label: 'Case Studies', href: '/case-studies' },
  { slug: 'contact', label: 'Talk to us', href: '/contact' },
];
