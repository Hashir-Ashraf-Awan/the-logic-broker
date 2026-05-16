'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { cn } from '@/lib/utils';

type Cadence = 'monthly' | 'annual';

interface Tier {
  name: string;
  tagline: string;
  prices: Record<Cadence, { value: string; unit: string }>;
  popular?: boolean;
  features: string[];
  cta: { label: string; href: string };
}

const TIERS: Tier[] = [
  {
    name: 'Foundations',
    tagline: 'For teams scoping their first production AI initiative.',
    prices: {
      monthly: { value: '$24k', unit: '/ month' },
      annual: { value: '$240k', unit: '/ year' },
    },
    features: [
      'One discovery + strategy engagement',
      'Two senior engineers, part-time',
      'Weekly demos & roadmap reviews',
      'Eval framework & runbook',
      'Slack-based collaboration',
    ],
    cta: { label: 'Start a conversation', href: '/contact' },
  },
  {
    name: 'Growth',
    tagline: 'Embedded pod shipping to production every two weeks.',
    prices: {
      monthly: { value: '$58k', unit: '/ month' },
      annual: { value: '$580k', unit: '/ year' },
    },
    popular: true,
    features: [
      'Everything in Foundations',
      'Four senior engineers, full-time',
      'Embedded architect on your standup',
      'CI/CD + observability setup',
      'Quarterly OKR alignment',
      'Priority Slack & on-call window',
    ],
    cta: { label: 'Book a call', href: '/contact' },
  },
  {
    name: 'Enterprise',
    tagline: 'A custom programme for AI-led transformation.',
    prices: {
      monthly: { value: 'Custom', unit: '' },
      annual: { value: 'Custom', unit: '' },
    },
    features: [
      'Everything in Growth',
      'Multi-pod delivery & scaling lead',
      'Hiring & operating-model design',
      'Security & compliance support',
      'Co-branded outcomes report',
      'Executive sponsorship cadence',
    ],
    cta: { label: 'Talk to the partners', href: '/contact' },
  },
];

export function Pricing() {
  const [cadence, setCadence] = useState<Cadence>('annual');

  return (
    <section id="pricing" className="section bg-background-2/40">
      <div className="container-wide">
        <SectionHeader
          align="center"
          eyebrow="08 / Pricing"
          title={
            <>
              Three engagements. <span className="text-gradient">Honest pricing.</span>
            </>
          }
          intro="Most teams start with Foundations or Growth. Enterprise is a custom programme — let us shape it with you."
        />

        <Reveal>
          <div className="mb-12 flex justify-center">
            <div className="relative inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] p-1 text-sm">
              {(['monthly', 'annual'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCadence(c)}
                  className={cn(
                    'relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-1.5 capitalize transition-colors duration-control ease-soft',
                    cadence === c ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {cadence === c && (
                    <m.span
                      layoutId="cadence-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-aurora"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span>{c}</span>
                  {c === 'annual' && (
                    <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[0.65rem] font-medium text-white">
                      −16%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.06}>
              <TierCard tier={tier} cadence={cadence} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier, cadence }: { tier: Tier; cadence: Cadence }) {
  const price = tier.prices[cadence];
  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-control ease-soft hover:-translate-y-1',
        tier.popular
          ? 'border-white/[0.16] bg-gradient-to-b from-white/[0.05] to-white/[0.01] ring-1 ring-accent-blue/30'
          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04]',
      )}
    >
      {tier.popular && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-aurora opacity-90"
          />
          <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-aurora px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white">
            Most popular
          </span>
        </>
      )}

      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight">{tier.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tier.tagline}</p>
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold tracking-tight text-foreground">
          {price.value}
        </span>
        {price.unit && (
          <span className="text-sm text-muted-foreground">{price.unit}</span>
        )}
      </div>

      <ul className="mt-7 flex-1 space-y-3 text-sm text-foreground/85">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-aurora/20 ring-1 ring-accent-blue/30">
              <Check className="h-2.5 w-2.5 text-foreground" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={tier.cta.href}
        className={cn(
          'mt-9 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-medium tracking-tight transition-all duration-control ease-soft',
          tier.popular
            ? 'bg-aurora text-white shadow-[0_8px_30px_-8px_hsl(var(--accent-blue)/0.6)] hover:shadow-[0_12px_40px_-8px_hsl(var(--accent-purple)/0.7)]'
            : 'border border-white/[0.08] bg-white/[0.03] text-foreground/90 hover:bg-white/[0.07] hover:text-foreground',
        )}
      >
        {tier.cta.label}
      </Link>
    </div>
  );
}
