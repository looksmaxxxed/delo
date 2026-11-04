import { FileText } from 'lucide-react';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { DetailItem } from '@/shared/components/ui/data/detail-item';
import { AnimatedLink } from '@/shared/components/ui/actions/animated-link';
import { RETURN_TO } from '@/shared/constants/navigation';
import { formatDate } from '@/shared/utils/format';
import type { OrderDetails } from '@/shared/types/orders';

type OrderInformationProps = {
  order: OrderDetails;
};

export function OrderInformation(props: OrderInformationProps) {
  const { order } = props;

  return (
    <SectionCard
      title="Детали заказа"
      Icon={FileText}
      className="xl:h-88 flex flex-col p-4 sm:p-6 xl:min-h-0 xl:overflow-hidden"
    >
      <dl className="flex min-h-0 flex-1 flex-col gap-4 text-sm xl:text-base">
        <DetailItem
          label="Клиент"
          className="flex items-start justify-between gap-6 [&_dd]:min-w-0 [&_dd]:text-right [&_dt]:shrink-0 [&_dt]:text-sm [&_dt]:font-normal"
        >
          <AnimatedLink
            href={`/clients/${order.clientId}?${RETURN_TO}=/orders/${order.id}`}
            className="max-w-full justify-end"
          >
            {order.clientName}
          </AnimatedLink>
        </DetailItem>
        <DetailItem
          label="Создан"
          className="flex items-start justify-between gap-6 [&_dd]:text-right [&_dt]:text-sm [&_dt]:font-normal"
        >
          {formatDate(order.createdAt)}
        </DetailItem>
        {order.startDate && (
          <DetailItem
            label="Дата начала"
            className="flex items-start justify-between gap-6 [&_dd]:text-right [&_dt]:text-sm [&_dt]:font-normal"
          >
            {formatDate(order.startDate)}
          </DetailItem>
        )}
        {order.deadline && (
          <DetailItem
            label="Дедлайн"
            className="flex items-start justify-between gap-6 [&_dd]:text-right [&_dt]:text-sm [&_dt]:font-normal"
          >
            {formatDate(order.deadline)}
          </DetailItem>
        )}
        {order.description && (
          <DetailItem
            label="Описание"
            className="border-border flex flex-col border-t pt-4 xl:min-h-0 xl:flex-1 [&_dd]:mt-2 [&_dd]:leading-relaxed xl:[&_dd]:min-h-0 xl:[&_dd]:flex-1 xl:[&_dd]:overflow-y-auto xl:[&_dd]:pr-2 [&_dt]:shrink-0 [&_dt]:text-sm [&_dt]:font-normal"
          >
            {order.description}
          </DetailItem>
        )}
      </dl>
    </SectionCard>
  );
}
