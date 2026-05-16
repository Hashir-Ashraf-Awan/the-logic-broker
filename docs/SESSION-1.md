# Session 1 — What shipped, what is stubbed, what is next

> Foundation session. The goal was a runnable monorepo with the design system,
> Prisma schema, navbar/footer, animated Home hero, and an Express API that
> actually responds. Everything below reflects what is in the repo now.

## Boot test (the 60-second smoke test)

1. `pnpm install`
2. `docker compose up -d db`
3. `cp apps/web/.env.example apps/web/.env.local`
4. `cp apps/api/.env.example apps/api/.env`
5. `pnpm db:generate && pnpm db:push`
6. `pnpm dev`

Expected:

- http://localhost:3000 loads with animated hero, working navbar, footer, and
  newsletter form. Theme toggle flips dark/light. Every navbar link reaches a
  real page (no 404s).
- http://localhost:4000/healthz returns `{ ok: true, service: '@tlb/api', uptime: <n> }`.
- http://localhost:4000/readyz returns `{ ok: true, db: 'up' }`.
- POST to http://localhost:4000/v1/contact with JSON body persists a row.
  Use `pnpm db:studio` to inspect.

## What is shipped

**Foundation**
- pnpm workspaces — `apps/web`, `apps/api`, `packages/db`, `packages/config`.
- Shared TS config presets, Tailwind preset, Prettier, EditorConfig, .nvmrc.
- Docker Compose for local Postgres.
- GitHub Actions CI: install, Prisma validate, typecheck, lint-if-present.

**Database**
- Prisma schema with 18 models / 6 enums covering: identity (User + Role), CMS
  (Post, Tag, Service, Testimonial, CaseStudy), lead capture
  (ContactSubmission, NewsletterSubscriber, Booking), client portal (Project,
  Milestone, ProjectFile, ProjectMessage, Invoice), and ops
  (Setting, AuditLog).
- Seed script: admin user, eight Service rows, three Testimonials, one sample Post.

**Design system**
- HSL-channel CSS variables, dark-first with light support, gradients
  (aurora / violet / graphite), grid + noise backgrounds, glass surfaces,
  clamp-based fluid type scale (display through xs), 5-stage motion duration
  scale, two named easings (`soft`, `spring`), reduced-motion respect at the
  CSS layer.
- Three font families: Inter (UI), Space Grotesk (mono/labels), Satoshi
  (display, local — drop in `public/fonts/Satoshi-Variable.woff2`; falls back
  to Inter until you do).

**Web app**
- Root layout with theme provider (next-themes), Framer Motion LazyMotion
  provider (strict, reduced-motion aware), skip-to-content link, JSON-LD
  organization markup, security headers.
- Navbar with scroll-aware glass, animated active-pill, mobile sheet.
- Footer with newsletter form (calls the API), social row, four-column nav.
- **Hero**: cinematic gradient backdrop, canvas particles (throttled, IO-paused
  off-screen), animated headline with gradient sweep, two magnetic CTAs,
  trusted-by row, stat strip — all with stagger entrance.
- Magnetic Button primitive (works for both `<button>` and `<a>` via `href` prop).
- AnimatedGradient, Particles, NoiseOverlay, Reveal, PageShell, ComingSoonSection.
- Contact form with Zod validation, error states, success state.
- Real routes (not 404s) for every nav link: About, Services, Case Studies,
  Blog, Pricing, Contact, Careers, AI Solutions, Privacy, Terms, plus stubs
  for /admin and /portal.
- 404 page (`not-found.tsx`), `sitemap.ts`, `robots.ts`.

**API**
- Express + TypeScript, ESM, NodeNext.
- Zod-validated env on boot. Helmet, CORS allow-list, compression, pino-http.
- Error middleware with structured Zod handling and `HttpError` class.
- Rate limiters (write: 8/min, read: 120/min).
- Endpoints: `GET /healthz`, `GET /readyz`, `POST /v1/contact`,
  `POST /v1/newsletter`. Contact has a honeypot field, IP hashing, and
  persists via Prisma. Newsletter upserts by email.
- Graceful shutdown on SIGINT/SIGTERM.

## What is stubbed (called out so it does not get mistaken for done)

- **Satoshi font**: licensed; Next will warn until you drop the woff2 in
  `apps/web/public/fonts/`. Site falls back to Inter cleanly.
- **/admin and /portal**: real routes, but unauthenticated. Clerk + role
  middleware lands session 6.
- **Privacy & Terms**: placeholder copy. Real legal review session 5.
- **Home sections 2–11**: every section below the hero is a polished
  "in progress" card via `ComingSoonSection`. Lands session 2.
- **Email**: contact and newsletter persist; transactional email via Resend
  is wired up but not enabled. Session 9.
- **AI chatbot widget**: explicitly deferred by you.

## Open follow-ups noted in code

| Where | What |
|-------|------|
| `apps/api/src/routes/contact.ts` | TODO(session 9): transactional email via Resend |
| `apps/web/public/fonts/README.md` | Satoshi must be sourced from Fontshare |
| `apps/web/app/admin/page.tsx` | "Clerk auth + role gate lands session 6" |
| `apps/web/app/portal/page.tsx` | Same — gated in session 6 |

## Next session

Per the session plan in `docs/ARCHITECTURE.md`, session 2 lands the remaining
Home sections (Trusted By marquee, Services grid, Process timeline, Case
Studies, AI Showcase, Testimonials, Pricing, FAQ, Final CTA). The visual bar
set by the hero is the contract for everything that follows.
