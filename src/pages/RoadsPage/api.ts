import client from '../../httpClient';

const filtersMetadataUrl = 'roads/list/filters-metadata';
const roadsListUrl = 'roads/list';
const roadsFiltersUrl = 'roads/list/filters';
const roadsSearchOptionsUrl = '/roads/list/search-options';
const roadsExportXlsxUrl = 'roads/export/xlsx';

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
// type KeyFiltersMetadata = keyof FiltersMetadata;

export type RoadsResponse = {
  totalCount: number;
  start: number;
  limit: number;
  stat: {
    backboneLength: number;
    fedCount: number;
    fedLength: number;
    locCount: number;
    locLength: number;
    regCount: number;
    regLength: number;
    roadCheckedCount: number;
    totalCount: number;
    totalLength: number;
  };
  data: {
    id: number;
    isChecked: boolean;
    name: string;
    info: string;
    value: string;
    roadValueRc: '1' | '2' | '3';
    uniqueId: string;
    length: number;
    square: number;
    normativeState: number;
    dangerousPartCount: number;
    dangerousPartLength: number;
    roadPartCount: number;
    roadPartLength: number;
    overloadPartCount: number;
    overloadPartLength: number;
    cost: number;
    coatingTypes: { code: number; value: string }[];
    categories: { code: number; value: string }[];
    classes: { code: number; value: string }[];
    hasGeometry: boolean;
    numberOfLanes: string;
    level: number;
    typeCode: number;
    children: RoadsResponse['data'];
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
  NumberRange = 7,
  // LookupGrouped = 8,
  LookupHierarchy = 9,
  Fixed = 10,
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
      type: FilterType.Switch;
      // value?: boolean;
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
      // checkPeriodLimits: false;
      // groupId: 0;
      // isDisabled: false;
      // isExtended: false;
      // isSelectAllOptionHidden: true;
    }
  | {
      type: FilterType.Fixed;
      selected?: number[];
      value?: FixedItem;
    }
);

// start: number;
// isExtended: boolean;
// isDisabled: boolean;
// groupId: number;
// totalCount: number; // 0
// isSelectAllOptionHidden: boolean;
// checkPeriodLimits: boolean;
// selected: number[]; // type 9 - CORE_NETWORK_CRITERION

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

export type RoadsRequest = FiltersRequest & {
  order: { colName: string; colSortDirection: 0 | 1 };
  paging: { start: number; limit: number };
};

export async function fetchFiltersMetadata() {
  const response = await client.get<FiltersMetadata[]>(filtersMetadataUrl);
  return response.data;
}

export async function fetchRoads(request: RoadsRequest) {
  const response = await client.post<RoadsResponse>(roadsListUrl, request);
  return response.data;
}

export type FilterResponse = Pick<RoadsResponse, 'filters' | 'totalCount'>;

export async function fetchFilter(request: FiltersRequest) {
  const response = await client.post<FilterResponse>(roadsFiltersUrl, request);
  return response.data;
}

export async function fetchSearchOptions(request: RoadsRequest) {
  const response = await client.post<SearchOption[]>(roadsSearchOptionsUrl, request);
  return response.data;
}

export async function exportXlsx(request: RoadsRequest) {
  const response = await client.post<Blob>(roadsExportXlsxUrl, request, {
    responseType: 'blob',
    timeout: 5 * 60 * 1000,
  });

  return response.data;
}
