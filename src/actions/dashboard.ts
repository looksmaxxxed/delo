'use server';

import { OrderStatus, Prisma } from '@prisma/client';
import { auth } from '@/shared/config/auth';
import { db } from '@/shared/config/db';
import {
  DASHBOARD_ACTIVE_ORDER_STATUSES,
  DASHBOARD_DEADLINE_ORDER_STATUSES,
  DASHBOARD_DEFAULT_PERIOD,
  DASHBOARD_PERIOD_VALUES,
  DASHBOARD_RECEIVABLE_ORDER_STATUSES,
  DASHBOARD_STATUS_COLORS,
  DASHBOARD_TIME_ZONE,
  DASHBOARD_TIME_ZONE_OFFSET_MS,
} from '@/shared/constants/dashboard';
import { ORDER_STATUS_LABELS } from '@/shared/constants/orders';
import type {
  DashboardData,
  DashboardGranularity,
  DashboardPeriod,
  DashboardQuery,
  DashboardSeriesPoint,
} from '@/shared/types/dashboard';
import { formatDate } from '@/shared/utils/format';
import { formatDateInputValue, isDateInputValue } from '@/shared/utils/date';

const DAY_MS = 24 * 60 * 60 * 1000;

type DashboardRange = DashboardData['range'] & {
  fromDate: Date;
  toDate: Date;
  previousFromDate: Date | null;
  previousToDate: Date | null;
};

type SeriesRow = {
  bucket: string;
  received: number;
  orderValue: number;
  ordersCount: number;
  clientsCount: number;
};

type PreviousReceivedRow = {
  received: number;
};

type ReceivableRow = {
  amount: number;
  ordersCount: number;
};

type TopClientRow = {
  id: string;
  name: string;
  amount: number;
};

function isDashboardPeriod(value: string | undefined): value is DashboardPeriod {
  return DASHBOARD_PERIOD_VALUES.some((period) => period === value);
}

function parseDateKey(value: string) {
  return new Date(`${value}T12:00:00.000Z`);
}

function addDaysToDateKey(value: string, amount: number) {
  const date = parseDateKey(value);
  date.setUTCDate(date.getUTCDate() + amount);

  return formatDateInputValue(date);
}

function addMonthsToDateKey(value: string, amount: number) {
  const date = parseDateKey(value);
  const day = date.getUTCDate();
  const targetMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1, 12));
  const lastDay = new Date(
    Date.UTC(targetMonth.getUTCFullYear(), targetMonth.getUTCMonth() + 1, 0, 12)
  ).getUTCDate();
  targetMonth.setUTCDate(Math.min(day, lastDay));

  return formatDateInputValue(targetMonth);
}

function getMonthStartKey(value: string) {
  return `${value.slice(0, 7)}-01`;
}

function getWeekStartKey(value: string) {
  const date = parseDateKey(value);
  const daysFromMonday = (date.getUTCDay() + 6) % 7;

  return addDaysToDateKey(value, -daysFromMonday);
}

function getMoscowDateKey(date: Date) {
  return formatDateInputValue(new Date(date.getTime() + DASHBOARD_TIME_ZONE_OFFSET_MS));
}

function getMoscowUtcStart(value: string) {
  const date = parseDateKey(value);

  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
      DASHBOARD_TIME_ZONE_OFFSET_MS
  );
}

function getDaysBetween(from: string, to: string) {
  const fromDate = parseDateKey(from);
  const toDate = parseDateKey(to);

  return Math.round((toDate.getTime() - fromDate.getTime()) / DAY_MS);
}

function getGranularity(period: DashboardPeriod, from: string, to: string): DashboardGranularity {
  if (period === '30d') return 'day';
  if (period === '90d') return 'week';
  if (period === '6m' || period === '1y' || period === 'all') return 'month';

  const rangeDays = getDaysBetween(from, to) + 1;
  if (rangeDays <= 45) return 'day';
  if (rangeDays <= 180) return 'week';

  return 'month';
}

function getPreviousRange(period: DashboardPeriod, from: string, to: string) {
  if (period === 'all') return null;

  if (period === '6m' || period === '1y') {
    const months = period === '1y' ? 12 : 6;

    return {
      from: addMonthsToDateKey(from, -months),
      to: addMonthsToDateKey(to, -months),
    };
  }

  const rangeDays = getDaysBetween(from, to) + 1;
  const previousTo = addDaysToDateKey(from, -1);

  return {
    from: addDaysToDateKey(previousTo, -(rangeDays - 1)),
    to: previousTo,
  };
}

