import { Inter, Space_Grotesk } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Display family (Satoshi) is disabled by default because the font is licensed
// and the woff2 must be sourced from Fontshare. The Tailwind preset's
// font-display stack falls through to Inter when `--font-satoshi` is unset,
// so this works without any other code change.
//
// To enable: drop `Satoshi-Variable.woff2` into apps/web/public/fonts/,
// then uncomment the block below and add `satoshi.variable` back to the
// <html> className in app/layout.tsx.
//
// import localFont from 'next/font/local';
// export const satoshi = localFont({
//   src: [{ path: '../public/fonts/Satoshi-Variable.woff2', style: 'normal', weight: '300 900' }],
//   variable: '--font-satoshi',
//   display: 'swap',
//   adjustFontFallback: false,
// });
//
// Fallback export so existing imports keep type-checking.
export const satoshi = { variable: '' } as const;
