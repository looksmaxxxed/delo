'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ComponentType, ReactNode } from 'react';
import { XIcon } from '@/shared/components/icons/x';
import { cn } from '@/shared/utils/cn';

type AppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
  size?: 'md' | 'lg';
  layer?: 'base' | 'nested';
  variant?: 'default' | 'solid';
  contentLayout?: 'scroll' | 'form';
};

export function AppDialog(props: AppDialogProps) {
  const {
    open,
    onOpenChange,
    title,
    description,
    Icon,
    children,
    size = 'md',
    layer = 'base',
    variant = 'default',
    contentLayout = 'scroll',
  } = props;
  const layerClass = layer === 'nested' ? 'z-[60]' : 'z-[40]';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          forceRender={layer === 'nested'}
          className={cn(
            'data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 fixed inset-0 bg-black/40 backdrop-blur-sm duration-200',
            layerClass
          )}
        />
        <Dialog.Viewport
          className={cn(
            'safe-area-overlay fixed inset-0 flex items-end justify-center sm:items-center',
            layerClass
          )}
        >
          <Dialog.Popup
            className={cn(
              'data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-4 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4 sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95 flex max-h-[calc(var(--app-viewport-height)-0.5rem)] w-full flex-col overflow-hidden rounded-b-none rounded-t-2xl border shadow-lg duration-200 sm:max-h-[calc(var(--app-viewport-height)-2rem)] sm:rounded-xl',
              variant === 'solid' ? 'border-border bg-surface' : 'glass',
              size === 'lg' ? 'max-w-4xl' : 'max-w-lg'
            )}
          >
            <div className="border-border border-l-primary flex shrink-0 items-center justify-between gap-3 border-b border-l-4 p-4 sm:gap-4 sm:p-5">
              <div className="flex min-w-0 items-center gap-4">
                <div className="border-primary/20 bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl border sm:size-12">
                  <Icon size={22} />
                </div>
                <div className="min-w-0">
                  <Dialog.Title className="text-lg font-bold sm:text-xl">{title}</Dialog.Title>
                  {description && (
                    <Dialog.Description className="text-muted-foreground mt-1 text-sm">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
              </div>
              <Dialog.Close className="text-muted-foreground hover:text-foreground focus-visible:ring-ring flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors focus-visible:ring-2 xl:size-11">
                <XIcon size={24} />
              </Dialog.Close>
            </div>
            <div
              className={cn(
                contentLayout === 'form'
                  ? 'flex min-h-0 flex-1 flex-col overflow-hidden p-0 sm:block sm:overflow-y-auto sm:p-5'
                  : 'overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:p-5'
              )}
            >
              {children}
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
