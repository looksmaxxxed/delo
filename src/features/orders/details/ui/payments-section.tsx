import { EmptyList } from '@/shared/components/ui/feedback/empty-list';
import { PAYMENT_STATUS_LABELS } from '@/constants/payments';
import { formatDate, formatPrice } from '@/shared/utils/format';
import type { PaymentEntry } from '@/types/payments';
import type { PaymentStatus } from '@prisma/client';

type PaymentsSectionProps = {
  payments: PaymentEntry[];
  paymentStatus: PaymentStatus;
  orderPrice: number;
};

export function PaymentsSection(props: PaymentsSectionProps) {
  const { payments, paymentStatus, orderPrice } = props;

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Math.max(0, orderPrice - totalPaid);
  const progressValue = Math.min(totalPaid, orderPrice);

  return (
    <div className="flex h-full flex-col xl:min-h-0">
      <div className="shrink-0 space-y-3">
        <dl className="grid grid-cols-2 gap-6">
          <div>
            <dt className="text-muted-foreground text-xs uppercase">Стоимость</dt>
            <dd className="mt-1 font-bold">{formatPrice(orderPrice)}</dd>
          </div>
          <div className="text-right">
            <dt className="text-muted-foreground text-xs uppercase">Оплачено</dt>
            <dd className="text-primary mt-1 font-bold">{formatPrice(totalPaid)}</dd>
          </div>
        </dl>

        <progress
          className="bg-muted [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-primary block h-2 w-full overflow-hidden rounded-full border-0"
          value={progressValue}
          max={Math.max(orderPrice, 1)}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            {PAYMENT_STATUS_LABELS[paymentStatus] ?? paymentStatus}
          </span>
          <span className={remaining > 0 ? 'text-destructive' : 'text-primary'}>
            {remaining > 0 ? `Остаток: ${formatPrice(remaining)}` : 'Оплачено полностью'}
          </span>
        </div>
      </div>

      <div className="border-border mt-4 flex flex-1 flex-col border-t xl:min-h-0">
        <EmptyList items={payments} message="Платежей пока нет">
          <div className="flex flex-1 flex-col xl:min-h-0">
            <div className="shrink-0 pr-2">
              <table className="w-full table-fixed">
                <colgroup>
                  <col />
                  <col className="w-28" />
                  <col className="w-28" />
                </colgroup>
                <thead>
                  <tr className="text-muted-foreground border-border border-b text-xs">
                    <th className="py-4 text-left font-bold">Назначение</th>
                    <th className="py-4 text-right font-bold">Сумма</th>
                    <th className="py-4 text-right font-bold">Дата</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-2">
              <table className="w-full table-fixed">
                <colgroup>
                  <col />
                  <col className="w-28" />
                  <col className="w-28" />
                </colgroup>
                <tbody className="divide-border divide-y">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="truncate py-3 text-sm">{payment.note || 'Оплата'}</td>
                      <td className="py-3 text-right text-sm font-normal">
                        {formatPrice(payment.amount)}
                      </td>
                      <td className="text-muted-foreground py-3 text-right text-xs">
                        {formatDate(payment.paidAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </EmptyList>
      </div>
    </div>
  );
}
