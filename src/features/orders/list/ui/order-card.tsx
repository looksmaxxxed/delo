import Link from 'next/link';
import { CalendarDays, ChevronRight, UserRound } from 'lucide-react';
import { OrderStatusBadge } from '@/features/orders/common/ui/order-status-badge';
import { DetailItem } from '@/shared/components/ui/data/detail-item';
import type { OrderListItem } from '@/shared/types/orders';
import { formatDate, formatPrice } from '@/shared/utils/format';

type OrderCardProps = {
  order: OrderListItem;
};

export function OrderCard(props: OrderCardProps) {
  const { order } = props;

  return (
    <Link
      href={`/orders/${order.id}`}
      prefetch={false}
      className="surface-shadow border-sidebar-border bg-surface hover:border-primary/30 focus-visible:ring-ring block h-full rounded-2xl border p-4 outline-none transition-colors focus-visible:ring-2 motion-reduce:transition-none"
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="line-clamp-2 font-semibold leading-snug">{order.title}</h2>
          <p className="text-muted-foreground mt-1 flex items-center gap-1.5 truncate text-xs">
            <UserRound className="size-3.5 shrink-0" />
            <span className="truncate">{order.clientName}</span>
          </p>
        </div>
        <ChevronRight className="text-muted-foreground mt-0.5 size-5 shrink-0" />
      </div>

      <div className="mt-4">
        <OrderStatusBadge size="sm" status={order.status} />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm [&_dd]:mt-1">
        <DetailItem label="Стоимость">{formatPrice(order.price)}</DetailItem>
        <DetailItem label="Дедлайн" className="text-right">
          <span className="inline-flex items-center justify-end gap-1.5">
            <CalendarDays className="text-muted-foreground size-3.5" />
            {order.deadline ? formatDate(order.deadline) : 'Не указан'}
          </span>
        </DetailItem>
        <DetailItem label="Создан" className="col-span-2">
          {formatDate(order.createdAt)}
        </DetailItem>
      </dl>
    </Link>
  );
}
