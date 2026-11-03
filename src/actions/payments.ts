'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/config/db';
import { calcPaymentStatus } from '@/shared/utils/payment';
import { getVerifiedSession } from '@/shared/utils/verification';
import { getValidationErrorMessage } from '@/shared/utils/validation';
import { PaymentSchema, type PaymentInput } from '@/shared/schemas/payments';
import { DASHBOARD_ROUTE } from '@/shared/constants/routes';

export async function addPayment(orderId: string, data: PaymentInput): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const { data: parsed, success, error } = PaymentSchema.safeParse(data);
  if (!success) return { error: getValidationErrorMessage(error) };

  const order = await db.order.findUnique({
    where: { id: orderId, userId: session.user.id },
    include: { payments: true },
  });
  if (!order) return { error: 'Заказ не найден' };

  const existingPaid = order.payments.reduce((sum, p) => sum + +p.amount, 0);
  const newTotal = existingPaid + parsed.amount;
  const orderPrice = +order.price;
  const newPaymentStatus = calcPaymentStatus(newTotal, orderPrice);

  await db.$transaction([
    db.payment.create({
      data: {
        orderId,
        amount: parsed.amount,
        paidAt: new Date(parsed.paidAt),
        note: parsed.note || null,
      },
    }),
    db.order.update({
      where: { id: orderId },
      data: { paymentStatus: newPaymentStatus },
    }),
    db.activity.create({
      data: {
        orderId,
        type: 'PAYMENT',
      },
    }),
  ]);

  revalidatePath(`/orders/${orderId}`);
  revalidatePath(DASHBOARD_ROUTE);
  return {};
}
