import type { Metadata } from 'next';
import { SITE } from './utils';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description = SITE.description,
  path = '/',
  image = '/og/default.png',
  noIndex = false,
}: SeoProps = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const url = `${SITE.url}${path}`;
  const ogImage = image.startsWith('http') ? image : `${SITE.url}${image}`;

  return {
    metadataBase: new URL(SITE.url),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: SITE.twitter,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
  };
}
