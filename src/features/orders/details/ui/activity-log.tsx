'use client';

import { EmptyList } from '@/shared/components/ui/feedback/empty-list';
import { ACTIVITY_TYPE_ICONS, ACTIVITY_TYPE_LABELS } from '../constants';
import { formatDate } from '@/shared/utils/format';
import type { ActivityEntry } from '@/types/payments';

type ActivityLogProps = {
  activities: ActivityEntry[];
};

export function ActivityLog(props: ActivityLogProps) {
  const { activities } = props;

  return (
    <EmptyList items={activities} message="Нет записей">
      <div className="flex flex-1 flex-col xl:min-h-0">
        <div className="shrink-0 pr-2">
          <table className="w-full table-fixed">
            <colgroup>
              <col />
              <col className="w-40" />
            </colgroup>
            <thead>
              <tr className="text-muted-foreground border-border border-b text-xs">
                <th className="pb-2 text-left font-bold">Событие</th>
                <th className="pb-2 text-right font-bold">Дата</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-2">
          <table className="w-full table-fixed">
            <colgroup>
              <col />
              <col className="w-40" />
            </colgroup>
            <tbody className="divide-border divide-y">
              {activities.map((activity) => {
                const Icon = ACTIVITY_TYPE_ICONS[activity.type];

                return (
                  <tr key={activity.id}>
                    <td className="py-3 text-sm font-normal">
                      <div className="flex items-center gap-3">
                        <Icon className="text-muted-foreground shrink-0" size={16} />
                        <span>{ACTIVITY_TYPE_LABELS[activity.type]}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground py-3 text-right text-xs font-bold">
                      {formatDate(activity.createdAt, 'd MMM yyyy, HH:mm')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </EmptyList>
  );
}
