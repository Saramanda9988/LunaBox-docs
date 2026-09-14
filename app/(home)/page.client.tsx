'use client';

import {
  type ComponentProps,
  Fragment,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import MainImg from '@/public/head-light.png';
import OpenAPIImg from '@/public/head-dark.png';
import NotebookImg from '@/public/image/home4introduce.png';
import { cva } from 'class-variance-authority';
import HeroLight from '@/public/head-light.png';
import HeroDark from '@/public/head-dark.png';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { PixelMoon } from './pixel-moon';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  {
    ssr: false,
  },
);

const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  {
    ssr: false,
  },
);

export function Hero() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useIsVisible(ref);
  const [showShaders, setShowShaders] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // apply some delay, otherwise on slower devices, it errors with uniform images not being fully loaded.
    const timer = setTimeout(() => {
      setShowShaders(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showShaders && (
        <GrainGradient
          className="hero-grain absolute inset-0"
          colors={
            resolvedTheme === 'dark'
              ? ['#7186A3', '#495568', '#49556800']
              : ['#CAD5E5', '#8094B2', '#49556820']
          }
          colorBack="#00000000"
          softness={1}
          intensity={0.65}
          noise={0.35}
          speed={visible && !reducedMotion ? 1 : 0}
          shape="corners"
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
        />
      )}
      <PixelMoon />
      <div
        ref={ref}
        className={cn(
          'absolute top-[460px] left-[20%] w-[1200px] max-w-none rounded-xl border-2 lg:top-[400px]',
          imageReady ? 'animate-in fade-in duration-400' : 'invisible',
        )}
      >
        <Image
          src={HeroLight}
          alt="LunaBox 游戏库界面"
          sizes="1200px"
          className="block dark:hidden"
          onLoad={() => setImageReady(true)}
          priority
        />
        <Image
          src={HeroDark}
          alt=""
          sizes="1200px"
          className="hidden dark:block"
          onLoad={() => setImageReady(true)}
          priority
        />
      </div>
    </>
  );
}

export function CreateAppAnimation(props: ComponentProps<'div'>) {
  const installCmd = 'lunacli start "CLANNAD"';
  const reducedMotion = useReducedMotion();
  const tickTime = 100;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 3;
  const timeCommandEnd = timeCommandRun + 3;
  const timeWindowOpen = timeCommandEnd + 1;
  const timeEnd = timeWindowOpen + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    if (tick >= timeEnd || reducedMotion) return;
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);

    return () => {
      clearInterval(timer);
    };
  }, [tick >= timeEnd, timeEnd, reducedMotion]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="command_type">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <div className="inline-block h-3 w-1 animate-pulse bg-fd-foreground" />
      )}
    </span>,
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space"> </span>);
  }

  if (tick > timeCommandRun)
    lines.push(
      <Fragment key="command_response">
        {tick > timeCommandRun + 1 && (
          <>
            <span className="font-medium">◇ 查找游戏</span>
            <span>│ CLANNAD</span>
          </>
        )}
        {tick > timeCommandRun + 2 && (
          <>
            <span>│</span>
            <span className="font-medium">◆ 启动游戏</span>
          </>
        )}
        {tick > timeCommandRun + 3 && (
          <>
            <span>│ 开始记录游玩时长</span>
          </>
        )}
      </Fragment>,
    );

  return (
    <div
      {...props}
      onMouseEnter={() => {
        if (tick >= timeEnd && !reducedMotion) {
          setTick(0);
        }
      }}
    >
      {tick > timeWindowOpen && (
        <LaunchAppWindow className="absolute bottom-5 right-4 z-10 animate-in fade-in slide-in-from-top-10" />
      )}
      <pre className="font-mono text-sm min-h-[240px]">
        <code className="grid">{lines}</code>
      </pre>
    </div>
  );
}

function LaunchAppWindow(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden rounded-md border bg-fd-popover shadow-lg',
        props.className,
      )}
    >
      <p className="text-xs text-fd-muted-foreground text-center px-4 py-2 border-b">
        LunaBox · 操作示意
      </p>
      <p className="text-sm px-4 py-2">开始新的故事。</p>
    </div>
  );
}

