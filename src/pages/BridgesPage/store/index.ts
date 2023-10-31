import { FiltersLayoutStore } from './filtersLayoutStore';
import { PresetStore } from './presetStore';
import { BridgesStore, initialStateFilters } from './bridgesStore';

export type FilterKey = keyof typeof initialStateFilters;

export class RootStore {
  bridgesStore = new BridgesStore(this);
  presetStore = new PresetStore(this);
  filtersLayoutStore = new FiltersLayoutStore(this);

  // get isLoading() {
  //   return this.roadsStore.isLoading;
  // }
}

const store = new RootStore();

export default store;
