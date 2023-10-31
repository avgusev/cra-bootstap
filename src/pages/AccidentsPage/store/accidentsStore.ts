import { action, makeAutoObservable } from 'mobx';
import {
  fetchFilter,
  fetchAccidents,
  fetchSearchOptions,
  exportXlsx,
  FilterItem,
  FiltersRequest,
  FilterType,
  MultiSelectItem,
  AccidentsRequest,
  AccidentsResponse,
  SearchOption,
  DateRangeItem,
} from '../api';
import { formatNumber } from '../../../utils';
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

export type FilterStateItemDateRange = {
  type: FilterType.DateRange;
  value: DateRangeItem;
  min?: string;
  max?: string;
};

export type FilterStateItemFixed = {
  type: FilterType.DateRange;
  value: DateRangeItem;
  min?: string;
  max?: string;
};

export const initialStateFilters = {
  'DATE_START.DATE_FINISH': {
    type: FilterType.DateRange,
    value: { isDisabled: false },
    min: '',
    max: '',
  } as FilterStateItemDateRange,

  REGION: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  DISTRICT: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  CITY: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  LOCALITY: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  VALUE_OF_THE_ROAD: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  OWNER: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  SOURCESYSTEM: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
  DTP_TYPE: { type: FilterType.MultiSelect, value: [], options: [], ids: [] } as FilterStateItemMultiSelect,
};

type State = 'pending' | 'done' | 'error';

export class AccidentsStore {
  rootStore: RootStore;

  private state: State = 'pending';
  get isLoading() {
    return this.state === 'pending';
  }

  private _isOpenFiltersModal = false;

  accidents?: AccidentsResponse;
  filters = initialStateFilters;
  filterCount?: number;
  order = { colName: 'dtp_date', colSortDirection: 1 as 0 | 1 };
  paging = { start: 0, limit: 20 };

  columnVisibility = [
    'hasGeometry',
    'address',
    'date',
    'type',
    'wounded',
    'dead',
    'peopleAmount',
    'tsAmount',
    'sourceSystem',
    'reason',
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
    localStorage.setItem('filterSettings__trafficAccidents', JSON.stringify(filters));
  }

  private loadFilters(): FiltersRequest['filters'] {
    return JSON.parse(localStorage.getItem('filterSettings__trafficAccidents') || '{}');
  }

  saveColumnVisibility = (columnVisibility: string[]) => {
    const visibility = JSON.stringify(columnVisibility);

    if (userStoreInstance.isSignedIn) {
      saveUserColumnSettings({ tabCode: 'trafficAccidents', columnSettings: visibility });
    } else {
      localStorage.setItem('columnSettings__trafficAccidents', visibility);
    }
  };

  private loadColumnVisibility() {
    if (userStoreInstance.isSignedIn) {
      fetchUserColumnSettings('trafficAccidents').then((response) => {
        this.columnVisibility = JSON.parse(response.columnSettings);
      });
    } else {
      const item = localStorage.getItem('columnSettings__trafficAccidents');
      if (item) this.columnVisibility = JSON.parse(item);
    }
  }

  saveColumnOrder = (columnOrder: string[]) => {
    localStorage.setItem('columnOrder__trafficAccidents', JSON.stringify(columnOrder));
  };