const previewButtonVariants = cva(
  'w-20 h-8 text-sm font-medium transition-colors rounded-full',
  {
    variants: {
      active: {
        true: 'text-fd-primary-foreground',
        false: 'text-fd-muted-foreground',
      },
    },
  },
);
export function PreviewImages(props: ComponentProps<'div'>) {
  const [active, setActive] = useState(0);
  const previews = [
    {
      image: MainImg,
      name: '浅色',
    },
    {
      image: NotebookImg,
      name: '概览',
    },
    {
      image: OpenAPIImg,
      name: '深色',
    },
  ];

  return (
    <div {...props} className={cn('relative grid', props.className)}>
      <div className="absolute flex flex-row left-1/2 -translate-1/2 bottom-0 z-2 p-0.5 rounded-full bg-fd-card border shadow-xl">
        <div
          role="none"
          className="absolute bg-fd-primary rounded-full w-20 h-8 transition-transform z-[-1]"
          style={{
            transform: `translateX(calc(var(--spacing) * 20 * ${active}))`,
          }}
        />
        {previews.map((item, i) => (
          <button
            key={i}
            className={cn(previewButtonVariants({ active: active === i }))}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {previews.map((item, i) => (
        <Image
          key={i}
          src={item.image}
          alt={`LunaBox ${item.name}界面`}
          className={cn(
            'col-start-1 row-start-1 select-none',
            active === i
              ? 'animate-in fade-in slide-in-from-bottom-12 duration-800'
              : 'invisible',
          )}
        />
      ))}
    </div>
  );
}

const WritingTabs = [
  {
    name: '游戏收藏',
    value: 'writer',
  },
  {
    name: '游玩记录',
    value: 'developer',
  },
  {
    name: '数据备份',
    value: 'automation',
  },
] as const;

export function Writing({
  tabs: tabContents,
}: {
  tabs: Record<(typeof WritingTabs)[number]['value'], ReactNode>;
}) {
  const [tab, setTab] =
    useState<(typeof WritingTabs)[number]['value']>('writer');

  return (
    <div className="col-span-full my-20">
      <h2 className="text-4xl text-brand-readable mb-8 text-center font-medium tracking-tight">
        为每一段故事，留出位置。
      </h2>
      <p className="text-center mb-8 mx-auto w-full max-w-[800px]">
        从整理游戏收藏到记录游玩时光，以熟悉的方式管理喜爱的视觉小说。
      </p>
      <div className="flex justify-center items-center gap-4 text-fd-muted-foreground mb-6">
        {WritingTabs.map((item) => (
          <Fragment key={item.value}>
            <ArrowRight className="size-4 first:hidden" />
            <button
              aria-pressed={item.value === tab}
              className={cn(
                'text-lg font-medium transition-colors',
                item.value === tab && 'text-brand-readable',
              )}
              onClick={() => setTab(item.value)}
            >
              {item.name}
            </button>
          </Fragment>
        ))}
      </div>
      {Object.entries(tabContents).map(([key, value]) => (
        <div
          key={key}
          hidden={key !== tab}
          aria-hidden={key !== tab}
          className={cn('animate-fd-fade-in', key !== tab && 'hidden')}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export function AgnosticBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(ref);
  const reducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-1 mask-[linear-gradient(to_top,white_30%,transparent_calc(100%-120px))]"
    >
      <Dithering
        colorBack="#00000000"
        colorFront="#7186A3"
        shape="warp"
        type="4x4"
        speed={visible && !reducedMotion ? 0.4 : 0}
        className="size-full"
        minPixelRatio={1}
      />
    </div>
  );
}

let observer: IntersectionObserver;
const observerTargets = new WeakMap<
  Element,
  (entry: IntersectionObserverEntry) => void
>();

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

function useIsVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) {
        observerTargets.get(entry.target)?.(entry);
      }
    });

    const element = ref.current;
    if (!element) return;
    observerTargets.set(element, (entry) => {
      setVisible(entry.isIntersecting);
    });
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observerTargets.delete(element);
    };
  }, [ref]);

  return visible;
}
