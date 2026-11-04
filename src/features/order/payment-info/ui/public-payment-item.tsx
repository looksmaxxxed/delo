import { formatDate, formatPrice } from '@/shared/utils/format';
import type { PaymentEntry } from '@/types/payments';

type PublicPaymentItemProps = {
  payment: PaymentEntry;
};

export function PublicPaymentItem(props: PublicPaymentItemProps) {
  const { payment } = props;

  return (
    <div className="bg-muted/40 grid w-full grid-cols-[1fr_auto] items-start gap-3 rounded-lg px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium">{formatPrice(payment.amount)}</p>
        {payment.note && (
          <p className="text-muted-foreground mt-0.5 break-words text-xs leading-5">
            {payment.note}
          </p>
        )}
      </div>
      <p className="text-muted-foreground shrink-0 text-right text-xs font-bold">
        {formatDate(payment.paidAt)}
      </p>
    </div>
  );
}
