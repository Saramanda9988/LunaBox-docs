import type { Metadata } from 'next';
import heroImage from '@/public/hero.webp';
import { description, siteUrl } from '@/lib/layout.shared';

const previewImage = {
  url: new URL('/hero.webp', siteUrl).href,
  width: heroImage.width,
  height: heroImage.height,
  alt: `LunaBox — ${description}`,
};

export const siteOpenGraph = {
  title: 'LunaBox',
  description,
  url: `${siteUrl}/`,
  siteName: 'LunaBox',
  locale: 'zh_CN',
  type: 'website',
  images: [previewImage],
} satisfies NonNullable<Metadata['openGraph']>;

export const siteTwitter = {
  card: 'summary_large_image',
  title: 'LunaBox',
  description,
  images: [previewImage],
} satisfies NonNullable<Metadata['twitter']>;
