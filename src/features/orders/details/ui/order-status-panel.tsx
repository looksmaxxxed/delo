'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { OrderLinkActions } from './order-link-actions';
import { OrderStatusPanelCard } from './order-status-panel-card';
import { TransitionButton } from './transition-button';
import { Button } from '@/shared/components/ui/actions/button';
import { DownloadButton } from '@/shared/components/ui/actions/download-button';
import { DeleteIcon } from '@/shared/components/icons/delete';
import { DownloadIcon } from '@/shared/components/icons/download';
import { SquarePenIcon } from '@/shared/components/icons/square-pen';
import { ORDER_ACTION_BUTTON_CLASS_NAME } from '../constants';
import type { OrderTransitionAction } from '../types';

type OrderStatusPanelProps = {
  publicOrderUrl: string;
  latestReadyReportId: string | null;
  canEditOrder: boolean;
  editHref: Route<string>;
  actions: readonly OrderTransitionAction[];
  onTransition: (action: OrderTransitionAction) => void;
  onDelete: () => void;
};

export function OrderStatusPanel(props: OrderStatusPanelProps) {
  const {
    publicOrderUrl,
    latestReadyReportId,
    canEditOrder,
    editHref,
    actions,
    onTransition,
    onDelete,
  } = props;

  return (
    <div className="border-border flex flex-col gap-4 border-b pb-6 xl:flex-row xl:items-center xl:justify-between">
      {actions.length > 0 && (
        <OrderStatusPanelCard
          title="Доступные действия"
          className="md:w-auto md:min-w-80"
          contentClassName="mt-4"
        >
          <div className="grid auto-cols-fr grid-flow-col gap-2 sm:flex sm:flex-nowrap sm:items-center">
            {actions.map((action) => (
              <TransitionButton
                key={action.targetStatus}
                action={action}
                onTransition={onTransition}
              />
            ))}
          </div>
        </OrderStatusPanelCard>
      )}

      <OrderStatusPanelCard
        title="Управление заказом"
        className="xl:w-auto"
        contentClassName="mt-4"
      >
        <div className="grid auto-cols-fr grid-flow-col gap-2 sm:flex sm:flex-nowrap sm:items-center">
          <OrderLinkActions
            publicOrderUrl={publicOrderUrl}
            className={ORDER_ACTION_BUTTON_CLASS_NAME}
          />

          {latestReadyReportId && (
            <DownloadButton
              href={`/api/reports/${latestReadyReportId}`}
              variant="outline"
              className={ORDER_ACTION_BUTTON_CLASS_NAME}
              Icon={DownloadIcon}
              tooltip="Скачать отчёт"
            >
              <span className="max-w-full truncate sm:hidden">Отчёт</span>
              <span className="hidden sm:inline">Скачать отчёт</span>
            </DownloadButton>
          )}

          {canEditOrder && (
            <Button
              render={<Link href={editHref} />}
              nativeButton={false}
              variant="outline"
              className={ORDER_ACTION_BUTTON_CLASS_NAME}
              Icon={SquarePenIcon}
              tooltip="Редактировать заказ"
            >
              <span className="max-w-full truncate sm:hidden">Изменить</span>
              <span className="hidden sm:inline">Редактировать</span>
            </Button>
          )}

          <Button
            type="button"
            variant="destructive"
            className={ORDER_ACTION_BUTTON_CLASS_NAME}
            Icon={DeleteIcon}
            tooltip="Удалить заказ"
            onClick={onDelete}
          >
            <span className="max-w-full truncate sm:hidden">Удалить</span>
            <span className="hidden sm:inline">Удалить заказ</span>
          </Button>
        </div>
      </OrderStatusPanelCard>
    </div>
  );
}
