# The Logic Broker

> Luxury AI-automation agency platform — marketing site, admin dashboard,
> client portal, and the API behind them.

This repo is a pnpm monorepo. Frontend is Next.js 15; backend is Express + TypeScript;
data lives in Postgres via Prisma.

## Quick start

> **You need:** Node 20+, pnpm 9+, Docker Desktop (for the local Postgres).
> If you do not have Docker, you can point `DATABASE_URL` at any Postgres 14+ instance.

```bash
# 1. Install
pnpm install

# 2. Start the database
docker compose up -d db

# 3. Set up env files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# 4. Generate Prisma client and create the schema
pnpm db:generate
pnpm db:push

# 5. (Optional) Seed sample content
pnpm --filter @tlb/db run seed

# 6. Run everything
pnpm dev
```

Then open:

- Web — http://localhost:3000
- API — http://localhost:4000/healthz

## Scripts

| Command                 | What it does |
|-------------------------|--------------|
| `pnpm dev`              | Runs `apps/web` and `apps/api` in parallel |
| `pnpm dev:web`          | Web only |
| `pnpm dev:api`          | API only |
| `pnpm build`            | Builds every workspace |
| `pnpm typecheck`        | TypeScript across all packages |
| `pnpm lint`             | Lint where configured |
| `pnpm db:generate`      | `prisma generate` |
| `pnpm db:push`          | `prisma db push` — fast schema sync (dev only) |
| `pnpm db:migrate`       | `prisma migrate dev` |
| `pnpm db:studio`        | Open Prisma Studio |
| `pnpm format`           | Prettier write |
| `pnpm clean`            | Wipe `node_modules` and build outputs |

## Structure

```
apps/
  web/                Next.js 15 — marketing + admin + portal
  api/                Express + TypeScript REST API
packages/
  db/                 Prisma schema, client, seed
  config/             Shared Tailwind preset + tsconfig presets
docs/
  ARCHITECTURE.md     Build spine and session plan
  DESIGN-SYSTEM.md    Tokens, type scale, motion, primitives
```

## Where things live in `apps/web`

```
app/                  App Router routes
  page.tsx            Home
  about/              About
  services/           Services
  case-studies/       Case studies
  blog/               Blog
  pricing/            Pricing
  contact/            Contact + form
  careers/            Careers
  ai-solutions/       AI Solutions
  admin/              (Will be Clerk-gated in session 6)
  portal/             (Will be Clerk-gated in session 6)
  privacy/  terms/    Legal
  layout.tsx          Root layout, providers, navbar, footer
  globals.css         Design tokens + utilities
  sitemap.ts robots.ts
components/
  marketing/          Site components (navbar, footer, hero, …)
  primitives/         Reusable building blocks (Reveal, MagneticButton, …)
  providers/          Theme + motion providers
lib/                  fonts, seo, utils, animations
public/fonts/         Drop Satoshi-Variable.woff2 here (see README inside)
```

## Where things live in `apps/api`

```
src/
  index.ts            Boot + signal handling
  app.ts              Express composition root
  env.ts              Zod-validated env
  lib/                logger, hash, …
  middleware/         error, rate-limit, (auth in session 6)
  routes/
    health.ts         /healthz, /readyz
    contact.ts        POST /v1/contact
    newsletter.ts     POST /v1/newsletter
    index.ts          Mounts all routers
```

## Deployment outline (full guide lands in session 10)

- **Web** → Vercel, region close to your audience. Connect this repo, set
  `NEXT_PUBLIC_*` and `DATABASE_URL`.
- **API** → Railway service. Connect this repo, set root to `apps/api`,
  build with `pnpm install --frozen-lockfile && pnpm --filter @tlb/api build`,
  start with `node dist/index.js`.
- **DB** → Railway Postgres add-on. Copy `DATABASE_URL` into both web and api.

## Status

This is the end of **session 1**. See [docs/SESSION-1.md](docs/SESSION-1.md)
for what was shipped, what is stubbed, and what comes next.
