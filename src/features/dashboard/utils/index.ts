import { formatDate } from '@/shared/utils/format';

export function formatClientAxisLabel(value: string) {
  return value.length > 16 ? `${value.slice(0, 15)}…` : value;
}

export function getDeadlineLabel(deadline: Date, daysUntil: number) {
  if (daysUntil < 0) return `Просрочен на ${Math.abs(daysUntil)} дн.`;
  if (daysUntil === 0) return 'Сегодня';
  if (daysUntil === 1) return 'Завтра';
  if (daysUntil <= 7) return `Через ${daysUntil} дн.`;

  return formatDate(deadline, 'd MMMM');
}
