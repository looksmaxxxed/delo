'use client';

import type { ReactNode } from 'react';
import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { FileText, User, CalendarDays, CreditCard, List } from 'lucide-react';
import { Form } from '@/shared/components/ui/form/form';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { FormTextarea } from '@/shared/components/ui/form/fields/form-textarea';
import { FormDateInput } from '@/shared/components/ui/form/fields/form-date-input';
import { FormSelect } from '@/shared/components/ui/form/fields/form-select';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { OrderItemFields } from './order-item-fields';
import { Button } from '@/shared/components/ui/actions/button';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { PlusIcon } from '@/shared/components/icons/plus';
import { SquarePenIcon } from '@/shared/components/icons/square-pen';
import type { OrderInput } from '@/shared/schemas/orders';
import type { SelectOption } from '@/shared/types/forms';
import { PAYMENT_METHOD_OPTIONS } from '@/shared/constants/payments';
import { OrderTotal } from './order-total';

type OrderFormProps = {
  mode: 'create' | 'edit';
  form: UseFormReturn<OrderInput>;
  fields: FieldArrayWithId<OrderInput, 'items'>[];
  clientField: ReactNode;
  defaultPaymentMethod?: SelectOption;
  canRemoveItems: boolean;
  isLoading: boolean;
  onSubmit: (data: OrderInput) => Promise<void>;
  onAppendItem: () => void;
  onRemoveItem: (index: number) => void;
};

export function OrderForm(props: OrderFormProps) {
  const {
    mode,
    form,
    fields,
    clientField,
    defaultPaymentMethod,
    canRemoveItems,
    isLoading,
    onSubmit,
    onAppendItem,
    onRemoveItem,
  } = props;
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
          <SectionCard title="Заказ" Icon={FileText} variant={sectionVariant}>
            <div className="space-y-3 sm:space-y-4">
              <FormInput control={control} name="title" label="Название заказа" />
              <FormTextarea
                control={control}
                name="description"
                label="Описание"
                placeholder="Опишите суть заказа..."
              />
            </div>
          </SectionCard>

          <SectionCard title="Клиент" Icon={User} variant={sectionVariant}>
            {clientField}
          </SectionCard>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <SectionCard title="Время" Icon={CalendarDays} variant={sectionVariant}>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <FormDateInput control={control} name="startDate" label="Дата начала" />
              <FormDateInput control={control} name="deadline" label="Дедлайн" />
            </div>
          </SectionCard>

          <SectionCard title="Оплата" Icon={CreditCard} variant={sectionVariant}>
            <FormSelect
              control={control}
              name="paymentMethod"
              label="Способ оплаты"
              options={PAYMENT_METHOD_OPTIONS}
              defaultOption={defaultPaymentMethod}
            />
          </SectionCard>
        </div>

        <SectionCard
          title="Состав работ"
          Icon={List}
          variant={sectionVariant}
          action={
            <Button
              type="button"
              mode="icon"
              variant="outline"
              tooltip="Добавить позицию"
              Icon={PlusIcon}
              onClick={onAppendItem}
              className="size-10 xl:size-8"
            />
          }
        >
          <div className="space-y-3">
            <span className="text-muted-foreground text-xs">Позиции</span>
            <div className="xl:h-37.5 space-y-2 xl:overflow-y-auto xl:px-1">
              {fields.map((field, index) => (
                <OrderItemFields
                  key={field.id}
                  control={control}
                  index={index}
                  canRemove={canRemoveItems}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>
            <div className="border-border flex justify-end border-t pt-3">
              <OrderTotal control={control} />
            </div>
          </div>
        </SectionCard>
      </div>

      <div
        className={
          mode === 'create'
            ? 'border-border bg-surface flex shrink-0 justify-end border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:mt-4 sm:border-0 sm:bg-transparent sm:p-0 sm:pt-1'
            : 'mt-4 flex justify-end pt-1'
        }
      >
        <Button
          type="submit"
          isLoading={isLoading}
          Icon={SubmitIcon}
          className={mode === 'create' ? 'h-11 w-full sm:h-10 sm:w-auto xl:h-11' : 'h-10 xl:h-11'}
        >
          {mode === 'create' ? 'Создать заказ' : 'Сохранить изменения'}
        </Button>
      </div>
    </Form>
  );
}
