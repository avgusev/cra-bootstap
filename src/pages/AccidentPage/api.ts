import client from '../../httpClient';
import { CommonInfo, BlockResponse } from '../../features/DetailedView/types';

export async function fetchAccident(id: string) {
  const response = await client.get<CommonInfo>(`traffic-accidents/${id}/common-info`);
  return response.data;
}

export async function fetchBlock(id: string, endpoint: string, start = 0, limit = 100) {
  const response = await client.get<BlockResponse>(`traffic-accidents/${id}/${endpoint}?start=${start}&limit=${limit}`);
  return response.data;
}
