'use client';

import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form/form';
import { Button } from '@/shared/components/ui/actions/button';
import { Input } from '@/shared/components/ui/form/primitives/input';
import { EyeIcon } from '@/shared/components/icons/eye';
import { cn } from '@/shared/utils/cn';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: ComponentProps<'input'>['autoComplete'];
};

export function FormInput<T extends FieldValues>(props: FormInputProps<T>) {
  const { control, name, label, placeholder, type = 'text', autoComplete } = props;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const inputStep = type === 'number' ? 1 : undefined;

  const togglePassword = () => {
    setShowPassword((v) => !v);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const passwordToggleTooltip = showPassword ? 'Скрыть пароль' : 'Показать пароль';

        return (
          <FormItem>
            {label ? (
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type={inputType}
                    step={inputStep}
                    autoComplete={autoComplete}
                    placeholder=" "
                    className={cn(
                      'border-border bg-secondary/70 text-foreground placeholder:text-muted-foreground hover:border-ring focus-visible:border-ring peer h-12 rounded-lg text-sm shadow-none',
                      isPassword && 'pr-11'
                    )}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                {isPassword && field.value?.length > 0 && (
                  <Button
                    type="button"
                    Icon={EyeIcon}
                    mode="icon"
                    variant="ghost"
                    tooltip={passwordToggleTooltip}
                    onClick={togglePassword}
                    className="text-muted-foreground hover:text-foreground absolute right-2 top-1/2 -translate-y-1/2 active:-translate-y-1/2"
                  />
                )}
                <FormLabel
                  className={cn(
                    'text-muted-foreground pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm font-normal transition-[top,left,transform,padding,background-color,color] duration-200',
                    'left-3',
                    'peer-focus:bg-surface peer-focus:text-primary peer-focus:left-3 peer-focus:top-0 peer-focus:scale-[0.82] peer-focus:px-1',
                    'peer-[:not(:placeholder-shown)]:bg-surface peer-[:not(:placeholder-shown)]:text-muted-foreground peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.82] peer-[:not(:placeholder-shown)]:px-1',
                    'peer-[:focus:not(:placeholder-shown)]:text-primary'
                  )}
                >
                  {label}
                </FormLabel>
              </div>
            ) : (
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  type={inputType}
                  step={inputStep}
                  autoComplete={autoComplete}
                  placeholder={placeholder}
                  className="border-border bg-secondary/70 text-foreground placeholder:text-muted-foreground hover:border-ring focus-visible:border-ring h-12 rounded-lg text-sm shadow-none"
                  onBlur={field.onBlur}
                />
              </FormControl>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
