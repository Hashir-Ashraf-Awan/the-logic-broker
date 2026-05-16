# Deployment — push to live, end-to-end

> Goal: every `git push` to `main` rebuilds the site and goes live on your
> GoDaddy domain in about 60–90 seconds. Free tier covers it.

## Architecture for launch

```
┌──────────────┐   git push        ┌─────────────┐   build + deploy   ┌──────────────┐
│  Your laptop │ ───────────────►  │   GitHub    │  ───────────────► │    Vercel    │
└──────────────┘                   └─────────────┘                    └───────┬──────┘
                                                                              │
                                          CNAME / A record                    ▼
                                                                       ┌──────────────┐
                                                                       │ thelogic…com │
                                                                       │   (GoDaddy)  │
                                                                       └──────────────┘
```

The site (frontend + API routes) all run on Vercel. The Express service in
`apps/api/` and the local Postgres are not needed for the launch — contact
form + newsletter use Next.js API routes (`apps/web/app/api/*`) so they ship
in the same deploy.

When you want a real database later, the additions are:
- Provision Postgres (Neon, Supabase, or Railway).
- Set `DATABASE_URL` in Vercel env.
- Vercel re-runs the build; Prisma client picks it up automatically.

Until then, all DB-backed reads (Services / Testimonials) fall through to
hard-coded fallbacks. The site looks correct without any database.

---

## Step 0 — Move off OneDrive (do this once)

OneDrive sync corrupts `.git` directories. Strong recommendation: move
before initialising git. ~30 seconds.

In **a fresh PowerShell window outside VSCode** (close VSCode first):

```powershell
# 1. Make the new home
mkdir C:\dev -Force

# 2. Move the project
Move-Item "$env:USERPROFILE\OneDrive - National University of Sciences & Technology\Desktop\Website" C:\dev\Website

# 3. Reopen in VSCode at the new path
code C:\dev\Website
```

After this, every command in this guide assumes you are working from `C:\dev\Website`.

---

## Step 1 — Reinstall dependencies at the new path

Old `node_modules` had OneDrive paths baked in. Wipe and reinstall:

```powershell
Remove-Item -Recurse -Force node_modules, apps\web\node_modules, apps\web\.next, apps\api\node_modules, packages\db\node_modules -ErrorAction SilentlyContinue
pnpm install
```

Verify it boots locally before moving on:

```powershell
pnpm dev:web
# Open http://localhost:3000 — should match what you had before the move.
```

---

## Step 2 — Initialise git and commit

```powershell
git init
git branch -M main
git add .
git commit -m "Initial commit — The Logic Broker sessions 1 + 2"
```

If git asks for `user.name` / `user.email` first:

```powershell
git config --global user.name "Taha Dar"
git config --global user.email "taha.dar@norstella.com"
```

---

## Step 3 — Create the GitHub repo and push

1. Go to https://github.com/new
2. Repo name: `the-logic-broker` (or anything you like). **Private** is fine.
3. **Do not** initialise with a README, .gitignore, or licence — the repo already has them.
4. Click **Create repository**.
5. GitHub shows commands. Copy the **HTTPS** URL it gives you (looks like
   `https://github.com/<your-username>/the-logic-broker.git`).

Back in PowerShell:

```powershell
git remote add origin https://github.com/<your-username>/the-logic-broker.git
git push -u origin main
```

GitHub may prompt for a credential — use a Personal Access Token (Settings
→ Developer settings → Personal access tokens → Fine-grained) with **read +
write** on this single repo.

Confirm the code is on GitHub before continuing.

---

## Step 4 — Connect Vercel

1. Go to https://vercel.com and sign in **with your GitHub account**.
2. Click **Add New… → Project**.
3. Pick the `the-logic-broker` repo and click **Import**.
4. **Configure project** screen:

   | Field                  | Value                                    |
   |------------------------|------------------------------------------|
   | Project Name           | `the-logic-broker` (or anything)         |
   | Framework Preset       | Next.js (auto-detected — leave it)       |
   | **Root Directory**     | **`apps/web`** ← important, click *Edit* |
   | Build Command          | (default — leave empty)                  |
   | Output Directory       | (default — leave empty)                  |
   | Install Command        | (default — leave empty)                  |
   | Node.js Version        | 20.x                                     |

5. **Environment Variables** — leave empty for the first deploy. Add later
   when you have a Postgres URL:

   | Name                       | Where it goes              | When to add  |
   |----------------------------|----------------------------|--------------|
   | `DATABASE_URL`             | Production + Preview       | When DB live |
   | `NEXT_PUBLIC_SITE_URL`     | Production                 | After DNS    |

6. Click **Deploy**. First build takes ~3–4 minutes (subsequent ones ~60s).

