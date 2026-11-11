import type { Metadata } from 'next';

export const BRAND_THEME_COLORS = {
  light: '#ffffff',
  dark: '#0d1117',
} as const;

export const BRAND_ICONS: Metadata['icons'] = {
  icon: [
    {
      url: '/favicons/light/favicon-16x16.png',
      type: 'image/png',
      sizes: '16x16',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/favicons/light/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/favicons/dark/favicon-16x16.png',
      type: 'image/png',
      sizes: '16x16',
      media: '(prefers-color-scheme: dark)',
    },
    {
      url: '/favicons/dark/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  apple: [
    {
      url: '/favicons/light/apple-touch-icon.png',
      type: 'image/png',
      sizes: '180x180',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/favicons/dark/apple-touch-icon.png',
      type: 'image/png',
      sizes: '180x180',
      media: '(prefers-color-scheme: dark)',
    },
  ],
};
