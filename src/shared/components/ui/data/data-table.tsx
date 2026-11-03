'use client';

import { forwardRef, type ComponentProps } from 'react';
import {
  flexRender,
  type Row,
  type RowData,
  type Table as TanstackTable,
} from '@tanstack/react-table';
import { TableVirtuoso, type ItemProps, type TableComponents } from 'react-virtuoso';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/components/ui/actions/button';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';
import { TableCell, TableHead, TableRow } from './table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    copyable?: boolean;
    align?: 'left' | 'center' | 'right';
  }
}

type TableContext = {
  onRowClick?: (data: unknown) => void;
  emptyMessage: string;
  columnCount: number;
};

const VirtuosoTable = forwardRef<HTMLTableElement, ComponentProps<'table'>>(
  ({ className, style, ...props }, ref) => (
    <table
      data-slot="table"
      ref={ref}
      style={style}
      className={cn(
        'w-full min-w-max caption-bottom border-separate border-spacing-0 text-sm',
        className
      )}
      {...props}
    />
  )
);
VirtuosoTable.displayName = 'VirtuosoTable';

const VirtuosoScroller = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('min-w-0 overflow-x-auto', className)} {...props} />
  )
);
VirtuosoScroller.displayName = 'VirtuosoScroller';

const VirtuosoTableHead = forwardRef<HTMLTableSectionElement, ComponentProps<'thead'>>(
  ({ className, ...props }, ref) => (
    <thead
      data-slot="table-header"
      ref={ref}
      className={cn('[&_tr]:border-0 [&_tr]:hover:bg-transparent', className)}
      {...props}
    />
  )
);
VirtuosoTableHead.displayName = 'VirtuosoTableHead';

const VirtuosoTableBody = forwardRef<HTMLTableSectionElement, ComponentProps<'tbody'>>(
  ({ className, ...props }, ref) => (
    <tbody data-slot="table-body" ref={ref} className={className} {...props} />
  )
);
VirtuosoTableBody.displayName = 'VirtuosoTableBody';

const VirtuosoTableFoot = forwardRef<HTMLTableSectionElement, ComponentProps<'tfoot'>>(
  ({ className, ...props }, ref) => (
    <tfoot data-slot="table-footer" ref={ref} className={className} {...props} />
  )
);
VirtuosoTableFoot.displayName = 'VirtuosoTableFoot';

function VirtuosoTableRow({
  context,
  item: row,
  ...rest
}: ItemProps<Row<unknown>> & { context?: TableContext }) {
  return (
    <TableRow
      className={cn('group', context?.onRowClick && 'cursor-pointer')}
      onClick={context?.onRowClick ? () => context.onRowClick!(row.original) : undefined}
      {...rest}
    />
  );
}

function VirtuosoEmptyPlaceholder({ context }: { context?: TableContext }) {
  return (
    <tbody>
      <TableRow>
        <TableCell
          colSpan={context?.columnCount ?? 1}
          className="text-muted-foreground py-8 text-center"
        >
          {context?.emptyMessage ?? ''}
        </TableCell>
      </TableRow>
    </tbody>
  );
}

const VIRTUOSO_COMPONENTS: TableComponents<Row<unknown>, TableContext> = {
  Scroller: VirtuosoScroller as TableComponents<Row<unknown>, TableContext>['Scroller'],
  Table: VirtuosoTable as TableComponents<Row<unknown>, TableContext>['Table'],
  TableHead: VirtuosoTableHead as TableComponents<Row<unknown>, TableContext>['TableHead'],
  TableBody: VirtuosoTableBody as TableComponents<Row<unknown>, TableContext>['TableBody'],
  TableFoot: VirtuosoTableFoot as TableComponents<Row<unknown>, TableContext>['TableFoot'],
  TableRow: VirtuosoTableRow,
  EmptyPlaceholder: VirtuosoEmptyPlaceholder,
};

const TABLE_LOADING_ROWS = Array.from({ length: 8 }, (_, index) => index);
const TABLE_LOADING_CELL_WIDTHS = ['w-3/4', 'w-1/2', 'w-5/6', 'w-2/3'] as const;

