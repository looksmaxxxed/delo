'use client';

import { Button } from '@/shared/components/ui/actions/button';
import { CircleCheckIcon } from '@/shared/components/icons/circle-check';

type ConfirmOrderButtonProps = { isLoading: boolean; onConfirm: () => Promise<void> };

export function ConfirmOrderButton(props: ConfirmOrderButtonProps) {
  const { isLoading, onConfirm } = props;

  return (
    <Button
      className="h-11 w-full sm:w-auto"
      Icon={CircleCheckIcon}
      isLoading={isLoading}
      onClick={onConfirm}
    >
      Подтвердить условия
    </Button>
  );
}
