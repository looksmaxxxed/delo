'use client';

import Link from 'next/link';
import type { UseFormReturn } from 'react-hook-form';
import { Form } from '@/shared/components/ui/form/form';
import { Button } from '@/shared/components/ui/actions/button';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import type { LoginInput } from '@/shared/schemas/auth';

type LoginFormViewProps = {
  form: UseFormReturn<LoginInput>;
  isLoading: boolean;
  isLocked: boolean;
  lockoutSeconds: number;
  onSubmit: (data: LoginInput) => Promise<void>;
};

export function LoginFormView(props: LoginFormViewProps) {
  const { form, isLoading, isLocked, lockoutSeconds, onSubmit } = props;
  const { control, handleSubmit } = form;

  return (
    <Form {...form} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <FormInput
        control={control}
        name="email"
        label="Электронная почта"
        type="email"
        autoComplete="username"
      />
      <FormInput
        control={control}
        name="password"
        label="Пароль"
        type="password"
        autoComplete="current-password"
      />

      <div className="flex flex-col gap-2">
        <div className="flex justify-end text-sm">
          <Link
            href="/forgot-password"
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            Забыли пароль?
          </Link>
        </div>

        <Button
          type="submit"
          className="xl:h-13 h-11 w-full rounded-xl text-sm font-semibold xl:font-bold"
          isLoading={isLoading}
          disabled={isLocked}
          Icon={isLocked ? undefined : ArrowRightIcon}
        >
          {isLocked ? `Повторите через ${lockoutSeconds} сек.` : 'Войти'}
        </Button>
      </div>
    </Form>
  );
}
