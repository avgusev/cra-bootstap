import { action, makeAutoObservable } from 'mobx';
import { OverhaulsResponse, SearchOption, fetchPrograms } from '../api';
import { RootStore } from '.';

type State = 'pending' | 'done' | 'error';

export class OverhaulsStore {
  rootStore: RootStore;

  private state: State = 'pending';
  get isLoading() {
    return this.state === 'pending';
  }

  overhauls?: OverhaulsResponse;

  columnVisibility = [
    'settings',
    'name',
    'program_id',
    'program_type',
    'region',
    'name_short',
    'work_type',
    'object_work_type',
    'organization',
    'status',
    'status_date',
    'level',
    'years',
    'version',
    'sum_cost',
  ];
  columnOrder: string[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  init(textSearch?: string) {
    this.textSearch = textSearch || '';

    // this.loadOptions();

    this.loadColumnVisibility();
    this.columnOrder = this.loadColumnOrder();
    this.loadData();
  }

  saveColumnVisibility = (columnVisibility: string[]) => {
    const visibility = JSON.stringify(columnVisibility);
    localStorage.setItem('columnSettings__overhauls', visibility);
  };

  private loadColumnVisibility() {
    const item = localStorage.getItem('columnSettings__overhauls');
    if (item) this.columnVisibility = JSON.parse(item);
  }

  saveColumnOrder = (columnOrder: string[]) => {
    localStorage.setItem('columnOrder__overhauls', JSON.stringify(columnOrder));
  };

  private loadColumnOrder() {
    return JSON.parse(localStorage.getItem('columnOrder__overhauls') || '[]');
  }

  //#region text search
  private searchState: State = 'pending';
  get isSearchLoading() {
    return this.searchState === 'pending';
  }

  searchOptions: SearchOption[] = [];
  textSearch = '';

  loadOverhauls() {
    this.state = 'pending';

    fetchPrograms().then(
      action('overhaulsFetchSuccess', (overhaulsResponse) => {
        this.overhauls = overhaulsResponse;
        this.state = 'done';
      }),
      action('overhaulsFetchError', () => {
        this.state = 'error';
      })
    );
  }

  // loadAll
  loadData() {
    this.state = 'pending';
    this.overhauls = undefined;

    fetchPrograms().then(
      action('fetchSuccess', (overhaulsResponse) => {
        this.overhauls = overhaulsResponse;
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
}
