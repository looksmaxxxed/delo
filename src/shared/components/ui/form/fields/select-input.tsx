'use client';

import { cn } from '@/shared/utils/cn';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/form/primitives/select';
import type { SelectOption } from '@/types/forms';
import { useState } from 'react';

type SelectInputProps = {
  value: SelectOption | null;
  onValueChange: (value: string | null) => void;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  className?: string;
};

export function SelectInput(props: SelectInputProps) {
  const { value, onValueChange, options, placeholder, className, label } = props;

  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(value);

  const hasVisibleValue = !!selectedOption && selectedOption.value !== options[0]?.value;

  function handleValueChange(newValue: string | null) {
    onValueChange(newValue);
  }

  function renderValue() {
    return hasVisibleValue ? selectedOption?.label : null;
  }

  return (
    <Select value={selectedOption?.value ?? null} onValueChange={handleValueChange}>
      <div className="relative isolate">
        <SelectTrigger
          className={cn(
            'surface-shadow bg-secondary/70 focus-visible:ring-ring/30 min-w-36 cursor-pointer focus-visible:ring-2 data-[size=default]:h-12',
            className
          )}
        >
          <SelectValue placeholder={placeholder}>{renderValue}</SelectValue>
        </SelectTrigger>
        <SelectContent
          className="border-border bg-popover border shadow-xl ring-0"
          alignItemWithTrigger={false}
          sideOffset={10}
        >
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} onClick={() => setSelectedOption(opt)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
        <span
          className={cn(
            'text-muted-foreground pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-sm font-normal transition-[top,left,transform,padding,background-color,color] duration-200',
            hasVisibleValue ? 'bg-secondary left-2.5 top-0 scale-[0.82] px-1' : 'left-3',
            'peer-data-popup-open:bg-secondary peer-data-popup-open:text-primary peer-data-popup-open:left-2.5 peer-data-popup-open:top-0 peer-data-popup-open:scale-[0.82] peer-data-popup-open:px-1'
          )}
        >
          {label}
        </span>
      </div>
    </Select>
  );
}
