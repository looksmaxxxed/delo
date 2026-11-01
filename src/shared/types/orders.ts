import type { DocumentType, OrderStatus, PaymentMethod, PaymentStatus } from '@prisma/client';
import type { ActivityEntry, PaymentEntry } from '@/types/payments';

export type OrderListItem = {
  id: string;
  title: string;
  status: string;
  clientId: string;
  clientName: string;
  price: number;
  deadline: Date | null;
  createdAt: Date;
};

export type OrderItemData = {
  id?: string;
  name: string;
  description: string;
  price: number;
};

export type OrderDocumentEntry = {
  id: string;
  type: DocumentType;
  name: string;
  createdAt: Date;
};

export type OrderDetails = {
  id: string;
  title: string;
  description: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  price: number;
  paymentMethod: PaymentMethod | null;
  startDate: Date | null;
  deadline: Date | null;
  publicToken: string;
  sentAt: Date | null;
  confirmedAt: Date | null;
  isTermsAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  clientId: string;
  clientName: string;
  items: OrderItemData[];
  payments: PaymentEntry[];
  documents: OrderDocumentEntry[];
  activities: ActivityEntry[];
};
