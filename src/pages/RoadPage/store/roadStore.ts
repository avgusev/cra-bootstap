import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx';

import { navigation } from '../consts';
import { meta } from '../meta';
import { fetchBlock, fetchRoad, saveRoad } from '../api';

import type { BlockResponse, Block, SaveStruct } from '../../../features/DetailedView/types';
import { DetailedViewStoreImpl } from '../../../features/DetailedView/store';

export class RoadStore extends DetailedViewStoreImpl {
  constructor() {
    super();

    this.navigationTemplate = navigation;
    this.meta = meta;

    makeObservable(this, {
      fetchState: observable,
      _fields: observable,
      _visibleBlocks: observable,
      nav: observable,
      editMode: observable,

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
    return this.accessMatrixStore.doesHaveAccess('roads_card__edit');
  }

  override updateBlock = (key: string, index: number, isOpen = false, block: Block) => {
    if (isOpen || block.data) {
      this.updateBlockFields(key, index, { isOpen: !isOpen });
    } else {
      this.updateBlockFields(key, index, { isLoading: true });

      fetchBlock(String(this.id), block.endpoint).then((data: BlockResponse) => {
        if (Object.hasOwn(this.meta, block.endpoint)) {
          data.defaultMetadata = data.metadata;
          data.metadata = this.meta[block.endpoint];
        }
        this.updateBlockFields(key, index, { isLoading: false, isOpen: !isOpen, data });
      });
    }
  };

  override fetchEntity = (id: number | string) => {
    if (!id) return;

    this.fetchState = 'pending';

    this.hash = null;
    this.isAuthor = false;
    this._fields = [];
    this.hasGeometry = false;
    this._visibleBlocks = [];
    this.nav = {};

    fetchRoad(String(id))
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

  override saveEntity = async () => {
    const hasErrors = !this._fields.every((f) => f.errorMessage === undefined);
    if (hasErrors) {
      console.error('Form contains fields with errors');
      const errorEl = document.querySelector('.edit-error');
      errorEl?.scrollIntoView({ block: 'center', inline: 'nearest' });
      return;
    }

    const blocks = this.blocks.filter((b) => b.data);
    const saveEndpoints = this.saveEndpoints.reduce((prev, cur) => {
      return { ...prev, [cur]: blocks.find((b) => b.saveEndpoint === cur)?.data?.data || [] };
    }, {} as Record<string, BlockResponse['data']>);

    const saveStruct: SaveStruct = {
      id: this.id as number,
      hash: this.hash as string,
      fields: toJS(this._fields),
      ...saveEndpoints,
    };
    runInAction(() => {
      this.editMode = false;
      this.fetchState = 'pending';
    });
    const data = await saveRoad(saveStruct);
    console.log('data saved!', data);
    this.fetchEntity(this.id as number);
  };
}

const roadStoreInstance = new RoadStore();

if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window['roadStoreInstance'] = roadStoreInstance;
}

export default roadStoreInstance;
