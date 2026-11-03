<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

## Agent behaviour

- Build или developer актуализирует этот файл, если утверждённая задача вводит подтверждённое проектное соглашение или меняет действующее правило. Для новых правил вне области задачи сначала предложить изменение. Reviewer только сообщает замечания.
- Не запускать локальный dev-сервер самостоятельно; запускать его только по прямой просьбе пользователя.
- Для изменений кода запускать применимые `npm run lint` и `npm run typecheck`; для build/config — также `npm run build`. Для документации проверять затронутые Markdown и ссылки; несвязанные сборки не нужны. Повторять успешные проверки после влияющих на них изменений или при новом основании.
- Разработчик форматирует только затронутые файлы через установленный Prettier. Reviewer проверяет форматирование командой `npm run format:check` или проверяющим запуском Prettier на затронутых файлах; `npm run format` и autofix исходников в ревью не выполняются.

---

# Project: Delo

Веб-сервис для самозанятых и фрилансеров — управление клиентами, заказами, оплатами и документами.

---

## Stack

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL + Prisma
- Auth.js v5 (NextAuth)
- Zod + react-hook-form + @hookform/resolvers
- Resend (email)
- @react-pdf/renderer (PDF)
- @tanstack/react-table
- date-fns
- sonner
- nuqs

---

## File structure

```
src/
├── app/
│   ├── (auth)/          # login, register — без sidebar layout
│   ├── (app)/           # основная защищённая часть с sidebar
│   ├── order/[token]/   # публичная страница заказа (без авторизации)
│   └── api/             # NextAuth, PDF download, profile image proxy
├── features/            # компоненты конкретных сценариев: auth, clients, orders и т.д.
├── shared/
│   ├── components/      # ui, icons, layout, providers
│   ├── config/          # auth.ts, auth-options.ts, db.ts, env.ts
│   ├── constants/       # общие константы приложения
│   ├── emails/          # шаблоны писем
│   ├── hooks/           # общие хуки
│   ├── schemas/         # Zod-схемы и inferred типы
│   ├── types/           # общие TypeScript-интерфейсы
│   └── utils/           # общие helpers
├── assets/
│   ├── fonts/
│   ├── images/
├── styles/
│   └── globals.css
├── actions/             # Server Actions (мутации)
└── proxy.ts             # Next.js Proxy
prisma/schema.prisma
```

`src/app/` содержит маршруты, layouts, loading и route handlers; переиспользуемые сценарии размещаются в `src/features/` рядом с `app`. Если код нужен только одному маршруту, его можно расположить рядом с ним в приватной папке `_components/` внутри соответствующего сегмента `app`.

Внутри фичи верхний уровень содержит точку входа сценария и его composition. Большие области разделяются на сценарии: `orders` и `clients` — list/details/editor, `auth` — login/register/forgot-password/reset-password/verify-email/layout, `profile` — editor/security, public order — payment-info и common presentation. Каждый сценарий имеет свой публичный composition root. В корне feature/сценария из файлов допустим только `index.tsx`; прочие компоненты размещаются в `ui/` или соответствующих подфичах. Клиентская логика состояния, форм, обработчиков, loading и операций находится в `index.tsx` ближайшего сценария-владельца, UI получает данные и callbacks. Не выносить одноразовые операции в обязательный `model/` или слой бизнес-hooks и не собирать функционал всех подфич в root родительской фичи. Серверная бизнес-логика и Server Actions остаются в `src/actions/`, общие инфраструктурные hooks — в `src/shared/hooks/`. Серверная page может передавать статические секции через ReactNode slots; не добавлять пару server root/client controller только ради передачи props и slots.

В `ui/` размещаются компоненты отображения и локального UI-поведения, получающие бизнес-данные и callbacks; общие внутренние типы — в `types/index.ts`, константы — в `constants/index.ts` или `index.tsx` для JSX, чистые helpers — в `utils/`. В домене, разделённом на сценарии, общие определения группируются в его `common/` по тем же техническим папкам: например, `orders/common/ui` и `orders/common/constants`. Корень домена содержит сценарии, common при наличии общих определений и при необходимости `index.tsx`, собирающий экран; не смешивать их с техническими папками. Common не является сценарием и не получает собственного composition root или общего barrel. Не создавать common, если определения принадлежат одному сценарию: clients columns находятся в list, AuthPanel constants/types — в layout, profile image/form helpers — в editor. Папки создаются только при наличии соответствующих определений; не добавлять пустые слои и один управляющий компонент на всю доменную область.

Единственную точку входа сценария размещать в его `index.tsx`: файл содержит сам composition root с именованным экспортом, а не barrel с переэкспортами. Consumers импортируют из пути сценария (`@/features/orders/details`); внутренние UI-компоненты сохраняют описательные имена. Не размещать дополнительные функциональные component-файлы рядом с index: обработчик передаётся из index в controlled UI через props, либо самостоятельный сценарий получает собственную подфичу и index. Для нескольких самостоятельных сценариев не создавать общий feature index только ради их переэкспорта.

