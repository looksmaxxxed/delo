import type { NextConfig } from 'next';
import { SEO_SITE_HOST_PATTERN, SEO_NO_INDEX_HEADERS } from '@/shared/constants/seo';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingIncludes: {
    '/order/\\[token\\]': ['src/assets/fonts/*.ttf', 'src/assets/images/delo-logo-light.png'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/:path*',
        missing: [{ type: 'host', value: SEO_SITE_HOST_PATTERN }],
        headers: SEO_NO_INDEX_HEADERS,
      },
      {
        source: '/api/:path*',
        headers: SEO_NO_INDEX_HEADERS,
      },
      {
        source: '/order/:path*',
        headers: SEO_NO_INDEX_HEADERS,
      },
    ];
  },
};

export default nextConfig;
