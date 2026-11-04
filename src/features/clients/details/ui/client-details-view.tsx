'use client';

import { List } from 'lucide-react';
import type { ReactNode } from 'react';
import { ClientOrderItem } from './client-order-item';
import { EmptyList } from '@/shared/components/ui/feedback/empty-list';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import type { ClientDetails } from '@/types/clients';

type ClientDetailsViewProps = {
  client: ClientDetails;
  editor: ReactNode;
};

export function ClientDetailsView(props: ClientDetailsViewProps) {
  const { client, editor } = props;

  return (
    <div className="flex flex-1 flex-col gap-4 xl:min-h-0">
      {editor}

      <SectionCard
        title="Заказы"
        Icon={List}
        action={<span className="text-muted-foreground text-sm">{client.ordersTotal}</span>}
        className="flex min-h-48 flex-col xl:min-h-0 xl:flex-1"
      >
        <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-1">
          <EmptyList items={client.orders} message="Заказов пока нет">
            <div className="space-y-2">
              {client.orders.map((order) => (
                <ClientOrderItem key={order.id} order={order} clientId={client.id} />
              ))}
            </div>
          </EmptyList>
        </div>
      </SectionCard>
    </div>
  );
}