---

## Conventions

### Next.js 16 breaking changes

- **Middleware переименован в Proxy**: файл `middleware.ts` → `proxy.ts`, именованный экспорт `export function middleware` → `export function proxy`. Default export работает без переименования.
- Перед `tsc --noEmit` всегда запускать `next typegen`: `next-env.d.ts` не хранится в Git, а на чистом CI без него TypeScript не распознаёт статические импорты изображений и другие типы Next.js. Проектный `npm run typecheck` уже включает оба шага.
- **`turbopack.root`** в `next.config.ts` — обязателен при наличии нескольких lockfile-ов в родительских директориях, иначе Next.js выбирает неверный workspace root.
- В Proxy можно иметь только один `proxy.ts`, но логику и конфиги можно выносить в отдельные модули и импортировать в него.
- `config.matcher` в `proxy.ts` должен быть inline-константой, статически анализируемой Next.js; не выносить matcher в импортированные переменные.
- Списки маршрутов для Proxy хранить в lightweight-конфиге `src/shared/constants/routes.ts` и импортировать напрямую, не через barrel, чтобы не тянуть Prisma/icons в proxy bundle.
- Для сравнения route prefix в Proxy использовать сегментный матч (`pathname === route || pathname.startsWith(route + '/')`), а не сырой `startsWith(route)`, чтобы `/order` не совпадал с `/orders`.
- `proxy.ts` не должен импортировать серверный `src/shared/config/auth.ts`, `db` или `env`: для Auth.js использовать edge-safe `src/shared/config/auth-options.ts` и локальный `NextAuth(authConfig)`, чтобы proxy не тянул PrismaAdapter и полную env-валидацию.

### Next.js 15+ breaking changes

- `params` и `searchParams` в pages и route handlers — всегда `Promise`, нужно `await`:

```ts
// page.tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}

// route.ts
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}
```

- Server Actions по умолчанию принимают тело запроса до 1 МБ; для загрузки файлов нужно явно поднять `experimental.serverActions.bodySizeLimit` в `next.config.ts`

### Naming

- Папки и файлы — kebab-case (`order-form.tsx`, `activity-log.tsx`)
- Компоненты внутри файлов — PascalCase
- Server Actions — camelCase (`createOrder`, `updateClient`)

### Imports

- Не импортировать `React` как дефолтный импорт — используем именованные импорты:
- При `verbatimModuleSyntax: true` все сущности, используемые только как типы, импортировать через `import type` или inline `type` в смешанном импорте.
- Для приведения значения к `number` использовать унарный плюс (`+value`), а не конструктор `Number(value)`.
- Для новых импортов из общих модулей использовать `@/shared/...`; старые алиасы `@/components/*`, `@/config/*`, `@/constants/*`, `@/emails/*`, `@/hooks/*`, `@/schemas/*`, `@/types/*`, `@/utils/*` указывают на `src/shared/` через `tsconfig.json` для совместимости с перенесёнными файлами.

```tsx
// ✓ правильно
import { useState, useEffect, type ComponentProps } from 'react'

// ✗ неправильно
import React from 'react'
React.useState(...)
React.ComponentProps<...>
```

### Components

- Деструктурировать пропсы **внутри тела компонента**, а не в аргументе функции:

```tsx
// ✓ правильно
export default function OrderCard(props: OrderCardProps) {
  const { order, onStatusChange } = props
  ...
}

// ✗ неправильно
export default function OrderCard({ order, onStatusChange }: OrderCardProps) {
  ...
}
```

- Обработчики событий передавать ссылкой, без лишней обёртки:

```tsx
// ✓ правильно
onClick={handleSubmit}
onClick={toggleTheme}

// ✗ неправильно
onClick={() => handleSubmit()}
onClick={() => toggleTheme()}
```

- Если обработчик требует аргументов или содержит несколько операций — выносить в именованную функцию внутри компонента, не инлайнить.
- Для повторяющихся start/stop-обработчиков анимации иконок по ref использовать `startAnimatedIcon()` и `stopAnimatedIcon()` из `src/shared/utils/animation.ts`, а не дублировать логику доступа к `ref.current` в компонентах.

- `'use client'` только там, где реально нужно (формы, хуки, события)
- Server Components по умолчанию — не добавлять `'use client'` без причины

- В `void`-функциях и React effects для явного выхода использовать `return;`, а не `return undefined;`.

### Data fetching

