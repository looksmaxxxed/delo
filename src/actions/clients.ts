'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/config/auth';
import { db } from '@/config/db';
import { getVerifiedSession } from '@/shared/utils/verification';
import { getValidationErrorMessage } from '@/shared/utils/validation';
import { ClientSchema, type ClientInput } from '@/shared/schemas/clients';
import { ORDER_TERMS_CONFIRMABLE_STATUSES } from '@/shared/constants/orders';
import type { ClientDetails, ClientListItem } from '@/types/clients';
import { Prisma } from '@prisma/client';

export async function getClients(params: {
  offset: number;
  take: number;
  search?: string;
}): Promise<{ items: ClientListItem[]; hasMore: boolean }> {
  const session = await auth();
  if (!session) return { items: [], hasMore: false };

  const { offset, take, search } = params;
  const searchValue = search?.trim();

  const items = await db.$queryRaw<ClientListItem[]>`
    SELECT
      c.id,
      c.name,
      c.contact,
      c.company,
      c."createdAt",
      COALESCE(SUM(p.amount), 0)::float AS "totalPaid"
    FROM "Client" c
    LEFT JOIN "Order" o ON o."clientId" = c.id
    LEFT JOIN "Payment" p ON p."orderId" = o.id
    WHERE c."userId" = ${session.user.id}
    ${searchValue ? Prisma.sql`AND c.name ILIKE ${`%${searchValue}%`}` : Prisma.empty}
    GROUP BY c.id
    ORDER BY c."createdAt" DESC
    LIMIT ${take}
    OFFSET ${offset}
  `;

  return { items, hasMore: items.length === take };
}

export async function getClient(id: string): Promise<ClientDetails | null> {
  const session = await auth();
  if (!session) return null;

  const client = await db.client.findUnique({
    where: { id, userId: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      _count: {
        select: { orders: true },
      },
    },
  });

  if (!client) return null;

  return {
    id: client.id,
    name: client.name,
    contact: client.contact,
    company: client.company,
    inn: client.inn,
    notes: client.notes,
    ordersTotal: client._count.orders,
    orders: client.orders.map((order) => ({
      id: order.id,
      title: order.title,
      status: order.status,
      price: +order.price,
      createdAt: order.createdAt,
    })),
  };
}

export async function createClient(
  data: ClientInput
): Promise<{ error: string } | { id: string; name: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const { data: parsed, success, error } = ClientSchema.safeParse(data);
  if (!success) return { error: getValidationErrorMessage(error) };

  const client = await db.client.create({
    data: {
      userId: session.user.id,
      name: parsed.name,
      contact: parsed.contact || null,
      company: parsed.company || null,
      inn: parsed.inn || null,
      notes: parsed.notes || null,
    },
  });

  revalidatePath('/clients');
  return { id: client.id, name: client.name };
}

export async function updateClient(id: string, data: ClientInput): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const { data: parsed, success, error } = ClientSchema.safeParse(data);
  if (!success) return { error: getValidationErrorMessage(error) };

  const existing = await db.client.findUnique({ where: { id, userId: session.user.id } });
  if (!existing) return { error: 'Клиент не найден' };

  const nextContact = parsed.contact || null;
  const nextCompany = parsed.company || null;
  const nextInn = parsed.inn || null;
  const termsChanged =
    existing.name !== parsed.name ||
    existing.contact !== nextContact ||
    existing.company !== nextCompany ||
    existing.inn !== nextInn;

  await db.$transaction(async (tx) => {
    await tx.client.update({
      where: { id },
      data: {
        name: parsed.name,
        contact: nextContact,
        company: nextCompany,
        inn: nextInn,
        notes: parsed.notes || null,
      },
    });

    if (termsChanged) {
      await tx.order.updateMany({
        where: {
          clientId: id,
          isTermsAccepted: true,
          status: { in: [...ORDER_TERMS_CONFIRMABLE_STATUSES] },
        },
        data: { isTermsAccepted: false },
      });
    }
  });

  revalidatePath('/clients');
  return {};
}

export async function deleteClient(id: string): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const existing = await db.client.findUnique({ where: { id, userId: session.user.id } });
  if (!existing) return { error: 'Клиент не найден' };

  await db.client.delete({ where: { id } });

  revalidatePath('/clients');
  return {};
}
