# The Logic Broker — Architecture

> Luxury AI-automation agency platform. Marketing site + Express API + Postgres
> + admin dashboard + client portal. Multi-session build; this doc is the spine.

## High-level shape

```
┌────────────────────────┐    REST (JSON over HTTPS)    ┌─────────────────────┐
│  apps/web (Next.js 15) │ ───────────────────────────► │ apps/api (Express)  │
│  • marketing routes    │                              │  • REST resources   │
│  • /admin (Clerk gate) │ ◄─── webhooks ──────         │  • Clerk webhook    │
│  • /portal (Clerk gate)│                              │  • rate-limited     │
└──────────┬─────────────┘                              └──────────┬──────────┘
           │                                                       │
           │ Server Components fetch via internal client            │ Prisma
           ▼                                                       ▼
     Vercel Edge / Node                                  ┌─────────────────────┐
                                                         │ packages/db (Prisma)│
                                                         │  Postgres (Railway) │
                                                         └─────────────────────┘
```

Authentication: **Clerk** owns identity for both `/admin` and `/portal`.
Roles (`admin`, `client`, `guest`) live in Clerk `publicMetadata` and are also
mirrored to the `User` row on first sign-in via Clerk webhook → `/api/clerk`.

## Monorepo layout

pnpm workspaces, single lockfile, shared tooling.

```
the-logic-broker/
├── apps/
│   ├── web/               Next.js 15 (App Router) — public site + admin + portal
│   └── api/               Express + TypeScript — REST API
├── packages/
│   ├── db/                Prisma schema, migrations, generated client
│   └── config/            Shared tsconfig / tailwind preset / eslint
├── docs/                  Architecture, design-system, deployment notes
├── docker-compose.yml     Local Postgres + api + web for one-command boot
├── pnpm-workspace.yaml
└── package.json           Root scripts (dev/build/lint/test/db)
```

### Why a separate `apps/api`?

The brief listed Express explicitly. For a marketing-heavy build, Next route
handlers would have been simpler — but the Express service also serves the
admin and client-portal needs (background jobs, file uploads, future scheduled
work) without coupling them to Vercel function timeouts.

### Why `packages/db`?

Both `apps/web` (Server Components / admin) and `apps/api` need the same
Prisma client. Centralising it in `packages/db` means one schema, one set of
migrations, no drift.

## Request flows

**Marketing visitor → contact form**
1. `apps/web` renders the form (Server Component shell + client component for state).
2. Submit POSTs to `apps/api /v1/contact` with rate limiting (IP-based, 5/min).
3. API validates with Zod, persists `ContactSubmission`, fires email via Resend (stub for now).
4. Returns `{ ok: true, id }`. Web shows success toast + redirects to thank-you.

**Admin → blog publish**
1. User signs in via Clerk; middleware checks `publicMetadata.role === 'admin'`.
2. Admin UI (in `apps/web/app/(admin)`) uses Server Actions for mutations.
3. Server Action calls Prisma directly (same Node runtime as Next on Vercel).
4. Public blog pages are statically generated with `revalidateTag('blog')` invalidated on publish.

**Client portal → project status**
1. Same Clerk gate, role `client`.
2. UI fetches `/v1/projects` from Express with Clerk JWT in `Authorization`.
3. Express verifies JWT against Clerk JWKS, scopes query to `userId`.

## Environments

| Env       | Web                 | API                 | DB                       |
|-----------|---------------------|---------------------|--------------------------|
| local     | `next dev` :3000    | `tsx watch` :4000   | docker-compose postgres  |
| preview   | Vercel preview      | Railway preview env | Railway preview branch   |
| prod      | Vercel              | Railway             | Railway Postgres         |

## Out-of-scope (deferred)

- AI chatbot widget (explicitly skipped by user)
- Self-hosted analytics (use Vercel Analytics + Plausible later)
- i18n (English only)
- Native mobile

## Session plan

| Session | Outcome |
|---------|---------|
| 1 (this)| Monorepo boots. Design tokens, Prisma schema, navbar/footer, Home hero animated, Express health + contact route. |
| 2       | Remaining Home sections (services, process, case studies, AI showcase, testimonials, pricing, FAQ, final CTA). |
| 3       | About + Services + Case Studies + AI Solutions pages with shared section primitives. |
| 4       | Blog (MDX or DB-backed), Pricing detail, Contact, Careers. |
| 5       | Privacy, Terms, 404/500, full SEO pass (metadata, OG images, sitemap, robots). |
| 6       | Clerk auth + role middleware. Admin shell + first CRUD (blog). |
| 7       | Admin: leads, testimonials, services, settings. |
| 8       | Client portal: projects, files, messages, invoices. |
| 9       | Email (Resend), bookings, newsletter, contact wiring end-to-end. |
| 10      | Docker, CI (lint + typecheck + build + Prisma validate), deployment guide. |
| 11+     | Polish, accessibility audit, Lighthouse pass, performance hardening. |
