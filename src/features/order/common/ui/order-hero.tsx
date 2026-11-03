import { FileText } from 'lucide-react';
import { Badge } from '@/shared/components/ui/data/badge';
import { DetailItem } from '@/shared/components/ui/data/detail-item';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS } from '@/constants/orders';
import { formatDate } from '@/shared/utils/format';
import type { PublicOrderData } from '@/types/public-orders';

type OrderHeroProps = {
  order: PublicOrderData;
};

export function OrderHero(props: OrderHeroProps) {
  const { order } = props;

  return (
    <SectionCard
      title={order.title}
      titleAs="h1"
      titleClassName="break-words text-xl leading-tight sm:text-2xl"
      truncateTitle={false}
      Icon={FileText}
      action={
        <Badge variant={ORDER_STATUS_VARIANTS[order.status]} size="sm">
          {ORDER_STATUS_LABELS[order.status]}
        </Badge>
      }
      className="p-6 sm:p-8"
    >
      {order.description && (
        <p className="text-muted-foreground max-w-3xl text-sm leading-6 sm:text-base">
          {order.description}
        </p>
      )}

      <dl className="border-primary/10 bg-background/60 mt-6 grid gap-x-6 gap-y-4 rounded-xl border p-4 text-sm sm:grid-cols-2 lg:grid-cols-3 [&_dd]:mt-1 [&_dt]:uppercase">
        <DetailItem label="Исполнитель">{order.executorName}</DetailItem>
        <DetailItem label="Клиент">{order.client.name}</DetailItem>
        {order.client.company && <DetailItem label="Компания">{order.client.company}</DetailItem>}
        {order.deadline && (
          <DetailItem label="Срок">{formatDate(order.deadline, 'd MMMM yyyy')}</DetailItem>
        )}
        <DetailItem label="Создан">{formatDate(order.createdAt, 'd MMMM yyyy')}</DetailItem>
        {order.confirmedAt && (
          <DetailItem label="Подтверждён">
            {formatDate(order.confirmedAt, 'd MMMM yyyy')}
          </DetailItem>
        )}
      </dl>
    </SectionCard>
  );
}