type DataTableProps<T> = {
  table: TanstackTable<T>;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
  onEndReached?: () => void;
  height?: number | string;
  isLoading?: boolean;
  isLoadingMore?: boolean;
};

export function DataTable<T>(props: DataTableProps<T>) {
  const {
    table,
    emptyMessage = 'Нет данных',
    onRowClick,
    className,
    onEndReached,
    height = 600,
    isLoading = false,
    isLoadingMore = false,
  } = props;

  const context: TableContext = {
    onRowClick: onRowClick as TableContext['onRowClick'],
    emptyMessage,
    columnCount: table.getVisibleLeafColumns().length,
  };

  const data = table.getRowModel().rows;

  return (
    <div
      className={cn(
        'surface-shadow border-sidebar-border bg-surface relative flex flex-1 flex-col overflow-hidden rounded-2xl border',
        className
      )}
      aria-busy={isLoading}
    >
      <TableVirtuoso
        data={data as Row<unknown>[]}
        context={context}
        style={{ height }}
        overscan={200}
        initialItemCount={data.length}
        endReached={isLoading ? undefined : onEndReached}
        components={VIRTUOSO_COMPONENTS}
        fixedHeaderContent={() =>
          table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.column.getSize() }}
                  className={cn(
                    'bg-primary/10 border-sidebar-border border-y first:rounded-l-[16px] first:border-l last:rounded-r-[16px] last:border-r',
                    header.column.columnDef.meta?.align === 'center' && 'text-center',
                    header.column.columnDef.meta?.align === 'right' && 'text-right'
                  )}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))
        }
        fixedFooterContent={() =>
          isLoadingMore ? (
            <TableRow>
              <TableCell colSpan={context.columnCount} className="py-4">
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="size-2 rounded-full" />
                  <Skeleton className="size-2 rounded-full delay-75" />
                  <Skeleton className="size-2 rounded-full delay-150" />
                </div>
              </TableCell>
            </TableRow>
          ) : null
        }
        itemContent={(_, row) => (
          <>
            {(row as Row<T>).getVisibleCells().map((cell) => {
              const rawValue = cell.getValue();
              const isCopyable =
                cell.column.columnDef.meta?.copyable && rawValue != null && rawValue !== '';

              return (
                <TableCell
                  key={cell.id}
                  className={cn(
                    cell.column.columnDef.meta?.align === 'center' && 'text-center',
                    cell.column.columnDef.meta?.align === 'right' && 'text-right'
                  )}
                >
                  <div
                    className={cn(
                      'flex items-center',
                      cell.column.columnDef.meta?.align === 'center' && 'justify-center',
                      cell.column.columnDef.meta?.align === 'right' && 'justify-end'
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {isCopyable && (
                      <Button
                        mode="copy"
                        copyValue={String(rawValue)}
                        size="icon-xs"
                        variant="ghost"
                        className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    )}
                  </div>
                </TableCell>
              );
            })}
          </>
        )}
      />
      <div
        className={cn(
          'bg-surface absolute inset-x-0 bottom-0 top-12 z-20 flex items-center justify-center transition-opacity duration-200 motion-reduce:transition-none',
          isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        {isLoading && (
          <div role="status" className="h-full w-full overflow-hidden">
            <span className="sr-only">Загружаем данные…</span>
            {TABLE_LOADING_ROWS.map((rowIndex) => (
              <div
                key={rowIndex}
                className="border-sidebar-border h-17 flex items-center gap-8 border-b px-7"
                aria-hidden
              >
                {Array.from({ length: context.columnCount }, (_, cellIndex) => (
                  <div key={cellIndex} className="min-w-20 flex-1">
                    <Skeleton
                      className={cn(
                        'h-4',
                        TABLE_LOADING_CELL_WIDTHS[
                          (rowIndex + cellIndex) % TABLE_LOADING_CELL_WIDTHS.length
                        ]
                      )}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
