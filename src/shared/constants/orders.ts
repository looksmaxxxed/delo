import type { AnimatedIconComponent } from '@/types/icons';
import { CircleCheckIcon } from '@/shared/components/icons/circle-check';
import { CheckCheckIcon } from '@/shared/components/icons/check-check';
import { EyeIcon } from '@/shared/components/icons/eye';
import { FileTextIcon } from '@/shared/components/icons/file-text';
import { XIcon } from '@/shared/components/icons/x';
import { ZapIcon } from '@/shared/components/icons/zap';
import { OrderStatus } from '@prisma/client';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  DRAFT: 'Черновик',
  SENT: 'На проверке',
  CONFIRMED: 'Подтверждён',
  IN_PROGRESS: 'В работе',
  COMPLETED: 'Завершён',
  CANCELLED: 'Отменён',
};

export const ORDER_STATUS_ICONS: Record<OrderStatus, AnimatedIconComponent> = {
  DRAFT: FileTextIcon,
  SENT: EyeIcon,
  CONFIRMED: CircleCheckIcon,
  IN_PROGRESS: ZapIcon,
  COMPLETED: CheckCheckIcon,
  CANCELLED: XIcon,
};

export const ORDER_STATUS_VARIANTS: Record<
  OrderStatus,
  'outline' | 'accent' | 'highlight' | 'secondary' | 'default' | 'destructive'
> = {
  DRAFT: 'outline',
  SENT: 'accent',
  CONFIRMED: 'highlight',
  IN_PROGRESS: 'default',
  COMPLETED: 'outline',
  CANCELLED: 'destructive',
};

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  DRAFT: ['SENT', 'CANCELLED'],
  SENT: ['CANCELLED'],
  CONFIRMED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export const ORDER_FINAL_STATUSES = [OrderStatus.COMPLETED, OrderStatus.CANCELLED] as const;

export const ORDER_TERMS_CONFIRMABLE_STATUSES = [
  OrderStatus.SENT,
  OrderStatus.CONFIRMED,
  OrderStatus.IN_PROGRESS,
] as const;
