import { List } from 'lucide-react';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { EmptyList } from '@/shared/components/ui/feedback/empty-list';
import { formatPrice } from '@/shared/utils/format';
import type { PublicOrderItemData } from '@/types/public-orders';

type OrderItemsSectionProps = {
  items: PublicOrderItemData[];
};

export function OrderItemsSection(props: OrderItemsSectionProps) {
  const { items } = props;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <SectionCard
      title="Состав работ"
      Icon={List}
      className="flex h-full min-h-0 flex-col p-5 sm:p-6"
    >
      <EmptyList items={items} message="Состав работ не указан">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="text-muted-foreground mb-2 grid grid-cols-[1fr_auto] gap-x-4 text-xs font-bold">
            <span>Наименование</span>
            <span className="text-right">Сумма</span>
          </div>
          <div className="min-h-0 flex-1">
            <div className="divide-border divide-y">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[1fr_auto] gap-x-4 py-3">
                  <div className="min-w-0">
                    <p className="text-foreground truncate text-sm font-medium">{item.name}</p>
                    {item.description && (
                      <p className="text-muted-foreground mt-0.5 text-xs leading-5">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="text-foreground self-center whitespace-nowrap text-sm font-medium">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-border mt-2 flex justify-between border-t pt-4">
            <span className="text-foreground text-sm font-bold">Итого</span>
            <span className="text-foreground text-base font-bold">{formatPrice(total)}</span>
          </div>
        </div>
      </EmptyList>
    </SectionCard>
  );
}
