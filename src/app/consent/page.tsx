import type { Metadata } from 'next';
import { LegalPage } from '@/features/legal';
import { LEGAL_PERSONAL_DATA_CONSENT } from '@/features/legal/constants';
import { LEGAL_PERSONAL_DATA_CONSENT_PATH } from '@/shared/constants/legal';
import { SEO_PRIVATE_ROBOTS } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных | Delo',
  description: LEGAL_PERSONAL_DATA_CONSENT.description,
  alternates: { canonical: LEGAL_PERSONAL_DATA_CONSENT_PATH },
  robots: SEO_PRIVATE_ROBOTS,
};

export default function ConsentPage() {
  return <LegalPage {...LEGAL_PERSONAL_DATA_CONSENT} />;
}
