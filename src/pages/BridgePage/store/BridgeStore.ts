import { action, computed, makeObservable, observable } from 'mobx';

import { navigation } from '../consts';
import { meta } from '../meta';
import { fetchBridgeById, fetchBlock } from '../api';

import { modalStoreInstance } from '../../../features/TemplatedModal/store';

import type { BlockResponse, Block, Field } from '../../../features/DetailedView/types';
import { Image } from '../../../features/DetailedView';
import { getFileDescriptor } from '../../../features/DetailedView/api';
import { DetailedViewStoreImpl } from '../../../features/DetailedView/store';

export class BridgeStore extends DetailedViewStoreImpl {
  modalfields: Record<string, Field> | null = null;

  images: Image[] = [];

  modal = modalStoreInstance;

  constructor() {
    super();

    this.navigationTemplate = navigation;
    this.meta = meta;

    makeObservable(this, {
      fetchState: observable,
      _fields: observable,
      _visibleBlocks: observable,
      nav: observable,
      modalfields: observable,
      images: observable,

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
      fetchBridgesImages: action,
      updateFields: action,
    });
  }

  get canEdit() {
    return false;
  }

  toggleModal = () => {
    if (this.fields) {
      this.modal.openModal('estimateInfo', this.fields);
    }
  };

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

    fetchBridgeById(String(id)).then(this.updateEntity, () => {
      this.fetchState = 'error';
    });
  };

  fetchBridgesImages = async (ids: string[]) => {
    if (!ids) return;

    const imgs = [];

    for (const id of ids) {
      const res = await getFileDescriptor<Image>(id);
      imgs.push(res);
    }

    this.images = [...imgs];
  };

  updateFields = (fields: Record<string, Field>, id: number) => {
    this.modalfields = fields;
    this.id = id;
  };
}

const bridgeStoreInstance = new BridgeStore();

export default bridgeStoreInstance;
