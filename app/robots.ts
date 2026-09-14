import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/layout.shared';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
