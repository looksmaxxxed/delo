'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form/form';
import type { SelectOption } from '@/types/forms';
import { Combobox } from '@/shared/components/ui/form/primitives/combobox';

const DEFAULT_PAGE_SIZE = 20;

export type FormComboboxLoadOptionsParams = {
  query: string;
  offset: number;
  take: number;
};

type FormComboboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  loadOptions: (params: FormComboboxLoadOptionsParams) => Promise<SelectOption[]>;
  defaultOption?: SelectOption;
  defaultOptions?: SelectOption[];
  createdOption?: SelectOption;
  placeholder?: string;
  emptyMessage?: string;
  action?: ReactNode;
  pageSize?: number;
};

export function FormCombobox<T extends FieldValues>(props: FormComboboxProps<T>) {
  const {
    control,
    name,
    label,
    loadOptions,
    defaultOption,
    defaultOptions = [],
    createdOption,
    placeholder,
    emptyMessage,
    action,
    pageSize = DEFAULT_PAGE_SIZE,
  } = props;

  const [options, setOptions] = useState<SelectOption[]>(defaultOptions);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const onChangeRef = useRef<(value: string) => void>(() => {});
  const queryRef = useRef('');
  const offsetRef = useRef(0);
  const openedRef = useRef(false);

  useEffect(() => {
    if (!createdOption) return;

    setOptions((prev) => [createdOption, ...prev]);
    onChangeRef.current(createdOption.value);
  }, [createdOption]);

  async function loadPage(query: string, offset: number, replace: boolean) {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const rows = await loadOptions({ query, offset, take: pageSize + 1 });
      const nextOptions = rows.slice(0, pageSize);
      setOptions((prev) => (replace ? nextOptions : [...prev, ...nextOptions]));
      setHasMore(rows.length > pageSize);
      offsetRef.current = offset + nextOptions.length;
    } finally {
      setIsLoadingMore(false);
    }
  }

  function handleOpen() {
    if (openedRef.current) return;

    openedRef.current = true;
    queryRef.current = '';
    loadPage('', 0, true);
  }

  function handleInputChange(query: string) {
    queryRef.current = query;
    loadPage(query, 0, true);
  }

  function handleEndReached() {
    if (!hasMore || isLoadingMore) return;
    loadPage(queryRef.current, offsetRef.current, false);
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        onChangeRef.current = field.onChange;

        return (
          <FormItem>
            <FormControl>
              <Combobox
                options={options}
                value={defaultOption ?? null}
                onChange={field.onChange}
                onInputChange={handleInputChange}
                onOpen={handleOpen}
                onEndReached={handleEndReached}
                isLoadingMore={isLoadingMore}
                placeholder={placeholder}
                label={label}
                emptyMessage={emptyMessage}
                action={action}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
