import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Inter, Outfit } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/shared/components/providers/theme/theme.provider';
import { Toaster } from '@/shared/components/ui/feedback/sonner';
import { env } from '@/config/env';
import type { ReactNode } from 'react';
import { Footer } from '@/shared/components/layout/footer';
import { CookieSettingsProvider } from '@/shared/components/providers/cookie-settings/cookie-settings.provider';
import {
  SEO_SITE_URL,
  SEO_SITE_NAME,
  SEO_DESCRIPTION,
  SEO_PRIVATE_ROBOTS,
} from '@/shared/constants/seo';
import { isProductionDeployment } from '@/shared/utils/deployment';
import { BRAND_ICONS, BRAND_THEME_COLORS } from '@/shared/constants/brand';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_SITE_URL),
  applicationName: SEO_SITE_NAME,
  title: SEO_SITE_NAME,
  description: SEO_DESCRIPTION,
  robots: SEO_PRIVATE_ROBOTS,
  icons: BRAND_ICONS,
  manifest: '/favicons/light/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: SEO_SITE_NAME,
    statusBarStyle: 'default',
  },
  ...(isProductionDeployment() && {
    verification: {
      google: env.GOOGLE_SITE_VERIFICATION,
      yandex: env.YANDEX_SITE_VERIFICATION,
    },
  }),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: BRAND_THEME_COLORS.light },
    { media: '(prefers-color-scheme: dark)', color: BRAND_THEME_COLORS.dark },
  ],
};

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  const { children } = props;

  return (
    <html
      lang="ru"
      className={`${inter.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="dashboard-background min-h-app-viewport flex flex-1 flex-col">
            {children}
            <Toaster />
            <CookieSettingsProvider analyticsEnabled={isProductionDeployment()}>
              <Footer />
            </CookieSettingsProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
