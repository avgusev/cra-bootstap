import client from '../../httpClient';
import { BlockResponse, CommonInfo } from '../../features/DetailedView/types';

export async function fetchRoadDiagnostics(id: string) {
  const response = await client.get<CommonInfo>(`roads/${id}/diagnostic-results`);
  return response.data;
}

export async function fetchBlock(id: string, endpoint: string) {
  const response = await client.get<BlockResponse>(`roads/${id}/diagnostic-results/${endpoint}`);
  return response.data;
}
