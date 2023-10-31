/* eslint-disable @typescript-eslint/no-empty-function */

import { runInAction } from 'mobx';
import { accessMatrixStoreInstance } from '../../AccessMatrix/store';

import { modalStoreInstance } from '../../../features/TemplatedModal/store';

import {
  Block,
  BlockStore,
  ChangeElementInfo,
  CommonInfo,
  DetailedViewStore,
  FetchStateUnion,
  FieldStore,
  Meta,
  NavigationStruct,
  Section,
  VisibleBlock,
} from '../types';
import { confirmModalStoreInstance, FieldStoreImpl } from './';
import BlockStoreImpl from './blockStore';
import { EditFieldModalStore } from './editFieldModalStore';

import { getHistoryOfChanges } from '../api';

abstract class DetailedViewStoreImpl implements DetailedViewStore {
  protected accessMatrixStore = accessMatrixStoreInstance;
  protected confirmModalStore = confirmModalStoreInstance;
  public editFieldModalStore: EditFieldModalStore = new EditFieldModalStore(this);

  id: number | null = null;
  hash: string | null = null;
  isAuthor = false;
  hasGeometry = false;
  fetchState: FetchStateUnion = 'pending';
  _fields: FieldStore[] = [];
  _visibleBlocks: VisibleBlock[] = [];
  nav: Record<string, Section> = {};

  navigationTemplate: NavigationStruct = {};
  meta: Meta = {};

  editMode = false;
  isChanged = false;

  modal = modalStoreInstance;
  modalChangefields: ChangeElementInfo[] = [];
  totalCount?: number;

  get fields() {
    return this._fields.reduce((p: Record<string, FieldStore>, field) => {
      p[field.code] = field;
      return p;
    }, {});
  }

  get commonSection() {
    return this.nav.common;
  }

  get sections() {
    const { common, ...blocks } = this.nav;
    return blocks;
  }

  get saveEndpoints() {
    return Object.values(this.navigationTemplate)
      .map((el) => el.blocks)
      .flat()
      .map((el) => el.saveEndpoint)
      .filter((el) => el !== undefined) as string[];
  }

  toggleEditMode = () => {
    if (this.editMode && this.isChanged) {
      this.confirmModalStore.openModal().then((isConfirmed: boolean) => {
        if (isConfirmed) {
          runInAction(() => {
            this.editMode = false;
            this.isChanged = false;
          });
          this.fetchEntity(this.id as number);
        } else {
          runInAction(() => {
            this.editMode = true;
          });
        }
      });
      return;
    }

    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.isChanged = false;
      this.fetchEntity(this.id as number);
    } else {
      const nav: Record<string, Section> = {};
      for (const [key, value] of Object.entries(this.navigationTemplate)) {
        const hasVisibleBlocks = value.blocks.some((block) => block.saveEndpoint);
        if (!hasVisibleBlocks) continue;
        nav[key] = {
          ...value,
          blocks: value.blocks.map(
            (b) => new BlockStoreImpl(this, { ...b, itemCount: undefined, isLoading: false, isOpen: false })
          ),
        };
      }
      this.nav = nav;
    }
  };

  onChangeValues = () => {
    this.isChanged = true;
  };

  get canEdit() {
    return false;
  }

  updateCommonSectionBlockFields(index: number, param: Partial<Block>) {
    if (!this.commonSection) return;

    const commonBlocksTarget = this.nav.common.blocks[index];
    commonBlocksTarget.updateParams(param);
  }

  updateBlockFields = (key: string, index: number, param: Partial<Block>) => {
    if (!this.sections) return;
    if (key === 'common') {
      this.updateCommonSectionBlockFields(index, param);
      return;
    }

    const block = this.nav[key].blocks[index];
    block.updateParams(param);
  };

  updateBlock = (key: string, index: number, isOpen = false, block: Block) => {};

  updateEntity = (data: CommonInfo) => {
    this.id = data.id;
    this.hash = data.hash;
    this.isAuthor = data.isAuthor;
    this._fields = data.fields.map((field) => new FieldStoreImpl(this, field));
    this.hasGeometry = data.hasGeometry;
    this._visibleBlocks = data.visibleBlocks;

    const visibleBlocks: Record<string, number> =
      data.visibleBlocks?.reduce((prev, cur) => {
        prev[cur.id] = cur.itemCount;
        return prev;
      }, {} as Record<string, number>) || {};

    const nav: Record<string, Section> = {};

    for (const [key, value] of Object.entries(this.navigationTemplate)) {
      const hasVisibleBlocks = value.blocks.some((block) => visibleBlocks[block.id]);

      if (!hasVisibleBlocks) continue;

      nav[key] = {
        ...value,
        blocks: value.blocks
          .filter((block) => visibleBlocks[block.id])
          .map(
            (b) => new BlockStoreImpl(this, { ...b, itemCount: visibleBlocks[b.id], isLoading: false, isOpen: false })
          ),
      };
    }

    this.nav = nav;

    this.fetchState = 'done';
  };

  fetchEntity = (id: number | string) => {};

  saveEntity = () => Promise.resolve();

  get blocks() {
    let blocks: BlockStore[] = [];
    for (const val of Object.values(this.nav)) {
      blocks = [...blocks, ...val.blocks];
    }
    return blocks;
  }

  updateChangeModalFields = (fields: ChangeElementInfo[], id: string) => {
    this.modalChangefields = fields;
    this.id = Number(id);
  };

  toggleHistoryOfChangesModal = (id: string) => {
    getHistoryOfChanges(id).then((data) => {
      const totalCount = data?.totalCount;
      const changeFields = data?.data.map((change) => change);
      this.totalCount = totalCount;
      this.updateChangeModalFields(changeFields, id);
      this.modal.openModal('historyOfChanges', this.fields, false, this.modalChangefields, this.totalCount);
    });
  };
}

export default DetailedViewStoreImpl;
