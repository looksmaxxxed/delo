'use client';

import type { ChangeEvent, ReactNode } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form/form';
import { Checkbox } from '@/shared/components/ui/form/primitives/checkbox';
import { cn } from '@/shared/utils/cn';

type FormCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function FormCheckbox<T extends FieldValues>(props: FormCheckboxProps<T>) {
  const { control, name, children, disabled, className } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { value, onChange, ...fieldProps } = field;

        function handleChange(e: ChangeEvent<HTMLInputElement>) {
          onChange(e.target.checked);
        }

        return (
          <FormItem className={className}>
            <div
              className={cn(
                'text-muted-foreground flex items-start gap-3 text-sm leading-5',
                disabled && 'opacity-50'
              )}
            >
              <FormControl>
                <Checkbox
                  {...fieldProps}
                  checked={Boolean(value)}
                  disabled={disabled}
                  onChange={handleChange}
                />
              </FormControl>
              <FormLabel
                className={cn(
                  'inline cursor-pointer text-sm font-normal leading-5',
                  disabled && 'cursor-not-allowed'
                )}
              >
                {children}
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
