import { FiltersLayoutStore } from './filtersLayoutStore';
import { PresetStore } from './presetStore';
import { AccidentsStore, initialStateFilters } from './accidentsStore';

export type FilterKey = keyof typeof initialStateFilters;

export class RootStore {
  accidentsStore = new AccidentsStore(this);
  presetStore = new PresetStore(this);
  filtersLayoutStore = new FiltersLayoutStore(this);

  // get isLoading() {
  //   return this.roadsStore.isLoading;
  // }
}

const store = new RootStore();

export default store;
