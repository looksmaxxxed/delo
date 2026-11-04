import type { Variants } from 'motion/react';
import dashboardImage from '@/assets/images/landing/dashboard.png';
import reportsImage from '@/assets/images/landing/reports.png';
import orderDetailsImage from '@/assets/images/landing/order-details.png';
import clientPreviewImage from '@/assets/images/landing/client-preview.png';
import paymentPreviewImage from '@/assets/images/landing/payment-preview.png';
import designerImage from '@/assets/images/landing/doodle-designer.png';
import writerImage from '@/assets/images/landing/doodle-writer.png';
import developerImage from '@/assets/images/landing/doodle-developer.png';
import photographerImage from '@/assets/images/landing/doodle-photographer.png';
import {
  SEO_SITE_URL,
  SEO_SITE_NAME,
  SEO_DESCRIPTION,
  SEO_SOCIAL_IMAGE,
} from '@/shared/constants/seo';

export const LANDING_REVEAL_VIEWPORT = {
  once: true,
  amount: 0.1,
  margin: '0px 0px -32px 0px',
} as const;

export const LANDING_REVEAL_GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

export const LANDING_PREVIEW_GROUP: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.45 } },
};

export const LANDING_REVEAL_VARIANTS = {
  default: {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.05, ease: [0.22, 0.61, 0.36, 1] },
    },
  },
  headline: {
    hidden: { opacity: 0, y: 44, clipPath: 'inset(0 0 100% 0)' },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(-20% -10% -35% -10%)',
      transition: { duration: 1.2, ease: [0.22, 0.61, 0.36, 1] },
    },
  },
  visual: {
    hidden: { opacity: 0, y: 72, scale: 0.92, rotate: 1.2 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 1.4, ease: [0.22, 0.61, 0.36, 1] },
    },
  },
  decoration: {
    hidden: { opacity: 0, y: 36, scale: 0.82 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.35, ease: [0.22, 1.1, 0.36, 1] },
    },
  },
  accent: {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 1.2, delay: 0.55, ease: [0.65, 0, 0.35, 1] },
    },
  },
} satisfies Record<string, Variants>;

export const LANDING_TAB_POSITIONS = [
  'translate-x-0',
  'translate-x-full',
  'translate-x-[200%]',
] as const;

export const LANDING_SCREENS = [
  {
    label: 'Дашборд',
    shortLabel: 'Обзор',
    image: dashboardImage,
    alt: 'Дашборд Delo с оплатами, заказами, клиентами и ближайшими сроками',
  },
  {
    label: 'Отчёты',
    shortLabel: 'Отчёты',
    image: reportsImage,
    alt: 'Список PDF-отчётов Delo с клиентами, заказами, версиями и статусами',
  },
  {
    label: 'Заказ и оплаты',
    shortLabel: 'Заказ',
    image: orderDetailsImage,
    alt: 'Кабинет Delo: карточка заказа, документы и учёт оплат',
  },
] as const;

export const LANDING_DOODLES = {
  designer: designerImage,
  writer: writerImage,
  developer: developerImage,
  photographer: photographerImage,
} as const;

export const LANDING_STORIES = [
  {
    id: 'reports',
    title: 'Подтверждённые условия —\nв отчёте с историей версий.',
    body: 'Когда клиент подтверждает заказ, Delo сохраняет PDF-отчёт с условиями на этот момент. Если договорённости изменятся, новая версия появится рядом — не придётся восстанавливать историю по сообщениям.',
    note: 'Каждая версия связана с конкретным заказом и клиентом.',
    alt: 'Список отчётов Delo с версиями подтверждённых условий заказа',
    preview: reportsImage,
  },
  {
    id: 'client',
    title: 'Условия — в заказе.\nСогласие — по ссылке.',
    body: 'Вместо поиска договорённостей в переписке откройте заказ: здесь состав работ, стоимость и срок. Клиент подтверждает эти условия по ссылке, а момент подтверждения остаётся в истории.',
    note: 'Клиенту не нужна регистрация.',
    alt: 'Условия и состав работ на публичной странице заказа Delo',
    preview: clientPreviewImage,
  },
  {
    id: 'payments',
    title: 'Предоплата пришла?\nПросто отметьте её.',
    body: 'Отмечайте полученные платежи и видите оплаченную сумму по каждому заказу. Договор, счёт или акт можно прикрепить в PDF — документы останутся рядом с условиями и историей работы.',
    note: 'Платежи учитываются вручную. Перевод денег — отдельно.',
    alt: 'Карточка заказа Delo со стоимостью, полученной оплатой и файлами',
    preview: paymentPreviewImage,
  },
] as const;

