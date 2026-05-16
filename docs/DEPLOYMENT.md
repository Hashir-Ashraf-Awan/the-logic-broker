# Deployment

> Full operational guide arrives in session 10. This is the working sketch
> so the architecture decisions are visible early.

## Targets

| Service | Host       | Notes |
|---------|-----------|-------|
| Web     | Vercel    | Next.js 15 App Router; Node 20 runtime |
| API     | Railway   | Service: `apps/api`; auto-deploy on `main` |
| DB      | Railway Postgres | Managed; pgvector add-on later if needed |

## Web (Vercel)

1. Connect this repo.
2. Set the project root to `apps/web`.
3. Build command: `pnpm -w build && pnpm --filter @tlb/web build`.
4. Output directory: leave default (`.next`).
5. Env vars: copy from `apps/web/.env.example` and fill in production values.
   `DATABASE_URL` must be reachable from Vercel's region.

## API (Railway)

1. New service from this repo, with root `apps/api`.
2. Build: `pnpm install --frozen-lockfile --filter=@tlb/api... && pnpm --filter @tlb/api build`.
3. Start: `node dist/index.js`.
4. Env vars from `apps/api/.env.example`.
5. Connect the Postgres add-on; both services share the same `DATABASE_URL`.

## Database

- Run `pnpm db:migrate:deploy` on first deploy (and after each schema change).
- Use Railway's branch-DB feature for preview environments so migrations are
  tested before hitting prod.

## Secrets to set

| Name | Web | API | Source |
|------|-----|-----|--------|
| `NEXT_PUBLIC_SITE_URL` | ✓ |   | hard-coded `https://thelogicbroker.com` |
| `NEXT_PUBLIC_API_URL`  | ✓ |   | Railway API URL |
| `DATABASE_URL`         | ✓ | ✓ | Railway DB |
| `WEB_ORIGINS`          |   | ✓ | `https://thelogicbroker.com,https://*.vercel.app` |
| `CLERK_*`              | ✓ | ✓ | Clerk dashboard (session 6) |
| `RESEND_API_KEY`       |   | ✓ | Resend dashboard (session 9) |
| `CLERK_WEBHOOK_SECRET` |   | ✓ | Clerk → API webhook (session 6) |