- Данные загружаются в Server Components, передаются в клиентские как пропсы
- Мутации — исключительно через Server Actions в `src/actions/`
- Валидация через Zod-схему и на клиенте (react-hook-form), и на сервере (Server Action)
- Все авторизованные Server Actions, которые меняют данные приложения, кроме профиля, auth-flow и публичных клиентских действий, должны получать сессию через `getVerifiedSession()` из `src/shared/utils/verification.ts`. Не дублировать `auth() + emailVerified` вручную в action-файлах.
- Профиль пользователь может менять без подтверждённого email: `updateProfile`, `uploadProfileImage` и отправка письма подтверждения используют обычный `auth()`, а на фронте профильные формы/кнопки не оборачивать в `useRequireVerifiedEmail()`.
- Для клиентских кнопок первичного создания сущностей, требующих подтверждённый email (например `Новый клиент`, `Новый заказ`), использовать `useRequireVerifiedEmail()` до открытия модалки и показывать toast сразу. Внутри самих форм, `onOpenChange` диалогов и update/action по уже существующим сущностям эту проверку не дублировать; серверная проверка через `getVerifiedSession()` всё равно обязательна.

### Database

- Prisma client — только через singleton из `src/shared/config/db.ts`
- Никогда не импортировать `PrismaClient` напрямую
- Для Auth.js `User.emailVerified` оставлять `DateTime?`: `null` означает, что email не подтверждён, `Date` хранит момент подтверждения. Не менять на boolean — `@auth/prisma-adapter` ожидает `Date | null`.
- Миграции Prisma не писать руками. После изменения `prisma/schema.prisma` генерировать SQL через npm-команду: `npm run migrate:create -- --name <migration-name>`, затем проверять сгенерированный файл.
- При изменении условий использования, политики обработки персональных данных или другого юридического текста, который принимает пользователь, обязательно обновлять `LEGAL_CONSENT_VERSION` в `src/shared/constants/auth.ts` на новую дату/версию.

### Formatting helpers

- Форматирование цен — только через `formatPrice(value: number)` из `src/shared/utils/format.ts`
- Денежные суммы вводятся и валидируются только в целых рублях, без копеек и дробной части.
- Форматирование дат — только через `formatDate(date: Date, fmt?)` из `src/shared/utils/format.ts` (по умолчанию `'d MMM yyyy'`, локаль `ru` встроена)
- Никогда не использовать `toLocaleString('ru-RU', ...)`, `format(date, ..., { locale: ru })` напрямую в компонентах и константах
- Метки статусов оплаты — из `PAYMENT_STATUS_LABELS` в `src/shared/constants/payments.ts`

```ts
// ✓ правильно
import { formatPrice, formatDate } from '@/shared/utils/format';
formatPrice(order.price); // → '1 500 ₽'
formatDate(order.createdAt); // → '5 апр 2026'
formatDate(order.deadline, 'd MMMM yyyy'); // → '5 апреля 2026'

// ✗ неправильно
price.toLocaleString('ru-RU') + ' ₽';
format(date, 'd MMM yyyy', { locale: ru });
```

### Formatting

- Форматирование — **Prettier** (`.prettierrc` в корне): `singleQuote`, `semi`, `tabWidth: 2`, `trailingComma: "es5"`, `printWidth: 100`
- `prettier-plugin-tailwindcss` — автоматически сортирует Tailwind-классы, не менять порядок вручную
- Перед JSX `return (` или `return <...>` отделять предшествующий код пустой строкой, включая render callbacks. Сразу после открытия блока лишнюю пустую строку не добавлять.
- Перед коммитом форматировать затронутые файлы; `npm run format:check` — проверка без изменений. `npm run format` переписывает весь репозиторий и используется только для явно согласованного общего форматирования.
- Весь генерируемый код должен соответствовать этим правилам без ручного форматирования

### Styles

- Глобальные стили — `src/styles/globals.css`
- Утилита `cn()` из `src/shared/utils/cn.ts` для conditional classnames
- Не писать inline styles — только Tailwind классы
- SVG/image backgrounds подключать отдельным CSS-классом на layout/контейнер, а не через inline styles и не через цветовые токены темы
- Для небольших теней основных surfaces в light theme использовать `surface-shadow`; не дублировать локальные `shadow-*`. Utility автоматически отключает тень в dark theme.

### Colors

Тема — **Violet** (light + dark). Все цвета — через семантические CSS-переменные, никаких хардкодов.

**Правила:**

- Никогда не использовать `violet-*`, `purple-*`, `gray-*` и другие палитровые классы напрямую
- Всегда использовать семантические токены:

