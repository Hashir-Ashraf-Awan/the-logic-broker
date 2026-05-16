# Hero background image

Drop a single image here named `hero-bg.jpg` (or .webp/.png) and it will
render behind the gradient layer in the home hero, automatically.

## Format

- 16:9 or wider (the hero is full-bleed; vertical content rarely shows).
- ~2400 × 1350 source, ship as ~1600 × 900 webp/jpg for desktop.
- Dark composition works best — the gradient + foreground text are tuned
  for a dark backdrop. If you ship a light image, the readability tune-up
  is a one-line change in `components/marketing/home/hero.tsx` (raise the
  overlay opacity from `bg-background/40` to `bg-background/70`).

## How the fallback works

Hero looks at `/hero/hero-bg.jpg` first. If missing or it fails to load,
the gradient + particles continue to render alone — the slot is purely
additive, not load-bearing.

## Suggested sources

- Abstract / cinematic: Unsplash search "abstract gradient", "dark fluid",
  "data visualisation"
- Generated: Midjourney / Stable Diffusion prompt e.g. "abstract dark
  gradient with subtle data network, cinematic, 16:9"

Only ship images you have a clear licence to use.
