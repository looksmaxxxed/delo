import { EmptyList } from '@/shared/components/ui/feedback/empty-list';
import type { PaymentEntry } from '@/shared/types/payments';
import { PublicPaymentItem } from './public-payment-item';

type PublicPaymentsProps = { payments: PaymentEntry[] };

export function PublicPayments(props: PublicPaymentsProps) {
  const { payments } = props;

  return (
    <EmptyList items={payments} message="Платежей пока нет">
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <div className="text-muted-foreground mb-2 grid grid-cols-[1fr_auto] gap-x-4 text-xs font-bold">
          <span>Сумма</span>
          <span className="text-right">Дата</span>
        </div>
        <div className="min-h-0 w-full flex-1">
          <div className="space-y-2">
            {payments.map((payment) => (
              <PublicPaymentItem key={payment.id} payment={payment} />
            ))}
          </div>
        </div>
      </div>
    </EmptyList>
  );
}
