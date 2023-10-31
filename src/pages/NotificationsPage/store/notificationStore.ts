import { makeAutoObservable } from 'mobx';

export type Notification = { icon: string; type: string; isUnread: boolean; title: string; text: string; date: string };
export type NotificationSettings = { label: string; system: boolean; email: boolean };
export type NotificationMenu = { id: string; label: string };

export const initialNotifications: Notification[] = [
  {
    icon: 'alert',
    type: 'roads',
    isUnread: true,
    title: 'Требуется подтверждение',
    text: '<span>На данный момент Вами не подтверждены 3 автомобильные дороги – <a href="/roads">подтвердите их.</a></span>',
    date: '16.12.2022 в 09:00',
  },
  {
    icon: 'notice',
    type: 'general',
    isUnread: true,
    title: 'Обновление от 15 декабря 2022 года',
    text: '<span>В этом обновлении добавили <a href="/account">личный кабинет</a>, <a href="/notifications">уведомления</a>, а также реестры <a href="/bridges">мостовых сооружений</a> и <a href="/traffic-accidents">ДТП.</a></span>',
    date: '15.12.2022 в 8:00',
  },
  {
    icon: 'flag',
    type: 'general',
    isUnread: true,
    title: 'Добро пожаловать!',
    text: '<span>Спасибо за регистрацию в СКДФ. Перейдите к просмотру автомобильных дорог <a href="/map">на карте</a> или в виде <a href="/roads">реестра.</a></span>',
    date: '03.04.2022 в 11:56',
  },
];

export const initialNotificationSettings: NotificationSettings[] = [
  { label: 'Общие', system: true, email: false },
  { label: 'Автомобильные дороги', system: true, email: false },
];

export const initialNotificationMenu: NotificationMenu[] = [
  { id: 'all', label: 'Все' },
  { id: 'unread', label: 'Непрочитанные' },
  { id: 'general', label: 'Общие' },
  { id: 'roads', label: 'Автомобильные дороги' },
];

export class NotificationStore {
  notifications = initialNotifications;
  notificationSettings = initialNotificationSettings;
  notificationMenu = initialNotificationMenu;
  searchText = '';
  notificationType = 'all';

  get allCount() {
    return this.notifications.length;
  }

  get unreadCount() {
    return this.notifications.filter((item) => item.isUnread).length;
  }

  get filteredNotifications() {
    return this.getFiltered(this.notificationType);
  }

  constructor() {
    makeAutoObservable(this);
  }

  setSearchText = (text: string) => {
    this.searchText = text;
    this.notificationMenu = initialNotificationMenu.filter((item) =>
      item.label.toLowerCase().includes(this.searchText.toLowerCase())
    );
    if (this.notificationMenu.length === 0) this.notificationMenu = [initialNotificationMenu[0]];
  };

  getFiltered = (value: string) => {
    if (value === 'all') return this.notifications;
    if (value === 'unread') return this.notifications.filter((notification) => notification.isUnread);
    return this.notifications.filter((notification) => notification.type === value);
  };

  setNotificationType = (value: string) => {
    this.notificationType = value;
  };

  getNotificationCount = (value: string) => {
    return this.getFiltered(value).length;
  };

  readAll = () => {
    this.notifications.forEach((notification) => {
      if (
        notification.type === this.notificationType ||
        this.notificationType === 'all' ||
        this.notificationType === 'unread'
      )
        notification.isUnread = false;
    });
  };
}

const notificationStore = new NotificationStore();

export default notificationStore;