| Токен                                        | Использование                                                 |
| -------------------------------------------- | ------------------------------------------------------------- |
| `bg-background` / `text-foreground`          | Основной фон и текст страницы                                 |
| `bg-surface` / `text-foreground`             | Общие поверхности: карточки, панели, таблицы, sidebar, topbar |
| `bg-primary` / `text-primary-foreground`     | CTA-кнопки, акцентные элементы                                |
| `text-primary`                               | Акцентный текст, ссылки                                       |
| `bg-secondary` / `text-secondary-foreground` | Вторичные кнопки, теги, бейджи                                |
| `bg-muted` / `text-muted-foreground`         | Приглушённый фон и вспомогательный текст                      |
| `bg-accent` / `text-accent-foreground`       | Hover-состояния, подсветка                                    |
| `bg-destructive` / `text-destructive`        | Ошибки, удаление                                              |
| `border-border`                              | Разделители, обводки                                          |
| `ring-ring`                                  | Фокус-кольца                                                  |
| `text-sidebar-foreground`                    | Текст sidebar                                                 |
| `bg-sidebar-primary`                         | Активный элемент sidebar                                      |
| `bg-sidebar-accent`                          | Hover в sidebar                                               |

- Для фонов с прозрачностью — `bg-primary/10`, `bg-muted/40` и т.д.
- Общие фоновые поверхности оформлять через `bg-surface` (и `bg-surface/<opacity>` при необходимости), а не через `bg-card` или `bg-sidebar`; цвет задаётся переменной `--surface` для обеих тем.
- Градиенты строить из тех же токенов: `from-secondary/70 to-background`
- В Tailwind v4 `bg-gradient-to-*` переименован в `bg-linear-to-*`
- `--background`, `--card`, `--sidebar` и другие семантические токены должны содержать только цветовые значения; `url(...)` и `background` shorthand в них не класть

### Schemas and Types

- `src/shared/schemas/` — Zod-схемы и выведенные из них типы через `z.infer<>` (например `LoginSchema`, `RegisterInput`)
- `src/shared/types/` — чистые TypeScript-интерфейсы без зависимости от Zod, разложенные по именованным доменным файлам (`icons.ts`, `navigation.ts`, `orders.ts` и т.д.)
- Никогда не объявлять схемы локально внутри компонентов или action-файлов — только в `src/shared/schemas/`
- Типы пропсов компонента (`*Props`) оставлять в файле самого компонента
- Типы размещать рядом с областью-владельцем: локальные для фичи — в ней, общие для родительской фичи и её подфич — на уровне родителя. Подфичам разрешено импортировать общие типы и константы родителя; файлы этих контрактов не импортируют подфичи и их реализацию.
- Несколько consumers внутри одной фичи не являются основанием для переноса в `shared`. В `src/shared/types/` оставлять подтверждённо общие контракты независимых областей, включая контракты между Server Actions, страницами и UI. Контракты общего компонента, provider, hook или helper держать рядом с владельцем.
- Чистые типы и константы хранить отдельно: type-файлы не содержат объявлений констант; constants-файлы импортируют нужные типы через `import type`, а не объявляют их внутри. Выведенные через `z.infer` типы по-прежнему остаются рядом с Zod-схемами, Props — внутри компонента.
- `src/shared/` не импортирует `src/features/` из-за локализации типов, констант или helpers. Общие контракты родителя не являются разрешением импортировать его произвольную реализацию.
- Не создавать barrel `src/shared/types/index.ts` и не импортировать из `@/shared/types`; импортировать напрямую из доменного файла (`@/shared/types/orders`, `@/shared/types/icons`).
- В Zod v4 `z.ZodIssueCode` устарел — в `ctx.addIssue()` использовать строковые literal-коды (`'custom'`, `'invalid_type'` и т.д.)

### Constants

- Общепроектные и подтверждённо общие константы независимых областей хранить в именованных файлах внутри `src/shared/constants/`: `auth.ts`, `profile.ts`, `orders.ts`, `payments.ts`, `navigation.ts`, `pagination.ts` и т.д. Константы одной фичи и её подфич хранить в самой фиче, а настройки компонента, provider, hook или helper — рядом с владельцем.
- Не создавать barrel `src/shared/constants/index.ts` и не импортировать из `@/shared/constants`; импортировать напрямую из доменного файла (`@/shared/constants/payments`, `@/shared/constants/orders`).
- Компонентно-специфические данные (колонки таблиц, `defaultValues` форм) держать внутри `constants/` соответствующей фичи, а не в глобальных constants-файлах. Основной `index.ts(x)` содержит определения; не делать его обязательным barrel со всеми настройками и UI-зависимостями.
- Допускается отдельный файл в `constants/`, если объединение создаёт цикл или смешивает server/client зависимости. В частности, JSX-колонки, импортирующие компонент, который сам читает общий constants index, хранить отдельно и импортировать напрямую; не переэкспортировать их из этого index.
- Для констант без JSX использовать `.ts`; объединять настройки одной области в её constants-файле, не создавать файл на каждое значение. Helper-функции размещать в `utils/` области-владельца; в `src/shared/utils/` выносить только функции независимых областей или общего серверного/инфраструктурного сценария. `shared/utils/` содержит helpers, `shared/hooks/` — hooks; отдельные настройки этих модулей хранить в именованных файлах `shared/constants/`, не рядом в `*.constants.ts`.
- Никогда не объявлять ни те ни другие локально внутри компонентов

