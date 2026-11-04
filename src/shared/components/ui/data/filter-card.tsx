'use client';

import { Input } from '@/shared/components/ui/form/primitives/input';
import { Popover } from '@base-ui/react/popover';
import { Search } from 'lucide-react';
import { useId, useState, type ChangeEvent, type ReactNode } from 'react';
import { Button } from '../actions/button';
import { PlusIcon } from '@/shared/components/icons/plus';
import { SlidersHorizontalIcon } from '@/shared/components/icons/sliders-horizontal';
import { cn } from '@/shared/utils/cn';

type FilterCardProps = {
  children?: ReactNode;
  filterValue: string;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBtnAction?: () => void;
  btnLabel?: string;
  inputLabel: string;
  hasActiveFilters?: boolean;
};

export function FilterCard(props: FilterCardProps) {
  const {
    children,
    filterValue,
    onFilterChange,
    onBtnAction,
    btnLabel,
    inputLabel,
    hasActiveFilters = false,
  } = props;
  const filtersId = useId();
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative grid w-full gap-2 overflow-visible pt-2 lg:flex lg:flex-row lg:gap-3',
        children && onBtnAction
          ? 'grid-cols-[minmax(0,1fr)_auto_auto]'
          : 'grid-cols-[minmax(0,1fr)_auto]'
      )}
    >
      <div className="group relative min-w-0 flex-1">
        <Search className="text-muted-foreground group-hover:text-primary group-focus-within:text-primary pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 transition-colors" />
        <Input
          placeholder={inputLabel}
          value={filterValue}
          onChange={onFilterChange}
          className="surface-shadow bg-secondary/70 border-border focus-visible:ring-ring/30 h-11 rounded-lg pl-11 text-sm backdrop-blur-xl focus-visible:ring-2"
        />
      </div>
      {children && (
        <>
          <Popover.Root open={filtersOpen} onOpenChange={setFiltersOpen}>
            <Popover.Trigger
              render={
                <Button
                  type="button"
                  mode="icon"
                  variant="outline"
                  tooltip={filtersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
                  aria-label={filtersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
                  aria-controls={filtersId}
                  Icon={SlidersHorizontalIcon}
                  isIconActive={filtersOpen}
                  className={cn(
                    'surface-shadow border-border bg-secondary/70 text-muted-foreground hover:border-ring hover:bg-secondary/70 hover:text-primary aria-expanded:bg-secondary/70 col-start-2 row-start-1 size-10 lg:hidden',
                    (filtersOpen || hasActiveFilters) && 'text-primary'
                  )}
                />
              }
            />
            <Popover.Portal>
              <Popover.Positioner sideOffset={8} align="end" className="z-50 lg:hidden">
                <Popover.Popup
                  id={filtersId}
                  initialFocus={false}
                  className="surface-shadow border-border bg-surface data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 w-[min(calc(100vw-2rem),24rem)] rounded-xl border p-3 duration-150"
                >
                  {children}
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
          <div className="hidden min-w-0 lg:contents">{children}</div>
        </>
      )}
      {onBtnAction && btnLabel && (
        <Button
          onClick={onBtnAction}
          Icon={PlusIcon}
          tooltip={btnLabel}
          aria-label={btnLabel}
          className={cn(
            'row-start-1 size-10 shrink-0 px-0 text-sm font-semibold sm:h-10 sm:w-auto sm:px-3 xl:h-11 xl:px-5',
            children ? 'col-start-3' : 'col-start-2'
          )}
        >
          <span className="hidden sm:inline">{btnLabel}</span>
        </Button>
      )}
    </div>
  );
}
