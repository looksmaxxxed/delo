import type { OrderStatus, PaymentMethod, PaymentStatus } from '@prisma/client';
import type { PaymentEntry } from '@/types/payments';

export type PublicOrderItemData = {
  id: string;
  name: string;
  description: string | null;
  price: number;
};

export type PublicOrderData = {
  id: string;
  title: string;
  description: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  price: number;
  startDate: Date | null;
  deadline: Date | null;
  confirmedAt: Date | null;
  isTermsAccepted: boolean;
  createdAt: Date;
  client: {
    name: string;
    contact: string | null;
    company: string | null;
  };
  executorName: string;
  executorWorkTerms: string | null;
  items: PublicOrderItemData[];
  payments: PaymentEntry[];
  totalPaid: number;
  statusDates: Partial<Record<string, Date>>;
};
