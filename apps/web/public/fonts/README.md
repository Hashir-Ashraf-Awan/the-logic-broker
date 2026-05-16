# Fonts

The site expects `Satoshi-Variable.woff2` here for the display family.

**Satoshi is licensed.** Get it from [Fontshare](https://www.fontshare.com/fonts/satoshi)
(free for personal & commercial use; account required for download). Drop the
variable woff2 in this folder and the display font will load automatically.

Until then, `lib/fonts.ts` will surface a missing-file warning in dev and the
site will fall back to Inter — everything still ships, just without the
display family.

If you'd rather avoid the dev warning, comment out the `satoshi` import in
`lib/fonts.ts` and remove the `${satoshi.variable}` token from `app/layout.tsx`.
