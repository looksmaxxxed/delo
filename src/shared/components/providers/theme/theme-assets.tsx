'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BRAND_THEME_COLORS } from '@/shared/constants/brand';

export function ThemeAssets() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== 'light' && resolvedTheme !== 'dark') return;

    const icons = document.querySelectorAll<HTMLLinkElement>(
      'link[rel~="icon"][href^="/favicons/"]'
    );
    const appleIcons = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="apple-touch-icon"][href^="/favicons/"]'
    );

    for (const icon of [...icons, ...appleIcons]) {
      icon.media = icon.getAttribute('href')?.startsWith(`/favicons/${resolvedTheme}/`)
        ? 'all'
        : 'not all';
    }

    const manifest = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (manifest) manifest.href = `/favicons/${resolvedTheme}/manifest.webmanifest`;

    const themeColors = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
    for (const themeColor of themeColors) {
      themeColor.content = BRAND_THEME_COLORS[resolvedTheme];
    }
  }, [resolvedTheme]);

  return null;
}
