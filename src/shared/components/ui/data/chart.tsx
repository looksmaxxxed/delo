'use client';

import { ResponsiveContainer } from 'recharts';
import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils/cn';

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;

type ChartContainerProps = Omit<ComponentProps<'div'>, 'children'> & {
  children: ComponentProps<typeof ResponsiveContainer>['children'];
};

export function ChartContainer(props: ChartContainerProps) {
  const { className, children, ...rest } = props;

  return (
    <div
      data-slot="chart"
      className={cn(
        '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/60 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-hidden [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted/50 [&_.recharts-reference-line_line]:stroke-border [&_.recharts-surface]:outline-hidden flex aspect-video justify-center text-xs',
        className
      )}
      {...rest}
    >
      <ResponsiveContainer initialDimension={INITIAL_DIMENSION}>{children}</ResponsiveContainer>
    </div>
  );
}