### Components

- Один файл — один компонент. Никогда не объявлять два и более компонентов в одном файле
- Composition root может управлять сценарием напрямую; он не обязан быть тонкой обёрткой. RHF/useFieldArray, submit/loading/confirmation/navigation находятся в index сценария-владельца. Если функциональность используется только подфичей, хранить её там, а не в root родительской feature: orders details управляет status/documents/payment, editor — client selection; profile editor — image upload, security — resend/verification; public order payment-info — подтверждением. Кнопки, формы и другие UI получают callbacks/loading через props; confirm-order-button находится в payment-info/ui, не рядом с index. Компоненты в `ui/` могут управлять локальным состоянием, фокусом, анимацией, темой или копированием, но не выполняют бизнес-запросы/мутации и не импортируют composition roots. Вложенные сценарии передаются в UI через slots. Просмотр заказа/public order сохраняют серверные секции через slots; отдельный hook/controller слой для этого не нужен.
- Брендинг сайта рендерить через `BrandLogo` из `src/shared/components/layout/brand-logo.tsx`; для свёрнутого sidebar использовать `compact`. Ассеты в `public/brand/` и `public/favicons/` именуются по теме фона (`light` — чёрный знак, `dark` — белый), а фавиконки синхронизируются с выбранной темой через `ThemeAssets` внутри `ThemeProvider`.
- Вспомогательный компонент, нужный только одному — выносить в отдельный файл рядом
- Для solid-секций с icon/title/action header использовать shared `SectionCard` из `src/shared/components/ui/data/section-card.tsx`; не создавать domain-specific form/card wrappers с той же структурой.
- `ContentCard` удалён: domain-секции оформлять через `SectionCard`, а surfaces без section header — обычным semantic контейнером с `surface-shadow`.
- Для карточек в loading states использовать `LoadingCard` из `src/shared/components/ui/feedback/loading-card.tsx`, не дублировать surface-классы в skeleton-файлах.
- Глобальные provider-домены хранить в `src/shared/components/providers/<name>/`. Если provider имеет собственные context и hook, разделять их на `<name>.context.ts`, `<name>.provider.tsx`, `<name>.hook.ts`; типы хранить в файле сущности-владельца, отдельный `<name>.types.ts` не создавать. Для тонких wrapper-провайдеров не создавать пустые слои.
- Для nested-модалок на `@base-ui/react/dialog` `Dialog.Backdrop` по умолчанию не рендерится. Для вложенного диалога нужно ставить `forceRender`, а слои разводить отдельно: базовые модалки ниже dropdown (`z-[40]`), вложенные выше (`z-[60]`). Использовать валидные Tailwind-классы вида `z-[60]`, не `z-60`

### Comments

- Не добавлять декоративные JSX-комментарии вида `{/* Nav */}`, `{/* Logo */}`, `{/* Toggle */}` — структура кода должна быть самодокументируемой
- Комментарии только там, где логика неочевидна

### SSR и гидрация

**Проблема:** клиентские хуки (localStorage, тема, медиа-запросы) возвращают разные значения на сервере и на клиенте → hydration mismatch.

**Правило:** использовать `useSyncExternalStore` с тремя аргументами: `subscribe`, `getSnapshot` (клиент), `getServerSnapshot` (сервер).

```ts
// ✓ правильно — useIsClient
useSyncExternalStore(
  () => () => {},
  () => true,
  () => false
);

// ✓ правильно — useLocalStorage
useSyncExternalStore(
  subscribe,
  () => localStorage.getItem(key),
  () => initialValue
);

// ✗ неправильно — вызывает hydration mismatch
const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);

// ✗ неправильно — читает localStorage при SSR
useState(() => localStorage.getItem(key));
```

- `getServerSnapshot` всегда возвращает стабильное значение (initialValue, false, null и т.д.)
- `getSnapshot` (клиент) читает из внешнего хранилища
- Все хуки, зависящие от браузерных API, реализовывать через `useSyncExternalStore`
- Скрытие элементов до гидрации: `useIsClient()` из `src/shared/hooks/use-is-client.ts`
- Не вызывать `setState` синхронно внутри `useEffect` для значений, которые уже известны из props/state на render. Такие значения считать напрямую в render (`const tokenError = token ? null : ...`).

**Куки vs localStorage:**

