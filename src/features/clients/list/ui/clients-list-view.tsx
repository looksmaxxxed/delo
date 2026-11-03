'use client';

import type { ChangeEvent, ReactNode } from 'react';
import { UserRoundPlus } from 'lucide-react';
import { useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { DataTable } from '@/shared/components/ui/data/data-table';
import { AppDialog } from '@/shared/components/ui/overlay/dialog';
import type { ClientListItem } from '@/types/clients';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { FilterCard } from '@/shared/components/ui/data/filter-card';
import { columns } from '../constants';

type ClientsListViewProps = {
  items: ClientListItem[];
  hasMore: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  searchFilter: string;
  createOpen: boolean;
  createForm: ReactNode;
  onSelectClient: (client: ClientListItem) => void;
  onCreate: () => void;
  onSearchChange: (value: string) => void;
  onCreateOpenChange: (open: boolean) => void;
  onLoadMore: () => Promise<void>;
};

export function ClientsListView(props: ClientsListViewProps) {
  const {
    items,
    hasMore,
    isRefreshing,
    isLoadingMore,
    searchFilter,
    createOpen,
    createForm,
    onSelectClient,
    onCreate,
    onSearchChange,
    onCreateOpenChange,
    onLoadMore,
  } = props;

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    onSearchChange(e.target.value);
  }

  return (
    <AnimateIn className="flex flex-1 flex-col space-y-4">
      <div className="flex justify-end">
        <FilterCard
          filterValue={searchFilter}
          onFilterChange={handleSearchChange}
          onBtnAction={onCreate}
          btnLabel="Новый клиент"
          inputLabel="Поиск по клиентам..."
        />
      </div>

      <DataTable
        table={table}
        emptyMessage={searchFilter ? 'Ничего не найдено' : 'Клиентов пока нет'}
        isLoading={isRefreshing}
        onRowClick={onSelectClient}
        onEndReached={hasMore && !isRefreshing && !isLoadingMore ? onLoadMore : undefined}
        isLoadingMore={isLoadingMore}
      />

      <AppDialog
        open={createOpen}
        onOpenChange={onCreateOpenChange}
        title="Новый клиент"
        description="Добавьте нового клиента в базу"
        Icon={UserRoundPlus}
        size="lg"
        variant="solid"
      >
        {createForm}
      </AppDialog>
    </AnimateIn>
  );
}
