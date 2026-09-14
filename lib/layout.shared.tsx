import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const siteUrl = 'https://box.lunarain.site';
export const description = '轻量、快速、功能丰富的视觉小说管理与游玩统计工具';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <><Image src="/icon/appicon.png" alt="" width={28} height={28} /><span className="font-semibold">LunaBox</span></>,
      url: '/',
    },
    links: [
      { text: '加入我们', url: '/contribution/' },
    ],
    githubUrl: 'https://github.com/Saramanda9988/LunaBox',
  };
}
