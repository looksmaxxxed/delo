import { CircleCheck, CircleDollarSign, Clock3 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge } from '@/shared/components/ui/data/badge';
import { DetailItem } from '@/shared/components/ui/data/detail-item';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { PAYMENT_METHOD_OPTIONS_MAP, PAYMENT_STATUS_LABELS } from '@/constants/payments';
import { formatPrice } from '@/shared/utils/format';
import type { PublicOrderSummary } from '../../common/types';

type PaymentInfoSectionProps = {
  order: PublicOrderSummary;
  payments: ReactNode;
};

export function PaymentInfoSection(props: PaymentInfoSectionProps) {
  const { order, payments } = props;

  const { price, paymentMethod, paymentStatus, totalPaid } = order;
  const isPaid = paymentStatus === 'PAID';
  const remaining = Math.max(0, price - totalPaid);

  return (
    <SectionCard
      title="Оплата"
      Icon={CircleDollarSign}
      action={
        <Badge
          variant={isPaid ? 'accent' : 'secondary'}
          size="sm"
          Icon={isPaid ? CircleCheck : Clock3}
        >
          {PAYMENT_STATUS_LABELS[paymentStatus] ?? paymentStatus}
        </Badge>
      }
      className="flex h-full flex-col p-5 sm:p-6"
    >
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex min-h-0 flex-1 flex-col gap-5">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 [&_dd]:mt-1 [&_dt]:uppercase">
            {paymentMethod && (
              <DetailItem label="Способ оплаты">
                {PAYMENT_METHOD_OPTIONS_MAP[paymentMethod]?.label ?? paymentMethod}
              </DetailItem>
            )}
            <DetailItem label="Сумма заказа">{formatPrice(price)}</DetailItem>
          </dl>

          <div className="border-border flex min-h-0 flex-1 flex-col border-y py-4">{payments}</div>
        </div>

        <div className="space-y-5">
          <dl className="bg-muted/40 flex w-full items-start justify-between gap-6 rounded-xl p-4 [&_dd]:mt-1 [&_dt]:uppercase">
            <DetailItem label="Внесено">{formatPrice(totalPaid)}</DetailItem>
            <DetailItem label="Остаток" className="text-right">
              <span className="text-primary font-semibold">{formatPrice(remaining)}</span>
            </DetailItem>
          </dl>
        </div>
      </div>
    </SectionCard>
  );
}
