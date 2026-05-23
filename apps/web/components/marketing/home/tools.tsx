'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Cloud, Database, GitBranch, BarChart3, Sparkles, Server } from 'lucide-react';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { EASE_SOFT } from '@/lib/animations';
import { cn } from '@/lib/utils';

/**
 * The "every tool we ship in production" wall. Icons come from Iconify's
 * `logos` set (https://icon-sets.iconify.design/logos/) which serves full
 * brand-colour SVGs from a single CDN URL. Each tool also has a `color`
 * hex hardcoded so the pill keeps a brand accent even if the icon fails
 * to load or the slug is missing.
 */

interface Tool {
  name: string;
  /** Iconify "logos" slug. e.g. 'aws', 'snowflake-icon'. Omit to render a
   *  colored monogram instead of an icon. */
  iconLogo?: string;
  /** Official brand colour — hex without leading #. Used for the dot
   *  fallback and the soft accent on the pill. */
  color: string;
}

interface Category {
  label: string;
  icon: typeof Cloud;
  /** Tailwind gradient classes — used as the category card accent strip. */
  accent: string;
  tools: Tool[];
}

const CATEGORIES: Category[] = [
  {
    label: 'Cloud',
    icon: Cloud,
    accent: 'from-[hsl(217_91%_55%)] via-[hsl(199_94%_55%)] to-[hsl(188_94%_45%)]',
    tools: [
      { name: 'AWS', iconLogo: 'aws', color: 'FF9900' },
      { name: 'GCP', iconLogo: 'google-cloud', color: '4285F4' },
      { name: 'Azure', iconLogo: 'microsoft-azure', color: '0078D4' },
    ],
  },
  {
    label: 'Warehouse & Lakehouse',
    icon: Database,
    accent: 'from-[hsl(188_94%_45%)] via-[hsl(160_84%_42%)] to-[hsl(199_94%_55%)]',
    tools: [
      { name: 'Snowflake', iconLogo: 'snowflake-icon', color: '29B5E8' },
      { name: 'BigQuery', iconLogo: 'google-bigquery', color: '4285F4' },
      { name: 'Databricks', iconLogo: 'databricks-icon', color: 'FF3621' },
      { name: 'Redshift', iconLogo: 'aws', color: 'CC2264' },
    ],
  },
  {
    label: 'Transform & Orchestrate',
    icon: GitBranch,
    accent: 'from-[hsl(36_95%_55%)] via-[hsl(20_90%_55%)] to-[hsl(330_85%_55%)]',
    tools: [
      { name: 'dbt', iconLogo: 'dbt-icon', color: 'FF694A' },
      { name: 'Airflow', iconLogo: 'airflow-icon', color: '017CEE' },
      { name: 'Dagster', iconLogo: 'dagster', color: '4F43DD' },
      { name: 'Fivetran', color: '0073FF' },
    ],
  },
  {
    label: 'BI & Visualisation',
    icon: BarChart3,
    accent: 'from-[hsl(330_85%_55%)] via-[hsl(280_80%_55%)] to-[hsl(262_83%_55%)]',
    tools: [
      { name: 'Power BI', iconLogo: 'microsoft-power-bi', color: 'F2C811' },
      { name: 'Tableau', iconLogo: 'tableau-icon', color: 'E97627' },
      { name: 'Looker', iconLogo: 'looker-icon', color: '4285F4' },
      { name: 'Sigma', color: '2563EB' },
    ],
  },
  {
    label: 'AI & ML',
    icon: Sparkles,
    accent: 'from-[hsl(262_83%_55%)] via-[hsl(243_75%_55%)] to-[hsl(217_91%_55%)]',
    tools: [
      { name: 'PyTorch', iconLogo: 'pytorch-icon', color: 'EE4C2C' },
      { name: 'TensorFlow', iconLogo: 'tensorflow', color: 'FF6F00' },
      { name: 'Hugging Face', iconLogo: 'hugging-face-icon', color: 'FFD21E' },
      { name: 'LangChain', color: '1C3C3C' },
      { name: 'OpenAI', iconLogo: 'openai-icon', color: '10A37F' },
      { name: 'Anthropic', color: 'D97757' },
    ],
  },
  {
    label: 'Infra & DevOps',
    icon: Server,
    accent: 'from-[hsl(217_91%_55%)] via-[hsl(160_84%_42%)] to-[hsl(36_95%_55%)]',
    tools: [
      { name: 'Kubernetes', iconLogo: 'kubernetes', color: '326CE5' },
      { name: 'Docker', iconLogo: 'docker-icon', color: '2496ED' },
      { name: 'Terraform', iconLogo: 'terraform-icon', color: '7B42BC' },
      { name: 'GitHub Actions', iconLogo: 'github-actions', color: '2088FF' },
    ],
  },
];

