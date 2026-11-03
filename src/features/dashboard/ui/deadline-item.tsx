import { Badge } from '@/shared/components/ui/data/badge';
import { AnimatedLink } from '@/shared/components/ui/actions/animated-link';
import { OrderStatusBadge } from '@/features/orders/common/ui/order-status-badge';
import { DASHBOARD_ROUTE } from '@/shared/constants/routes';
import { RETURN_TO } from '@/shared/constants/navigation';
import type { DashboardDeadline } from '@/shared/types/dashboard';
import { formatPrice } from '@/shared/utils/format';
import { getDeadlineLabel } from '../utils';

type DeadlineItemProps = {
  deadline: DashboardDeadline;
};

export function DeadlineItem(props: DeadlineItemProps) {
  const { deadline } = props;
  const isOverdue = deadline.daysUntil < 0;
  const href = `/orders/${deadline.id}?${RETURN_TO}=${DASHBOARD_ROUTE}`;

  return (
    <li className="border-border flex flex-col gap-3 border-b py-4 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <AnimatedLink href={href} className="text-sm">
          {deadline.title}
        </AnimatedLink>
        <p className="text-muted-foreground mt-1 truncate text-xs">{deadline.clientName}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <OrderStatusBadge status={deadline.status} size="sm" />
        <span className="text-muted-foreground text-xs font-medium tabular-nums">
          {formatPrice(deadline.price)}
        </span>
        <Badge variant={isOverdue ? 'destructive' : 'accent'} size="sm">
          {getDeadlineLabel(deadline.deadline, deadline.daysUntil)}
        </Badge>
      </div>
    </li>
  );
}
