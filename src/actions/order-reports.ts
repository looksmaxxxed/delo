'use server';

import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { auth } from '@/shared/config/auth';
import { db } from '@/shared/config/db';
import { ORDER_TERMS_CONFIRMABLE_STATUSES } from '@/shared/constants/orders';
import type { OrderReportEntry, OrderReportSnapshot } from '@/shared/types/order-reports';
import { getOrderReportStorageKey } from '@/shared/utils/order-report';
import { renderOrderReportPdf } from '@/shared/utils/pdf';
import { deleteS3ObjectByKey, uploadToS3 } from '@/shared/utils/s3';
import { getVerifiedSession } from '@/shared/utils/verification';
import type { Prisma } from '@prisma/client';

const ORDER_REPORT_ORDER_INCLUDE = {
  client: {
    select: {
      name: true,
      contact: true,
      company: true,
      inn: true,
    },
  },
  user: {
    select: {
      name: true,
      email: true,
      workTerms: true,
    },
  },
  items: {
    select: {
      name: true,
      description: true,
      price: true,
    },
    orderBy: { id: 'asc' },
  },
  reports: {
    select: { version: true },
    orderBy: { version: 'desc' },
    take: 1,
  },
} satisfies Prisma.OrderInclude;

type OrderReportSource = Prisma.OrderGetPayload<{
  include: typeof ORDER_REPORT_ORDER_INCLUDE;
}>;

function createOrderReportSnapshot(order: OrderReportSource, confirmedAt: Date) {
  return {
    order: {
      id: order.id,
      title: order.title,
      description: order.description,
      price: +order.price,
      startDate: order.startDate?.toISOString() ?? null,
      deadline: order.deadline?.toISOString() ?? null,
      paymentMethod: order.paymentMethod,
    },
    executor: order.user,
    client: order.client,
    items: order.items.map((item) => ({
      name: item.name,
      description: item.description,
      price: +item.price,
    })),
    confirmedAt: confirmedAt.toISOString(),
  } satisfies OrderReportSnapshot;
}

async function generateOrderReport(reportId: string) {
  const report = await db.orderReport.findUniqueOrThrow({
    where: { id: reportId },
    select: {
      id: true,
      orderId: true,
      version: true,
      snapshot: true,
      order: { select: { userId: true } },
    },
  });

  const storageKey = getOrderReportStorageKey({
    userId: report.order.userId,
    orderId: report.orderId,
    reportId: report.id,
    version: report.version,
  });
  let uploaded = false;

  try {
    const snapshot = report.snapshot as OrderReportSnapshot;
    const body = await renderOrderReportPdf(snapshot, report.version);
    await uploadToS3({
      key: storageKey,
      body,
      contentType: 'application/pdf',
      cacheControl: 'private, no-store',
    });
    uploaded = true;

    await db.orderReport.update({
      where: { id: report.id },
      data: {
        status: 'READY',
        storageKey,
        generatedAt: new Date(),
      },
    });

    return 'READY' as const;
  } catch (error) {
    if (uploaded) {
      await deleteS3ObjectByKey(storageKey).catch(() => undefined);
    }

    await db.orderReport.update({
      where: { id: report.id },
      data: { status: 'FAILED' },
    });

    console.error('Failed to generate order report', { reportId, error });
    return 'FAILED' as const;
  }
}

export async function getOrderReports(orderId: string): Promise<OrderReportEntry[]> {
  const session = await auth();
  if (!session) return [];

  return db.orderReport.findMany({
    where: { orderId, order: { userId: session.user.id } },
    select: {
      id: true,
      version: true,
      status: true,
      confirmedAt: true,
      generatedAt: true,
      createdAt: true,
    },
    orderBy: { version: 'desc' },
  });
}

export async function confirmOrderByClient(token: string): Promise<{ error?: string }> {
  const confirmation = await db.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { publicToken: token },
      include: ORDER_REPORT_ORDER_INCLUDE,
    });

    if (!order) notFound();
    if (order.isTermsAccepted) return { orderId: order.id };

    const canConfirm = ORDER_TERMS_CONFIRMABLE_STATUSES.some((status) => status === order.status);
    if (!canConfirm) {
      return { orderId: order.id, error: 'Заказ не готов к подтверждению условий' };
    }

    const confirmedAt = new Date();
    const version = (order.reports[0]?.version ?? 0) + 1;
    const report = await tx.orderReport.create({
      data: {
        orderId: order.id,
        version,
        snapshot: createOrderReportSnapshot(order, confirmedAt),
        confirmedAt,
      },
      select: { id: true },
    });

    await tx.order.update({
      where: { id: order.id },
      data: {
        isTermsAccepted: true,
        confirmedAt,
        ...(order.status === 'SENT' ? { status: 'CONFIRMED' } : {}),
      },
    });
    await tx.activity.create({
      data: { orderId: order.id, type: 'CONFIRMED' },
    });

    return { orderId: order.id, reportId: report.id };
  });

  if (confirmation.error) return { error: confirmation.error };
  if (confirmation.reportId) await generateOrderReport(confirmation.reportId);

  revalidatePath(`/order/${token}`);
  revalidatePath(`/orders/${confirmation.orderId}`);
  return {};
}

export async function retryOrderReport(id: string): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const report = await db.orderReport.findFirst({
    where: { id, order: { userId: session.user.id } },
    select: { id: true, orderId: true, status: true },
  });

  if (!report) return { error: 'Отчёт не найден' };
  if (report.status === 'READY') return {};
  if (report.status !== 'FAILED') return { error: 'Отчёт уже формируется' };

  await db.orderReport.update({
    where: { id: report.id },
    data: { status: 'GENERATING' },
  });

  const status = await generateOrderReport(report.id);
  if (status !== 'READY') return { error: 'Не удалось сформировать отчёт' };

  revalidatePath(`/orders/${report.orderId}`);
  return {};
}
