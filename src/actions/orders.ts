'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/config/auth';
import { db } from '@/config/db';
import { getDocumentFileName } from '@/shared/utils/document-file';
import { deleteS3ObjectByKey } from '@/shared/utils/s3';
import { getVerifiedSession } from '@/shared/utils/verification';
import { getValidationErrorMessage } from '@/shared/utils/validation';
import { formatDateInputValue } from '@/shared/utils/date';
import { OrderSchema, type OrderInput } from '@/shared/schemas/orders';
import { ORDER_STATUS_TRANSITIONS } from '@/constants/orders';
import { DASHBOARD_ROUTE } from '@/shared/constants/routes';
import type { OrderDetails, OrderListItem } from '@/types/orders';
import type { OrderStatus, Prisma } from '@prisma/client';

type EditableOrder = Prisma.OrderGetPayload<{ include: { items: true } }>;

function normalizeDate(date: Date | null) {
  return date ? formatDateInputValue(date) : '';
}

function normalizeItems(
  items: {
    name: string;
    description: string | null;
    price: string | number | Prisma.Decimal | null | undefined;
  }[]
) {
  return items
    .map((item) => ({
      name: item.name,
      description: item.description ?? '',
      price: +(item.price ?? 0),
    }))
    .sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
}

function haveOrderTermsChanged(existing: EditableOrder, input: OrderInput, price: number) {
  const currentTerms = {
    clientId: existing.clientId,
    title: existing.title,
    description: existing.description ?? '',
    startDate: normalizeDate(existing.startDate),
    deadline: normalizeDate(existing.deadline),
    paymentMethod: existing.paymentMethod ?? null,
    price: +existing.price,
    items: normalizeItems(existing.items),
  };
  const nextTerms = {
    clientId: input.clientId,
    title: input.title,
    description: input.description || '',
    startDate: input.startDate || '',
    deadline: input.deadline || '',
    paymentMethod: input.paymentMethod ?? null,
    price,
    items: normalizeItems(input.items),
  };

  return JSON.stringify(currentTerms) !== JSON.stringify(nextTerms);
}

export async function getOrders(params: {
  offset: number;
  take: number;
  status?: OrderStatus;
  search?: string;
}): Promise<{ items: OrderListItem[]; hasMore: boolean }> {
  const session = await auth();
  if (!session) return { items: [], hasMore: false };

  const { offset, take, status, search } = params;
  const searchValue = search?.trim();

  const filter: Prisma.OrderWhereInput = {
    ...(status ? { status } : {}),
    ...(searchValue ? { title: { contains: searchValue, mode: 'insensitive' } } : {}),
  };

  const rows = await db.order.findMany({
    where: {
      userId: session.user.id,
      ...filter,
    },
    select: {
      id: true,
      title: true,
      status: true,
      clientId: true,
      client: { select: { name: true } },
      price: true,
      deadline: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: take + 1,
  });

  const items: OrderListItem[] = rows.slice(0, take).map((row) => ({
    id: row.id,
    title: row.title,
    status: row.status,
    clientId: row.clientId,
    clientName: row.client.name,
    price: +row.price,
    deadline: row.deadline,
    createdAt: row.createdAt,
  }));

  return { items, hasMore: rows.length > take };
}

export async function getOrder(id: string): Promise<OrderDetails | null> {
  const session = await auth();
  if (!session) return null;

  const order = await db.order.findUnique({
    where: { id, userId: session.user.id },
    include: {
      client: true,
      items: true,
      payments: { orderBy: { paidAt: 'desc' } },
      documents: {
        where: { type: 'INVOICE', url: { not: null } },
        orderBy: { createdAt: 'desc' },
      },
      reports: {
        where: { status: 'READY' },
        select: { id: true },
        orderBy: { version: 'desc' },
        take: 1,
      },
      activities: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!order) return null;

  return {
    id: order.id,
    title: order.title,
    description: order.description,
    status: order.status,
    paymentStatus: order.paymentStatus,
    price: +order.price,
    paymentMethod: order.paymentMethod ?? null,
    startDate: order.startDate,
    deadline: order.deadline,
    publicToken: order.publicToken,
    sentAt: order.sentAt,
    confirmedAt: order.confirmedAt,
    isTermsAccepted: order.isTermsAccepted,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    clientId: order.clientId,
    clientName: order.client.name,
    latestReadyReportId: order.reports[0]?.id ?? null,
    items: order.items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description ?? '',
      price: +item.price,
    })),
    payments: order.payments.map((p) => ({
      id: p.id,
      amount: +p.amount,
      note: p.note,
      paidAt: p.paidAt,
      createdAt: p.createdAt,
    })),
    documents: order.documents.map((document) => ({
      id: document.id,
      type: document.type,
      name: getDocumentFileName(document.url!),
      createdAt: document.createdAt,
    })),
    activities: order.activities.map((a) => ({
      id: a.id,
      type: a.type,
      createdAt: a.createdAt,
    })),
  };
}

