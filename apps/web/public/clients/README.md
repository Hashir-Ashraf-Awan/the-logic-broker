# Client logos

Drop SVG (preferred) or PNG logo files for each client here, then add the
`src` to the matching `ClientLogoData` entry in
`apps/web/components/marketing/home/trusted-by.tsx`.

## Naming convention

Lowercase slug of the client name:

```
/public/clients/telenor.svg
/public/clients/jazz.svg
/public/clients/ptcl.svg
/public/clients/mindbridge.svg
/public/clients/uber.svg
/public/clients/zyn.svg
/public/clients/philip-morris.svg
```

## Format

- **SVG preferred.** Single colour, no fills — set `fill="currentColor"` so
  the logo inherits the marquee's muted foreground and lights up on hover.
- **PNG fallback.** Transparent background, ~2× retina (220×64 → ship at
  110×32 displayed).
- Keep files under ~25 KB each.

## Legal note

Only ship logos you have written permission to display. Trademark holders
typically require a brand-usage agreement before letting third parties show
their mark on a marketing site. Until permissions are in hand, the styled
wordmark fallback renders automatically — no code change needed to launch.

## How the fallback works

`components/primitives/client-logo.tsx` renders the wordmark whenever:

1. `src` is not set on the `ClientLogoData`, **or**
2. The image fails to load (404, network, decode error).

So you can wire a `src` optimistically and the marquee will still look
correct if a file is missing.