When it finishes, Vercel gives you a URL like
`the-logic-broker-<hash>.vercel.app`. Open it — that is the live site.

Every subsequent `git push` to `main` triggers a fresh production deploy
automatically. Every PR gets a preview URL.

### If the first build fails

Most common causes:

- **Prisma generate failure**: Vercel sometimes needs `prisma generate` to
  re-run during build. Add this to Vercel → Settings → General → Build &
  Development Settings → Build Command:
  ```
  pnpm --filter @tlb/db exec prisma generate && pnpm --filter @tlb/web build
  ```
- **Workspace not detected**: in Project Settings → General → Build &
  Development Settings → Install Command, set:
  ```
  pnpm install --frozen-lockfile
  ```

Paste the build log to me if anything else trips.

---

## Step 5 — Point your GoDaddy domain at Vercel

In Vercel:

1. Open the project → **Settings → Domains**.
2. Type your domain (e.g. `thelogicbroker.com`) and click **Add**.
3. Vercel asks how you want to use it:
   - **Add** `thelogicbroker.com` (the root).
   - **Add** `www.thelogicbroker.com` (the www variant) and set it to
     **Redirect to** the root.
4. Vercel shows you the DNS records you need to add. Keep this tab open.

In GoDaddy (https://dcc.godaddy.com → Domains → your domain → DNS):

For the **root** (`thelogicbroker.com`):

| Type  | Name | Value          | TTL      |
|-------|------|----------------|----------|
| A     | @    | `76.76.21.21`  | 600s     |

(Vercel may show a different IP — always use the one in the Vercel UI.)

For **www**:

| Type  | Name | Value                  | TTL  |
|-------|------|------------------------|------|
| CNAME | www  | `cname.vercel-dns.com` | 600s |

**Delete** any existing conflicting records (GoDaddy parking pages, default
A records pointing at `Parked` or `WebsiteBuilder`).

DNS usually propagates in 5–30 minutes; sometimes up to a few hours.
Vercel auto-issues a free Let's Encrypt SSL cert as soon as it sees the
records resolve.

Refresh the Vercel Domains page; you should see a green check next to each
domain when ready.

---

## Step 6 — Verify and tighten

Once `https://thelogicbroker.com` loads:

1. **Set `NEXT_PUBLIC_SITE_URL`** in Vercel env to `https://thelogicbroker.com`
   so OpenGraph + canonical links are correct. Redeploy.
2. **Test the contact form** on `/contact`. Submit a real message. Without
   `DATABASE_URL`, the API route logs the submission and returns a soft
   success (the user still sees a thank-you state). Once you add the DB,
   it persists.
3. **Lighthouse audit** in Chrome DevTools — aim for 90+ across the board.
   Open a ticket if you see anything red.

---

## How the CI/CD loop now works

```
edit code   →   git commit -m "..."   →   git push   →   Vercel builds   →   live
```

- Push to `main` = production deploy.
- Push to any other branch (or open a PR) = preview deploy on a unique URL,
  perfect for reviewing changes before merging.
- Rollback: Vercel → Deployments → pick any prior build → **Promote to
  Production**. One click.

You never touch Vercel again after step 4 unless you change env vars or
domains.

---

## Adding Postgres later (5-minute add)

When you want real CMS data, pick the simplest managed option:

**Option A: Neon (recommended)**
1. https://neon.tech → New Project → free tier.
2. Copy the connection string.
3. Vercel → your project → Settings → Environment Variables → add
   `DATABASE_URL` with the value, scope to **Production + Preview**.
4. Trigger a redeploy (push any commit, or use the Vercel UI's "Redeploy").
5. Run migrations once locally:
   ```powershell
   pnpm db:push
   pnpm --filter @tlb/db run seed
   ```

The site continues to render without `DATABASE_URL` set — only the DB-backed
sections light up once it is there.

**Option B: Supabase / Railway** — same idea, swap the provider.

---

## Reference: what each file does for deploy

| File                              | Role                                            |
|-----------------------------------|-------------------------------------------------|
| `package.json` (root)             | `packageManager: pnpm@9.12.0` — Vercel reads it |
| `pnpm-workspace.yaml`             | Tells Vercel this is a monorepo                 |
| `apps/web/next.config.ts`         | Security headers, image hosts                   |
| `apps/web/app/api/contact/route.ts` | Contact endpoint, runs on Vercel              |
| `apps/web/app/api/newsletter/route.ts` | Newsletter endpoint, runs on Vercel        |
| `packages/db/package.json`        | `postinstall: prisma generate` — runs on Vercel |
| `.github/workflows/ci.yml`        | Pre-push lint/typecheck (optional CI gate)      |
