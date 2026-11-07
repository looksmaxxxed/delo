'use client';

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { YandexMetrica } from '@/shared/components/analytics/yandex-metrica';
import { Button } from '@/shared/components/ui/actions/button';
import { LEGAL_PRIVACY_PATH } from '@/shared/constants/legal';
import { useCookieSettings } from '@/shared/components/providers/cookie-settings/cookie-settings.hook';
import { useIsClient } from '@/shared/hooks/use-is-client';
import {
  getAnalyticsConsent,
  getServerAnalyticsConsent,
  saveAnalyticsConsent,
  subscribeAnalyticsConsent,
} from '@/shared/utils/analytics-consent';
import {
  canSendAnalytics,
  filterAnalyticsEvent,
  getMetricaPath,
  isAnalyticsPath,
} from '@/shared/utils/analytics';

type CookieConsentProps = {
  analyticsEnabled: boolean;
};

export function CookieConsent(props: CookieConsentProps) {
  const { analyticsEnabled } = props;
  const pathname = usePathname();
  const isClient = useIsClient();
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsent,
    getServerAnalyticsConsent
  );
  const { isOpen, closeSettings } = useCookieSettings();
  const showBanner = isClient && isOpen;
  const analyticsAllowed = analyticsEnabled && consent !== 'rejected' && canSendAnalytics();
  const trackAnalytics = analyticsAllowed && isAnalyticsPath(pathname);
  const trackMetrica = analyticsAllowed && getMetricaPath(pathname) !== null;

  function acceptAnalytics() {
    saveAnalyticsConsent('accepted');
    closeSettings();
  }

  function rejectAnalytics() {
    saveAnalyticsConsent('rejected');
    closeSettings();
  }

  return (
    <>
      {showBanner && (
        <section
          aria-label="Настройки cookies"
          className="surface-shadow border-border bg-surface text-foreground sm:w-110 fixed inset-x-4 bottom-4 z-30 max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border sm:inset-x-auto sm:bottom-6 sm:right-6"
        >
          <div className="p-5 sm:p-6">
            <h2 className="text-base font-semibold tracking-tight">Мы используем cookies</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              Необходимые cookies помогают сайту работать и сохранять настройки. Дополнительные
              cookies помогают улучшать сервис.
            </p>
            <Link
              href={LEGAL_PRIVACY_PATH}
              className="text-primary focus-visible:outline-ring mt-3 inline-block rounded-sm text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Подробнее о cookies
            </Link>
          </div>
          <div className="border-border bg-muted/25 grid grid-cols-2 gap-3 border-t p-4 sm:px-6">
            <Button
              type="button"
              variant="outline"
              onClick={rejectAnalytics}
              className="border-border bg-surface dark:border-border h-10 px-2.5 text-sm xl:h-11 xl:px-3"
            >
              Отклонить
            </Button>
            <Button
              type="button"
              onClick={acceptAnalytics}
              className="h-10 px-2.5 text-sm xl:h-11 xl:px-3"
            >
              Принять
            </Button>
          </div>
        </section>
      )}
      {trackAnalytics && <SpeedInsights beforeSend={filterAnalyticsEvent} />}
      {trackMetrica && <YandexMetrica />}
    </>
  );
}
