'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Cloud, Database, GitBranch, BarChart3, Sparkles, Server } from 'lucide-react';
import { SectionHeader } from '@/components/primitives/section-header';
import { Reveal } from '@/components/primitives/reveal';
import { EASE_SOFT } from '@/lib/animations';
import { cn } from '@/lib/utils';

/**
 * The "every tool we ship in production" wall. Categorised so the visitor
 * scans the row that matters to them (Cloud / Warehouse / Transform / BI /
 * AI-ML / Infra).
 *
 * Each tile's `slug` is a Simple Icons (https://simpleicons.org) brand slug.
 * We render the logo through the official CDN — `cdn.simpleicons.org/{slug}`
 * — which serves CC0 SVG paths. The underlying trademarks belong to their
 * owners; this is nominative use ("we work with these tools"). For any
 * brand with restrictive guidelines (or where you want a custom colour),
 * drop a local SVG into /public/tools/<slug>.svg and set `localSrc`.
 *
 * Missing or unknown brands fall back to a styled wordmark + gradient dot.
 */

interface Tool {
  name: string;
  /** Simple Icons slug — see https://simpleicons.org for the catalogue. */
  slug?: string;
  /** Optional local SVG path overrides the CDN. */
  localSrc?: string;
}

interface Category {
  label: string;
  icon: typeof Cloud;
  tools: Tool[];
}

const CATEGORIES: Category[] = [
  {
    label: 'Cloud',
    icon: Cloud,
    tools: [
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'GCP', slug: 'googlecloud' },
      { name: 'Azure', slug: 'microsoftazure' },
    ],
  },
  {
    label: 'Warehouse & Lakehouse',
    icon: Database,
    tools: [
      { name: 'Snowflake', slug: 'snowflake' },
      { name: 'BigQuery', slug: 'googlebigquery' },
      { name: 'Databricks', slug: 'databricks' },
      { name: 'Redshift', slug: 'amazonredshift' },
    ],
  },
  {
    label: 'Transform & Orchestrate',
    icon: GitBranch,
    tools: [
      { name: 'dbt', slug: 'dbt' },
      { name: 'Airflow', slug: 'apacheairflow' },
      { name: 'Dagster', slug: 'dagster' },
      { name: 'Fivetran', slug: 'fivetran' },
    ],
  },
  {
    label: 'BI & Visualisation',
    icon: BarChart3,
    tools: [
      { name: 'Power BI', slug: 'powerbi' },
      { name: 'Tableau', slug: 'tableau' },
      { name: 'Looker', slug: 'looker' },
      { name: 'Sigma' },
    ],
  },
  {
    label: 'AI & ML',
    icon: Sparkles,
    tools: [
      { name: 'PyTorch', slug: 'pytorch' },
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'Hugging Face', slug: 'huggingface' },
      { name: 'LangChain', slug: 'langchain' },
      { name: 'OpenAI', slug: 'openai' },
      { name: 'Anthropic', slug: 'anthropic' },
    ],
  },
  {
    label: 'Infra & DevOps',
    icon: Server,
    tools: [
      { name: 'Kubernetes', slug: 'kubernetes' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Terraform', slug: 'terraform' },
      { name: 'GitHub Actions', slug: 'githubactions' },
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
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-aurora/15 ring-1 ring-white/[0.08]">
                    <cat.icon className="h-4 w-4 text-foreground/85" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70">
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

// Simple Icons monochrome CDN — we pull a light-grey icon and rely on tile
// hover for visual lift. The icon is referenced at runtime, not redistributed.
function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}/cbd5e1`;
}

function ToolTile({ tool, delay }: { tool: Tool; delay: number }) {
  const [errored, setErrored] = useState(false);
  const src = tool.localSrc ?? (tool.slug ? iconUrl(tool.slug) : undefined);
  const showImage = src && !errored;

  return (
    <m.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.4, ease: EASE_SOFT, delay }}
      whileHover={{ y: -2 }}
      className={cn(
        'group inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 transition-colors duration-control ease-soft',
        'hover:border-white/[0.18] hover:bg-white/[0.05]',
      )}
    >
      {showImage ? (
        // Plain <img> — CDN serves an already-tiny SVG, no Next image
        // optimisation needed, and onError gives us the wordmark fallback.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden
          width={16}
          height={16}
          className="h-4 w-4 opacity-70 transition-opacity duration-control ease-soft group-hover:opacity-100"
          onError={() => setErrored(true)}
        />
      ) : (
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple transition-transform duration-control ease-soft group-hover:scale-125"
        />
      )}
      <span className="whitespace-nowrap text-sm font-medium tracking-tight text-foreground/85 transition-colors duration-control ease-soft group-hover:text-foreground">
        {tool.name}
      </span>
    </m.span>
  );
}
