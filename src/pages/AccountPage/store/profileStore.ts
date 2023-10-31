import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx';

import { navigation } from '../consts';
import { meta } from '../meta';
import { fetchProfile, saveProfile } from '../api';

import type { BlockResponse, SaveProfile } from '../../../features/DetailedView/types';
import { DetailedViewStoreImpl } from '../../../features/DetailedView/store';

export class ProfileStore extends DetailedViewStoreImpl {
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
    // return this.accessMatrixStore.doesHaveAccess('user_accounts_card__edit');
    return false; // TODO
  }

  override fetchEntity = () => {
    this.fetchState = 'pending';

    this.hash = null;
    this.isAuthor = false;
    this._fields = [];
    this.hasGeometry = false;
    this._visibleBlocks = [];
    this.nav = {};

    fetchProfile()
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
    const blocks = this.blocks.filter((b) => b.data);
    const saveEndpoints = this.saveEndpoints.reduce((prev, cur) => {
      return { ...prev, [cur]: blocks.find((b) => b.saveEndpoint === cur)?.data?.data || [] };
    }, {} as Record<string, BlockResponse['data']>);

    const profile: SaveProfile = {
      fields: toJS(this._fields),
      ...saveEndpoints,
    };
    runInAction(() => {
      this.editMode = false;
      this.fetchState = 'pending';
    });
    const data = await saveProfile(profile);
    console.log('data saved!', data);
    this.fetchEntity();
  };
}

const profileStoreInstance = new ProfileStore();

if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window['profileStoreInstance'] = profileStoreInstance;
}

export default profileStoreInstance;
