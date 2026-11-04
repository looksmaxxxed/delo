import type { PublicOrderData } from '@/shared/types/public-orders';

export const DEMO_ORDER: PublicOrderData = {
  id: 'demo-order',
  title: 'Дизайн лендинга для цветочной мастерской',
  description:
    'Разработать дизайн одностраничного сайта: рассказать о мастерской, показать букеты и помочь посетителю оставить заявку.',
  status: 'SENT',
  paymentStatus: 'PENDING',
  paymentMethod: 'SBP',
  price: 35000,
  startDate: new Date('2026-11-05T12:00:00Z'),
  deadline: new Date('2026-11-19T12:00:00Z'),
  confirmedAt: null,
  isTermsAccepted: false,
  createdAt: new Date('2026-11-04T12:00:00Z'),
  client: { name: 'Анна Примерова', contact: null, company: 'Мастерская «Пример»' },
  executorName: 'Алексей Примеров',
  executorWorkTerms:
    'Начинаю работу после согласования условий и предоплаты 50%.\nВ стоимость входят две итерации правок в рамках согласованного состава работ.\nОставшиеся 50% — после согласования макетов, до передачи исходников.\nДополнительные работы, их стоимость и сроки согласуем отдельно до начала.',
  items: [
    {
      id: 'demo-structure',
      name: 'Структура и прототип',
      description: 'До 7 блоков: от первого экрана до формы заявки.',
      price: 10000,
    },
    {
      id: 'demo-desktop',
      name: 'Дизайн для компьютера',
      description: 'Макеты в Figma, подбор типографики и оформление блоков.',
      price: 20000,
    },
    {
      id: 'demo-mobile',
      name: 'Мобильная версия',
      description: 'Адаптация согласованного дизайна под экран телефона.',
      price: 5000,
    },
  ],
  payments: [],
  totalPaid: 0,
  statusDates: {
    DRAFT: new Date('2026-11-04T12:00:00Z'),
    SENT: new Date('2026-11-04T12:00:00Z'),
  },
};
