import type { ReactNode } from 'react';
import type { PublicOrderData } from '@/shared/types/public-orders';

export type PublicOrderSummary = Pick<
  PublicOrderData,
  'status' | 'isTermsAccepted' | 'price' | 'paymentMethod' | 'paymentStatus' | 'totalPaid'
>;

export type PublicOrderSlots = {
  hero: ReactNode;
  statusProgress: ReactNode;
  workItems: ReactNode;
  workTerms: ReactNode;
  payments: ReactNode;
};
