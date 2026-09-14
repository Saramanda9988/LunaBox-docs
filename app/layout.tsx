import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Provider } from '@/components/provider';
import { description, siteUrl } from '@/lib/layout.shared';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'LunaBox', template: '%s | LunaBox' },
  description,
  icons: { icon: '/icon/appicon.png' },
  openGraph: { title: 'LunaBox', description, locale: 'zh_CN', type: 'website', siteName: 'LunaBox' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
