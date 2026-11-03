import { formatDate, formatPrice } from '@/shared/utils/format';
import { type ColumnDef } from '@tanstack/react-table';
import { Banknote, CalendarDays, FileText, Tag, UserRound } from 'lucide-react';
import { OrderStatusBadge } from '@/features/orders/common/ui/order-status-badge';
import { AnimatedLink } from '@/shared/components/ui/actions/animated-link';
import { RETURN_TO } from '@/shared/constants/navigation';
import type { OrderListItem } from '@/types/orders';
import { ORDER_STATUS_LABELS } from '@/shared/constants/orders';
import type { SelectOption } from '@/shared/types/forms';

export const ORDER_STATUS_FILTER_OPTIONS: SelectOption[] = [
  { value: 'ALL', label: 'Все статусы' },
  ...Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({ value, label })),
];

export const ORDERS_TABLE_COLUMNS: ColumnDef<OrderListItem>[] = [
  {
    id: 'order',
    accessorFn: (row) => row.title,
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <FileText className="size-3.5" />
        Заказ
      </span>
    ),
    size: 360,
    cell: ({ row }) => {
      const { title, createdAt } = row.original;

      return (
        <div className="min-w-0">
          <div className="text-foreground truncate font-medium">{title}</div>
          <div className="text-muted-foreground truncate text-xs">
            Создан {formatDate(createdAt)}
          </div>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'clientName',
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <UserRound className="size-3.5" />
        Клиент
      </span>
    ),
    size: 240,
    cell: ({ row }) => (
      <AnimatedLink
        href={`/clients/${row.original.clientId}?${RETURN_TO}=/orders`}
        className="text-muted-foreground max-w-full"
        stopPropagation
      >
        {row.original.clientName}
      </AnimatedLink>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'deadline',
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="size-3.5" />
        Дедлайн
      </span>
    ),
    size: 160,
    cell: ({ getValue }) => {
      const val = getValue<Date | null>();

      return (
        <span className="text-muted-foreground tabular-nums">{val ? formatDate(val) : '—'}</span>
      );
    },
    meta: { align: 'right' },
  },
  {
    accessorKey: 'price',
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <Banknote className="size-3.5" />
        Стоимость
      </span>
    ),
    size: 160,
    cell: ({ row }) => {
      const { price } = row.original;

      return <span className="font-medium tabular-nums">{formatPrice(price)}</span>;
    },
    meta: { align: 'right' },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <Tag className="size-3.5" />
        Статус
      </span>
    ),
    size: 180,
    cell: ({ row }) => <OrderStatusBadge size="sm" status={row.original.status} />,
    meta: { align: 'right' },
  },
];
