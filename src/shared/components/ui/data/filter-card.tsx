import { Input } from '@/shared/components/ui/form/primitives/input';
import { Search } from 'lucide-react';
import type { ChangeEvent, ReactNode } from 'react';
import { Button } from '../actions/button';

type FilterCardProps = {
  children?: ReactNode;
  filterValue: string;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBtnAction?: () => void;
  btnLabel?: string;
  inputLabel: string;
};

export function FilterCard(props: FilterCardProps) {
  const { children, filterValue, onFilterChange, onBtnAction, btnLabel, inputLabel } = props;

  return (
    <div className="flex w-full flex-col gap-3 overflow-visible pt-2 sm:flex-row">
      <div className="group relative min-w-0 flex-1">
        <Search className="text-muted-foreground group-hover:text-primary group-focus-within:text-primary pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 transition-colors" />
        <Input
          placeholder={inputLabel}
          value={filterValue}
          onChange={onFilterChange}
          className="surface-shadow bg-secondary/70 border-border focus-visible:ring-ring/30 h-11 rounded-lg pl-11 text-sm backdrop-blur-xl focus-visible:ring-2"
        />
      </div>
      {children}
      {onBtnAction && btnLabel && (
        <Button
          onClick={onBtnAction}
          className="h-11 w-full px-5 text-sm font-semibold sm:w-auto sm:shrink-0"
        >
          {btnLabel} →
        </Button>
      )}
    </div>
  );
}
