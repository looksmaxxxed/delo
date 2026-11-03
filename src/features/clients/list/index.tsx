'use client';

import { ClientForm } from '../editor';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';
import { getClients } from '@/actions/clients';
import { CLIENTS_PAGE_SIZE } from '@/shared/constants/pagination';
import { useInfiniteList } from '@/shared/hooks/use-infinite-list';
import { useRequireVerifiedEmail } from '@/shared/components/providers/email-verification/email-verification.hook';
import type { ClientListItem } from '@/shared/types/clients';
import type { ClientsListOptions } from './types';
import { ClientsListView } from './ui/clients-list-view';

type ClientsTableProps = ClientsListOptions;

export function ClientsTable(props: ClientsTableProps) {
  const { initialItems, initialHasMore } = props;
  const router = useRouter();
  const [searchFilter, setSearchFilter] = useQueryState('search', parseAsString.withDefault(''));

  function fetchClients(offset: number, take: number) {
    return getClients({ offset, take, search: searchFilter || undefined });
  }

  const { items, hasMore, isRefreshing, isLoadingMore, loadMore } = useInfiniteList<ClientListItem>(
    {
      initialItems,
      initialHasMore,
      fetch: fetchClients,
      pageSize: CLIENTS_PAGE_SIZE,
      deps: [searchFilter],
    }
  );
  const [createOpen, setCreateOpen] = useState(false);
  const requireVerifiedEmail = useRequireVerifiedEmail();

  function selectClient(client: ClientListItem) {
    router.push(`/clients/${client.id}`);
  }

  function openCreate() {
    if (!requireVerifiedEmail()) return;
    setCreateOpen(true);
  }

  function changeSearch(value: string) {
    setSearchFilter(value);
  }

  function completeCreate() {
    setCreateOpen(false);
    router.refresh();
  }

  return (
    <ClientsListView
      items={items}
      hasMore={hasMore}
      isRefreshing={isRefreshing}
      isLoadingMore={isLoadingMore}
      searchFilter={searchFilter}
      createOpen={createOpen}
      onSelectClient={selectClient}
      onCreate={openCreate}
      onSearchChange={changeSearch}
      onCreateOpenChange={setCreateOpen}
      onLoadMore={loadMore}
      createForm={<ClientForm mode="create" onSuccess={completeCreate} />}
    />
  );
}