| Использовать       | Когда                                                                  |
| ------------------ | ---------------------------------------------------------------------- |
| `useCookieStorage` | состояние влияет на серверный рендер (layout, sidebar, размеры)        |
| `useLocalStorage`  | клиентские данные, которые не влияют на первый рендер (черновики, кэш) |

Для SSR-safe чтения куки на сервере: `cookies()` из `next/headers` → передать как `defaultValue` пропс в клиентский компонент.

### Animations

Два инструмента — выбирай по контексту:

**`tw-animate-css`** — для входных анимаций, работает в Server Components, zero-JS:

- Появление страницы/секции: `animate-in fade-in-0 slide-in-from-bottom-4 duration-300`
- Появление модальных окон, поповеров: `animate-in fade-in-0 zoom-in-95 duration-200`
- Лёгкое появление вложенного контента: `animate-in fade-in-0 slide-in-from-bottom-2 duration-300`

**`motion/react`** — для интерактивных анимаций, только в `'use client'` компонентах:

- Stagger-списки (карточки заказов, клиентов)
- Enter/exit с `AnimatePresence`
- Drag, scroll-triggered и прочая логика

**`<AnimateIn>`** — переиспользуемый компонент из `src/shared/components/ui/feedback/animate-in.tsx`, Server Component:

```tsx
// Варианты: 'fade' | 'slide-up' (по умолчанию) | 'slide-down' | 'zoom'
<AnimateIn variant="slide-up" className="...">
  {children}
</AnimateIn>
```

Правила:

- Для стандартных анимаций входа используй `<AnimateIn>` — не дублируй классы вручную
- Предпочитай `tw-animate-css` / `AnimateIn` — они проще, не требуют JS-бандла
- Переходи на `motion/react` только когда нужна интерактивность или `AnimatePresence`
- Анимируй **обёртку страницы** (layout или корневой div страницы), а не каждый элемент отдельно
- Не используй `transition-all` — только конкретные свойства (`transition-colors`, `transition-opacity`)
- В Tailwind v4 классы `translate-*`, `scale-*` и `rotate-*` используют отдельные CSS-свойства. В `transition-[...]` указывать `translate`, `scale` или `rotate` соответственно; одного `transform` недостаточно.
- Уважай `prefers-reduced-motion` — не добавляй анимации к критически важным UI-элементам без проверки

### Button

- Единственная кнопка в проекте — `Button` из `src/shared/components/ui/actions/button.tsx`
- Принимает пропы: `Icon`, `isLoading`, `tooltip`, `mode`, `variant`, `size` и все стандартные HTML-атрибуты кнопки
- `mode="icon"` — иконочная кнопка без текста, автоматически применяет `size="icon"`
- **Правило**: если кнопка рендерит только иконку (без текста рядом) — обязательно передавать `tooltip` с описанием действия
- Если `Button` рендерит ссылку через `render={<Link ... />}`, обязательно передавать `nativeButton={false}`, иначе Base UI ожидает нативный `<button>` и пишет accessibility error в консоль.

### Async actions: loading state и обработка ошибок

Для любого асинхронного действия из клиентского компонента использовать хук `useAsyncAction` из `src/shared/hooks/use-async-action.ts`.

**Правила:**

- Обработчик объявлять именованной функцией отдельно, затем передавать в `useAsyncAction`
- Внутри функции никогда не вызывать `toast.error` — вместо этого `throw new Error(message)`
- Хук перехватывает throw и показывает `toast.error(e.message)` — единственное место для error-тостов
- Если нужен side effect перед ошибкой (напр. `startLockout`) — выполнить его до `throw`
- `toast.success` при необходимости вызывается внутри функции напрямую — это не ошибка
- `isLoading` и спиннер на кнопке — из хука, не через `useState` вручную
- Если action, вызванный через `useAsyncAction`, должен навигировать пользователя, не делать `redirect()` или `signOut({ redirectTo })` внутри Server Action: они бросают `NEXT_REDIRECT`. В таких кейсах делать `redirect: false` и выполнять `router.push()` / `router.refresh()` в клиентском обработчике

```tsx
// ✓ правильно
async function onSubmit(data: LoginInput) {
  const { error, retryAfter } = await loginUser(data);

  if (error) {
    if (retryAfter) startLockout(retryAfter); // side effect до throw
    throw new Error(error); // хук покажет toast.error
  }

  router.push('/');
}

const [execute, isLoading] = useAsyncAction(onSubmit);

// В JSX:
// <form onSubmit={handleSubmit(execute)}>
// <Button isLoading={isLoading} />

// ✗ неправильно — toast внутри функции и ручной useState
async function onSubmit() {
  setIsLoading(true);
  try {
    if (error) toast.error(error); // не так
  } finally {
    setIsLoading(false);
  }
}
```

### Icons

