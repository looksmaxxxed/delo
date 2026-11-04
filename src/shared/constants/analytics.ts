export const ANALYTICS_CONSENT_KEY = 'delo-analytics-consent-v4';
export const YANDEX_METRICA_ID = 113656366;
export const YANDEX_METRICA_SCRIPT_URL = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRICA_ID}`;
export const ANALYTICS_PATHS = ['/', '/privacy', '/terms'] as const;

export const METRICA_UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export const METRICA_PATHS = [
  ...ANALYTICS_PATHS,
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/dashboard',
  '/clients',
  '/orders',
  '/profile',
  '/reports',
] as const;

export const METRICA_DYNAMIC_PATHS = [
  { pattern: /^\/clients\/[^/]+$/, pathname: '/clients/:id' },
  { pattern: /^\/orders\/[^/]+$/, pathname: '/orders/:id' },
  { pattern: /^\/orders\/[^/]+\/edit$/, pathname: '/orders/:id/edit' },
] as const;

export const ANALYTICS_GOALS = [
  'registration_click',
  'registration_success',
  'client_created',
  'order_created',
] as const;

export const METRICA_MAX_PENDING_GOALS = 20;

export const YANDEX_METRICA_OPTIONS = {
  defer: true,
  ssr: true,
  webvisor: false,
  clickmap: false,
  trackLinks: false,
  trackHash: false,
  sendTitle: false,
  ecommerce: false,
  disableYtm: true,
  accurateTrackBounce: true,
};
