'use client';

import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { translations } from '@/lib/translations';
import SearchDialog from './search';

export function Provider({ children }: { children: ReactNode }) {
  return <RootProvider i18n={i18nProvider(translations)} search={{ SearchDialog }}>{children}</RootProvider>;
}
