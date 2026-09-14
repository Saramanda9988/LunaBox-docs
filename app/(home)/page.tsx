import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownToLine, ArrowRight, ChartColumn, Cloud, Library, Sparkles } from 'lucide-react';
import hero from '@/public/hero.png';
import appPreview from '@/public/image/home4introduce.png';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <div className="home-content">
      <section className="home-hero">
        <Image src={hero} alt="" fill priority sizes="(max-width: 1400px) 100vw, 1400px" className="home-hero-art" />
      </section>

      <section className="home-introduction" aria-label="关于 LunaBox">
        <p>LunaBox 为喜爱<span>GalGame</span>的你打造。以轻巧的桌面应用整理游戏收藏，用<span>游玩记录</span>留存每段旅程，让故事之外的时光也值得珍藏。</p>
        <Link href="/features/" className="home-text-link">认识 LunaBox 的功能 <ArrowRight size={16} aria-hidden /></Link>
      </section>

      <footer className="home-footer"><Link href="/" className="font-semibold text-fd-foreground">LunaBox</Link><p>Released under the AGPL v3 License.</p><p>Copyright © 2025 LunaBox</p></footer>
    </div>
  );
}
