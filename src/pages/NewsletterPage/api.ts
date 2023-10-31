import client from '../../httpClient';

export type OrganizationsType = {
  id: number;
  name: string;
};

export type UsersType = {
  id: number;
  email: string;
  lastAuthorizeDate: string;
  lastChangeDate: string;
  lastLoginDate: string;
  login: string;
  name: string;
  organizations: OrganizationsType[];
  phone: string;
  regDate: string;
  region: string;
  status: string;
  statusRc: string;
};

export type MailType = {
  To: string;
  Subject: string;
  Model: {
    To: {
      FullName: string;
    };
    UpdateDate: string;
    UpdateFeatures: string[];
  };
  TemplateName: string;
  DeliveryMethod: number;
};

export async function fetchUsers() {
  const response = await client.post<UsersType[]>(`user-accounts/list`);
  return response.data;
}

export async function sendMail(mail: MailType) {
  const response = await client.post<UsersType[]>(`notification/send`, mail);
  return response.data;
}