function resolveDashboardRange(
  period: DashboardPeriod,
  query: DashboardQuery,
  earliestDate: Date | null,
  now: Date
): DashboardRange {
  const today = getMoscowDateKey(now);
  const currentYear = today.slice(0, 4);
  const customFrom = isDateInputValue(query.from) ? query.from : null;
  const customTo = isDateInputValue(query.to) ? query.to : null;
  let from: string;
  let to = today;

  switch (period) {
    case '90d':
      from = addDaysToDateKey(today, -89);
      break;
    case '6m':
      from = getMonthStartKey(addMonthsToDateKey(today, -5));
      break;
    case '1y':
      from = `${currentYear}-01-01`;
      break;
    case 'all':
      from = earliestDate ? getMonthStartKey(getMoscowDateKey(earliestDate)) : today;
      break;
    case 'custom':
      if (customFrom && customTo && customFrom <= customTo) {
        from = customFrom;
        to = customTo;
      } else {
        from = addDaysToDateKey(today, -29);
      }
      break;
    case '30d':
    default:
      from = addDaysToDateKey(today, -29);
  }

  const previousRange = getPreviousRange(period, from, to);

  return {
    period,
    from,
    to,
    granularity: getGranularity(period, from, to),
    fromDate: getMoscowUtcStart(from),
    toDate: getMoscowUtcStart(addDaysToDateKey(to, 1)),
    previousFromDate: previousRange ? getMoscowUtcStart(previousRange.from) : null,
    previousToDate: previousRange ? getMoscowUtcStart(addDaysToDateKey(previousRange.to, 1)) : null,
  };
}

function getBucketStartKey(value: string, granularity: DashboardGranularity) {
  if (granularity === 'week') return getWeekStartKey(value);
  if (granularity === 'month') return getMonthStartKey(value);

  return value;
}

function getNextBucketKey(value: string, granularity: DashboardGranularity) {
  if (granularity === 'week') return addDaysToDateKey(value, 7);
  if (granularity === 'month') return addMonthsToDateKey(value, 1);

  return addDaysToDateKey(value, 1);
}

