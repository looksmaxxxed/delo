'use client';

import { Info } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { Form } from '@/shared/components/ui/form/form';
import { Button } from '@/shared/components/ui/actions/button';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import type { ForgotPasswordInput } from '@/shared/schemas/auth';

type ForgotPasswordFormViewProps = {
  form: UseFormReturn<ForgotPasswordInput>;
  isLoading: boolean;
  isCoolingDown: boolean;
  cooldownSeconds: number;
  onSubmit: (data: ForgotPasswordInput) => Promise<void>;
};

export function ForgotPasswordFormView(props: ForgotPasswordFormViewProps) {
  const { form, isLoading, isCoolingDown, cooldownSeconds, onSubmit } = props;
  const { control, handleSubmit } = form;

  return (
    <Form {...form} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <FormInput control={control} name="email" label="Email" type="email" autoComplete="email" />

        <div className="border-primary/25 bg-primary/10 text-foreground flex gap-3 rounded-xl border p-4 text-sm leading-6">
          <Info size={20} className="text-primary mt-0.5 shrink-0" aria-hidden />
          <p>Письмо придёт в течение 2-5 минут. Проверьте папку Спам.</p>
        </div>
      </div>

      <Button
        type="submit"
        className="xl:h-13 h-11 w-full rounded-lg text-sm font-semibold xl:text-base"
        isLoading={isLoading}
        disabled={isCoolingDown}
        Icon={isCoolingDown ? undefined : ArrowRightIcon}
      >
        {isCoolingDown ? `Повторная отправка через ${cooldownSeconds} сек.` : 'Отправить ссылку'}
      </Button>
    </Form>
  );
}
