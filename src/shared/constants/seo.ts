import { DEMO_ORDER_ROUTE } from './routes';

export const SEO_SITE_URL = 'https://www.delo-doc.ru';
export const SEO_DEMO_ORDER_URL = `${SEO_SITE_URL}${DEMO_ORDER_ROUTE}`;
export const SEO_SITE_HOST = new URL(SEO_SITE_URL).hostname;
export const SEO_SITE_HOST_PATTERN = SEO_SITE_HOST.replace(/\./g, '\\.');

export const SEO_SITE_NAME = 'Delo';
export const SEO_TITLE = 'Delo — заказы, оплаты и аналитика для фрилансеров';
export const SEO_DESCRIPTION =
  'Управляйте клиентами и заказами, согласовывайте условия по ссылке, учитывайте оплаты, следите за показателями на дашборде и сохраняйте PDF-отчёты.';

export const SEO_SOCIAL_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Delo — простой способ вести дела с клиентами. Бесплатно на этапе MVP.',
} as const;

export const SEO_PUBLIC_PATHS = ['/', '/privacy', '/terms'] as const;

export const SEO_PRIVATE_ROBOTS = { index: false, follow: false } as const;
export const SEO_PUBLIC_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
} as const;

export const SEO_NO_INDEX_HEADERS = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
