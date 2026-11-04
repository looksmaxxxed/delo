'use client';

import type { Control } from 'react-hook-form';
import { DeleteIcon } from '@/shared/components/icons/delete';
import { Button } from '@/shared/components/ui/actions/button';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import type { OrderInput } from '@/shared/schemas/orders';

type OrderItemFieldsProps = {
  control: Control<OrderInput>;
  index: number;
  canRemove: boolean;
  onRemove: (index: number) => void;
};

export function OrderItemFields(props: OrderItemFieldsProps) {
  const { control, index, canRemove, onRemove } = props;

  function handleRemove() {
    if (!canRemove) return;
    onRemove(index);
  }

  return (
    <div className="border-border grid grid-cols-2 items-start gap-2 rounded-xl border p-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:border-0 lg:p-0 lg:pt-1.5">
      <div className="col-span-2 lg:col-span-1">
        <FormInput control={control} name={`items.${index}.name`} label="Название" />
      </div>
      <FormInput control={control} name={`items.${index}.description`} label="Описание" />
      <FormInput control={control} name={`items.${index}.price`} type="number" label="Стоимость" />
      <Button
        type="button"
        mode="icon"
        variant="ghost"
        tooltip="Удалить позицию"
        Icon={DeleteIcon}
        disabled={!canRemove}
        onClick={handleRemove}
        className="col-span-2 size-10 justify-self-end lg:col-span-1 lg:mt-1.5 xl:size-8"
      />
    </div>
  );
}
