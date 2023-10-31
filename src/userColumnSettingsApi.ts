import client from './httpClient';

export const userColumnSettingsURL = `/common/user/column-settings`;

export type ColumnSettings = {
  tabCode: string;
  columnSettings: string;
};

export async function fetchUserColumnSettings(entity: string) {
  const response = await client.get<ColumnSettings>(`${userColumnSettingsURL}/${entity}`);
  return response.data;
}

export async function saveUserColumnSettings(request: ColumnSettings) {
  client.post(userColumnSettingsURL, request);
}
