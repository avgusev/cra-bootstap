import { FiltersLayoutStore } from './filtersLayoutStore';
import { PresetStore } from './presetStore';
import { RoadsStore, initialStateFilters } from './roadsStore';

export type FilterKey = keyof typeof initialStateFilters;

export class RootStore {
  roadsStore = new RoadsStore(this);
  presetStore = new PresetStore(this);
  filtersLayoutStore = new FiltersLayoutStore(this);

  // get isLoading() {
  //   return this.roadsStore.isLoading;
  // }
}

const store = new RootStore();

export default store;
