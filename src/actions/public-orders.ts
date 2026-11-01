'use server';

import { notFound } from 'next/navigation';
import { db } from '@/shared/config/db';
import type { PublicOrderData } from '@/shared/types/public-orders';

export async function getPublicOrder(token: string): Promise<PublicOrderData> {
  const order = await db.order.findUnique({
    where: { publicToken: token },
    include: {
      client: { select: { name: true, contact: true, company: true } },
      user: { select: { name: true, workTerms: true } },
      items: true,
      payments: { orderBy: { paidAt: 'asc' } },
      activities: { orderBy: { createdAt: 'asc' } },
    },
  });

  if (!order) notFound();

  const totalPaid = order.payments.reduce((sum, p) => sum + +p.amount, 0);

  const statusDates: Partial<Record<string, Date>> = { DRAFT: order.createdAt };
  for (const activity of order.activities) {
    if (!statusDates[activity.type]) {
      statusDates[activity.type] = activity.createdAt;
    }
  }

  return {
    id: order.id,
    title: order.title,
    description: order.description,
    status: order.status,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    price: +order.price,
    startDate: order.startDate,
    deadline: order.deadline,
    confirmedAt: order.confirmedAt,
    isTermsAccepted: order.isTermsAccepted,
    createdAt: order.createdAt,
    client: order.client,
    executorName: order.user.name,
    executorWorkTerms: order.user.workTerms,
    items: order.items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: +item.price,
    })),
    payments: order.payments.map((p) => ({
      id: p.id,
      amount: +p.amount,
      note: p.note,
      paidAt: p.paidAt,
      createdAt: p.createdAt,
    })),
    totalPaid,
    statusDates,
  };
}