export async function searchClients(params: {
  query?: string;
  offset?: number;
  take?: number;
}): Promise<{ id: string; name: string }[]> {
  const { query = '', offset = 0, take = 20 } = params;
  const session = await auth();
  if (!session) return [];

  return db.client.findMany({
    where: {
      userId: session.user.id,
      ...(query && { name: { contains: query, mode: 'insensitive' } }),
    },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
    skip: offset,
    take,
  });
}

export async function createOrder(data: OrderInput): Promise<{ error: string } | { id: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const { data: parsed, success, error } = OrderSchema.safeParse(data);
  if (!success) return { error: getValidationErrorMessage(error) };
  const price = parsed.items.reduce((sum, item) => sum + item.price, 0);

  const order = await db.order.create({
    data: {
      userId: session.user.id,
      clientId: parsed.clientId,
      title: parsed.title,
      description: parsed.description || null,
      startDate: parsed.startDate ? new Date(parsed.startDate) : null,
      deadline: parsed.deadline ? new Date(parsed.deadline) : null,
      price,
      paymentMethod: parsed.paymentMethod ?? null,
      items: {
        create: parsed.items.map((item) => ({
          name: item.name,
          description: item.description || null,
          price: item.price,
        })),
      },
      activities: {
        create: { type: 'DRAFT' },
      },
    },
  });

  revalidatePath('/orders');
  revalidatePath(DASHBOARD_ROUTE);
  return { id: order.id };
}

export async function updateOrder(id: string, data: OrderInput): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const { data: parsed, success, error } = OrderSchema.safeParse(data);
  if (!success) return { error: getValidationErrorMessage(error) };

  const existing = await db.order.findUnique({
    where: { id, userId: session.user.id },
    include: { items: true },
  });
  if (!existing) return { error: 'Заказ не найден' };
  const price = parsed.items.reduce((sum, item) => sum + item.price, 0);
  const shouldResetTerms =
    existing.isTermsAccepted && haveOrderTermsChanged(existing, parsed, price);

  await db.$transaction([
    db.orderItem.deleteMany({ where: { orderId: id } }),
    db.order.update({
      where: { id },
      data: {
        clientId: parsed.clientId,
        title: parsed.title,
        description: parsed.description || null,
        startDate: parsed.startDate ? new Date(parsed.startDate) : null,
        deadline: parsed.deadline ? new Date(parsed.deadline) : null,
        price,
        paymentMethod: parsed.paymentMethod ?? null,
        ...(shouldResetTerms ? { isTermsAccepted: false } : {}),
        items: {
          create: parsed.items.map((item) => ({
            name: item.name,
            description: item.description || null,
            price: item.price,
          })),
        },
      },
    }),
  ]);

  revalidatePath('/orders');
  revalidatePath(`/orders/${id}`);
  revalidatePath(DASHBOARD_ROUTE);
  return {};
}

export async function updateOrderStatus(
  id: string,
  newStatus: OrderStatus
): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const existing = await db.order.findUnique({ where: { id, userId: session.user.id } });
  if (!existing) return { error: 'Заказ не найден' };

  const allowed = ORDER_STATUS_TRANSITIONS[existing.status] ?? [];
  if (!allowed.includes(newStatus)) return { error: 'Недопустимый переход статуса' };

  await db.$transaction([
    db.order.update({
      where: { id },
      data: {
        status: newStatus,
        ...(newStatus === 'SENT' ? { sentAt: existing.sentAt ?? new Date() } : {}),
        ...(newStatus === 'CONFIRMED' ? { confirmedAt: new Date() } : {}),
      },
    }),
    db.activity.create({
      data: {
        orderId: id,
        type: newStatus,
      },
    }),
  ]);

  revalidatePath('/orders');
  revalidatePath(`/orders/${id}`);
  revalidatePath(DASHBOARD_ROUTE);
  return {};
}

export async function deleteOrder(id: string): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const existing = await db.order.findUnique({
    where: { id, userId: session.user.id },
    select: {
      clientId: true,
      documents: { select: { url: true } },
      reports: { select: { storageKey: true } },
    },
  });
  if (!existing) return { error: 'Заказ не найден' };

  await db.order.delete({ where: { id } });

  const storageKeys = [
    ...existing.documents.map((document) => document.url),
    ...existing.reports.map((report) => report.storageKey),
  ];
  await Promise.allSettled(storageKeys.map(deleteS3ObjectByKey));

  revalidatePath('/orders');
  revalidatePath('/reports');
  revalidatePath('/clients');
  revalidatePath(`/clients/${existing.clientId}`);
  revalidatePath(DASHBOARD_ROUTE);
  return {};
}
