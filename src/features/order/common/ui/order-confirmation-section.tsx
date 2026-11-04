import type { ReactNode } from 'react';
import { CircleCheck, Handshake } from 'lucide-react';
import { Badge } from '@/shared/components/ui/data/badge';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { ORDER_TERMS_CONFIRMABLE_STATUSES } from '@/shared/constants/orders';
import type { PublicOrderSummary } from '../types';

type OrderConfirmationSectionProps = {
  order: Pick<PublicOrderSummary, 'status' | 'isTermsAccepted'>;
  action: ReactNode;
};

export function OrderConfirmationSection(props: OrderConfirmationSectionProps) {
  const { order, action } = props;
  const canConfirm = ORDER_TERMS_CONFIRMABLE_STATUSES.some((status) => status === order.status);

  if (!order.isTermsAccepted && !canConfirm) return null;

  return (
    <SectionCard
      title="Согласование условий"
      titleAs="h2"
      Icon={Handshake}
      action={
        order.isTermsAccepted ? (
          <Badge variant="accent" size="sm" Icon={CircleCheck}>
            Подтверждены
          </Badge>
        ) : undefined
      }
      className="p-5 sm:p-6"
    >
      <div className="space-y-4">
        <p className="text-sm leading-6">
          {order.isTermsAccepted
            ? 'Клиент подтвердил состав работ, стоимость, сроки и условия заказа. Подтверждённая версия сохраняется в PDF-отчёте.'
            : 'Проверьте состав работ, стоимость, сроки и условия работы. Нажимая «Подтвердить условия», вы подтверждаете, что ознакомились с ними и согласны с этой версией заказа.'}
        </p>
        {!order.isTermsAccepted && action}
      </div>
    </SectionCard>
  );
}
