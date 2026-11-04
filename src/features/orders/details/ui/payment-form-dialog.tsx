'use client';

import { CircleDollarSign } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { AppDialog } from '@/shared/components/ui/overlay/dialog';
import { Form } from '@/shared/components/ui/form/form';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { FormDateInput } from '@/shared/components/ui/form/fields/form-date-input';
import { FormTextarea } from '@/shared/components/ui/form/fields/form-textarea';
import { Button } from '@/shared/components/ui/actions/button';
import { CircleDollarSignIcon } from '@/shared/components/icons/circle-dollar-sign';
import { PlusIcon } from '@/shared/components/icons/plus';
import type { PaymentInput } from '@/shared/schemas/payments';

type PaymentFormDialogProps = {
  form: UseFormReturn<PaymentInput>;
  open: boolean;
  isLoading: boolean;
  onSubmit: (data: PaymentInput) => Promise<void>;
  onOpenChange: (open: boolean) => void;
  onOpen: () => void;
};

export function PaymentFormDialog(props: PaymentFormDialogProps) {
  const { form, open, isLoading, onSubmit, onOpenChange, onOpen } = props;
  const { control, handleSubmit } = form;

  return (
    <>
      <Button
        type="button"
        mode="icon"
        variant="outline"
        Icon={PlusIcon}
        tooltip="Добавить оплату"
        onClick={onOpen}
        className="size-10 xl:size-8"
      />

      <AppDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Добавить оплату"
        description="Зафиксируйте поступивший платёж"
        Icon={CircleDollarSign}
        variant="solid"
      >
        <Form {...form} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput control={control} name="amount" label="Сумма (₽)" type="number" />
          <FormDateInput control={control} name="paidAt" label="Дата оплаты" />
          <FormTextarea control={control} name="note" label="Заметка (необязательно)" rows={2} />
          <div className="flex justify-end">
            <Button
              type="submit"
              isLoading={isLoading}
              Icon={CircleDollarSignIcon}
              className="h-10 xl:h-11"
            >
              Сохранить
            </Button>
          </div>
        </Form>
      </AppDialog>
    </>
  );
}
