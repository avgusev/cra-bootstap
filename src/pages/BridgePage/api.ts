import client from '../../httpClient';
import { BlockResponse, CommonInfo } from '../../features/DetailedView/types';

export async function fetchBridgeById(id: string) {
  const response = await client.get<CommonInfo>(`bridges/${id}/common-info`);
  return response.data;
}

export async function fetchBlock(id: string, endpoint: string) {
  const response = await client.get<BlockResponse>(`bridges/${id}/${endpoint}?start=0&limit=100`);
  return response.data;
}
