import client from '../../httpClient';
import { CommonInfo, BlockResponse } from '../../features/DetailedView/types';

export async function fetchBackboneNetwork(id: string) {
  const response = await client.get<CommonInfo>(`roads/${id}/backbone-network-info`);
  return response.data;
}

export async function fetchBlock(id: string, endpoint: string) {
  const response = await client.get<BlockResponse>(`roads/${id}/${endpoint}`);
  return response.data;
}
