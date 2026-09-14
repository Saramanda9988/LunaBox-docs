'use client';

import { HomeLayout } from 'fumadocs-ui/layouts/home';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import Link from 'fumadocs-core/link';
import Image from 'next/image';
import { Book, Cloud, Library, PlusIcon, Terminal } from 'lucide-react';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import headLight from '@/public/head-light.png';
import headDark from '@/public/head-dark.png';

export default function Layout({ children }: { children: ReactNode }) {
  const options = baseOptions();
  return (
    <HomeLayout
      {...options}
      className="home-layout dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)] [--color-fd-primary:var(--color-brand)]"
      links={[
        {
          type: 'menu',
          on: 'menu',
          text: '文档',
          items: [
            { text: '快速开始', url: '/guide/introduction/', icon: <Book /> },
            { text: '功能详解', url: '/features/', icon: <Library /> },
            { text: '配置指南', url: '/configuration/', icon: <Cloud /> },
            { text: '命令行工具', url: '/features/cli/', icon: <Terminal /> },
            {
              text: '导入游戏',
              url: '/features/batch-import/',
              icon: <PlusIcon />,
            },
          ],
        },
        {
          type: 'custom',
          on: 'nav',
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                <Link href="/guide/introduction/">文档</Link>
              </NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink
                  href="/guide/introduction/"
                  className="md:row-span-2"
                >
                  <div className="-mx-3 -mt-3 mask-[linear-gradient(to_bottom,white_60%,transparent)]">
                    <Image
                      src={headLight}
                      alt="LunaBox 游戏库预览"
                      sizes="400px"
                      className="rounded-t-lg object-cover dark:hidden"
                    />
                    <Image
                      src={headDark}
                      alt="LunaBox 游戏库预览"
                      sizes="400px"
                      className="hidden rounded-t-lg object-cover dark:block"
                    />
                  </div>
                  <p className="font-medium">快速开始</p>
                  <p className="text-fd-muted-foreground text-sm">
                    安装 LunaBox，开始整理游戏收藏。
                  </p>
                </NavbarMenuLink>
                <NavbarMenuLink href="/features/" className="lg:col-start-2">
                  <Library className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">功能详解</p>
                  <p className="text-fd-muted-foreground text-sm">
                    了解游戏管理与游玩统计。
                  </p>
                </NavbarMenuLink>
                <NavbarMenuLink
                  href="/configuration/"
                  className="lg:col-start-2"
                >
                  <Cloud className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">配置指南</p>
                  <p className="text-fd-muted-foreground text-sm">
                    设置 AI 服务与云端备份。
                  </p>
                </NavbarMenuLink>
                <NavbarMenuLink
                  href="/features/cli/"
                  className="lg:col-start-3 lg:row-start-1"
                >
                  <Terminal className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">命令行工具</p>
                  <p className="text-fd-muted-foreground text-sm">
                    在终端中查询与启动游戏。
                  </p>
                </NavbarMenuLink>
                <NavbarMenuLink
                  href="/features/batch-import/"
                  className="lg:col-start-3 lg:row-start-2"
                >
                  <PlusIcon className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">导入游戏</p>
                  <p className="text-fd-muted-foreground text-sm">
                    批量添加与迁移现有收藏。
                  </p>
                </NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        ...(options.links ?? []).filter(
          (item) =>
            item.type !== 'custom' &&
            'url' in item &&
            item.url !== '/guide/introduction/',
        ),
      ]}
    >
      {children}
    </HomeLayout>
  );
}
