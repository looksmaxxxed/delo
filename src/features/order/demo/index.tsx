import Link from 'next/link';
import { Button } from '@/shared/components/ui/actions/button';
import { ArrowLeftIcon } from '@/shared/components/icons/arrow-left';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { CircleCheckIcon } from '@/shared/components/icons/circle-check';
import { ROOT_ROUTE } from '@/shared/constants/routes';
import type { PublicOrderSlots } from '../common/types';
import { PublicOrderView } from '../common/ui/public-order-view';
import { OrderConfirmationSection } from '../common/ui/order-confirmation-section';
import { PublicOrderPaymentInfo } from '../payment-info';
import { DEMO_ORDER } from './constants';

type DemoOrderProps = PublicOrderSlots;

export function DemoOrder(props: DemoOrderProps) {
  const { payments, ...slots } = props;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          render={<Link href={ROOT_ROUTE} />}
          nativeButton={false}
          variant="ghost"
          Icon={ArrowLeftIcon}
          className="h-11 px-2 text-sm"
        >
          На главную
        </Button>
        <Button
          render={<Link href="/register" />}
          nativeButton={false}
          Icon={ArrowRightIcon}
          className="h-11 px-3 text-sm"
        >
          Создать свой заказ
        </Button>
      </div>
      <PublicOrderView
        {...slots}
        paymentInfo={<PublicOrderPaymentInfo order={DEMO_ORDER} payments={payments} />}
        confirmation={
          <OrderConfirmationSection
            order={DEMO_ORDER}
            action={
              <div className="space-y-2">
                <Button disabled Icon={CircleCheckIcon} className="h-11 w-full sm:w-auto">
                  Подтвердить условия
                </Button>
                <p className="text-muted-foreground text-sm">В примере подтверждение недоступно.</p>
              </div>
            }
          />
        }
      />
    </div>
  );
}
