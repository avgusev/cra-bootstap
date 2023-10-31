import type { AccessMatrixKey } from './features/AccessMatrix/types';

export type TMenuItem = { path: string; title: string; icon?: string; accessKey?: AccessMatrixKey };
export type TMenuItemWithAccessKey = { path: string; title: string; icon?: string; accessKey: AccessMatrixKey };
export type TDashboardState = { url: string; title: string; pageTitle?: string };
export type TMenuItemGroup = { title: string; icon: string; sub: TMenuItem[] };
export type TMenuUser = { name: string; avatar: string };

const baseUrl = import.meta.env.VITE_TRF_URL || 'http://trf.dev.skdf';

export const dashboards: TDashboardState[] = [
  {
    url: `${baseUrl}/dashboard/shared/19432116`,
    title: 'Расходы',
  },
  {
    url: `${baseUrl}/dashboard/shared/15812308`,
    title: 'Расходы Регионы',
  },
  {
    url: `${baseUrl}/dashboard/shared/25685446`,
    title: 'Доходы',
  },
  {
    url: `${baseUrl}/dashboard/shared/16453083`,
    title: 'Доходы Регионы',
  },
  {
    url: `${baseUrl}/dashboard/shared/26261448`,
    title: 'Все дороги',
  },
  {
    url: `${baseUrl}/dashboard/shared/25696119`,
    title: 'Опорная сеть',
  },
  {
    url: `${baseUrl}/dashboard/shared/26023868`,
    title: 'Агломерации',
  },
  {
    url: `${baseUrl}/dashboard/shared/25685987`,
    title: 'Мероприятия',
  },
  {
    url: `${baseUrl}/dashboard/shared/33735834`,
    title: 'ГЭТ',
  },
];

export const menu1: (TMenuItem | TMenuItemGroup)[] = [
  { path: '/desktop', title: 'Рабочий стол', icon: 'app', accessKey: 'menu_desktop' },
  {
    title: 'Цифровая база',
    icon: 'folder',
    sub: [
      { path: '/roads', title: 'Дороги', icon: 'road', accessKey: 'menu_roads' },
      { path: '/bridges', title: 'Мостовые сооружения', icon: 'bridge_outline', accessKey: 'menu_bridges' },
      // { path: '/events', title: 'Мероприятия', icon: 'calendar', accessKey: 'menu_events' },
      { path: '/traffic-accidents', title: 'ДТП', icon: 'car_outline', accessKey: 'menu_accidents' },
      { path: '/messages', title: 'Сообщения граждан', icon: 'e-mail', accessKey: 'menu_citizen_messages' },
      { path: '/map', title: 'Карта', icon: 'list_on_map', accessKey: 'menu_map' },
    ],
  },
  {
    title: 'Планирование',
    icon: 'planning',
    sub: [
      {
        path: '/events/programs/construction',
        title: 'Строительство и реконструкция',
        icon: 'building',
        accessKey: 'menu_events',
      },
      { path: '/events/programs/overhauls', title: 'Капитальный ремонт', icon: 'capremont', accessKey: 'menu_events' },
      { path: '/events/programs/repair', title: 'Ремонт', icon: 'remont', accessKey: 'menu_events' },
      { path: '/events/programs/maintenance', title: 'Содержание', icon: 'maintenance', accessKey: 'menu_events' },
    ],
  },
  {
    title: 'Проектная деятельность',
    icon: 'projects',
    sub: [
      { path: '/projects', title: 'Проекты', icon: 'plug', accessKey: 'menu_projects' },
      { path: '/tasks', title: 'Задачи', icon: 'plug', accessKey: 'menu_tasks' },
      { path: '/documents', title: 'Документы', icon: 'plug', accessKey: 'menu_documents' },
      { path: '/protocols', title: 'Протоколы', icon: 'plug', accessKey: 'menu_protocols' },
      { path: '/contacts', title: 'Контакты', icon: 'plug', accessKey: 'menu_contacts' },
    ],
  },
  {
    title: 'Закупки',
    icon: 'purchase',
    sub: [
      { path: '/procurementPlans', title: 'Планы закупок', icon: 'plug', accessKey: 'menu_procurement_plans' },
      { path: '/planSchedules', title: 'Планы-графики', icon: 'plug', accessKey: 'menu_plan_schedules' },
      { path: '/purchNotices', title: 'Извещение о закупке', icon: 'plug', accessKey: 'menu_purchase_notices' },
      { path: '/contracts', title: 'Контракты/Договоры', icon: 'plug', accessKey: 'menu_contracts' },
    ],
  },
  {
    title: 'Аналитика',
    icon: 'chart',
    sub: dashboards.map((dashboard) => ({
      path: `/indicators/${dashboard.title}`,
      title: dashboard.title,
    })),
  },
  // /stats Статистика ...
  { path: '/database', title: 'Открытые данные', icon: 'database', accessKey: 'menu_open_data' },
];

export const menu2: (TMenuItem | TMenuItemGroup)[] = [
  { path: '/notifications', title: 'Уведомления', icon: 'bell', accessKey: 'menu_notifications' },
  { path: '/question', title: 'Справочный центр', icon: 'question' },
  {
    title: 'Администрирование',
    icon: 'setting_baby',
    sub: [
      { path: '/nsi', title: 'Нормативно-справочная информация', icon: 'plug', accessKey: 'menu_nsi' },
      { path: '/import', title: 'Загрузка данных', icon: 'plug', accessKey: 'menu_data_import' },
      { path: '/users', title: 'Пользователи', icon: 'group', accessKey: 'menu_user_accounts' },
      { path: '/newsletter', title: 'Сервис рассылки', icon: 'e-mail', accessKey: 'menu_newsletter' },
    ],
  },
];
