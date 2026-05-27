'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { themeColors, ThemeId } from './Home/colourThemes';

const STORAGE_KEY = 'colour-theme';

export default function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    const id = (localStorage.getItem(STORAGE_KEY) ?? 'default') as ThemeId;

    if (id === 'default') {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = id;
    }

    const color = themeColors[id] ?? themeColors.default;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = color;
  }, [pathname]);

  return null;
}
