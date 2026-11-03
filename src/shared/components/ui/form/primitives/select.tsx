'use client';

import { Select as SelectPrimitive } from '@base-ui/react/select';

import { cn } from '@/shared/utils/cn';
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

const Select = SelectPrimitive.Root;

type SelectTriggerProps = SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'default';
};

type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >;

function SelectGroup(props: SelectPrimitive.Group.Props) {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1 p-1', className)}
      {...rest}
    />
  );
}

function SelectValue(props: SelectPrimitive.Value.Props) {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('flex flex-1 text-left', className)}
      {...rest}
    />
  );
}

function SelectTrigger(props: SelectTriggerProps) {
  const { className, size = 'default', children, ...rest } = props;

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-border bg-secondary/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground hover:border-ring hover:ring-ring/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 group flex w-fit select-none items-center justify-between gap-1.5 whitespace-nowrap rounded-lg border py-2 pl-2.5 pr-2 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="text-muted-foreground group-hover:text-primary group-focus-visible:text-primary group-data-popup-open:text-primary pointer-events-none size-4 transition-colors" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent(props: SelectContentProps) {
  const {
    className,
    children,
    side = 'bottom',
    sideOffset = 4,
    align = 'center',
    alignOffset = 0,
    alignItemWithTrigger = true,
    ...rest
  } = props;

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            'max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 relative isolate z-50 min-w-36 overflow-y-auto overflow-x-hidden rounded-lg shadow-md ring-1 duration-100 data-[align-trigger=true]:animate-none',
            className
          )}
          {...rest}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel(props: SelectPrimitive.GroupLabel.Props) {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn('text-muted-foreground px-1.5 py-1 text-xs', className)}
      {...rest}
    />
  );
}

function SelectItem(props: SelectPrimitive.Item.Props) {
  const { className, children, ...rest } = props;

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "outline-hidden data-highlighted:bg-accent/40 aria-selected:bg-accent/40 data-disabled:pointer-events-none data-disabled:opacity-50 not-last-of-type:border-b relative flex w-full cursor-pointer select-none items-center py-2.5 pl-3 pr-3 text-sm transition-[color,background-color,padding] aria-selected:pl-9 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...rest}
    >
      <SelectPrimitive.ItemIndicator
        render={
          <span className="text-primary pointer-events-none absolute left-3 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none size-3.5" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator(props: SelectPrimitive.Separator.Props) {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...rest}
    />
  );
}

function SelectScrollUpButton(props: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "bg-popover top-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...rest}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton(props: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bg-popover bottom-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...rest}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
