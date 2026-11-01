import type { OrderReportStatus, PaymentMethod } from '@prisma/client';

export type OrderReportSnapshot = {
  order: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    startDate: string | null;
    deadline: string | null;
    paymentMethod: PaymentMethod | null;
  };
  executor: {
    name: string;
    email: string;
    workTerms: string | null;
  };
  client: {
    name: string;
    contact: string | null;
    company: string | null;
    inn: string | null;
  };
  items: {
    name: string;
    description: string | null;
    price: number;
  }[];
  confirmedAt: string;
};

export type OrderReportEntry = {
  id: string;
  version: number;
  status: OrderReportStatus;
  confirmedAt: Date;
  generatedAt: Date | null;
  createdAt: Date;
};
