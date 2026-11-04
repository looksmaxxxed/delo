'use client';

import type { ComponentProps } from 'react';
import { toast } from 'sonner';
import { CopyIcon } from '@/shared/components/icons/copy';
import { Button } from '@/shared/components/ui/actions/button';
import { useAsyncAction } from '@/shared/hooks/use-async-action';

type OrderLinkActionsProps = {
  publicOrderUrl: string;
  size?: ComponentProps<typeof Button>['size'];
  className?: string;
};

export function OrderLinkActions(props: OrderLinkActionsProps) {
  const { publicOrderUrl, size, className } = props;

  async function copyOrderLink() {
    await navigator.clipboard.writeText(publicOrderUrl);
    toast.success('Ссылка скопирована');
  }

  const [executeCopy, isCopying] = useAsyncAction(copyOrderLink);

  return (
    <Button
      variant="outline"
      size={size}
      className={className}
      Icon={CopyIcon}
      isLoading={isCopying}
      tooltip="Скопировать ссылку"
      onClick={executeCopy}
    >
      <span className="max-w-full truncate sm:hidden">Ссылка</span>
      <span className="hidden sm:inline">Скопировать ссылку</span>
    </Button>
  );
}
