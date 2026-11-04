'use client';

import { Dialog } from '@base-ui/react/dialog';
import { Button } from '@/shared/components/ui/actions/button';
import type { AnimatedIconComponent } from '@/types/icons';
import { cn } from '@/shared/utils/cn';

type ConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel: string;
  Icon?: AnimatedIconComponent;
  isLoading?: boolean;
  destructive?: boolean;
};

export function ConfirmationDialog(props: ConfirmationDialogProps) {
  const {
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    confirmLabel,
    Icon,
    isLoading,
    destructive,
  } = props;

  function handleCancel() {
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm duration-200" />
        <Dialog.Viewport className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <Dialog.Popup className="border-border bg-surface data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-4 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4 max-w-110 sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 flex max-h-[calc(100svh-0.5rem)] w-full flex-col items-center gap-5 overflow-y-auto overscroll-contain rounded-b-none rounded-t-2xl border px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 shadow-xl outline-none duration-200 sm:gap-6 sm:rounded-2xl sm:p-8">
            {Icon && (
              <div
                className={cn(
                  'text-primary-foreground flex size-12 items-center justify-center rounded-full',
                  destructive ? 'bg-destructive' : 'bg-primary'
                )}
              >
                <Icon size={24} />
              </div>
            )}

            <div className="w-full space-y-2 text-center">
              <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
              <Dialog.Description className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </Dialog.Description>
            </div>

            <div className="flex w-full flex-row gap-2 sm:gap-3">
              <Button
                type="button"
                variant="secondary"
                className="h-10 min-w-0 flex-1 xl:h-11"
                disabled={isLoading}
                onClick={handleCancel}
              >
                Отменить
              </Button>
              <Button
                type="button"
                variant={destructive ? 'destructive' : 'default'}
                className={cn(
                  'h-10 min-w-0 flex-1 xl:h-11',
                  destructive && 'bg-destructive text-primary-foreground hover:bg-destructive/90'
                )}
                isLoading={isLoading}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
