'use client';

import { Button } from '@/shared/components/ui/actions/button';
import { useCookieSettings } from '@/shared/components/providers/cookie-settings/cookie-settings.hook';

export function CookieSettingsButton() {
  const { openSettings } = useCookieSettings();

  return (
    <Button
      type="button"
      variant="link"
      onClick={openSettings}
      className="text-muted-foreground hover:text-foreground h-auto min-h-11 justify-start border-0 p-0 text-sm font-normal transition-colors hover:scale-100 hover:no-underline active:translate-y-0 active:scale-100 xl:min-h-0 xl:px-0 xl:text-sm"
    >
      Настройки cookies
    </Button>
  );
}
