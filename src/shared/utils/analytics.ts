import {
  ANALYTICS_PATHS,
  METRICA_PATHS,
  METRICA_DYNAMIC_PATHS,
  METRICA_UTM_PARAMS,
} from '@/shared/constants/analytics';
import { SEO_SITE_URL } from '@/shared/constants/seo';
import { getAnalyticsConsent } from '@/shared/utils/analytics-consent';

export function isAnalyticsPath(pathname: string) {
  return ANALYTICS_PATHS.some((path) => path === pathname);
}

export function canSendAnalytics() {
  return (
    typeof window !== 'undefined' &&
    getAnalyticsConsent() !== 'rejected' &&
    window.location.origin === SEO_SITE_URL
  );
}

export function getMetricaPath(pathname: string) {
  if (METRICA_PATHS.some((path) => path === pathname)) return pathname;
  return METRICA_DYNAMIC_PATHS.find((route) => route.pattern.test(pathname))?.pathname ?? null;
}

export function getMetricaUrl(value: string) {
  try {
    const url = new URL(value, SEO_SITE_URL);
    const pathname = getMetricaPath(url.pathname);
    if (url.origin !== SEO_SITE_URL || !pathname) return null;

    const result = new URL(pathname, SEO_SITE_URL);
    if (isAnalyticsPath(pathname)) {
      for (const key of METRICA_UTM_PARAMS) {
        const value = url.searchParams.get(key);
        if (value !== null) result.searchParams.set(key, value);
      }
    }

    return result.href;
  } catch {
    return null;
  }
}

export function getAnalyticsReferrer() {
  if (!document.referrer) return '';

  try {
    return new URL(document.referrer).origin;
  } catch {
    // Only a nonempty, invalid referrer needs a fallback to prevent the SDK from sending it raw.
    return SEO_SITE_URL;
  }
}

export function filterAnalyticsEvent<T extends { url: string }>(event: T): T | null {
  if (!canSendAnalytics() || !isAnalyticsPath(window.location.pathname)) return null;

  try {
    const url = new URL(event.url, SEO_SITE_URL);
    if (url.origin !== SEO_SITE_URL || !isAnalyticsPath(url.pathname)) return null;

    return { ...event, url: `${url.origin}${url.pathname}` };
  } catch {
    return null;
  }
}
