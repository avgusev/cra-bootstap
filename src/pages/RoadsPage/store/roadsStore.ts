import { action, makeAutoObservable } from 'mobx';
import {
  fetchFilter,
  fetchRoads,
  fetchSearchOptions,
  exportXlsx,
  FilterItem,
  FiltersRequest,
  FilterType,
  LookupHierarchyItem,
  MultiSelectItem,
  RoadsRequest,
  RoadsResponse,
  SearchOption,
} from '../api';
import { formatNumber, pluralize } from '../../../utils';
import { FilterKey, RootStore } from '.';
import dbIds from './dbids';
import { fetchUserColumnSettings, saveUserColumnSettings } from '../../../userColumnSettingsApi';
import { userStoreInstance } from '../../../features/Auth/store';

export type FilterStateItemMultiSelect = {
  type: FilterType.MultiSelect;
  value: MultiSelectItem[];
  options: MultiSelectItem[];
  ids: number[];
};

export type FilterStateItemSwitch = {
  type: FilterType.Switch;
  value: boolean;
  isDisabled: boolean;
};

export type FilterStateItemNumberRange = {
  type: FilterType.NumberRange;
  value: [number | undefined, number | undefined];
};

export type FilterStateItemLookupHierarchy = {
  type: FilterType.LookupHierarchy;
  value: string[]; //LookupHierarchyItem[];
  options: LookupHierarchyItem[];
  ids: number[];
  flatNodes: LookupHierarchyItem[];
};

export type FilterStateItemLookupMultipleWithPaged = {
  type: FilterType.LookupMultipleWithPaged;
  value: MultiSelectItem[];
  options: MultiSelectItem[];
  ids: number[];
  limit: number;
  start: number;
  textSearch: string;
  totalCount: number;
  isLoading: boolean;
};

export type FilterStateItemFixed = {
  type: FilterType.Fixed;
  value: number[];
};

// type FilterStateItem = FilterStateItemMultiSelect | FilterStateItemSwitch;

export const initialStateFilters = {
  REGION: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  AGGLOMERATION: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  ROAD_VALUE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  DISTRICT: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  CITY: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  LOCALITY: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  EXPL_ORG: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  ROAD_CLASS: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  ROAD_CATEGORY: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  ROAD_COATING: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  RANKS: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  TOP_SPEED: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  CLIMATIC_ZONE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  AXLE_LOAD: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  EMER_STATUS: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  EMER_DTP_TYPE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  APPEAL_TYPE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  APPEAL_STATUS: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  DIAGNOSTIC_TYPE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  DIAGNOSTIC_STATUS: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  CUSTOMER: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  CONTRACTOR: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  FIN_SOURCE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  WORK_TYPE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  WORK_STATUS: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,

  IS_HAVE_GEOMETRY: { type: FilterType.Switch, value: false, isDisabled: false } as FilterStateItemSwitch,
  IS_CORE_NETWORK: { type: FilterType.Switch, value: false, isDisabled: false } as FilterStateItemSwitch,
  IS_LIFE_CYCLE: { type: FilterType.Switch, value: false, isDisabled: false } as FilterStateItemSwitch,
  IS_NEW_TECHNOLOGY: { type: FilterType.Switch, value: false, isDisabled: false } as FilterStateItemSwitch,
  IS_HAVE_DEAD: { type: FilterType.Switch, value: false, isDisabled: false } as FilterStateItemSwitch,
  IS_HAVE_WOUNDED: { type: FilterType.Switch, value: false, isDisabled: false } as FilterStateItemSwitch,

  NORM_PERCENTAGE: { type: FilterType.NumberRange, value: [undefined, undefined] } as FilterStateItemNumberRange,
  SUBGRADE_WIDTH: { type: FilterType.NumberRange, value: [undefined, undefined] } as FilterStateItemNumberRange,
  ROAD_WIDTH: { type: FilterType.NumberRange, value: [undefined, undefined] } as FilterStateItemNumberRange,
  THROUGHPUT: { type: FilterType.NumberRange, value: [undefined, undefined] } as FilterStateItemNumberRange,

  PROJECT: {
    type: FilterType.LookupHierarchy,
    value: [],
    options: [],
    ids: [],
    flatNodes: [],
  } as FilterStateItemLookupHierarchy,
  CORE_NETWORK_CRITERION: {
    type: FilterType.LookupHierarchy,
    value: [],
    options: [],
    ids: [],
    flatNodes: [],
  } as FilterStateItemLookupHierarchy,

  IS_CHECKED: { type: FilterType.Fixed, value: [], options: [], ids: [] } as FilterStateItemFixed,

  OWNER: {
    type: FilterType.LookupMultipleWithPaged,
    value: [],
    options: [],
    ids: [],
    limit: 100,
    start: 0,
    textSearch: '',
    totalCount: 0,
    isLoading: false,
  } as FilterStateItemLookupMultipleWithPaged,
  BASE_DOCUMENT: {
    type: FilterType.LookupMultipleWithPaged,
    value: [],
    options: [],
    ids: [],
    limit: 100,
    start: 0,
    textSearch: '',
    totalCount: 0,
    isLoading: false,
  } as FilterStateItemLookupMultipleWithPaged,
};

