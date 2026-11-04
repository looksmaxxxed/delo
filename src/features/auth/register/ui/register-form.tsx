'use client';

import Link from 'next/link';
import type { UseFormReturn } from 'react-hook-form';
import { Form } from '@/shared/components/ui/form/form';
import { Button } from '@/shared/components/ui/actions/button';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { FormCheckbox } from '@/shared/components/ui/form/fields/form-checkbox';
import type { RegisterInput } from '@/shared/schemas/auth';
import { LEGAL_PRIVACY_PATH, LEGAL_TERMS_PATH } from '@/constants/legal';

type RegisterFormViewProps = {
  form: UseFormReturn<RegisterInput>;
  isLoading: boolean;
  onSubmit: (data: RegisterInput) => Promise<void>;
};

export function RegisterFormView(props: RegisterFormViewProps) {
  const { form, isLoading, onSubmit } = props;
  const { control, handleSubmit } = form;

  return (
    <Form {...form} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <FormInput control={control} name="name" label="Имя" autoComplete="name" />
        <FormInput control={control} name="email" label="Email" type="email" autoComplete="email" />
        <FormInput
          control={control}
          name="password"
          label="Пароль"
          type="password"
          autoComplete="new-password"
        />
        <FormInput
          control={control}
          name="confirmPassword"
          label="Подтвердить пароль"
          type="password"
          autoComplete="new-password"
        />
      </div>

      <FormCheckbox control={control} name="legalAccepted">
        Я принимаю{' '}
        <Link href={LEGAL_TERMS_PATH} className="text-primary underline underline-offset-4">
          условия использования
        </Link>{' '}
        и соглашаюсь с{' '}
        <Link href={LEGAL_PRIVACY_PATH} className="text-primary underline underline-offset-4">
          политикой обработки персональных данных
        </Link>
      </FormCheckbox>

      <Button
        type="submit"
        className="xl:h-13 h-11 w-full rounded-lg text-sm font-semibold xl:text-base"
        isLoading={isLoading}
        Icon={ArrowRightIcon}
      >
        Создать аккаунт
      </Button>
    </Form>
  );
}
