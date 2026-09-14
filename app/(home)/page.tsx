// Adapted from example/docs/app/(home)/page.tsx (Fumadocs).
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import {
  ArrowRight,
  BatteryChargingIcon,
  Gamepad2,
  ShieldCheck,
  TerminalIcon,
} from 'lucide-react';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import { cn } from '@/lib/cn';
import {
  Hero,
  AgnosticBackground,
  CreateAppAnimation,
  PreviewImages,
  Writing,
} from './page.client';
import { Marquee } from './marquee';
import CLIImage from './cli.png';
import Bg2Image from './bg-2.png';
import AIImage from '@/public/image/ai.png';
import ImportImage from '@/public/image/batch-import.png';
import StatsImage from '@/public/image/home4introduce.png';
import OneDriveImage from '@/public/image/onedrive.png';
import CLIPreview from '@/public/image/cli-1.png';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const headingVariants = cva('font-medium tracking-tight', {
  variants: {
    variant: {
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-xl lg:text-2xl',
    },
  },
});

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
        secondary:
          'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const cardVariants = cva('rounded-2xl text-sm p-6 bg-origin-border shadow-lg', {
  variants: {
    variant: {
      secondary: 'bg-brand-secondary text-brand-secondary-foreground',
      default: 'border bg-fd-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default function Page() {
  return (
    <div className="home-content text-landing-foreground pt-4 pb-6 md:pb-12">
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
        <Hero />
        <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          <p className="mt-12 text-xs text-brand-readable font-medium rounded-full p-2 border border-brand/50 w-fit">
            为喜爱 GalGame 的你打造
          </p>
          <h1
            id="home-title"
            className="text-4xl my-8 leading-tighter font-medium xl:text-5xl xl:mb-12"
          >
            轻量, <span className="text-brand-readable">美观</span>,
            功能丰富的
            <br />
            <span className="text-brand-readable">视觉小说</span>
            视觉小说管理与游玩统计工具
          </h1>
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit">
            <Link
              href="/guide/introduction/"
              className={cn(buttonVariants(), 'max-sm:text-sm')}
            >
              快速开始
            </Link>
            <a
              href="https://github.com/Saramanda9988/LunaBox/releases"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'max-sm:text-sm',
              )}
            >
              下载 LunaBox
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2 lg:mt-20">
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
          LunaBox 是为喜爱{' '}
          <span className="text-brand-readable font-medium">GalGame</span>{' '}
          的你打造的视觉小说管理工具。
          轻量，美观，功能丰富，
          留存每段旅程，{' '}
          <span className="text-brand-readable font-medium">让故事之外的时光</span>也值得珍藏
        </p>
        <SupportedProviders />

        <Collections />

        <MoreFeatures />
      </div>
      <footer className="mx-auto mt-12 flex w-full max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 border-t px-6 pt-6 text-xs text-fd-muted-foreground md:px-12">
        <Link href="/" className="mr-auto font-semibold text-fd-foreground">
          LunaBox
        </Link>
        <p>Released under the AGPL v3 License.</p>
        <p>Copyright © 2025 LunaRain_079</p>
      </footer>
    </div>
  );
}

const providers = [
  { name: 'Bangumi', image: 'bangumi-logo.png', width: 124 },
  { name: 'VNDB', image: 'vndb-logo.svg', width: 80 },
  { name: '月幕 Galgame', image: 'ymgal-logo.png', width: 108 },
  { name: 'Steam', image: 'steam-logo.png', width: 110 },
  { name: 'DLsite', image: 'dlsite-logo.png', width: 104 },
  { name: 'Hikarinagi', image: 'hikarinagi-logo.png', width: 150 },
  { name: 'TouchGal', image: 'touchgal-logo.webp', width: 32, showName: true },
  {
    name: 'ErogameScape',
    image: 'erogamescape-logo.png',
    width: 32,
    showName: true,
  },
];

function SupportedProviders() {
  return (
    <section
      aria-labelledby="providers-title"
      className="col-span-full min-w-0 py-6 md:py-8"
    >
      <h2
        id="providers-title"
        className="mb-8 text-center text-sm font-medium tracking-widest text-fd-muted-foreground"
      >
        支持多种数据源
      </h2>
      <Marquee
        pauseOnHover
        repeat={2}
        className="p-0 py-2 [--duration:45s] [--gap:3rem] md:[--gap:4rem] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {providers.map((provider) => (
          <div
            key={provider.name}
            className="flex h-12 shrink-0 items-center gap-3 text-xl font-semibold tracking-tight text-fd-foreground opacity-60 transition-opacity hover:opacity-100"
          >
            <Image
              src={`/providers/${provider.image}`}
              alt={provider.showName ? '' : provider.name}
              width={provider.width}
              height={32}
              className="h-8 object-contain brightness-0 dark:invert"
              style={{ width: provider.width }}
            />
            {provider.showName && <span>{provider.name}</span>}
          </div>
        ))}
      </Marquee>
    </section>
  );
}

function Card({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(cardVariants(), 'flex flex-col', className)}>
      <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function Collections() {
  return (
    <>
      <Card title="为喜爱的游戏，准备一个家">
        <p className="mb-6">
          从第一部视觉小说到丰富的游戏收藏，用分类、搜索与筛选找到下一段故事
        </p>
        <Link
          href="/features/"
          className={cn(buttonVariants(), 'w-fit mt-auto')}
        >
          认识 LunaBox
        </Link>
      </Card>
      <section
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'relative isolate overflow-hidden',
          }),
        )}
      >
        <Image
          src={CLIImage}
          alt=""
          fill
          sizes="(min-width: 1400px) 632px, (min-width: 1024px) 50vw, 100vw"
          className="pointer-events-none object-cover grayscale mix-blend-luminosity opacity-20"
        />
        <div className="relative">
          <h3 className={cn(headingVariants({ variant: 'h3' }), 'mb-6')}>
            用 AI，读懂故事之外的你
          </h3>
          <p className="mb-4 leading-relaxed">
            根据指定时间范围内的游玩时长、频率与常玩游戏，根据人格预设，AI
            为你生成个性化总结
          </p>
        </div>
      </section>
    </>
  );
}

function MoreFeatures() {
  return (
    <>
      <Card title="简约，也功能丰富" className="relative overflow-hidden z-2">
        <p className="mb-20">
          LunaBox 基于 Wails
          构建，以轻巧的桌面应用提供游戏管理、统计与备份功能
        </p>
        <AgnosticBackground />
      </Card>
      <Card title="从熟悉的收藏开始">
        <p className="mb-8">轻松将现有游戏库迁移至 LunaBox</p>
        <div className="mt-auto flex flex-col gap-2 @container mask-[linear-gradient(to_bottom,white,transparent)]">
          {[
            [
              'PotatoVN',
              '/features/import-from-potatovn/',
              '导入游戏与游玩记录',
            ],
            ['Playnite', '/features/import-from-playnite/', '导入游戏与游玩记录'],
            ['Vnite', '/features/import-from-vnite/', '导入游戏与游玩记录'],
            ['ReinaManager', '/features/batch-import/', '导入游戏与游玩记录'],
          ].map(([title, href, description]) => (
            <Link
              href={href}
              key={title}
              className="flex flex-col text-sm gap-2 p-2 border border-dashed border-brand-secondary @lg:flex-row @lg:items-center"
            >
              <span className="font-medium text-nowrap">{title}</span>
              <span className="text-xs flex-1 @lg:text-end">{description}</span>
            </Link>
          ))}
        </div>
      </Card>
    </>
  );
}