export const LANDING_DASHBOARD = {
  title: 'Видно, что происходит.\nИ что делать дальше.',
  body: 'На одном экране собраны оплаты, стоимость новых заказов, остаток к оплате и активная работа. Графики показывают динамику, а списки — сильных клиентов и ближайшие сроки.',
  note: 'Выберите период — от 30 дней до всей истории работы.',
  image: dashboardImage,
  alt: 'Дашборд Delo с ключевыми показателями, графиками и сроками заказов',
  points: [
    { title: 'Деньги', body: 'Полученные оплаты и остаток по активным заказам.' },
    { title: 'Динамика', body: 'Заказы, клиенты и платежи на общей временной оси.' },
    { title: 'Клиенты', body: 'Топ заказчиков по фактически полученным оплатам.' },
    { title: 'Сроки', body: 'Ближайшие дедлайны без ручного календаря.' },
  ],
} as const;

export const LANDING_CONTENT = {
  hero: {
    title: 'Согласуйте работы,',
    titleLead: 'стоимость и сроки',
    titleAccent: 'по одной ссылке',
    description:
      'Клиенту не нужна регистрация: он откроет заказ в браузере и подтвердит условия. Договорённости сохранятся в PDF-отчёте, а оплаты и ход работы — в вашем кабинете.',
    cta: 'Создать первый заказ',
    demoCta: 'Посмотреть пример заказа',
  },
  features: {
    title: 'От первого заказа —\nдо полной картины.',
  },
  how: {
    title: 'Начните\nс одного заказа.',
    description:
      'Например, вы делаете лендинг для клиента. Соберите условия в заказе, отправьте ссылку для подтверждения и отметьте предоплату. Дальше Delo сохранит отчёт и учтёт заказ на дашборде.',
    cta: 'Попробовать Delo',
  },
  faq: {
    title: 'Остались вопросы?',
  },
  final: {
    title: 'Ваш следующий заказ\nможет начаться здесь.',
    description:
      'Создайте аккаунт, соберите первый заказ и отправьте ссылку клиенту. Все доступные функции сейчас можно использовать бесплатно.',
    cta: 'Создать аккаунт',
    login: 'Уже пользуетесь Delo? Войти',
  },
  pricingNotice: 'Сейчас Delo полностью бесплатен',
} as const;

export const LANDING_NAV_ITEMS = [
  { label: 'Дашборд', href: '#dashboard' },
  { label: 'Возможности', href: '#features' },
  { label: 'Как начать', href: '#how' },
  { label: 'Вопросы', href: '#faq' },
] as const;

export const LANDING_STEPS = [
  {
    title: 'Соберите заказ',
    body: 'Зарегистрируйтесь и подтвердите почту. Затем добавьте клиента, состав работ, стоимость и срок заказа.',
  },
  {
    title: 'Поделитесь ссылкой',
    body: 'Клиент посмотрит заказ и подтвердит условия. Ему не нужно создавать аккаунт.',
  },
  {
    title: 'Контролируйте работу',
    body: 'Меняйте статус, отмечайте оплаты, смотрите общую динамику на дашборде и возвращайтесь к отчётам по подтверждённым условиям.',
  },
] as const;

export const LANDING_SCRIBBLES = {
  underline: {
    viewBox: '0 0 260 24',
    path: 'M4 13 C38 2 80 18 117 9 S197 4 254 12 M13 20 C71 9 162 22 244 16',
  },
  arrow: { viewBox: '0 0 150 100', path: 'M8 12 C16 58 77 86 133 55 M112 48 L139 52 L127 77' },
  spark: {
    viewBox: '0 0 70 70',
    path: 'M35 5 L33 22 M62 19 L47 28 M63 48 L47 40 M34 65 L34 48 M8 48 L22 39 M9 17 L22 27',
  },
} as const;

