import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { source } from '@/lib/source';
import { description as siteDescription } from '@/lib/layout.shared';
import { siteOpenGraph, siteTwitter } from '@/lib/metadata';
import { getMDXComponents } from '@/mdx-components';

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const description = page.data.description?.trim() || siteDescription;
  const previewTitle = `${page.data.title} | LunaBox`;
  return {
    title: page.data.title,
    description,
    alternates: { canonical: page.url },
    openGraph: {
      ...siteOpenGraph,
      title: previewTitle,
      description,
      url: page.url,
    },
    twitter: {
      ...siteTwitter,
      title: previewTitle,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const MDX = page.data.body;
  return (
    <DocsPage breadcrumb={{ enabled: false }} toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsBody><MDX components={getMDXComponents()} /></DocsBody>
    </DocsPage>
  );
}
