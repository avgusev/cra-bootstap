import client from '../../httpClient';

const filtersMetadataUrl = 'bridges/list/filters-metadata';
const bridgesUrl = 'bridges/list';
const bridgesFiltersUrl = 'bridges/list/filters';
const bridgesSearchOptionsUrl = 'bridges/search-options';
const bridgesExportXlsxUrl = 'bridges/export/xlsx';

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

export type BridgesResponse = {
  totalCount: number;
  // start: number;
  // limit: number;
  data: {
    id: string;
    hasGeometry: boolean;
    name: string;
    valueOfRoad: string;
    roadName: string;
    location: string;
    isChecked: boolean;
    technicalCondition: { code: string; value: string };
    type: { code: string; value: string };
    bridgeType: string;
    length: number;
    numberOfLanes: string;
    clothing: { code: string; value: string };
    roadCategory: { code: string; value: string }[];
    roadCategorySP: { code: string; value: string }[];
    obstacle: { code: string; value: string };
    detour: string;
    balanceCost: number;
    isCheckedDetails: string;
    children: BridgesResponse['data'];
  }[];
  filters: FilterItem[];
};

export enum FilterType {
  // Unknown = 0,
  // LookupSingle = 1,
  MultiSelect = 2,
  // Number = 3,
  // String = 4,
  // DateRange = 5,
  Switch = 6,
  // NumberRange = 7,
  // LookupGrouped = 8,
  LookupHierarchy = 9,
  Fixed = 10,
  // Int = 11,
  // LookupMultipleString = 12,
  // LookupMultipleWithPaged = 13,
  // LookupMultipleStringWithPaged = 14
}

export type FilterItem = { id: string; title: string } & (
  | {
      type: FilterType.MultiSelect;
      value?: MultiSelectItem[];
    }
  | {
      type: FilterType.Switch;
      // value?: boolean;
      isDisabled: boolean;
    }
  | {
      type: FilterType.LookupHierarchy;
      selected?: number[];
      value?: LookupHierarchyItem[];
    }
  | {
      type: FilterType.Fixed;
      selected?: number[];
      value?: FixedItem;
    }
);

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

export type FixedItem = {
  availableItems: {
    id: number;
    text: string;
    isDisabled: boolean;
    isSelected: boolean;
    level: number;
    children: FixedItem['availableItems'];
  }[];
  items: {
    id: number;
    text: string;
    isDisabled: boolean;
    isSelected: boolean;
    level: number;
    children: FixedItem['items'];
  }[];
};

export type SearchOption = {
  id: number;
  text: string;
};

export type FilterRequestValue =
  | { value: number[] }
  | { value?: boolean }
  | { value: [number | undefined, number | undefined] }
  | { value: { values: number[]; start: number; limit: number; textSearch: string } };

export type FiltersRequest = { filters: Record<string, FilterRequestValue>; textSearch: string };

export type BridgesRequest = FiltersRequest & {
  order: { colName: string; colSortDirection: 0 | 1 };
  paging: { start: number; limit: number };
};

export async function fetchFiltersMetadata() {
  const response = await client.get<FiltersMetadata[]>(filtersMetadataUrl);
  return response.data;
}

export async function fetchBridges(request: BridgesRequest) {
  const response = await client.post<BridgesResponse>(bridgesUrl, request);
  return response.data;
}

export type FilterResponse = Pick<BridgesResponse, 'filters' | 'totalCount'>;

export async function fetchFilter(request: FiltersRequest) {
  const response = await client.post<FilterResponse>(bridgesFiltersUrl, request);
  return response.data;
}

export async function fetchSearchOptions(request: BridgesRequest) {
  const response = await client.post<SearchOption[]>(bridgesSearchOptionsUrl, request);
  return response.data;
}

export async function exportXlsx(request: BridgesRequest) {
  const response = await client.post<Blob>(bridgesExportXlsxUrl, request, {
    responseType: 'blob',
    timeout: 5 * 60 * 1000,
  });

  return response.data;
}
