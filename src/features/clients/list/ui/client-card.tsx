import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { DetailItem } from '@/shared/components/ui/data/detail-item';
import type { ClientListItem } from '@/shared/types/clients';
import { formatDate, formatPrice } from '@/shared/utils/format';
import { getInitials } from '@/shared/utils/profile';

type ClientCardProps = {
  client: ClientListItem;
};

export function ClientCard(props: ClientCardProps) {
  const { client } = props;

  return (
    <Link
      href={`/clients/${client.id}`}
      prefetch={false}
      className="surface-shadow border-sidebar-border bg-surface hover:border-primary/30 focus-visible:ring-ring block h-full rounded-2xl border p-4 outline-none transition-colors focus-visible:ring-2 motion-reduce:transition-none"
    >
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold">
          {getInitials(client.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold">{client.name}</h2>
          <p className="text-muted-foreground mt-0.5 truncate text-xs">
            {client.company ?? 'Без компании'}
          </p>
        </div>
        <ChevronRight className="text-muted-foreground size-5 shrink-0" />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm [&_dd]:mt-1">
        <DetailItem label="Контакт">{client.contact ?? 'Не указан'}</DetailItem>
        <DetailItem label="Оплачено" className="text-right">
          {client.totalPaid > 0 ? formatPrice(client.totalPaid) : '—'}
        </DetailItem>
        <DetailItem label="Добавлен" className="col-span-2">
          {formatDate(client.createdAt)}
        </DetailItem>
      </dl>
    </Link>
  );
}
