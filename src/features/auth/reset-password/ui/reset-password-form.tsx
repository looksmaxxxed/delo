'use client';

import { AlertCircle } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { Form } from '@/shared/components/ui/form/form';
import { Button } from '@/shared/components/ui/actions/button';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import type { ResetPasswordInput } from '@/shared/schemas/auth';

type ResetPasswordFormViewProps = {
  form: UseFormReturn<ResetPasswordInput>;
  isLoading: boolean;
  hasToken: boolean;
  onSubmit: (data: ResetPasswordInput) => Promise<void>;
  onOpenForgotPassword: () => void;
};

export function ResetPasswordFormView(props: ResetPasswordFormViewProps) {
  const { form, isLoading, hasToken, onSubmit, onOpenForgotPassword } = props;
  const { control, handleSubmit } = form;
  if (!hasToken) {
    return (
      <div className="flex flex-col gap-6">
        <div className="border-destructive/25 bg-destructive/10 text-foreground flex gap-3 rounded-xl border p-4 text-sm leading-6">
          <AlertCircle size={20} className="text-destructive mt-0.5 shrink-0" aria-hidden />
          <p>Ссылка отсутствует или повреждена. Запросите новую ссылку для сброса пароля.</p>
        </div>

        <Button
          type="button"
          className="xl:h-13 h-11 w-full rounded-lg text-sm font-semibold xl:text-base"
          Icon={ArrowRightIcon}
          onClick={onOpenForgotPassword}
        >
          Запросить снова
        </Button>
      </div>
    );
  }

  return (
    <Form {...form} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <FormInput
          control={control}
          name="password"
          label="Новый пароль"
          type="password"
          autoComplete="new-password"
        />
        <FormInput
          control={control}
          name="confirmPassword"
          label="Повторите пароль"
          type="password"
          autoComplete="new-password"
        />
      </div>

      <Button
        type="submit"
        className="xl:h-13 h-11 w-full rounded-lg text-sm font-semibold xl:text-base"
        isLoading={isLoading}
        Icon={ArrowRightIcon}
      >
        Сохранить пароль
      </Button>
    </Form>
  );
}
