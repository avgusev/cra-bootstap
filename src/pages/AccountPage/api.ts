import client from '../../httpClient';
import { SaveProfile, SaveResponse } from '../../features/DetailedView/types';

export async function fetchProfile() {
  const response = await client.get('account');
  return response.data;
}

export async function saveProfile(profile: SaveProfile) {
  const response = await client.post<SaveResponse>(`account/save`, profile);
  return response.data;
}