- Для кнопок и других интерактивных actions использовать animated icons из [lucide-animated](https://lucide-animated.com), устанавливаемые через shadcn CLI:
  ```bash
  npx shadcn add "@lucide-animated/icon-name" --path src/shared/components/icons
  ```
- Все animated icons живут в `src/shared/components/icons/`.
- Статичные неинтерактивные иконки и functional indicators (`Calendar`, select/combobox chevron, search, section/modal header) импортировать напрямую из `lucide-react`.
- Обычные `FormInput` не имеют decorative leading icons и не должны принимать `Icon` prop. Внутри form controls оставлять только функциональные иконки: calendar, dropdown/combobox chevron, search и password visibility action.
- Статичные functional icons по умолчанию используют `text-muted-foreground` и подсвечиваются через `text-primary` на hover/focus/open.
- Иконки section/modal headers остаются статичными. Animated icons использовать только внутри кнопок и других интерактивных actions.
- Иконка корзины в registry называется `delete` и устанавливается как `@lucide-animated/delete` (`DeleteIcon`); `trash` и `trash-2` в registry отсутствуют.
- Кнопки с иконками и лоадером — через компонент `Button` из `src/shared/components/ui/actions/button.tsx`:
  ```tsx
  <Button type="submit" isLoading={isLoading} Icon={ArrowRightIcon}>
    Войти
  </Button>
  ```
- `Icon` — принимает компонент иконки (не элемент), hover-анимация управляется через ref автоматически
- Registry в `components.json` уже настроен: `"@lucide-animated": { "url": "https://lucide-animated.com/r/{name}.json" }`

### Forms

- Все формы через shadcn `Form` + `react-hook-form` + `zodResolver`
- Схемы и типы для форм брать из `src/shared/schemas/`
- Низкоуровневые form-контролы (`Input`, `Textarea`, `Select`, `Combobox`, `Label`) хранить в `src/shared/components/ui/form/primitives/`
- Form-aware обёртки и составные поля (`FormInput`, `FormSelect`, `FormTextarea`, `FormCombobox`, `FormDateInput`, `SelectInput`) хранить в `src/shared/components/ui/form/fields/`
- Поля форм — через компонент `FormInput` из `src/shared/components/ui/form/fields/form-input.tsx`
- Для `<select>` **внутри RHF-формы** использовать `FormSelect` из `src/shared/components/ui/form/fields/form-select.tsx` (принимает `control`, `name`, `label`, `options`)
- Для standalone `<select>` **вне формы** (фильтры, настройки) использовать `SelectInput` из `src/shared/components/ui/form/fields/select-input.tsx` (принимает `value`, `onValueChange`, `options`) — не раскрывать `Select/SelectTrigger/SelectContent/SelectItem` вручную
- Для auth-форм всегда задавать явные `autocomplete`-значения (`username`, `current-password`, `new-password`, `email`, `name`) и использовать настоящий `<label htmlFor=...>`: без этого браузеры и password manager хуже распознают логин и могут не предлагать сохранение данных
- Из `useForm` деструктурировать нужные методы явно, `form` оставлять для `<Form {...form}>`:

```tsx
const form = useForm<LoginInput>({ resolver: zodResolver(LoginSchema), defaultValues: {...} })
const { control, handleSubmit } = form

// <Form {...form}> — полный объект, т.к. FormProvider ожидает UseFormReturn
// control, handleSubmit — используются напрямую без form.control / form.handleSubmit
```

### SEO

- Canonical и SEO-адреса задаются через `src/shared/constants/seo.ts`; основной публичный домен — `delo-doc.ru`. QA и другие непроизводственные хосты получают `X-Robots-Tag: noindex, nofollow`.
- Индексация публичных страниц включается через `getPublicPageRobots()` с общей проверкой `isProductionDeployment()` из `src/shared/utils/deployment.ts`: `NODE_ENV=production`, `APP_ENV=prod` и canonical origin в `NEXT_PUBLIC_APP_URL`. Эту же проверку использовать для серверного включения аналитики, без дублирования условий в layout. Служебные страницы, кабинет и заказы по токену остаются `noindex`.
- Не закрывать `noindex`-страницы через `Disallow: /`: поисковик должен получить HTML/HTTP-заголовок, чтобы увидеть запрет индексации. Sitemap содержит только разрешённые публичные страницы и не получает искусственный `lastModified: new Date()` при каждом запросе.
- JSON-LD рендерить серверным нативным `<script type="application/ld+json">`; при сериализации экранировать `<` через `\\u003c`. Не добавлять вымышленные отзывы, рейтинги или показатели.

### Environment

- Необязательные аналитические сервисы (Яндекс Метрика и Vercel Speed Insights) подключать только после разрешения пользователя через `CookieSettingsProvider` в `RootLayout`: провайдер сам рендерит глобальный `CookieConsent` внутри контекста, как `ConfirmationProvider` свой диалог; layout передаёт только analyticsEnabled и children. В серверном `Footer` размещать только `CookieSettingsButton`; не переносить туда согласие/счётчики. Контекст хранит только UI-состояние isOpen/open/close, без браузерных UI-событий и slot. Счётчики работают только при production-сборке, `APP_ENV=prod` и каноническом origin. Speed Insights ограничен публичными `ANALYTICS_PATHS`, Метрика — известными статическими и динамическими путями из `src/shared/constants/analytics.ts`, включая auth/dashboard. Динамические ID заменять на `:id`; query/hash, реальные заголовки страниц, содержимое форм, имена, контакты, суммы и ссылки заказов с токенами не передавать. `/order/[token]`, API и неизвестные пути исключены. Четыре разрешённые цели отправлять через `trackGoal()` из `src/shared/utils/metrica.ts`: переход к регистрации — только с лендинга, остальные — после успешного результата, не при клике/ошибке. Скачивание документов остаётся штатной ссылкой без отдельного fetch и без цели скачивания. Ошибки аналитики не должны ломать бизнес-действия. Отказ или отзыв согласия блокирует дальнейшие события и очищает очередь до готовности SDK; при расширении объёма аналитики обновлять версию согласия и запрашивать opt-in повторно. Vercel Web Analytics не используется.

- Все env-переменные — через `src/shared/config/env.ts` (валидация через @t3-oss/env-nextjs)
- Никогда не обращаться к `process.env` напрямую вне `env.ts`
- Клиенты внешних сервисов, которые требуют обязательные env при создании (например `Resend`), инициализировать лениво внутри helper-функции, а не на уровне модуля, чтобы `next build` мог импортировать Server Actions при сборе page data без runtime-секретов.
- Файлы профиля загружать только через S3-хелперы из `src/shared/utils/s3.ts`; `User.image` хранит ключ вида `profiles/<userId>/<file>`, а не публичный URL.
- S3-ключи разделяются по окружениям через `APP_ENV=local | dev | prod`; helper `src/shared/utils/s3.ts` добавляет окружение при обращении к S3, но в базе окружение не хранится.
- Фото профиля отдавать через локальный route handler `/api/profile-images/[...key]`, а клиентский URL строить через `getProfileImageUrl()` из `src/shared/utils/profile.ts`.
- При замене или удалении фото профиля удалять старый S3-объект через helpers из `src/shared/utils/s3.ts`.

### Email

- Шаблоны писем хранить в `src/shared/emails/` и импортировать напрямую из именованных файлов; barrel `src/shared/emails/index.ts` не создавать.
- Отправка через Resend должна идти через `sendEmail()` из `src/shared/utils/email.ts`; не создавать `new Resend()` и не держать inline HTML в Server Actions.

### ClickUp

- Если работа с ClickUp явно согласована, Build или координатор обновляет указанную задачу: **TO DO** → **IN PROGRESS** при начале реализации, затем **READY TO TEST** после проверки.
- Если задача отсутствует, предложить создание в **MVP Разработка** и дождаться разрешения. Developer получает сведения от координатора; reviewer не изменяет трекер.

### EmptyList

Для любого списка, который может быть пустым, использовать обёртку `EmptyList` из `src/shared/components/ui/feedback/empty-list.tsx`:

```tsx
<EmptyList items={items} message="Нет элементов">
  {/* содержимое, отображаемое когда список не пуст */}
</EmptyList>
```

- Не проверять `items.length === 0` вручную в компоненте — делегировать `EmptyList`

### DetailItem

Для отображения пар метка/значение в `<dl>`-списках использовать `DetailItem` из `src/shared/components/ui/data/detail-item.tsx`:

```tsx
<dl className="...">
  <DetailItem label="Клиент">{order.clientName}</DetailItem>
  {order.clientEmail && <DetailItem label="Email">{order.clientEmail}</DetailItem>}
</dl>
```

- Не дублировать паттерн `<div><dt>...</dt><dd>...</dd></div>` вручную

### TanStack Table + React Compiler

`useReactTable()` несовместим с React Compiler — возвращает функции, которые нельзя безопасно мемоизировать. Предупреждение `react-hooks/incompatible-library` оставляем как есть — не подавлять ни `'use no memo'`, ни `eslint-disable`.

### Github

- Подготовка ветки относится к реализации, а не к read-only исследованию или ревью. Если этот workflow согласован в задаче, Build или developer проверяет рабочее дерево, обновляет `dev` и создаёт от неё ветку `id-из-clickup-название-задачи`.
- При пользовательских изменениях или неизвестном ID не угадывать и не переключать ветку с риском потери работы; уточнить решение у пользователя или координатора. Reviewer проверяет текущую ветку без её смены.

<!-- END:nextjs-agent-rules -->
