'use client';

import { useTransition } from 'react';
import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { DASHBOARD_DEFAULT_PERIOD, DASHBOARD_PERIOD_VALUES } from '@/shared/constants/dashboard';
import type { DashboardData, DashboardPeriod } from '@/shared/types/dashboard';
import { DashboardView } from './ui/dashboard-view';

type DashboardProps = {
  data: DashboardData;
};

export function Dashboard(props: DashboardProps) {
  const { data } = props;
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useQueryStates(
    {
      period: parseAsStringLiteral(DASHBOARD_PERIOD_VALUES).withDefault(DASHBOARD_DEFAULT_PERIOD),
      from: parseAsString.withDefault(''),
      to: parseAsString.withDefault(''),
    },
    {
      history: 'replace',
      shallow: false,
      scroll: false,
      startTransition,
    }
  );
  const { from, to } = data.range;

  function changePeriod(period: DashboardPeriod) {
    if (period === 'custom') {
      void setFilters({ period, from, to });
      return;
    }

    void setFilters({ period, from: null, to: null });
  }

  function changeFrom(value: string) {
    if (!value) {
      void setFilters({ period: 'custom', from: null, to: null });
      return;
    }

    void setFilters({
      period: 'custom',
      from: value,
      to: to < value ? value : to,
    });
  }

  function changeTo(value: string) {
    if (!value) {
      void setFilters({ period: 'custom', from: null, to: null });
      return;
    }

    void setFilters({
      period: 'custom',
      from: from > value ? value : from,
      to: value,
    });
  }

  return (
    <DashboardView
      data={data}
      period={filters.period}
      from={from}
      to={to}
      isPending={isPending}
      onPeriodChange={changePeriod}
      onFromChange={changeFrom}
      onToChange={changeTo}
    />
  );
}
