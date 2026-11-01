import { auth } from '@/shared/config/auth';
import { db } from '@/shared/config/db';
import { getOrderReportFileName } from '@/shared/utils/order-report';
import { getS3Object } from '@/shared/utils/s3';
import type { Prisma } from '@prisma/client';

type OrderReportRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: OrderReportRouteContext) {
  const session = await auth();
  const token = new URL(request.url).searchParams.get('token');

  if (!session && !token) return new Response(null, { status: 401 });

  const access: Prisma.OrderWhereInput[] = [];
  if (session) access.push({ userId: session.user.id });
  if (token) access.push({ publicToken: token });

  const { id } = await context.params;
  const report = await db.orderReport.findFirst({
    where: {
      id,
      status: 'READY',
      order: { OR: access },
    },
    select: {
      storageKey: true,
      version: true,
      orderId: true,
    },
  });

  if (!report?.storageKey) return new Response(null, { status: 404 });

  try {
    const object = await getS3Object(report.storageKey);
    if (!object.Body) return new Response(null, { status: 404 });

    const downloadName = getOrderReportFileName(report.orderId, report.version);
    const headers = new Headers({
      'Content-Type': object.ContentType ?? 'application/pdf',
      'Cache-Control': 'private, no-store',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(downloadName)}`,
    });

    if (object.ContentLength) {
      headers.set('Content-Length', String(object.ContentLength));
    }

    return new Response(object.Body.transformToWebStream(), { headers });
  } catch {
    return new Response(null, { status: 404 });
  }
}
