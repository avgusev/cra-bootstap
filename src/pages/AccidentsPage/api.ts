import client from '../../httpClient';

const filtersMetadataUrl = 'traffic-accidents/list/filters-metadataa';
const trafficAccidentsUrl = 'traffic-accidents/list';
// traffic-accidents/list/data
const trafficAccidentFiltersUrl = 'traffic-accidents/list/filters';
const trafficAccidentSearchOptionsUrl = 'traffic-accidents/list/search-options';
const accidentsExportXlsxUrl = 'traffic-accidents/export/xlsx';

export type FiltersMetadata = {
  id: string;
  title: string;
  type: number;
  groupId: number;
  isExtended: boolean;
  isDisabled: boolean;
  checkPeriodLimits: boolean;
  totalCount: number;
  start: number;
  isSelectAllOptionHidden: boolean;
};

export type MultiSelectItem = {
  id: number;
  text: string;
  isSelected: boolean;
  // isDisabled: boolean;
  // level: number;
  // children: any[];
  // pathId: string - type 9 - CORE_NETWORK_CRITERION ("2042234;2042238")
  // pathPid: string - type 9 - CORE_NETWORK_CRITERION ("2042234")
};

export type DateRangeItem = {
  start?: string;
  end?: string;
  isDisabled?: boolean;
  max?: string;
  min?: string;
};

export type LookupHierarchyItem = {
  id: number;
  text: string;
  isSelected: boolean;
  // isDisabled: boolean;
  // level: number;
  children: LookupHierarchyItem[];
  pathId: string;
  pathPid: string;
};

export enum FilterType {
  // Unknown = 0,
  // LookupSingle = 1,
  MultiSelect = 2,
  // Number = 3,
  // String = 4,
  DateRange = 5,
  Switch = 6,
  NumberRange = 7,
  // LookupGrouped = 8,
  LookupHierarchy = 9,
  // Fixed = 10,
  // Int = 11,
  // LookupMultipleString = 12,
  LookupMultipleWithPaged = 13,
  // LookupMultipleStringWithPaged = 14
}

export type FilterItem = { id: string; title: string } & (
  | {
      type: FilterType.MultiSelect;
      value?: MultiSelectItem[];
    }
  | {
      type: FilterType.DateRange;
      value?: DateRangeItem;
    }
  | {
      type: FilterType.Switch;
      isDisabled: boolean;
    }
  | {
      type: FilterType.NumberRange;
      value?: [number | undefined, number | undefined];
      isDisabled: boolean;
    }
  | {
      type: FilterType.LookupHierarchy;
      selected?: number[];
      value?: LookupHierarchyItem[];
    }
  | {
      type: FilterType.LookupMultipleWithPaged;
      value?: MultiSelectItem[];
      totalCount: number;
      start: number;
    }
);

export type AccidentsResponse = {
  totalCount: number;
  start: number;
  limit: number;
  data: {
    id: number;
    address: string;
    date: string;
    type: { code: number; value: string };
    wounded: number;
    dead: number;
    peopleAmount: number;
    tsAmount: number;
    sourceSystem: string;
    reason: string;
    hasGeometry: true;
    children: AccidentsResponse['data'];
  }[];
  filters: FilterItem[];
};

export type FilterRequestValue =
  | { value: number[] }
  | { value: { start?: string; end?: string; isDisabled: boolean } }
  | { value?: boolean }
  | { value: [number | undefined, number | undefined] }
  | { value: { values: number[]; start: number; limit: number; textSearch: string } };

export type FiltersRequest = { filters: Record<string, FilterRequestValue>; textSearch: string };

export type AccidentsRequest = FiltersRequest & {
  order: { colName: string; colSortDirection: 0 | 1 };
  paging: { start: number; limit: number };
};

export type SearchOption = {
  id: number;
  text: string;
};

export async function fetchFiltersMetadata() {
  const response = await client.get<FiltersMetadata[]>(filtersMetadataUrl);
  return response.data;
}

export async function fetchAccidents(request: AccidentsRequest) {
  const response = await client.post<AccidentsResponse>(trafficAccidentsUrl, request);
  return response.data;
}

export type FilterResponse = Pick<AccidentsResponse, 'filters' | 'totalCount'>;

export async function fetchFilter(request: FiltersRequest) {
  const response = await client.post<FilterResponse>(trafficAccidentFiltersUrl, request);
  return response.data;
}

export async function fetchSearchOptions(request: AccidentsRequest) {
  const response = await client.post<SearchOption[]>(trafficAccidentSearchOptionsUrl, request);
  return response.data;
}

export async function exportXlsx(request: AccidentsRequest) {
  const response = await client.post<Blob>(accidentsExportXlsxUrl, request, {
    responseType: 'blob',
    timeout: 5 * 60 * 1000,
  });

  return response.data;
}
