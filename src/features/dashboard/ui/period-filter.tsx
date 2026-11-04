'use client';

import { LayoutGroup, motion, MotionConfig } from 'motion/react';
import { useState, type ChangeEvent, type FocusEvent, type PointerEvent } from 'react';
import { DatePicker } from '@/shared/components/ui/form/primitives/date-picker';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import type { DashboardPeriod } from '@/shared/types/dashboard';
import { cn } from '@/shared/utils/cn';
import { DASHBOARD_PERIOD_OPTIONS } from '../constants';

type PeriodFilterProps = {
  period: DashboardPeriod;
  from: string;
  to: string;
  isPending: boolean;
  onPeriodChange: (period: DashboardPeriod) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
};

export function PeriodFilter(props: PeriodFilterProps) {
  const { period, from, to, isPending, onPeriodChange, onFromChange, onToChange } = props;
  const [previewPeriod, setPreviewPeriod] = useState<DashboardPeriod | null>(null);
  const highlightedPeriod = previewPeriod ?? period;

  function handlePeriodChange(event: ChangeEvent<HTMLInputElement>) {
    onPeriodChange(event.target.value as DashboardPeriod);
  }

  function handlePreviewStart(
    event: PointerEvent<HTMLLabelElement> | FocusEvent<HTMLInputElement>
  ) {
    const value = event.currentTarget.dataset.period;
    if (!value) return;

    setPreviewPeriod(value as DashboardPeriod);
  }

  function handlePreviewEnd() {
    setPreviewPeriod(null);
  }

  return (
    <fieldset className="w-full min-w-0 md:w-auto">
      <legend className="sr-only">Период аналитики</legend>
      <MotionConfig reducedMotion="user">
        <LayoutGroup id="dashboard-period-filter">
          <div
            className="border-border bg-secondary/70 surface-shadow flex w-full max-w-full gap-1 overflow-x-auto rounded-xl border p-1 backdrop-blur-xl"
            onPointerLeave={handlePreviewEnd}
          >
            {DASHBOARD_PERIOD_OPTIONS.map((option) => {
              const isHighlighted = highlightedPeriod === option.value;

              return (
                <label
                  key={option.value}
                  data-period={option.value}
                  onPointerEnter={handlePreviewStart}
                  className="relative shrink-0 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="dashboard-period"
                    value={option.value}
                    data-period={option.value}
                    checked={period === option.value}
                    disabled={isPending}
                    onChange={handlePeriodChange}
                    onFocus={handlePreviewStart}
                    onBlur={handlePreviewEnd}
                    className="peer sr-only"
                  />
                  {isHighlighted && (
                    <motion.span
                      layoutId="active-period"
                      className="bg-primary pointer-events-none absolute inset-0 rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={cn(
                      'peer-focus-visible:ring-ring relative z-10 inline-flex h-10 items-center justify-center rounded-lg px-2.5 text-xs font-semibold transition-colors duration-200 peer-focus-visible:ring-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-60 motion-reduce:transition-none xl:h-11 xl:px-3',
                      isHighlighted
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </LayoutGroup>
      </MotionConfig>

      {period === 'custom' && (
        <AnimateIn variant="fade" className="mt-3 grid gap-3 sm:grid-cols-2">
          <DatePicker
            value={from}
            onChange={onFromChange}
            label="Дата от"
            disabled={isPending}
            className="bg-surface h-11"
          />
          <DatePicker
            value={to}
            onChange={onToChange}
            label="Дата до"
            disabled={isPending}
            className="bg-surface h-11"
          />
        </AnimateIn>
      )}
    </fieldset>
  );
}
