'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { OrderLinkActions } from './order-link-actions';
import { OrderStatusBadge } from '@/features/orders/common/ui/order-status-badge';
import { OrderStatusPanelCard } from './order-status-panel-card';
import { TransitionButton } from './transition-button';
import { Button } from '@/shared/components/ui/actions/button';
import { DownloadButton } from '@/shared/components/ui/actions/download-button';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { DeleteIcon } from '@/shared/components/icons/delete';
import { DownloadIcon } from '@/shared/components/icons/download';
import type { OrderStatus } from '@prisma/client';
import { ORDER_ACTION_BUTTON_CLASS_NAME } from '../constants';
import type { OrderTransitionAction } from '../types';

type OrderStatusPanelProps = {
  currentStatus: OrderStatus;
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
    currentStatus,
    publicOrderUrl,
    latestReadyReportId,
    canEditOrder,
    editHref,
    actions,
    onTransition,
    onDelete,
  } = props;

  return (
    <div className="border-border flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <OrderStatusPanelCard
          title="Текущий статус"
          className="sm:min-w-45"
          contentClassName="mt-4"
        >
          <OrderStatusBadge status={currentStatus} />
        </OrderStatusPanelCard>

        {actions.length > 0 && (
          <OrderStatusPanelCard
            title="Доступные действия"
            className="sm:min-w-80"
            contentClassName="mt-4"
          >
            <div className="flex flex-wrap items-center gap-2">
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
      </div>

      <OrderStatusPanelCard title="Управление заказом" contentClassName="mt-4">
        <div className="flex flex-wrap items-center gap-2">
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
            >
              Скачать отчёт
            </DownloadButton>
          )}

          {canEditOrder && (
            <Button
              render={<Link href={editHref} />}
              nativeButton={false}
              variant="outline"
              className={ORDER_ACTION_BUTTON_CLASS_NAME}
              Icon={ArrowRightIcon}
            >
              Редактировать
            </Button>
          )}

          <Button
            type="button"
            variant="destructive"
            className={ORDER_ACTION_BUTTON_CLASS_NAME}
            Icon={DeleteIcon}
            onClick={onDelete}
          >
            Удалить заказ
          </Button>
        </div>
      </OrderStatusPanelCard>
    </div>
  );
}
