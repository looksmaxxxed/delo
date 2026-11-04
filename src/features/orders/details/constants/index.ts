import type { ActivityType, OrderStatus } from '@prisma/client';
import {
  CheckCheck,
  CircleDollarSign,
  CircleCheck,
  FileText,
  MessageCircle,
  Send,
  X,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { PaymentInput } from '@/shared/schemas/payments';

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  DRAFT: 'Заказ создан',
  SENT: 'Заказ переведён на проверку',
  CONFIRMED: 'Клиент подтвердил условия',
  IN_PROGRESS: 'Заказ взят в работу',
  COMPLETED: 'Заказ завершён',
  CANCELLED: 'Заказ отменён',
  NOTE: 'Добавлена заметка',
  PAYMENT: 'Получена оплата',
};

export const ACTIVITY_TYPE_ICONS: Record<ActivityType, LucideIcon> = {
  DRAFT: FileText,
  SENT: Send,
  CONFIRMED: CircleCheck,
  IN_PROGRESS: Zap,
  COMPLETED: CheckCheck,
  CANCELLED: X,
  NOTE: MessageCircle,
  PAYMENT: CircleDollarSign,
};

export const ORDER_STATUS_ACTION_LABELS: Record<OrderStatus, string> = {
  DRAFT: 'Черновик',
  SENT: 'На проверку',
  CONFIRMED: 'Подтвердить',
  IN_PROGRESS: 'Взять в работу',
  COMPLETED: 'Завершить',
  CANCELLED: 'Отменить',
};

export const ORDER_ACTION_BUTTON_CLASS_NAME =
  '[&_svg]:size-4! h-10 w-full min-w-0 gap-1.5 rounded-lg px-2 text-xs font-semibold sm:w-auto sm:gap-2 sm:px-3 sm:text-sm xl:h-11 xl:px-4';

export const PAYMENT_FORM_DEFAULT_VALUES: PaymentInput = {
  amount: '',
  paidAt: format(new Date(), 'yyyy-MM-dd'),
  note: '',
};
