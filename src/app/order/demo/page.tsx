import type { Metadata } from 'next';
import { DemoOrder } from '@/features/order/demo';
import { DEMO_ORDER } from '@/features/order/demo/constants';
import { OrderHero } from '@/features/order/common/ui/order-hero';
import { OrderItemsSection } from '@/features/order/common/ui/order-items-section';
import { OrderStatusProgress } from '@/features/order/common/ui/order-status-progress';
import { WorkTermsSection } from '@/features/order/common/ui/work-terms-section';
import { PublicPayments } from '@/features/order/payment-info/ui/public-payments';
import { SEO_DEMO_ORDER_URL, SEO_PRIVATE_ROBOTS } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: 'Пример заказа — Delo',
  description:
    'Посмотрите, как клиент согласует работы, стоимость и сроки по ссылке без регистрации.',
  alternates: { canonical: SEO_DEMO_ORDER_URL },
  robots: SEO_PRIVATE_ROBOTS,
};

export default function DemoOrderPage() {
  return (
    <DemoOrder
      hero={<OrderHero order={DEMO_ORDER} />}
      statusProgress={
        <OrderStatusProgress status={DEMO_ORDER.status} statusDates={DEMO_ORDER.statusDates} />
      }
      workItems={<OrderItemsSection items={DEMO_ORDER.items} />}
      workTerms={<WorkTermsSection order={DEMO_ORDER} />}
      payments={<PublicPayments payments={DEMO_ORDER.payments} />}
    />
  );
}
