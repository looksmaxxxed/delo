'use client';

import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';
import { APP_ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/utils/cn';

const Toaster = (props: ToasterProps) => {
  const { theme = 'system' } = useTheme();
  const pathname = usePathname();
  const hasAppShell = APP_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-500" />,
        info: <InfoIcon className="size-4 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-500" />,
        error: <OctagonXIcon className="text-destructive size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: 'cn-toast glass',
        },
      }}
      {...props}
      className={cn('toaster group', hasAppShell && 'app-shell-toaster', props.className)}
      mobileOffset={
        hasAppShell ? { bottom: 'calc(5.75rem + env(safe-area-inset-bottom))' } : props.mobileOffset
      }
    />
  );
};

export { Toaster };
