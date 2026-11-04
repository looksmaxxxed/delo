'use client';

import { Button } from '@/shared/components/ui/actions/button';
import { MoonIcon } from '@/shared/components/icons/moon';
import { SunIcon } from '@/shared/components/icons/sun';
import { useIsClient } from '@/shared/hooks/use-is-client';
import { useThemeToggle } from '@/shared/hooks/use-theme-toggle';

export function ThemeToggle() {
  const isClient = useIsClient();
  const { isDark, toggleTheme, isSwitching } = useThemeToggle();
  const dark = isClient && isDark;

  return (
    <Button
      type="button"
      mode="icon"
      variant="outline"
      Icon={dark ? SunIcon : MoonIcon}
      tooltip={dark ? 'Светлая тема' : 'Тёмная тема'}
      aria-label={dark ? 'Светлая тема' : 'Тёмная тема'}
      aria-busy={isSwitching}
      disabled={isSwitching}
      onClick={toggleTheme}
      className="border-primary bg-surface text-foreground dark:border-primary size-10 rounded-lg border disabled:opacity-100 motion-reduce:transform-none xl:size-11"
    />
  );
}
