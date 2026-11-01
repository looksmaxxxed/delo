import type { PublicOrderData } from '@/shared/types/public-orders';

export type PublicOrderSummary = Pick<
  PublicOrderData,
  'status' | 'isTermsAccepted' | 'price' | 'paymentMethod' | 'paymentStatus' | 'totalPaid'
>;
