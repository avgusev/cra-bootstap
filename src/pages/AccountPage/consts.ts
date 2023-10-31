import { CardList, NavigationStruct } from '../../features/DetailedView/types';

export enum UserBlockId {
  Profile = 1, // ???
  OwnActivity = 2,
  RoadActivity = 3,
  OperationalManagement = 4,
  UserManualAndInstructions = 5,
  VideoLessons = 6,
  FrequentlyAskedQuestions = 7,
  ProjectActivity = 8,
  NotificationSettings = 9,
  Analytics = 10,

  // Проекты перечней автомобильных дорог
  ProjectsListsOfHighways = 11,
  Statistics = 12,
  PurchaseActivity = 13,
}

export const navigation: NavigationStruct = {
  // summaryIndicators: {
  //   id: 'summaryIndicators',
  //   name: 'Сводные показатели',
  //   blocks: [
  //     {
  //       id: UserBlockId.OwnActivity,
  //       name: 'Показатели работы',
  //       endpoint: 'own-activity',
  //     }, // 2
  //     {
  //       id: UserBlockId.RoadActivity,
  //       name: 'Дорожная деятельность',
  //       endpoint: 'road-activity',
  //     }, // 3
  //     {
  //       id: UserBlockId.OperationalManagement,
  //       name: 'Оперативное управление',
  //       endpoint: 'operational-management',
  //     }, // 4
  //     {
  //       id: UserBlockId.ProjectActivity,
  //       name: 'Проектная деятельность',
  //       endpoint: 'project-activity',
  //     }, // 8
  //     {
  //       id: UserBlockId.Analytics,
  //       name: 'Аналитика',
  //       endpoint: '###', // не понятный запрос
  //     }, // 10
  //     {
  //       id: UserBlockId.ProjectsListsOfHighways,
  //       name: 'Проекты перечней автомобильных дорог',
  //       endpoint: 'projects-lists-of-highways',
  //     }, // 11
  //     {
  //       id: UserBlockId.Statistics,
  //       name: 'Статистика',
  //       endpoint: '###', // не понятный запрос
  //     }, // 12
  //     {
  //       id: UserBlockId.PurchaseActivity,
  //       name: 'Закупочная деятельность',
  //       endpoint: 'purchase-activity',
  //     }, // 13
  //   ],
  // },
};

export const navKeys: (keyof NavigationStruct)[] = [''];

export const cardList: CardList = [
  [
    [
      { title: 'Фамилия', code: 'SURNAME', className: 'col-6' },
      { title: 'Имя', code: 'NAME', className: 'col-6' },
    ],
    [
      { title: 'Отчество', code: 'PATRONYMIC', className: 'col-6' },
      { title: 'Пол', code: 'MALE', className: 'col-6' },
    ],
    [
      { title: 'Дата рождения', code: 'DATE_OF_BIRTH', className: 'col-6' },
      { title: 'Роль в системе', code: 'ROLE_OF_THE_SYSTEM', className: 'col-6' },
    ],
    [
      { title: 'Рабочий телефон', code: 'OFFICE_PHONE', className: 'col-6' },
      { title: 'Мобильный телефон', code: 'MOBILE', className: 'col-6' },
    ],
    [
      { title: 'Email', code: 'EMAIL', className: 'col-6' },
      { title: 'Часовой пояс', code: 'TIMEZONE', className: 'col-6' },
    ],
  ],
  [
    [
      { title: 'Должность', code: 'POSITION', className: 'col-4' },
      { title: 'Организация', code: 'ORGANIZATION', className: 'col-8' },
    ],
  ],
];
