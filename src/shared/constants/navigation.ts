import type { NavItem, NavItemKey } from '@/types/navigation';
import { FileTextIcon } from '@/shared/components/icons/file-text';
import { HomeIcon } from '@/shared/components/icons/home';
import { TrendingUpIcon } from '@/shared/components/icons/trending-up';
import { UserIcon } from '@/shared/components/icons/user';
import { UsersIcon } from '@/shared/components/icons/users';
import { XIcon } from '@/shared/components/icons/x';
import { DASHBOARD_ROUTE, PROFILE_ROUTE } from '@/constants/routes';

export const RETURN_TO = 'returnTo' as const;

export const NAV_ITEMS: Record<NavItemKey, NavItem> = {
  main: {
    href: DASHBOARD_ROUTE,
    label: 'Главная',
    description: 'Обзор ключевых показателей и последних активностей',
    Icon: HomeIcon,
  },
  clients: {
    href: '/clients',
    label: 'Клиенты',
    pageTitle: 'Клиенты',
    description: 'Управляйте своей базой контактов и компаний',
    Icon: UsersIcon,
  },
  orders: {
    href: '/orders',
    label: 'Заказы',
    description: 'Отслеживайте заказы, статусы и оплаты',
    Icon: FileTextIcon,
  },
  reports: {
    href: '/reports',
    label: 'Отчёты',
    description: 'Просматривайте и скачивайте отчёты по заказам',
    Icon: TrendingUpIcon,
  },
  profile: {
    href: PROFILE_ROUTE,
    label: 'Профиль',
    description: 'Настройки профиля, реквизиты и подтверждение email',
    Icon: UserIcon,
  },
  notFound: {
    href: '/',
    label: 'Страница не найдена',
    description: 'Запрашиваемая страница не существует или была удалена',
    Icon: XIcon,
    isDisabled: true,
  },
};
