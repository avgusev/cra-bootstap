import { OverhaulsStore } from './overhaulsStore';

export class RootStore {
  overhaulsStore = new OverhaulsStore(this);
}

const store = new RootStore();

export default store;
