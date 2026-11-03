import { CLIENTS_PAGE_SIZE } from '@/constants/pagination';
import { ClientsTable } from '@/features/clients/list';
import { getClients } from '@/actions/clients';

type ClientsPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function ClientsPage(props: ClientsPageProps) {
  const { searchParams } = props;
  const { search } = await searchParams;

  const { items, hasMore } = await getClients({ offset: 0, take: CLIENTS_PAGE_SIZE, search });
  const listKey = items[0]?.id ?? 'empty';

  return (
    <div className="page-stack flex-1">
      <ClientsTable key={listKey} initialItems={items} initialHasMore={hasMore} />
    </div>
  );
}
