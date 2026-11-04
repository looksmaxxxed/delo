'use client';

import { Popover } from '@base-ui/react/popover';
import { CircleHelp } from 'lucide-react';

type ChartHelpTooltipProps = {
  chartTitle: string;
  description: string;
};

export function ChartHelpTooltip(props: ChartHelpTooltipProps) {
  const { chartTitle, description } = props;

  return (
    <Popover.Root>
      <Popover.Trigger
        type="button"
        aria-label={`Что показывает график «${chartTitle}»`}
        className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 flex size-10 cursor-pointer items-center justify-center rounded-lg border border-transparent outline-none transition-colors xl:size-7"
      >
        <CircleHelp size={15} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" sideOffset={8} className="z-[70]">
          <Popover.Popup className="border-border bg-popover text-popover-foreground max-w-[min(18rem,calc(100vw-2rem))] origin-[var(--transform-origin)] rounded-lg border px-3 py-2.5 text-xs leading-relaxed shadow-xl transition-[scale,opacity] duration-150 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none">
            <Popover.Title className="sr-only">{chartTitle}</Popover.Title>
            <Popover.Description>{description}</Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
