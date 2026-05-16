import type { Metadata, Viewport } from 'next';
import './globals.css';

import { inter, spaceGrotesk, satoshi } from '@/lib/fonts';
import { buildMetadata } from '@/lib/seo';
import { cn, SITE } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { MotionProvider } from '@/components/providers/motion-provider';
import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, spaceGrotesk.variable, satoshi.variable)}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main" className="relative">
              {children}
            </main>
            <Footer />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Organization',
                  name: SITE.name,
                  url: SITE.url,
                  email: SITE.email,
                  description: SITE.description,
                }),
              }}
            />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
