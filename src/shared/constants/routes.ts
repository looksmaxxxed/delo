export const ROOT_ROUTE = '/';
export const DEMO_ORDER_ROUTE = '/order/demo';
export const DASHBOARD_ROUTE = '/dashboard';
export const PROFILE_ROUTE = '/profile';
export const LOGIN_ROUTE = '/login';
export const INVALID_SESSION_ROUTE = '/api/auth/invalid-session';

export const AUTH_ROUTES = [
  LOGIN_ROUTE,
  '/register',
  '/forgot-password',
  '/reset-password',
] as const;

export const PUBLIC_ROUTES = [
  ROOT_ROUTE,
  '/order',
  '/verify-email',
  '/terms',
  '/privacy',
  '/consent',
  '/api/auth',
] as const;

export const APP_ROUTES = [
  DASHBOARD_ROUTE,
  '/clients',
  '/orders',
  PROFILE_ROUTE,
  '/reports',
] as const;

export const PROTECTED_ROUTES = [...APP_ROUTES, '/api/documents'] as const;
