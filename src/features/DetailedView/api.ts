import client from '../../httpClient';
import { AxiosResponse } from 'axios';

import type {
  AgglomerationMiniPassport,
  EntityResponse,
  FileDescriptor,
  OrganizationMiniPassport,
  RegionMiniPassport,
  ValueElement,
  HistoryOfChangesResponse,
} from './types';

export async function getFilesDescriptors(fileIds: string[]): Promise<FileDescriptor[]> {
  const reqArray = [];
  for (const id of fileIds) {
    reqArray.push(client.get<FileDescriptor>(`common/file/descriptor/${id}`));
  }
  return Promise.all(reqArray).then((arr: AxiosResponse<FileDescriptor>[]) => arr.map((res) => res.data));
}

export async function getFileDescriptor<T = FileDescriptor>(id: string) {
  const response = await client.get<T>(`common/file/descriptor/${id}`);
  return response.data;
}

export async function getHistoryOfChanges(id: string) {
  const response = await client.post<HistoryOfChangesResponse>(`common/change-history`, {
    textSearch: '',
    id,
    paging: { start: 0 },
    filters: {
      BLOCK: { value: [] },
      INITIATOR: { value: [] },
      'START_DATE.FINISH_DATE': {},
    },
  });
  return response.data;
}

export async function fetchOrganizationMiniPassport(id: number) {
  const response = await client.get<OrganizationMiniPassport>(`common/organization/${id}/mini-passport`);
  return response.data;
}

export async function fetchAgglomerationMiniPassport(id: number) {
  const response = await client.get<AgglomerationMiniPassport>(`roads/${id}/agglomeration-minipassport`);
  return response.data;
}

export async function fetchRegionMiniPassport(id: number) {
  const response = await client.get<RegionMiniPassport>(`roads/${id}/region-minipassport`);
  return response.data;
}

export async function fetchFieldAttributes(id: number) {
  const response = await client.get<ValueElement[]>(`common/lookup/attribute/${id}`);
  return response.data;
}

export async function fetchRelativeEntities(id: number, textSearch: string) {
  const data = {
    filters: {},
    order: {
      colName: 'full_name',
      colSortDirection: 0,
    },
    textSearch: textSearch || '',
    paging: {
      start: 0,
      limit: 100,
    },
  };
  const response = await client.post<EntityResponse>(`/common/lookup/entity-with-paged/${id}`, data);
  return response.data;
}

export async function fetchRelativeOrganizations(textSearch: string) {
  const data = {
    filters: {},
    order: {
      colName: 'full_name',
      colSortDirection: 0,
    },
    textSearch: textSearch || '',
    paging: {
      start: 0,
      limit: 100,
    },
  };
  const response = await client.post<EntityResponse>('/common/lookup/filterable-paged/organizations', data);
  return response.data;
}
