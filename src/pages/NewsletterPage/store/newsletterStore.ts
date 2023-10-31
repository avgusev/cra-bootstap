import { makeAutoObservable } from 'mobx';

import { fetchUsers, MailType, sendMail, UsersType } from '../api';

export const initialMail: MailType = {
  To: '',
  Subject: '',
  Model: {
    To: {
      FullName: '',
    },
    UpdateDate: '',
    UpdateFeatures: [],
  },
  TemplateName: 'System_SoftwareUpdate',
  DeliveryMethod: 1,
};

export class NewsletterStore {
  users: UsersType[] = [];

  mail: MailType = initialMail;

  constructor() {
    makeAutoObservable(this);
  }

  setTo = (text: string) => {
    this.mail.To = text;
  };

  setSubject = (text: string) => {
    this.mail.Subject = text;
  };

  setFullName = (text: string) => {
    this.mail.Model.To.FullName = text;
  };

  setUpdateFeatures = (text: string) => {
    this.mail.Model.UpdateFeatures = text.split(/[,\n\r]+\s*/);
  };

  setSearchOptions(users: UsersType[]) {
    this.users = users || [];
  }

  loadUsers = () => {
    fetchUsers().then((users) => {
      this.setSearchOptions(users);
    });
  };

  sendNotification = () => {
    return sendMail(this.mail);
  };

  clearMail = () => {
    this.mail = initialMail;
  };
}

const newsletterStoreInstance = new NewsletterStore();

export default newsletterStoreInstance;