  private loadColumnOrder() {
    return JSON.parse(localStorage.getItem('columnOrder__trafficAccidents') || '[]');
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

    fetchSearchOptions(this.accidentsRequest).then(
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
    // return this.accidents ? Math.floor(this.accidents.start / this.accidents.limit) + 1 : 0;
    return Math.floor(this.paging.start / this.paging.limit) + 1;
  }

  set page(page: number) {
    // this.setPage(page);
    this.paging.start = (page - 1) * this.paging.limit;
  }

  setPage = (page: number) => {
    this.page = page;
    this.loadAccidents();
  };

  get pageCount() {
    return this.accidents ? Math.ceil(this.accidents.totalCount / this.accidents.limit) : 0;
  }
  //#endregion

  //#region order
  setOrder = (id: string, sortDirection: 0 | 1) => {
    const colName = dbIds[id];

    if (this.order.colName === colName && this.order.colSortDirection === sortDirection) return;

    this.order.colName = colName;
    this.order.colSortDirection = sortDirection;

    this.loadAccidents();
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
    this.loadAccidents();
  };
  //#endregion

  get requestFilters() {
    const filters: FiltersRequest['filters'] = {};

    Object.entries(this.filters).forEach(([key, filterItem]) => {
      if (filterItem.type === FilterType.MultiSelect) {
        filters[key] = { value: filterItem.ids };
      }
      if (filterItem.type === FilterType.DateRange) {
        filters[key] = {
          value: filterItem.value as { start?: string; end?: string; isDisabled: boolean },
        };
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

  private get accidentsRequest(): AccidentsRequest {
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
      } else if (filterItem.type === FilterType.DateRange) {
        filterItem.value = value ? (value as { start?: string; end?: string }) : { start: '', end: '' };
      }
    });
  }

  private updateOptions(responseFilters: FilterItem[]) {
    responseFilters.forEach((item) => {
      const key = item.id as FilterKey;
      const filterItem = this.filters[key];
      if (filterItem === undefined) return;

      if (item.type === FilterType.MultiSelect && filterItem.type === FilterType.MultiSelect) {
        filterItem.options = item.value || [];
        filterItem.value = filterItem.options.filter((o) => filterItem.ids.includes(o.id));
      }
      if (item.type === FilterType.DateRange && filterItem.type === FilterType.DateRange) {
        filterItem.value = item.value || { isDisabled: false, start: '', end: '' };
        filterItem.min = filterItem.min || item.value?.min || '';
        filterItem.max = filterItem.max || item.value?.max || '';
        // filterItem.value
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

  loadAccidents() {
    this.state = 'pending';

    fetchAccidents(this.accidentsRequest).then(
      action('accidentsFetchSuccess', (accidentsResponse) => {
        this.accidents = accidentsResponse;
        this.paging.start = accidentsResponse.start;
        this.paging.limit = accidentsResponse.limit;
        this.state = 'done';
      }),
      action('accidentsFetchError', () => {
        this.state = 'error';
      })
    );
  }

  // loadAll
  loadData() {
    this.state = 'pending';
    const request = this.accidentsRequest;
    this.saveFilters(request.filters);
    this.accidents = undefined;
    this.filterCount = undefined;

    fetchAccidents(request).then(
      action('fetchSuccess', (accidentsResponse) => {
        this.updateOptions(accidentsResponse.filters);
        this.accidents = accidentsResponse;
        this.filterCount = accidentsResponse.totalCount;
        this.paging.start = accidentsResponse.start;
        this.paging.limit = accidentsResponse.limit;
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
    return exportXlsx(this.accidentsRequest).then(
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

  updateDateRange(key: FilterKey, value: Date | null | [Date | null, Date | null]) {
    if (this.filters[key].type !== FilterType.DateRange) return;

    this.filters[key].value = {
      start:
        (Array.isArray(value) &&
          value[0] &&
          value[0].toLocaleString('ru', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })) ||
        '',
      end:
        (Array.isArray(value) &&
          value[1] &&
          value[1].toLocaleString('ru', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })) ||
        '',
    };

    // this.loadFilter();
    // this.rootStore.presetStore.activePreset = undefined;
  }

  loadFilterDateRange() {
    this.loadFilter();
    this.rootStore.presetStore.activePreset = undefined;
  }

  get selectedFiltersCount() {
    let total = 0;

    Object.values(this.filters).forEach((filterItem) => {
      if (filterItem.type === FilterType.MultiSelect) {
        total += filterItem.ids.length;
      }
      if (filterItem.type === FilterType.DateRange) {
        total += filterItem.value.start || filterItem.value.end ? 1 : 0;
      }
    });
    return total;
  }

  get filterButtonCount() {
    const selectedFiltersCount = this.selectedFiltersCount;
    return selectedFiltersCount !== 0 ? selectedFiltersCount : undefined;
  }

  get applyButtonText() {
    return this.filterCount ? `Показать ${formatNumber(this.filterCount)} ДТП` : 'Применить';
  }
}
