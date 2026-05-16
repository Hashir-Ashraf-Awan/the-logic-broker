# Tool logos

Same pattern as `/public/clients/`. Drop a single-colour SVG per tool here
(filename should match the slug in `components/marketing/home/tools.tsx`),
then set the `src` on that entry.

```
/public/tools/aws.svg
/public/tools/gcp.svg
/public/tools/azure.svg
/public/tools/snowflake.svg
/public/tools/dbt.svg
/public/tools/power-bi.svg
…
```

## Format

- **SVG with `fill="currentColor"`** so the tile inherits theme colour and
  lights up on hover.
- Strip any decorative effects (drop shadows, gradients) — the tile background
  provides the visual weight.

## Until you have logos

The wordmark fallback is intentional and shipping-ready. `ToolTile` renders
the styled tool name in our display font, which keeps the grid coherent
without lifting any brand assets without permission.