export function Tools() {
  return (
    <section id="tools" className="section relative isolate overflow-hidden">
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-[size:64px_64px] opacity-[0.06] mask-fade-y"
      />

      <div className="container-wide">
        <SectionHeader
          eyebrow="Tools"
          title={
            <>
              The stack we ship in —{' '}
              <span className="text-gradient">across every cloud and every layer</span>.
            </>
          }
          intro="From raw event capture to executive dashboard, we work in whatever your team already knows. These are the platforms we have shipped to production this year."
        />

        <div className="space-y-6">
          {CATEGORIES.map((cat, ci) => (
            <Reveal key={cat.label} delay={ci * 0.04}>
              <div className="relative overflow-hidden rounded-3xl surface p-6 md:p-8">
                {/* Per-category gradient accent — sits along the top edge */}
                <div
                  aria-hidden
                  className={cn(
                    'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-90',
                    cat.accent,
                  )}
                />
                {/* Soft tint blob in the corner */}
                <div
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br opacity-20 blur-3xl',
                    cat.accent,
                  )}
                />

                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={cn(
                      'inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ring-border',
                      cat.accent,
                    )}
                  >
                    <cat.icon className="h-4 w-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/80">
                      {String(ci + 1).padStart(2, '0')} / Category
                    </p>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {cat.label}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {cat.tools.map((tool, ti) => (
                    <ToolTile key={tool.name} tool={tool} delay={ci * 0.04 + ti * 0.02} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function iconUrl(slug: string) {
  return `https://api.iconify.design/logos/${slug}.svg`;
}

function ToolTile({ tool, delay }: { tool: Tool; delay: number }) {
  const [errored, setErrored] = useState(false);
  const src = tool.iconLogo ? iconUrl(tool.iconLogo) : undefined;
  const showImage = src && !errored;

  return (
    <m.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.4, ease: EASE_SOFT, delay }}
      whileHover={{ y: -2 }}
      style={{
        // Brand-color tinted background + border on hover, applied as CSS
        // vars so the static class string stays simple.
        ['--tool-color' as never]: `#${tool.color}`,
      }}
      className={cn(
        'group relative inline-flex h-11 items-center gap-2.5 rounded-full surface px-5 transition-all duration-control ease-soft',
        'hover:border-[var(--tool-color)] hover:shadow-[0_4px_18px_-6px_var(--tool-color)]',
      )}
    >
      {showImage ? (
        // Plain <img> — Iconify CDN serves a tiny SVG, no Next image
        // optimisation needed, onError gives us the brand-dot fallback.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden
          width={18}
          height={18}
          className="h-[18px] w-[18px] shrink-0 transition-transform duration-control ease-soft group-hover:scale-110"
          onError={() => setErrored(true)}
        />
      ) : (
        <span
          aria-hidden
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-control ease-soft group-hover:scale-110"
          style={{ background: `#${tool.color}` }}
        >
          {tool.name.charAt(0)}
        </span>
      )}
      <span className="whitespace-nowrap text-sm font-medium tracking-tight text-foreground/90 transition-colors duration-control ease-soft group-hover:text-foreground">
        {tool.name}
      </span>
    </m.span>
  );
}