export const LANDING_FAQ = [
  {
    question: 'Сколько стоит Delo?',
    answer:
      'Сейчас, на этапе MVP, все доступные функции Delo полностью бесплатны. В дальнейшем планируем сохранить бесплатную базовую версию. Её состав и условия объявим отдельно.',
  },
  {
    question: 'Кому подойдёт Delo?',
    answer:
      'Самозанятым и фрилансерам, которые работают с клиентами: дизайнерам, разработчикам, авторам, маркетологам, фотографам и другим независимым специалистам. Здесь можно вести клиентов и заказы, согласовывать условия и учитывать оплаты.',
  },
  {
    question: 'Клиенту нужно регистрироваться?',
    answer:
      'Нет. Вы отправляете ссылку на заказ, а клиент открывает её в браузере, знакомится с составом работ, стоимостью и сроками и подтверждает условия.',
  },
  {
    question: 'Как работает учёт оплат?',
    answer:
      'Вы вносите уже полученный платёж: сумму, дату и при необходимости примечание. Delo показывает оплаченную сумму и остаток, учитывает предоплату и полную оплату. Перевод денег происходит отдельно от сервиса.',
  },
  {
    question: 'Что происходит после подтверждения условий?',
    answer:
      'Заказ получает статус «Подтверждён», момент подтверждения сохраняется в истории, а Delo формирует версионный PDF-отчёт с зафиксированными условиями. После этого заказ можно взять в работу и отмечать его статус и оплаты.',
  },
  {
    question: 'Что показывает дашборд?',
    answer:
      'Дашборд показывает полученные оплаты, стоимость новых заказов, активную работу, остаток к оплате, динамику по времени, распределение заказов по статусам, лучших клиентов и ближайшие дедлайны. Период можно менять.',
  },
  {
    question: 'Какие документы можно хранить?',
    answer:
      'К заказу можно прикреплять готовые PDF-файлы размером до 5 МБ каждый, например договор, счёт или акт. Отдельно Delo автоматически формирует отчёт по подтверждённым условиям. Генерации договоров, счетов, актов и электронной подписи сейчас нет.',
  },
  {
    question: 'Можно работать с телефона?',
    answer:
      'Да. Delo работает в браузере и адаптируется под экран телефона. Клиент тоже может открыть ссылку и подтвердить условия со смартфона.',
  },
] as const;

export const LANDING_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SEO_SITE_URL}/#website`,
      url: `${SEO_SITE_URL}/`,
      name: SEO_SITE_NAME,
      description: SEO_DESCRIPTION,
      inLanguage: 'ru-RU',
    },
    {
      '@type': 'WebPage',
      '@id': `${SEO_SITE_URL}/#webpage`,
      url: `${SEO_SITE_URL}/`,
      name: SEO_SITE_NAME,
      description: SEO_DESCRIPTION,
      inLanguage: 'ru-RU',
      isPartOf: { '@id': `${SEO_SITE_URL}/#website` },
      mainEntity: { '@id': `${SEO_SITE_URL}/#application` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: new URL(SEO_SOCIAL_IMAGE.url, SEO_SITE_URL).href,
        width: SEO_SOCIAL_IMAGE.width,
        height: SEO_SOCIAL_IMAGE.height,
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${SEO_SITE_URL}/#application`,
      name: SEO_SITE_NAME,
      url: `${SEO_SITE_URL}/`,
      description: SEO_DESCRIPTION,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'ru-RU',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
        url: `${SEO_SITE_URL}/register`,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SEO_SITE_URL}/#faq`,
      url: `${SEO_SITE_URL}/#faq`,
      inLanguage: 'ru-RU',
      isPartOf: { '@id': `${SEO_SITE_URL}/#webpage` },
      mainEntity: LANDING_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
} as const;