type State = 'pending' | 'done' | 'error';

export class RoadsStore {
  rootStore: RootStore;

  private state: State = 'pending';
  get isLoading() {
    return this.state === 'pending';
  }

  private _isOpenFiltersModal = false;
  private _isOpenTraining = false;

  roads?: RoadsResponse;
  filters = initialStateFilters;
  filterCount?: number;
  order = { colName: 'road_value', colSortDirection: 1 as 0 | 1 };
  paging = { start: 0, limit: 20 };
  trainingStep = 0;

  columnVisibility = [
    'hasGeometry',
    'name',
    'value',
    'uniqueId',
    'length',
    // 'isChecked',
    'numberOfLanes',
    'normativeState',
    'dangerousPartCount',
    'dangerousPartLength',
  ];
  columnOrder: string[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  init(textSearch?: string) {
    this.textSearch = textSearch || '';
    if (this.textSearch === '') {
      this.stateFilters = this.loadFilters();
    } else {
      this.loadOptions();
    }
    this.loadColumnVisibility();
    this.columnOrder = this.loadColumnOrder();
    this.loadData();
  }

  private saveFilters(filters: FiltersRequest['filters']) {
    localStorage.setItem('filterSettings__roads', JSON.stringify(filters));
  }

  private loadFilters(): FiltersRequest['filters'] {
    return JSON.parse(localStorage.getItem('filterSettings__roads') || '{}');
  }

  saveColumnVisibility = (columnVisibility: string[]) => {
    const visibility = JSON.stringify(columnVisibility);

    if (userStoreInstance.isSignedIn) {
      saveUserColumnSettings({ tabCode: 'roads', columnSettings: visibility });
    } else {
      localStorage.setItem('columnSettings__roads', visibility);
    }
  };

  private loadColumnVisibility() {
    if (userStoreInstance.isSignedIn) {
      fetchUserColumnSettings('roads').then((response) => {
        this.columnVisibility = JSON.parse(response.columnSettings);
      });
    } else {
      const item = localStorage.getItem('columnSettings__roads');
      if (item) this.columnVisibility = JSON.parse(item);
    }
  }

  saveColumnOrder = (columnOrder: string[]) => {
    localStorage.setItem('columnOrder__roads', JSON.stringify(columnOrder));
  };

  private loadColumnOrder() {
    return JSON.parse(localStorage.getItem('columnOrder__roads') || '[]');
  }

  //#region modal
  get isOpenFiltersModal() {
    return this._isOpenFiltersModal;
  }

  set isOpenFiltersModal(value) {
    this._isOpenFiltersModal = value;
  }

  showFiltersModal = () => {
    // this.textSearch = '';
    this.isOpenFiltersModal = true;
  };

  hideFiltersModal = () => {
    this.isOpenFiltersModal = false;
  };

  //#Trening modal
  get isOpenTrening() {
    return this._isOpenTraining;
  }

  set isOpenTrening(value) {
    this._isOpenTraining = value;
  }

  showTrening = () => {
    this.isOpenTrening = true;
  };

  hideTrening = () => {
    this.isOpenTrening = false;
  };

  // setShowFiltersModal(value: boolean) {
  //   this.showFiltersModal = value;
  // }
  //#endregion

  //#region text search
  private searchState: State = 'pending';
  get isSearchLoading() {
    return this.searchState === 'pending';
  }

  searchOptions: SearchOption[] = [];
  textSearch = '';

  private loadOptions = () => {
    this.searchState = 'pending';

    fetchSearchOptions(this.roadsRequest).then(
      action('searchOptionsFetchSuccess', (options) => {
        this.searchOptions = options;
        this.searchState = 'done';
      }),
      action('searchOptionsFetchError', () => {
        this.searchState = 'error';
      })
    );
  };

  setTextSearch(textSearch: string) {
    this.textSearch = textSearch;
    textSearch !== '' ? this.loadOptions() : this.loadData();
  }
  //#endregion

  //#region paging
  get page() {
    // return this.roads ? Math.floor(this.roads.start / this.roads.limit) + 1 : 0;
    return Math.floor(this.paging.start / this.paging.limit) + 1;
  }

  set page(page: number) {
    // this.setPage(page);
    this.paging.start = (page - 1) * this.paging.limit;
  }

  setPage = (page: number) => {
    this.page = page;
    this.loadRoads();
  };

  get pageCount() {
    return this.roads ? Math.ceil(this.roads.totalCount / this.roads.limit) : 0;
  }
  //#endregion

  //#region order
  setOrder = (id: string, sortDirection: 0 | 1) => {
    const colName = dbIds[id];

    if (this.order.colName === colName && this.order.colSortDirection === sortDirection) return;

    this.order.colName = colName;
    this.order.colSortDirection = sortDirection;

    this.loadRoads();
  };

  toggleOrder = (id: string) => {
    const colName = dbIds[id];

    if (colName === this.order.colName) {
      this.order.colSortDirection += 1;
      this.order.colSortDirection %= 2;
    } else {
      this.order.colName = colName;
      this.order.colSortDirection = 0;
    }
    this.loadRoads();
  };
  //#endregion

  get requestFilters() {
    const filters: FiltersRequest['filters'] = {};

    Object.entries(this.filters).forEach(([key, filterItem]) => {
      if (filterItem.type === FilterType.MultiSelect) {
        filters[key] = { value: filterItem.ids };
      } else if (filterItem.type === FilterType.Switch) {
        filters[key] = filterItem.value ? { value: true } : {};
      } else if (filterItem.type === FilterType.NumberRange) {
        filters[key] = { value: filterItem.value };
      } else if (filterItem.type === FilterType.LookupHierarchy) {
        filters[key] = { value: filterItem.ids };
      } else if (filterItem.type === FilterType.LookupMultipleWithPaged) {
        filters[key] = {
          value: {
            values: filterItem.ids,
            limit: filterItem.limit,
            start: filterItem.start,
            textSearch: filterItem.textSearch,
          },
        };
      } else if (filterItem.type === FilterType.Fixed) {
        filters[key] = { value: filterItem.value };
      }
    });

    return filters;
  }

  private get filtersRequest(): FiltersRequest {
    return {
      textSearch: this.textSearch,
      filters: this.requestFilters,
    };
  }

  private get roadsRequest(): RoadsRequest {
    return {
      textSearch: this.textSearch,
      filters: this.requestFilters,
      order: this.order,
      paging: this.paging,
    };
  }

  set stateFilters(requestFilters: FiltersRequest['filters']) {
    Object.entries(this.filters).forEach(([key, filterItem]) => {
      const value = requestFilters[key]?.value;
      if (filterItem.type === FilterType.MultiSelect) {
        const val = value as number[] | undefined;
        filterItem.ids = val || [];
        // filterItem.value = filterItem.options.filter((o) => filterItem.ids.includes(o.id));
      } else if (filterItem.type === FilterType.Switch) {
        filterItem.value = Boolean(value);
      } else if (filterItem.type === FilterType.NumberRange) {
        filterItem.value = Array.isArray(value)
          ? (value as [number | undefined, number | undefined])
          : [undefined, undefined];
      } else if (filterItem.type === FilterType.LookupHierarchy) {
        const val = value as number[] | undefined;
        filterItem.ids = val || [];
      } else if (filterItem.type === FilterType.Fixed) {
        const val = value as number[];
        filterItem.value = val || [];
      } else if (filterItem.type === FilterType.LookupMultipleWithPaged) {
        const val = value as { values: number[]; start: number; limit: number; textSearch: string } | undefined;
        filterItem.ids = val?.values || [];
      }
    });
  }

  flatNodes(options: LookupHierarchyItem[]) {
    let flatNodes: LookupHierarchyItem[] = [];
    // let flatNodes: Record<string, LookupHierarchyItem> = {};

    options.forEach((node) => {
      if (node.children) {
        flatNodes = [...flatNodes, node, ...this.flatNodes(node.children)];
        // flatNodes = { ...flatNodes, [node.id]: node, ...this.flatNodes(node.children) };
      } else {
        flatNodes = [...flatNodes, node];
        // flatNodes = { ...flatNodes, ...{ [node.id]: node } };
      }
    });
    return flatNodes;
  }

  private updateOptions(responseFilters: FilterItem[], addOptions?: boolean) {
    responseFilters.forEach((item) => {
      const key = item.id as FilterKey;
      const filterItem = this.filters[key];
      if (filterItem === undefined) return;

      if (item.type === FilterType.MultiSelect && filterItem.type === FilterType.MultiSelect) {
        filterItem.options = item.value || [];
        filterItem.value = filterItem.options.filter((o) => filterItem.ids.includes(o.id));
      }
      if (item.type === FilterType.LookupHierarchy && filterItem.type === FilterType.LookupHierarchy) {
        filterItem.options = item.value || [];
        filterItem.flatNodes = this.flatNodes(filterItem.options);
        filterItem.ids = item.selected || []; // 3823509
        filterItem.value = filterItem.flatNodes
          .filter((o) => filterItem.ids.includes(o.id))
          .map((value) => value.pathId);
        // ['2812468;2812206;3823509', '6009161;6029498;70528340;3823509']
      }
      if (item.type === FilterType.LookupMultipleWithPaged && filterItem.type === FilterType.LookupMultipleWithPaged) {
        filterItem.options = addOptions ? filterItem.options.concat(item.value || []) : item.value || [];
        filterItem.totalCount = item.totalCount;
        filterItem.value = filterItem.options.filter((o) => filterItem.ids.includes(o.id));
      }
      if (item.type === FilterType.Fixed && filterItem.type === FilterType.Fixed) {
        filterItem.value = item.selected || [];
      }
    });
  }

  loadFilter() {
    this.state = 'pending';
    const request = this.filtersRequest;

    fetchFilter(request).then(
      action('filterFetchSuccess', (filterResponse) => {
        this.updateOptions(filterResponse.filters);
        this.filterCount = filterResponse.totalCount;
        this.state = 'done';
      }),
      action('filterFetchError', () => {
        this.state = 'error';
      })
    );
  }

  loadRoads() {
    this.state = 'pending';

    fetchRoads(this.roadsRequest).then(
      action('roadsFetchSuccess', (roadsResponse) => {
        this.roads = roadsResponse;
        this.paging.start = roadsResponse.start;
        this.paging.limit = roadsResponse.limit;
        this.state = 'done';
      }),
      action('roadsFetchError', () => {
        this.state = 'error';
      })
    );
  }

  // loadAll
  loadData() {
    this.state = 'pending';
    const request = this.roadsRequest;
    this.saveFilters(request.filters);
    this.roads = undefined;
    this.filterCount = undefined;

    fetchRoads(request).then(
      action('fetchSuccess', (roadsResponse) => {
        this.updateOptions(roadsResponse.filters);
        this.roads = roadsResponse;
        this.filterCount = roadsResponse.totalCount;
        this.paging.start = roadsResponse.start;
        this.paging.limit = roadsResponse.limit;
        this.state = 'done';
      }),
      action('fetchError', () => {
        this.state = 'error';
      })
    );
  }

  //#region export
  private exportState: State = 'done';
  get isExportLoading() {
    return this.exportState === 'pending';
  }

  getXlsxBlob() {
    this.exportState = 'pending';
    return exportXlsx(this.roadsRequest).then(
      action('exportXlsxSuccess', (blob) => {
        this.exportState = 'done';
        return blob;
      }),
      action('exportXlsxError', () => {
        this.exportState = 'error';
        return undefined;
      })
    );
  }
  //#endregion

  applyFilter() {
    this.paging.start = 0;
    this.loadData();
    this.isOpenFiltersModal = false;
  }

  clearFilter() {
    this.textSearch = '';
    this.stateFilters = {};
    this.loadFilter();
    this.rootStore.presetStore.activePreset = undefined;
  }

  updateMultiSelect(key: FilterKey, values: MultiSelectItem[]) {
    const filterItem = this.filters[key];
    if (filterItem.type !== FilterType.MultiSelect) return;

    filterItem.ids = values.map((v) => v.id);
    filterItem.value = filterItem.options.filter((o) => filterItem.ids.includes(o.id));

    this.loadFilter();
    this.rootStore.presetStore.activePreset = undefined;
  }

  updateSwitch(key: FilterKey, value: boolean) {
    if (this.filters[key].type !== FilterType.Switch) return;
    this.filters[key].value = value;

    this.loadFilter();
    this.rootStore.presetStore.activePreset = undefined;
  }

  updateNumberRange(key: FilterKey, value: [number | undefined, number | undefined]) {
    if (this.filters[key].type !== FilterType.NumberRange) return;
    this.filters[key].value = value;

    this.loadFilter();
    this.rootStore.presetStore.activePreset = undefined;
  }

  updateLookupHierarchy(key: FilterKey, values: string[]) {
    // ['2812468;2812206;3823509'] / ['6009161;6029498;70528340;3823509']
    const filterItem = this.filters[key];
    if (filterItem.type !== FilterType.LookupHierarchy) return;
    filterItem.ids = values.map((v) => Number(v.split(';').at(-1))); // [3823509]
    filterItem.value = values;
    this.loadFilter();
    this.rootStore.presetStore.activePreset = undefined;
  }

  updateFixed(key: FilterKey, values: number[]) {
    const filterItem = this.filters[key];
    if (filterItem.type !== FilterType.Fixed) return;
    filterItem.value = values;

    this.loadFilter();
    this.rootStore.presetStore.activePreset = undefined;
  }

  updateLookupMultipleWithPaged(key: FilterKey, values: MultiSelectItem[]) {
    const filterItem = this.filters[key];
    if (filterItem.type !== FilterType.LookupMultipleWithPaged) return;

    filterItem.ids = values.map((v) => v.id);
    filterItem.value = filterItem.options.filter((o) => filterItem.ids.includes(o.id));

    this.loadFilter();
    this.rootStore.presetStore.activePreset = undefined;
  }

  loadPagedOptions(filterItem: FilterStateItemLookupMultipleWithPaged, addOptions?: boolean) {
    filterItem.isLoading = true;
    fetchFilter(this.filtersRequest).then(
      action('filterFetchSuccess', (filterResponse) => {
        this.updateOptions(filterResponse.filters, addOptions);
        this.filterCount = filterResponse.totalCount;
        filterItem.isLoading = false;
      }),
      action('filterFetchError', () => {
        filterItem.isLoading = false;
      })
    );
  }

  setTextSearchAsync = (key: FilterKey, text: string) => {
    const filterItem = this.filters[key];
    if (filterItem.type !== FilterType.LookupMultipleWithPaged) return;

    filterItem.start = 0;
    filterItem.textSearch = text;
    this.loadPagedOptions(filterItem);
  };

  loadNextPage(key: FilterKey) {
    const filterItem = this.filters[key];
    if (filterItem.type !== FilterType.LookupMultipleWithPaged) return;

    if (filterItem.start + filterItem.limit >= filterItem.totalCount) return;
    filterItem.start += filterItem.limit;
    this.loadPagedOptions(filterItem, true);
  }

  get selectedFiltersCount() {
    let total = 0;

    Object.values(this.filters).forEach((filterItem) => {
      if (
        filterItem.type === FilterType.MultiSelect ||
        filterItem.type === FilterType.LookupHierarchy ||
        filterItem.type === FilterType.LookupMultipleWithPaged
      ) {
        total += filterItem.ids.length;
      } else if (filterItem.type === FilterType.Switch) {
        total += filterItem.value ? 1 : 0;
      } else if (filterItem.type === FilterType.NumberRange) {
        total += filterItem.value[0] || filterItem.value[1] ? 1 : 0;
      } else if (filterItem.type === FilterType.Fixed) {
        total += filterItem.value.length;
      }
    });
    return total;
  }

  get filterButtonCount() {
    const selectedFiltersCount = this.selectedFiltersCount;
    return selectedFiltersCount !== 0 ? selectedFiltersCount : undefined;
  }

  get applyButtonText() {
    return this.filterCount
      ? `Показать ${formatNumber(this.filterCount)} ${pluralize({
          count: this.filterCount,
          one: 'дорогу',
          few: 'дороги',
          many: 'дорог',
        })} `
      : 'Применить';
  }
}
