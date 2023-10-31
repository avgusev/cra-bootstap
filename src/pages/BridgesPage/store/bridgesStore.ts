import { action, makeAutoObservable } from 'mobx';
import {
  fetchFilter,
  fetchBridges,
  fetchSearchOptions,
  exportXlsx,
  FilterItem,
  FiltersRequest,
  FilterType,
  LookupHierarchyItem,
  MultiSelectItem,
  BridgesRequest,
  BridgesResponse,
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

export type FilterStateItemLookupHierarchy = {
  type: FilterType.LookupHierarchy;
  value: string[];
  options: LookupHierarchyItem[];
  ids: number[];
  flatNodes: LookupHierarchyItem[];
};

export type FilterStateItemFixed = {
  type: FilterType.Fixed;
  value: number[];
};

export const initialStateFilters = {
  TYPE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  BRIDGE_TYPE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  TYPE_OF_OBSTACLE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  TECHNICAL_CONDITION: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  CLOTHING: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  VALUE_OF_THE_ROAD: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  ROAD_CATEGORY: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  REGION: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  AGGLOMERATION: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  DISTRICT: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  CITY: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  LOCALITY: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  OWNER: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  OPERATOR: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,

  DETOUR: { type: FilterType.Switch, value: false, isDisabled: false } as FilterStateItemSwitch,
  IS_UNIQUE: { type: FilterType.Switch, value: false, isDisabled: false } as FilterStateItemSwitch,
  IS_HAVE_GEOMETRY: { type: FilterType.Switch, value: false, isDisabled: false } as FilterStateItemSwitch,

  IS_CHECKED: { type: FilterType.Fixed, value: [], options: [], ids: [] } as FilterStateItemFixed,

  PROJECT: {
    type: FilterType.LookupHierarchy,
    value: [],
    options: [],
    ids: [],
    flatNodes: [],
  } as FilterStateItemLookupHierarchy,
};

type State = 'pending' | 'done' | 'error';

export class BridgesStore {
  rootStore: RootStore;

  private state: State = 'pending';
  get isLoading() {
    return this.state === 'pending';
  }

  private _isOpenFiltersModal = false;

  bridges?: BridgesResponse;
  filters = initialStateFilters;
  filterCount?: number;
  order = { colName: 'full_name', colSortDirection: 1 as 0 | 1 };
  paging = { start: 0, limit: 20 };

  columnVisibility = [
    'hasGeometry',
    'name',
    'isChecked',
    'technicalCondition',
    'type',
    'length',
    'numberOfLanes',
    'clothing',
    'roadCategory',
    'obstacle',
    'detour',
    'balanceCost',
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
    localStorage.setItem('filterSettings__bridges', JSON.stringify(filters));
  }

  private loadFilters(): FiltersRequest['filters'] {
    return JSON.parse(localStorage.getItem('filterSettings__bridges') || '{}');
  }

  saveColumnVisibility = (columnVisibility: string[]) => {
    const visibility = JSON.stringify(columnVisibility);

    if (userStoreInstance.isSignedIn) {
      saveUserColumnSettings({ tabCode: 'bridges', columnSettings: visibility });
    } else {
      localStorage.setItem('columnSettings__bridges', visibility);
    }
  };

  private loadColumnVisibility() {
    if (userStoreInstance.isSignedIn) {
      fetchUserColumnSettings('bridges').then((response) => {
        this.columnVisibility = JSON.parse(response.columnSettings);
      });
    } else {
      const item = localStorage.getItem('columnSettings__bridges');
      if (item) this.columnVisibility = JSON.parse(item);
    }
  }

  saveColumnOrder = (columnOrder: string[]) => {
    localStorage.setItem('columnOrder__bridges', JSON.stringify(columnOrder));
  };

  private loadColumnOrder() {
    return JSON.parse(localStorage.getItem('columnOrder__bridges') || '[]');
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

    fetchSearchOptions(this.bridgesRequest).then(
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
    // return this.bridges ? Math.floor(this.bridges.start / this.bridges.limit) + 1 : 0;
    return Math.floor(this.paging.start / this.paging.limit) + 1;
  }

  set page(page: number) {
    // this.setPage(page);
    this.paging.start = (page - 1) * this.paging.limit;
  }

  setPage = (page: number) => {
    this.page = page;
    // this.loadBridges();

    // [Backend] problem, all response with pagination/list update return response.totalCount: 0
    this.state = 'pending';

    fetchBridges(this.bridgesRequest).then(
      action('bridgesFetchSuccess', (bridgesResponse) => {
        const prevTotalCount = this.bridges?.totalCount;
        this.bridges = bridgesResponse;
        if (prevTotalCount && this.bridges.totalCount === 0) this.bridges.totalCount = prevTotalCount;
        // this.paging.start = bridgesResponse.start;
        // this.paging.limit = bridgesResponse.limit;
        this.state = 'done';
      }),
      action('bridgesFetchError', () => {
        this.state = 'error';
      })
    );
  };

  get pageCount() {
    // return this.bridges ? Math.ceil(this.bridges.totalCount / this.bridges.limit) : 0;
    return this.bridges ? Math.ceil(this.bridges.totalCount / this.paging.limit) : 0;
  }
  //#endregion

  //#region order
  setOrder = (id: string, sortDirection: 0 | 1) => {
    const colName = dbIds[id];

    if (this.order.colName === colName && this.order.colSortDirection === sortDirection) return;

    this.order.colName = colName;
    this.order.colSortDirection = sortDirection;

    this.loadBridges();
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
    this.loadBridges();
  };
  //#endregion

  get requestFilters() {
    const filters: FiltersRequest['filters'] = {};

    Object.entries(this.filters).forEach(([key, filterItem]) => {
      if (filterItem.type === FilterType.MultiSelect) {
        filters[key] = { value: filterItem.ids };
      } else if (filterItem.type === FilterType.Switch) {
        filters[key] = filterItem.value ? { value: true } : {};
      } else if (filterItem.type === FilterType.LookupHierarchy) {
        filters[key] = { value: filterItem.ids };
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

  private get bridgesRequest(): BridgesRequest {
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
      } else if (filterItem.type === FilterType.Switch) {
        filterItem.value = Boolean(value);
      } else if (filterItem.type === FilterType.LookupHierarchy) {
        const val = value as number[] | undefined;
        filterItem.ids = val || [];
      } else if (filterItem.type === FilterType.Fixed) {
        const val = value as number[];
        filterItem.value = val || [];
      }
    });
  }

  flatNodes(options: LookupHierarchyItem[]) {
    let flatNodes: LookupHierarchyItem[] = [];

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
        filterItem.ids = item.selected || [];
        filterItem.value = filterItem.flatNodes
          .filter((o) => filterItem.ids.includes(o.id))
          .map((value) => value.pathId);
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

  loadBridges() {
    this.state = 'pending';

    fetchBridges(this.bridgesRequest).then(
      action('bridgesFetchSuccess', (bridgesResponse) => {
        this.bridges = bridgesResponse;
        // this.paging.start = bridgesResponse.start;
        // this.paging.limit = bridgesResponse.limit;
        this.state = 'done';
      }),
      action('bridgesFetchError', () => {
        this.state = 'error';
      })
    );
  }

  // loadAll
  loadData() {
    this.state = 'pending';
    const request = this.bridgesRequest;
    this.saveFilters(request.filters);
    this.bridges = undefined;
    this.filterCount = undefined;

    fetchBridges(request).then(
      action('fetchSuccess', (bridgesResponse) => {
        this.updateOptions(bridgesResponse.filters);
        this.bridges = bridgesResponse;
        this.filterCount = bridgesResponse.totalCount;
        // this.paging.start = bridgesResponse.start;
        // this.paging.limit = bridgesResponse.limit;
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
    return exportXlsx(this.bridgesRequest).then(
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

  updateLookupHierarchy(key: FilterKey, values: string[]) {
    const filterItem = this.filters[key];
    if (filterItem.type !== FilterType.LookupHierarchy) return;
    filterItem.ids = values.map((v) => Number(v.split(';').at(-1)));
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

  get selectedFiltersCount() {
    let total = 0;

    Object.values(this.filters).forEach((filterItem) => {
      if (filterItem.type === FilterType.MultiSelect || filterItem.type === FilterType.LookupHierarchy) {
        total += filterItem.ids.length;
      } else if (filterItem.type === FilterType.Switch) {
        total += filterItem.value ? 1 : 0;
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
          one: 'сооружение',
          few: 'сооружения',
          many: 'сооружений',
        })} `
      : 'Применить';
  }
}
