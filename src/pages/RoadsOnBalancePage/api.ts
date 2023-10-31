import client from '../../httpClient';
import { BlockResponse, CommonInfo } from '../../features/DetailedView/types';

export async function fetchRoadOnBalanceById(id: string) {
  const response = await client.get<CommonInfo>(`roads-on-balance/${id}/common-info`);
  return response.data;
}

export async function fetchBlock(id: string, endpoint: string) {
  const response = await client.get<BlockResponse>(`roads-on-balance/${id}/${endpoint}?start=0&limit=100`);
  return response.data;
}
