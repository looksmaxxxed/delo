'use client';

import { Popover } from '@base-ui/react/popover';
import type { ComponentProps } from 'react';
import { forwardRef, useState } from 'react';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';
import { ArrowLeftIcon } from '@/shared/components/icons/arrow-left';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { XIcon } from '@/shared/components/icons/x';
import { Button } from '@/shared/components/ui/actions/button';
import { cn } from '@/shared/utils/cn';

type DatePickerProps = Omit<ComponentProps<'button'>, 'onBlur' | 'onChange' | 'value'> & {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  label: string;
};

const CALENDAR_WEEK_STARTS_ON = 1;
const WEEKDAY_LABELS = Array.from({ length: 7 }, (_, index) => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: CALENDAR_WEEK_STARTS_ON });
  return format(addDays(weekStart, index), 'EEEEE', { locale: ru });
});

function getSelectedDate(value?: string) {
  if (!value) return null;

  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getMonthDays(month: Date) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: CALENDAR_WEEK_STARTS_ON });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: CALENDAR_WEEK_STARTS_ON });
  const days: Date[] = [];
  let currentDay = calendarStart;

  while (currentDay <= calendarEnd) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  return days;
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(props, forwardedRef) {
    const { className, value, onChange, onBlur, label, disabled, ...rest } = props;
    const selectedDate = getSelectedDate(value);
    const [isOpen, setIsOpen] = useState(false);
    const [displayMonth, setDisplayMonth] = useState(selectedDate ?? new Date());
    const isFloating = isOpen || !!value;
    const calendarDays = getMonthDays(displayMonth);
    const formattedValue = selectedDate ? format(selectedDate, 'dd.MM.yyyy', { locale: ru }) : '';

    function handleOpenChange(open: boolean) {
      setIsOpen(open);

      if (open) {
        setDisplayMonth(selectedDate ?? new Date());
        return;
      }

      onBlur?.();
    }

    function handlePreviousMonth() {
      setDisplayMonth((currentMonth) => subMonths(currentMonth, 1));
    }

    function handleNextMonth() {
      setDisplayMonth((currentMonth) => addMonths(currentMonth, 1));
    }

    function createSelectDateHandler(day: Date) {
      return function handleSelectDate() {
        onChange(format(day, 'yyyy-MM-dd'));
        setDisplayMonth(day);
        setIsOpen(false);
        onBlur?.();
      };
    }

    function handleClearDate() {
      onChange('');
      setIsOpen(false);
      onBlur?.();
    }

    return (
      <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
        <div className="relative isolate">
          <Popover.Trigger
            ref={forwardedRef}
            type="button"
            disabled={disabled}
            className={cn(
              'border-border bg-secondary/70 hover:border-ring hover:ring-ring/50 group cursor-pointer',
              'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
              'disabled:bg-input/50 flex h-12 w-full items-center rounded-lg border px-3 text-left text-sm outline-none transition-colors',
              'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...rest}
          >
            <CalendarDays
              className={cn(
                'size-4 shrink-0 transition-colors',
                isOpen
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-primary group-focus-visible:text-primary'
              )}
            />
            <span className="min-w-0 flex-1 truncate pl-2 pr-8">
              {formattedValue || <span className="opacity-0">{label}</span>}
            </span>
          </Popover.Trigger>

          {formattedValue && !disabled && (
            <Button
              type="button"
              mode="icon"
              variant="ghost"
              className="absolute right-1.5 top-1/2 z-20 size-7 -translate-y-1/2"
              tooltip="Сбросить дату"
              Icon={XIcon}
              onClick={handleClearDate}
            />
          )}

          <span
            className={cn(
              'pointer-events-none absolute top-1/2 z-10 text-sm font-normal transition-[top,left,transform,padding,background-color,color] duration-200',
              isFloating
                ? 'bg-surface text-primary left-2.5 top-0 -translate-y-1/2 scale-[0.82] px-1'
                : 'text-muted-foreground left-9 -translate-y-1/2'
            )}
          >
            {label}
          </span>
        </div>

        <Popover.Portal>
          <Popover.Positioner sideOffset={10} align="start" className="z-50">
            <Popover.Popup
              initialFocus={false}
              className={cn(
                'border-border bg-popover text-popover-foreground shadow-xl',
                'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
                'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
                'w-[min(100vw-2rem,20rem)] rounded-lg border p-3 duration-100'
              )}
            >
              <div className="flex items-start justify-between">
                <Button
                  type="button"
                  mode="icon"
                  variant="ghost"
                  tooltip="Предыдущий месяц"
                  Icon={ArrowLeftIcon}
                  onClick={handlePreviousMonth}
                />

                <div className="text-center">
                  <p className="text-xl font-semibold tracking-tight">
                    {format(displayMonth, 'yyyy', { locale: ru })}
                  </p>
                  <p className="text-muted-foreground text-base capitalize">
                    {format(displayMonth, 'LLLL', { locale: ru })}
                  </p>
                </div>

                <Button
                  type="button"
                  mode="icon"
                  variant="ghost"
                  tooltip="Следующий месяц"
                  Icon={ArrowRightIcon}
                  onClick={handleNextMonth}
                />
              </div>

              <div className="mt-3 grid grid-cols-7 gap-2 text-center text-xs font-medium">
                {WEEKDAY_LABELS.map((weekday, index) => (
                  <span key={`${weekday}-${index}`} className="text-muted-foreground py-1">
                    {weekday}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {calendarDays.map((day) => {
                  const isCurrentMonth = isSameMonth(day, displayMonth);
                  const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                  const isCurrentDay = isToday(day);

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={createSelectDateHandler(day)}
                      className={cn(
                        'flex aspect-square cursor-pointer items-center justify-center rounded-xl text-sm transition-colors',
                        isSelected && 'bg-primary text-primary-foreground ',
                        !isSelected &&
                          isCurrentMonth &&
                          'text-foreground hover:bg-accent/50 hover:text-accent-foreground',
                        !isSelected && !isCurrentMonth && 'text-muted-foreground/40',
                        isCurrentDay &&
                          !isSelected &&
                          'ring-primary/35 decoration-primary underline-offset-3 underline ring-1'
                      )}
                    >
                      {format(day, 'd', { locale: ru })}
                    </button>
                  );
                })}
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    );
  }
);
