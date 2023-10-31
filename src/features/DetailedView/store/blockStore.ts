import { action, makeObservable, observable, toJS } from 'mobx';
import { Block, BlockResponse, BlockStore, DetailedViewStore } from '../types';

class BlockStoreImpl implements BlockStore {
  #parentStore: DetailedViewStore;

  id = 0;
  name = '';
  endpoint = '';
  saveEndpoint?: string;
  data?: BlockResponse;
  itemCount?: number;
  isLoading?: boolean;
  isOpen?: boolean;

  constructor(parentStore: DetailedViewStore, block: Block) {
    this.#parentStore = parentStore;
    this.fromJSON(block);

    makeObservable(this, {
      data: observable,
      isOpen: observable,

      updateParams: action,
      removeItem: action,
      fromJSON: action,
    });
  }

  updateParams = (params: Partial<Block>) => {
    for (const key of Object.keys(params)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this[key] = params[key];
    }
  };

  removeItem = (index: number) => {
    if (this.data) {
      this.data.data[index].isDeleted = true;
    }
  };

  fromJSON = (block: Block) => {
    this.id = block.id;
    this.name = block.name;
    this.endpoint = block.endpoint;
    this.saveEndpoint = block.saveEndpoint;
    this.itemCount = block.itemCount;
    this.isLoading = block.isLoading;
    this.isOpen = block.isOpen;
  };

  toJSON = () => {
    return toJS(this.data?.data) || [];
  };
}

export default BlockStoreImpl;
