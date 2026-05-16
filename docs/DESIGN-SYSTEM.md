# The Logic Broker — Design System

> Visual language for a luxury AI-agency site. Dark-first, cinematic, restrained.

## Palette

All values are HSL channels (`H S% L%`) so Tailwind opacity modifiers work:
`bg-foreground/60`.

| Token             | Dark (default)     | Light              | Usage |
|-------------------|--------------------|--------------------|-------|
| `--background`    | `0 0% 2%`          | `0 0% 100%`        | Page surface |
| `--background-2`  | `0 0% 5%`          | `0 0% 97%`         | Section alt |
| `--foreground`    | `0 0% 98%`         | `0 0% 6%`          | Body text |
| `--muted`         | `0 0% 12%`         | `0 0% 94%`         | Subdued bg |
| `--muted-foreground` | `0 0% 65%`      | `0 0% 40%`         | Subdued text |
| `--border`        | `0 0% 14%`         | `0 0% 90%`         | Hairlines |
| `--card`          | `0 0% 4%`          | `0 0% 99%`         | Card bg |
| `--accent-blue`   | `217 91% 60%`      | `217 91% 50%`      | Primary action |
| `--accent-purple` | `262 83% 58%`      | `262 83% 50%`      | Secondary action |
| `--accent-cyan`   | `188 94% 56%`      | `188 94% 45%`      | Highlight |
| `--ring`          | `217 91% 60%`      | `217 91% 50%`      | Focus ring |

### Signature gradients

```
--gradient-aurora:  linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(262 83% 58%) 60%, hsl(188 94% 56%) 100%);
--gradient-violet:  linear-gradient(135deg, hsl(262 83% 58%), hsl(188 94% 56%));
--gradient-graphite: linear-gradient(180deg, hsl(0 0% 5%), hsl(0 0% 2%));
```

`bg-aurora` / `bg-violet` / `bg-graphite` are the Tailwind utilities.

## Type system

Three families, one purpose each:

| Stack               | Use |
|---------------------|-----|
| **Satoshi**         | Display: hero, section titles. Tracking tight, weight 600–900. |
| **Inter**           | UI + body. Default. Variable, 400–700. |
| **Space Grotesk**   | Mono-adjacent labels: "01 / DISCOVERY", code, stats. |

Loaded via `next/font` for self-hosting + CLS-free. Satoshi shipped from `/public/fonts`.

### Scale (1.25 ratio, clamped)

| Token   | clamp() value                         | Typical use |
|---------|---------------------------------------|-------------|
| `xs`    | `clamp(0.75rem, 0.74rem + 0.05vw, 0.8rem)`  | meta, labels |
| `sm`    | `clamp(0.875rem, 0.85rem + 0.1vw, 0.95rem)` | small text |
| `base`  | `clamp(1rem, 0.97rem + 0.15vw, 1.125rem)`   | body |
| `lg`    | `clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)` | lead |
| `xl`    | `clamp(1.375rem, 1.3rem + 0.3vw, 1.5rem)`   | subheads |
| `2xl`   | `clamp(1.75rem, 1.6rem + 0.6vw, 2.25rem)`   | h3 |
| `3xl`   | `clamp(2.25rem, 2rem + 1vw, 3rem)`          | h2 |
| `4xl`   | `clamp(3rem, 2.5rem + 2vw, 4.5rem)`         | h1 (sub) |
| `5xl`   | `clamp(3.75rem, 2.8rem + 4vw, 6.5rem)`      | hero |
| `display` | `clamp(4.5rem, 3rem + 6vw, 9rem)`         | mega hero |

## Spacing & rhythm

8pt grid; section vertical rhythm is `py-section` → `clamp(5rem, 4rem + 4vw, 9rem)`.
Container max width: `max-w-screen-2xl` with `px-6 md:px-10 lg:px-14`.

## Surfaces

- **Glass**: `bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]` + subtle inner highlight.
- **Card**: `bg-card border border-border rounded-2xl`.
- **Hairline divider**: `border-t border-white/[0.06]`.

## Motion

- Easing: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (named `ease-soft`).
- Duration scale: `120ms` (micro) / `220ms` (control) / `420ms` (panel) / `800ms` (reveal) / `1400ms` (hero entrance).
- Reveal: `y: 24 → 0, opacity: 0 → 1`, `ease-soft`, `800ms`, staggered 60ms.
- Hover lift: `translateY(-2px)` + glow `box-shadow: 0 0 0 1px hsl(217 91% 60% / 0.4), 0 10px 40px -10px hsl(217 91% 60% / 0.3)`.

All motion respects `prefers-reduced-motion`.

## Components covered in this design system

- Magnetic button (cursor-attracted CTA)
- Glass card
- Animated gradient blob (hero backdrop)
- Particle field (canvas, throttled to 50fps)
- Noise overlay (10% opacity SVG)
- Reveal-on-scroll wrapper (Intersection Observer)
- Animated counter
- Custom cursor (desktop only)

Each will live in `apps/web/components/primitives/`.

## Accessibility floor

- WCAG AA contrast on every text/bg combination.
- All animated content has reduced-motion fallback (opacity-only or none).
- Focus rings always visible; `:focus-visible` with `--ring`.
- Skip-to-content link in root layout.