function createBucketKeys(range: DashboardRange) {
  const firstBucket = getBucketStartKey(range.from, range.granularity);
  const lastBucket = getBucketStartKey(range.to, range.granularity);
  const keys: string[] = [];
  let current = firstBucket;

  while (current <= lastBucket) {
    keys.push(current);
    current = getNextBucketKey(current, range.granularity);
  }

  return keys;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getBucketLabels(key: string, granularity: DashboardGranularity) {
  const date = parseDateKey(key);

  if (granularity === 'month') {
    return {
      label: formatDate(date, 'LLL'),
      tooltipLabel: capitalize(formatDate(date, 'LLLL yyyy')),
    };
  }

  if (granularity === 'week') {
    return {
      label: formatDate(date, 'd MMM'),
      tooltipLabel: `Неделя с ${formatDate(date, 'd MMMM yyyy')}`,
    };
  }

  return {
    label: formatDate(date, 'd MMM'),
    tooltipLabel: formatDate(date, 'd MMMM yyyy'),
  };
}

function createSeries(rows: SeriesRow[], range: DashboardRange): DashboardSeriesPoint[] {
  const rowsByBucket = new Map(rows.map((row) => [row.bucket, row]));

  return createBucketKeys(range).map((key) => {
    const row = rowsByBucket.get(key);
    const labels = getBucketLabels(key, range.granularity);

    return {
      key,
      ...labels,
      received: row?.received ?? 0,
      orderValue: row?.orderValue ?? 0,
      ordersCount: row?.ordersCount ?? 0,
      clientsCount: row?.clientsCount ?? 0,
    };
  });
}

function getChangePercent(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : null;

  return Math.round(((current - previous) / previous) * 100);
}

async function getEarliestDataDate(userId: string) {
  const [payment, order, client] = await Promise.all([
    db.payment.findFirst({
      where: { order: { userId } },
      select: { paidAt: true },
      orderBy: { paidAt: 'asc' },
    }),
    db.order.findFirst({
      where: { userId },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    }),
    db.client.findFirst({
      where: { userId },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    }),
  ]);
  const dates = [payment?.paidAt, order?.createdAt, client?.createdAt].filter(
    (date): date is Date => !!date
  );

  return dates.sort((left, right) => left.getTime() - right.getTime())[0] ?? null;
}

async function getPreviousReceived(userId: string, range: DashboardRange) {
  if (!range.previousFromDate || !range.previousToDate) {
    return { received: 0 };
  }

  const rows = await db.$queryRaw<PreviousReceivedRow[]>(Prisma.sql`
    SELECT
      COALESCE(SUM(p.amount), 0)::float8 AS received
    FROM "Payment" p
    INNER JOIN "Order" o ON o.id = p."orderId"
    WHERE o."userId" = ${userId}
      AND p."paidAt" >= ${range.previousFromDate}
      AND p."paidAt" < ${range.previousToDate}
  `);

  return rows[0];
}

function createEmptyDashboardData(range: DashboardRange): DashboardData {
  return {
    range: {
      period: range.period,
      from: range.from,
      to: range.to,
      granularity: range.granularity,
    },
    metrics: {
      received: 0,
      receivedChangePercent: 0,
      orderValue: 0,
      ordersCount: 0,
      averageOrderValue: 0,
      activeOrders: 0,
      inProgressOrders: 0,
      receivable: 0,
      receivableOrders: 0,
    },
    series: [],
    statuses: [],
    topClients: [],
    deadlines: [],
    hasAnyData: false,
  };
}

export async function getDashboardData(query: DashboardQuery): Promise<DashboardData> {
  const session = await auth();
  const period = isDashboardPeriod(query.period) ? query.period : DASHBOARD_DEFAULT_PERIOD;
  const now = new Date();
  if (!session) return createEmptyDashboardData(resolveDashboardRange(period, query, null, now));

  const { id: userId } = session.user;
  const earliestDate = period === 'all' ? await getEarliestDataDate(userId) : null;
  const range = resolveDashboardRange(period, query, earliestDate, now);
  const receivableStatuses = Prisma.join(
    DASHBOARD_RECEIVABLE_ORDER_STATUSES.map((status) => Prisma.sql`${status}`)
  );

  const [
    seriesRows,
    previousReceived,
    activeOrders,
    inProgressOrders,
    receivableRows,
    statusGroups,
    topClientRows,
    deadlines,
    totalOrders,
    totalClients,
  ] = await Promise.all([
    db.$queryRaw<SeriesRow[]>(Prisma.sql`
      WITH events AS (
        SELECT
          date_trunc(
            ${range.granularity},
            timezone(${DASHBOARD_TIME_ZONE}, timezone('UTC', p."paidAt"))
          ) AS bucket,
          p.amount::float8 AS received,
          0::float8 AS order_value,
          0::int AS orders_count,
          0::int AS clients_count
        FROM "Payment" p
        INNER JOIN "Order" o ON o.id = p."orderId"
        WHERE o."userId" = ${userId}
          AND p."paidAt" >= ${range.fromDate}
          AND p."paidAt" < ${range.toDate}

        UNION ALL

        SELECT
          date_trunc(
            ${range.granularity},
            timezone(${DASHBOARD_TIME_ZONE}, timezone('UTC', o."createdAt"))
          ) AS bucket,
          0::float8 AS received,
          o.price::float8 AS order_value,
          1::int AS orders_count,
          0::int AS clients_count
        FROM "Order" o
        WHERE o."userId" = ${userId}
          AND o.status <> 'CANCELLED'
          AND o."createdAt" >= ${range.fromDate}
          AND o."createdAt" < ${range.toDate}

        UNION ALL

        SELECT
          date_trunc(
            ${range.granularity},
            timezone(${DASHBOARD_TIME_ZONE}, timezone('UTC', c."createdAt"))
          ) AS bucket,
          0::float8 AS received,
          0::float8 AS order_value,
          0::int AS orders_count,
          1::int AS clients_count
        FROM "Client" c
        WHERE c."userId" = ${userId}
          AND c."createdAt" >= ${range.fromDate}
          AND c."createdAt" < ${range.toDate}
      )
      SELECT
        to_char(bucket, 'YYYY-MM-DD') AS bucket,
        SUM(received)::float8 AS received,
        SUM(order_value)::float8 AS "orderValue",
        SUM(orders_count)::int AS "ordersCount",
        SUM(clients_count)::int AS "clientsCount"
      FROM events
      GROUP BY bucket
      ORDER BY bucket
    `),
    getPreviousReceived(userId, range),
    db.order.count({
      where: { userId, status: { in: [...DASHBOARD_ACTIVE_ORDER_STATUSES] } },
    }),
    db.order.count({ where: { userId, status: OrderStatus.IN_PROGRESS } }),
    db.$queryRaw<ReceivableRow[]>(Prisma.sql`
      WITH balances AS (
        SELECT
          o.id,
          GREATEST(o.price - COALESCE(SUM(p.amount), 0), 0)::float8 AS balance
        FROM "Order" o
        LEFT JOIN "Payment" p ON p."orderId" = o.id
        WHERE o."userId" = ${userId}
          AND o.status::text IN (${receivableStatuses})
        GROUP BY o.id
      )
      SELECT
        COALESCE(SUM(balance), 0)::float8 AS amount,
        COUNT(*) FILTER (WHERE balance > 0)::int AS "ordersCount"
      FROM balances
    `),
    db.order.groupBy({
      by: ['status'],
      where: {
        userId,
        createdAt: { gte: range.fromDate, lt: range.toDate },
      },
      _count: { _all: true },
      _sum: { price: true },
    }),
    db.$queryRaw<TopClientRow[]>(Prisma.sql`
      SELECT
        c.id,
        c.name,
        SUM(p.amount)::float8 AS amount
      FROM "Payment" p
      INNER JOIN "Order" o ON o.id = p."orderId"
      INNER JOIN "Client" c ON c.id = o."clientId"
      WHERE o."userId" = ${userId}
        AND p."paidAt" >= ${range.fromDate}
        AND p."paidAt" < ${range.toDate}
      GROUP BY c.id, c.name
      ORDER BY amount DESC
      LIMIT 5
    `),
    db.order.findMany({
      where: {
        userId,
        status: { in: [...DASHBOARD_DEADLINE_ORDER_STATUSES] },
        deadline: { not: null },
      },
      select: {
        id: true,
        title: true,
        status: true,
        price: true,
        deadline: true,
        client: { select: { name: true } },
      },
      orderBy: { deadline: 'asc' },
      take: 5,
    }),
    db.order.count({ where: { userId } }),
    db.client.count({ where: { userId } }),
  ]);

  const series = createSeries(seriesRows, range);
  const received = series.reduce((sum, point) => sum + point.received, 0);
  const orderValue = series.reduce((sum, point) => sum + point.orderValue, 0);
  const ordersCount = series.reduce((sum, point) => sum + point.ordersCount, 0);
  const receivable = receivableRows[0];
  const statusGroupsByStatus = new Map(statusGroups.map((group) => [group.status, group]));
  const today = getMoscowDateKey(now);

  return {
    range: {
      period: range.period,
      from: range.from,
      to: range.to,
      granularity: range.granularity,
    },
    metrics: {
      received,
      receivedChangePercent: getChangePercent(received, previousReceived.received),
      orderValue,
      ordersCount,
      averageOrderValue: ordersCount > 0 ? orderValue / ordersCount : 0,
      activeOrders,
      inProgressOrders,
      receivable: receivable.amount,
      receivableOrders: receivable.ordersCount,
    },
    series,
    statuses: Object.values(OrderStatus).map((status) => {
      const group = statusGroupsByStatus.get(status);

      return {
        status,
        label: ORDER_STATUS_LABELS[status],
        tooltipLabel: ORDER_STATUS_LABELS[status],
        orderValue: +(group?._sum.price ?? 0),
        ordersCount: group?._count._all ?? 0,
        color: DASHBOARD_STATUS_COLORS[status],
      };
    }),
    topClients: topClientRows.map((client) => ({
      ...client,
      tooltipLabel: client.name,
    })),
    deadlines: deadlines.flatMap((order) => {
      if (!order.deadline) return [];

      return {
        id: order.id,
        title: order.title,
        clientName: order.client.name,
        status: order.status,
        price: +order.price,
        deadline: order.deadline,
        daysUntil: getDaysBetween(today, getMoscowDateKey(order.deadline)),
      };
    }),
    hasAnyData: totalOrders > 0 || totalClients > 0,
  };
}
