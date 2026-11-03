import Link from 'next/link';
import { ChartNoAxesCombined } from 'lucide-react';
import { Button } from '@/shared/components/ui/actions/button';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';

export function DashboardEmptyState() {
  return (
    <div className="surface-shadow border-border bg-surface flex min-h-96 flex-col items-center justify-center rounded-2xl border px-6 py-12 text-center">
      <span className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-2xl">
        <ChartNoAxesCombined size={26} />
      </span>
      <h2 className="mt-5 text-xl font-bold tracking-tight">Здесь появится картина твоего дела</h2>
      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
        Добавь первого клиента и заказ — после этого дашборд начнёт показывать оплаты, загрузку и
        ближайшие сроки.
      </p>
      <Button
        render={<Link href="/clients" />}
        nativeButton={false}
        Icon={ArrowRightIcon}
        className="mt-6"
      >
        Добавить клиента
      </Button>
    </div>
  );
}
