'use client';

import { Button } from '@/shared/components/ui/actions/button';
import { AtSignIcon } from '@/shared/components/icons/at-sign';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';

type VerifyEmailViewProps = {
  displayError: string | null;
  onOpenLogin: () => void;
};

export function VerifyEmailView(props: VerifyEmailViewProps) {
  const { displayError, onOpenLogin } = props;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-primary/10 text-primary flex h-20 items-center justify-center rounded-xl">
        <AtSignIcon size={32} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-foreground text-sm font-semibold">
          {displayError ? 'Не удалось подтвердить email' : 'Подождите несколько секунд'}
        </p>
        <p className="text-muted-foreground text-sm leading-6">
          {displayError ??
            'Если ссылка действительна, мы подтвердим email и автоматически войдём в аккаунт.'}
        </p>
      </div>
      {displayError && (
        <Button
          type="button"
          className="xl:h-13 h-11 w-full rounded-lg text-sm font-semibold xl:text-base"
          Icon={ArrowRightIcon}
          onClick={onOpenLogin}
        >
          Перейти ко входу
        </Button>
      )}
    </div>
  );
}
