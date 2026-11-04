'use client';

import type { UseFormReturn } from 'react-hook-form';
import { IdCard, MessageCircle, User } from 'lucide-react';
import { Form } from '@/shared/components/ui/form/form';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { FormTextarea } from '@/shared/components/ui/form/fields/form-textarea';
import { Button } from '@/shared/components/ui/actions/button';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { SquarePenIcon } from '@/shared/components/icons/square-pen';
import type { ClientInput } from '@/shared/schemas/clients';

type ClientFormViewProps = {
  mode: 'create' | 'edit';
  form: UseFormReturn<ClientInput>;
  isLoading: boolean;
  onSubmit: (data: ClientInput) => Promise<void>;
};

export function ClientFormView(props: ClientFormViewProps) {
  const { mode, form, isLoading, onSubmit } = props;
  const { control, handleSubmit } = form;
  const SubmitIcon = mode === 'create' ? ArrowRightIcon : SquarePenIcon;
  const sectionVariant = mode === 'create' ? 'mobile-flat' : 'default';

  return (
    <Form
      {...form}
      onSubmit={handleSubmit(onSubmit)}
      className={mode === 'create' ? 'flex min-h-0 flex-1 flex-col sm:block' : undefined}
    >
      <div
        className={
          mode === 'create'
            ? 'min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3 sm:space-y-4 sm:overflow-visible sm:p-0 [&_p:empty]:hidden sm:[&_p:empty]:block'
            : 'space-y-4'
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <SectionCard title="Клиент" Icon={User} variant={sectionVariant}>
            <div className="space-y-3 sm:space-y-4">
              <FormInput control={control} name="name" label="Имя / Название" />
              <FormInput control={control} name="contact" label="Контакт" autoComplete="off" />
            </div>
          </SectionCard>

          <SectionCard title="Реквизиты" Icon={IdCard} variant={sectionVariant}>
            <div className="space-y-3 sm:space-y-4">
              <FormInput control={control} name="company" label="Компания" />
              <FormInput control={control} name="inn" label="ИНН" />
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Заметки" Icon={MessageCircle} variant={sectionVariant}>
          <FormTextarea
            control={control}
            name="notes"
            label="Заметки"
            placeholder="Любые дополнительные сведения..."
            rows={4}
          />
        </SectionCard>
      </div>

      <div
        className={
          mode === 'create'
            ? 'border-border bg-surface flex shrink-0 justify-end border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:mt-4 sm:border-0 sm:bg-transparent sm:p-0'
            : 'mt-4 flex justify-end'
        }
      >
        <Button
          type="submit"
          isLoading={isLoading}
          Icon={SubmitIcon}
          className={mode === 'create' ? 'h-11 w-full sm:h-10 sm:w-auto xl:h-11' : 'h-10 xl:h-11'}
        >
          {mode === 'create' ? 'Создать клиента' : 'Сохранить изменения'}
        </Button>
      </div>
    </Form>
  );
}
