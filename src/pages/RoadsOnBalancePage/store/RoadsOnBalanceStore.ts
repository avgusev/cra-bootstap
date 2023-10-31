import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { navigation } from '../consts';
import { meta } from '../meta';
import { fetchRoadOnBalanceById, fetchBlock } from '../api';

import type { BlockResponse, Block } from '../../../features/DetailedView/types';

import { DetailedViewStoreImpl } from '../../../features/DetailedView/store';

export class RoadsOnBalanceStore extends DetailedViewStoreImpl {
  constructor() {
    super();

    this.navigationTemplate = navigation;
    this.meta = meta;

    makeObservable(this, {
      fetchState: observable,
      _fields: observable,
      _visibleBlocks: observable,
      nav: observable,

      fields: computed,
      commonSection: computed,
      sections: computed,
      saveEndpoints: computed,

      toggleEditMode: action,
      onChangeValues: action,
      updateCommonSectionBlockFields: action,
      updateBlockFields: action,
      updateBlock: action,
      updateEntity: action,
      fetchEntity: action,
    });
  }

  get canEdit() {
    return false;
  }

  override updateBlock = (key: string, index: number, isOpen = false, block: Block) => {
    if (isOpen || block.data) {
      this.updateBlockFields(key, index, { isOpen: !isOpen });
    } else {
      this.updateBlockFields(key, index, { isLoading: true });
      fetchBlock(String(this.id), block.endpoint).then((data: BlockResponse) => {
        if (Object.hasOwn(this.meta, block.endpoint)) {
          data.metadata = this.meta[block.endpoint];
        }
        this.updateBlockFields(key, index, { isLoading: false, isOpen: !isOpen, data });
      });
    }
  };

  override fetchEntity = (id: number | string) => {
    if (!id) return;

    this.hash = null;
    this.isAuthor = false;
    this._fields = [];
    this.hasGeometry = false;
    this._visibleBlocks = [];

    fetchRoadOnBalanceById(String(id))
      .then(this.updateEntity, () => {
        runInAction(() => {
          this.fetchState = 'error';
        });
      })
      .then(() => {
        runInAction(() => {
          this.fetchState = 'done';
        });
      });
  };
}

const roadsOnBalanceStoreInstance = new RoadsOnBalanceStore();

export default roadsOnBalanceStoreInstance;
