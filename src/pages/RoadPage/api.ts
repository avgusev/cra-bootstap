import client from '../../httpClient';
import { CommonInfo, BlockResponse, SaveStruct, SaveResponse } from '../../features/DetailedView/types';

export async function fetchRoad(id: string) {
  const response = await client.get<CommonInfo>(`roads/${id}/common-info`);
  return response.data;
}

export async function fetchBlock(id: string, endpoint: string, start = 0, limit = 100) {
  const response = await client.get<BlockResponse>(`roads/${id}/${endpoint}?start=${start}&limit=${limit}`);
  return response.data;
}

export async function saveRoad(struct: SaveStruct) {
  const response = await client.post<SaveResponse>('roads/save-card', struct);
  return response.data;
}
