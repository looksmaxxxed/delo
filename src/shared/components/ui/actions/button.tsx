'use client';

import { useEffect, useRef, useState } from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CopyIcon } from '@/shared/components/icons/copy';
import type { AnimatedIconComponent, AnimatedIconHandle } from '@/types/icons';
import { startAnimatedIcon, stopAnimatedIcon } from '@/shared/utils/animation';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors transition-transform outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:scale-[1.02] active:scale-[0.97] active:translate-y-px cursor-pointer disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-accent bg-accent/30 hover:bg-accent/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 text-sm xl:gap-2 xl:px-5 xl:text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4 xl:[&_svg:not([class*='size-'])]:size-5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonMode = 'icon' | 'copy' | 'default';

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    isSuccess?: boolean;
    isIconActive?: boolean;
    Icon?: AnimatedIconComponent;
    tooltip?: string;
    mode?: ButtonMode;
    copyValue?: string;
  };

export function Button(props: ButtonProps) {
  const {
    className,
    variant,
    size,
    isLoading,
    isSuccess,
    isIconActive,
    Icon,
    children,
    disabled,
    tooltip,
    mode,
    copyValue,
    onClick,
    ...rest
  } = props;
  const iconRef = useRef<AnimatedIconHandle>(null);
  const [copied, setCopied] = useState(false);

  const isCopyMode = mode === 'copy';
  const IconComponent = isCopyMode ? CopyIcon : Icon;
  const effectiveTooltip = isCopyMode ? (tooltip ?? 'Копировать') : tooltip;
  const effectiveSize = mode === 'icon' || isCopyMode ? 'icon' : size;
  const showSuccess = !!isSuccess || (isCopyMode && copied);

  useEffect(() => {
    if (isIconActive === undefined) return;

    if (isIconActive) {
      startAnimatedIcon(iconRef, !!isLoading);
    } else {
      stopAnimatedIcon(iconRef, !!isLoading);
    }
  }, [isIconActive, isLoading]);

  function handleMouseEnter() {
    startAnimatedIcon(iconRef, !!isLoading);
  }

  function handleMouseLeave() {
    stopAnimatedIcon(iconRef, !!isLoading || !!isIconActive);
  }

  function handleCopyClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (copyValue != null) {
      navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      {...rest}
      onClick={isCopyMode ? handleCopyClick : onClick}
      className={cn(buttonVariants({ variant, size: effectiveSize, className }))}
      title={effectiveTooltip}
      disabled={disabled || isLoading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          {showSuccess ? (
            <motion.span
              key="check"
              className="inline-flex opacity-100"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <Check size={18} />
            </motion.span>
          ) : IconComponent ? (
            <motion.span
              key="icon"
              className="inline-flex opacity-100"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <IconComponent size={18} ref={iconRef} />
            </motion.span>
          ) : null}
        </AnimatePresence>
      )}
      {children}
    </ButtonPrimitive>
  );
}
