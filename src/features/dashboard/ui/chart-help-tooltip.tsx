'use client';

import { Tooltip } from '@base-ui/react/tooltip';
import { CircleHelp } from 'lucide-react';

type ChartHelpTooltipProps = {
  chartTitle: string;
  description: string;
};

export function ChartHelpTooltip(props: ChartHelpTooltipProps) {
  const { chartTitle, description } = props;

  return (
    <Tooltip.Provider delay={250}>
      <Tooltip.Root>
        <Tooltip.Trigger
          type="button"
          aria-label={`Что показывает график «${chartTitle}»`}
          className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 flex size-7 cursor-help items-center justify-center rounded-lg border border-transparent outline-none transition-colors"
        >
          <CircleHelp size={15} />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8} className="z-[70]">
            <Tooltip.Popup className="border-border bg-popover text-popover-foreground max-w-72 origin-[var(--transform-origin)] rounded-lg border px-3 py-2.5 text-xs leading-relaxed shadow-xl transition-[scale,opacity] duration-150 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none">
              {description}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
