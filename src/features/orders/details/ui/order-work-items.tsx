import { List } from 'lucide-react';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { formatPrice } from '@/shared/utils/format';
import type { OrderDetails } from '@/shared/types/orders';

type OrderWorkItemsProps = {
  items: OrderDetails['items'];
};

export function OrderWorkItems(props: OrderWorkItemsProps) {
  const { items } = props;
  const totalItems = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <SectionCard
      title="Состав работ"
      Icon={List}
      className="flex flex-col p-4 sm:p-6 xl:h-80 xl:min-h-0 xl:overflow-hidden"
    >
      <div className="shrink-0 pr-2">
        <table className="w-full table-fixed">
          <colgroup>
            <col />
            <col className="w-28" />
          </colgroup>
          <thead>
            <tr className="text-muted-foreground border-border border-b text-xs">
              <th className="pb-2 text-left font-bold">Название</th>
              <th className="pb-2 text-right font-bold">Стоимость</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-2">
        <table className="w-full table-fixed">
          <colgroup>
            <col />
            <col className="w-28" />
          </colgroup>
          <tbody className="divide-border divide-y">
            {items.map((orderItem) => (
              <tr key={orderItem.id}>
                <td className="py-2">
                  <p className="text-sm">{orderItem.name}</p>
                  {orderItem.description && (
                    <p className="text-muted-foreground text-xs">{orderItem.description}</p>
                  )}
                </td>
                <td className="py-2 text-right text-sm">{formatPrice(orderItem.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="shrink-0 pr-2">
        <table className="w-full table-fixed">
          <colgroup>
            <col />
            <col className="w-28" />
          </colgroup>
          <tfoot>
            <tr className="border-border border-t">
              <td colSpan={2} className="pt-3 text-right">
                <span className="text-muted-foreground mr-2 text-xs font-bold">Итого:</span>
                {formatPrice(totalItems)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </SectionCard>
  );
}
