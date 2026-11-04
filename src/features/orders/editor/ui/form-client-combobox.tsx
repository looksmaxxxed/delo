'use client';

import type { ReactNode } from 'react';
import type { Control } from 'react-hook-form';
import { UserRoundPlus } from 'lucide-react';
import { Button } from '@/shared/components/ui/actions/button';
import { UserRoundPlusIcon } from '@/shared/components/icons/user-round-plus';
import { AppDialog } from '@/shared/components/ui/overlay/dialog';
import type { OrderInput } from '@/shared/schemas/orders';
import {
  FormCombobox,
  type FormComboboxLoadOptionsParams,
} from '@/shared/components/ui/form/fields/form-combobox';
import type { SelectOption } from '@/types/forms';

type FormClientComboboxProps = {
  control: Control<OrderInput>;
  createOpen: boolean;
  createdOption?: SelectOption;
  defaultOption?: SelectOption;
  defaultOptions: SelectOption[];
  createForm: ReactNode;
  onLoadOptions: (params: FormComboboxLoadOptionsParams) => Promise<SelectOption[]>;
  onOpenCreate: () => void;
  onCreateOpenChange: (open: boolean) => void;
};

export function FormClientCombobox(props: FormClientComboboxProps) {
  const {
    control,
    createOpen,
    createdOption,
    defaultOption,
    defaultOptions,
    createForm,
    onLoadOptions,
    onOpenCreate,
    onCreateOpenChange,
  } = props;

  return (
    <>
      <FormCombobox
        control={control}
        name="clientId"
        label="Клиент"
        loadOptions={onLoadOptions}
        defaultOption={defaultOption}
        defaultOptions={defaultOptions}
        createdOption={createdOption}
        action={
          <Button
            type="button"
            variant="ghost"
            Icon={UserRoundPlusIcon}
            onClick={onOpenCreate}
            className="text-primary w-full justify-center"
          >
            Новый клиент
          </Button>
        }
      />

      <AppDialog
        open={createOpen}
        onOpenChange={onCreateOpenChange}
        title="Новый клиент"
        description="Добавьте нового клиента в базу"
        Icon={UserRoundPlus}
        size="lg"
        layer="nested"
        variant="solid"
        contentLayout="form"
      >
        {createForm}
      </AppDialog>
    </>
  );
}
