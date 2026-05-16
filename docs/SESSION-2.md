# Session 2 — Home page complete

> Goal: every Home section from the brief, at the same visual bar as the hero.

## Boot test

```bash
pnpm install          # picks up server-only, accordion deps
pnpm dev:web          # http://localhost:3000
```

Scroll the home page top-to-bottom. Expected, in order:

1. **Hero** — animated gradient, particles, magnetic CTAs, stat strip (session 1)
2. **Trusted By** — infinite marquee of 12 wordmarks; pauses on hover; edge-faded
3. **Services** — 8-card grid, per-card icon + features + animated hover glow
4. **Process** — 5-step timeline with a gradient progress line that fills as you scroll
5. **Case Studies** — 3 tiles with animated stat counters and per-card radial glow
6. **AI Showcase** — chatbot mockup, animated bar+spark dashboard, looping workflow graph
7. **Testimonials** — glass carousel, auto-advance, pause on hover, dots + arrows
8. **Pricing** — 3 tiers, monthly/annual toggle with morph animation
9. **FAQ** — Radix accordion with custom keyframes, 6 questions
10. **Final CTA** — full-bleed gradient closer with magnetic buttons

## New files

```
apps/web/
  app/page.tsx                              (replaced; wires every section)
  components/
    marketing/home/
      trusted-by.tsx
      services.tsx                          (Server Component → Prisma)
      process.tsx
      case-studies.tsx
      ai-showcase.tsx
      testimonials.tsx                      (Server Component → Prisma)
      testimonials-carousel.tsx             (Client carousel)
      pricing.tsx
      faq.tsx
      final-cta.tsx
    primitives/
      section-header.tsx
      animated-counter.tsx
      icon.tsx                              (DB icon-name → lucide resolver)
    ui/
      accordion.tsx                         (shadcn-style Radix)
  lib/data.ts                               (DB-first with fallback)
packages/config/tailwind/preset.cjs         (added accordion keyframes)
```

## How data flows

**Services** and **Testimonials** are Server Components that call helpers in
`apps/web/lib/data.ts`. Each helper:

1. Tries Prisma (`prisma.service.findMany` / `prisma.testimonial.findMany`).
2. Falls back to a hardcoded constant if Prisma throws (no DB yet) **or** the
   table is empty.

This means the page works on a fresh `pnpm dev:web` with no database. Once you
run `pnpm db:push` and `pnpm --filter @tlb/db run seed`, the seeded rows take
over automatically — no code change. When the admin CMS lands in session 7,
edits will flow straight through.

**Case studies**, **process**, **pricing**, and **FAQ** are in-component
constants for now. They will migrate to the CMS in session 7.

## Component notes

- `AnimatedCounter` uses a spring-driven `useMotionValue` and writes directly
  to `textContent` to skip React reconciliation per frame. Respects
  reduced-motion.
- `Process` uses `useScroll({ target, offset })` to drive the vertical
  progress line — the gradient fills as the timeline track passes the viewport.
- `AIShowcase`'s workflow graph uses a `setInterval` to advance a `tick` index
  that lights up one connection at a time. Interval is gated on `inView` and
  reduced-motion.
- `TestimonialsCarousel` auto-advances every 6.5s, pauses on
  `onMouseEnter`/`Leave`, and supports keyboard via dots/arrows.
- `Pricing` uses Framer's `layoutId="cadence-pill"` so the active-state pill
  morphs between Monthly/Annual. Same pattern as the navbar's active link.

## Stubbed (called out, not pretending these are done)

- **Case-study, pricing, FAQ content** is in-component for now. CMS migration
  in session 7.
- **Service icons** beyond the seeded set are not yet mapped in `icon.tsx`.
  Adding more is a one-line change in the `REGISTRY` map.
- **Carousel keyboard focus** moves to the active dot on click; full
  `aria-live="polite"` announcement of the active quote ships in the
  accessibility pass (session 11).
- **Animation budget**: the workflow graph and dashboard demo are intentionally
  cheap (no canvas). If you want richer demos, that is a dedicated session.

## Bumps to install

```bash
pnpm install
```

picks up:
- `server-only@^0.0.1` (was missing in session 1; safety guard for
  `lib/data.ts`)

That is the only new top-level dep. Radix accordion, framer-motion, and
lucide-react were already in session 1.

## What changed elsewhere

- `packages/config/tailwind/preset.cjs` — added `accordion-down` and
  `accordion-up` keyframes that the Radix accordion uses to animate height
  from `var(--radix-accordion-content-height)`.

## Next session

Per the plan in `docs/ARCHITECTURE.md`, **session 3** lands the About,
Services, Case Studies, and AI Solutions inner pages with their own section
primitives (team grid, capability deep-dives, case-study detail layout,
animated architecture diagrams). The Home is the visual contract for what
those pages should feel like.
