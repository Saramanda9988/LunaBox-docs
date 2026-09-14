import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/layout.shared';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, ...source.getPages().map((page) => ({ url: new URL(page.url, siteUrl).href }))];
}
