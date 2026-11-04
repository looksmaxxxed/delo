import type { ReactNode } from 'react';
import { CircleDollarSign, History } from 'lucide-react';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import type { OrderDetailsSlots } from '../types';

type OrderDetailsViewProps = OrderDetailsSlots & {
  statusPanel: ReactNode;
  documentsSection: ReactNode;
  paymentDialog: ReactNode;
};

export function OrderDetailsView(props: OrderDetailsViewProps) {
  const {
    statusPanel,
    documentsSection,
    paymentDialog,
    information,
    workItems,
    payments,
    activity,
  } = props;

  return (
    <>
      {statusPanel}
      {documentsSection}
      <div className="grid items-stretch gap-6 xl:grid-cols-2">
        {information}
        <SectionCard
          title="Оплата"
          Icon={CircleDollarSign}
          action={paymentDialog}
          className="xl:h-88 flex flex-col p-4 sm:p-6 xl:min-h-0 xl:overflow-hidden"
        >
          {payments}
        </SectionCard>
        {workItems}
        <SectionCard
          title="История"
          Icon={History}
          className="flex flex-col p-4 sm:p-6 xl:h-80 xl:min-h-0 xl:overflow-hidden"
        >
          {activity}
        </SectionCard>
      </div>
    </>
  );
}
