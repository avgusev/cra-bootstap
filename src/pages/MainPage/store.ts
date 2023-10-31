import { makeAutoObservable } from 'mobx';
import { fetchSearchOptions, RoadsRequest, SearchOption } from '../RoadsPage/api';

export class MainStore {
  isSearchLoading = false;
  searchOptions: SearchOption[] = [];
  textSearch = '';

  _request: RoadsRequest = {
    textSearch: '',
    filters: {},
    order: { colName: 'road_name', colSortDirection: 0 },
    paging: { start: 0, limit: 20 },
  };

  constructor() {
    makeAutoObservable(this);
  }

  startSearchLoading() {
    this.isSearchLoading = true;
  }

  stopSearchLoading() {
    this.isSearchLoading = false;
  }

  setSearchOptions(options: SearchOption[]) {
    this.searchOptions = options;
  }

  loadOptions = () => {
    this.startSearchLoading();
    this._request.textSearch = this.textSearch;
    fetchSearchOptions(this._request).then((options) => {
      this.setSearchOptions(options);
      this.stopSearchLoading();
    });
  };

  setTextSearch(textSearch: string) {
    this.textSearch = textSearch;
    this.loadOptions();
  }
}

const mainStore = new MainStore();
export default mainStore;
