import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/utils';

const ROUTES = [
  '',
  'about',
  'services',
  'case-studies',
  'blog',
  'pricing',
  'contact',
  'careers',
  'ai-solutions',
  'privacy',
  'terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE.url}/${r}`.replace(/\/$/, '') || SITE.url,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
