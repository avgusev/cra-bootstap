import { makeAutoObservable } from 'mobx';
import { fetchRegionMiniPassport } from '../api';
import type { Field } from '../types';

import { modalStoreInstance } from '../../TemplatedModal/store';

export class RegionStore {
  fields: Record<string, Field> | null = null;
  id: number | null = null;
  modal = modalStoreInstance;

  constructor() {
    makeAutoObservable(this);
  }

  getRegionMiniPassport = (id: number) => {
    fetchRegionMiniPassport(id).then((data) => {
      const map: Record<string, Field> = {};
      const fields = data?.fields.reduce((p, field) => {
        p[field.code] = field;
        p[field.code].val = field.value.value;
        return p;
      }, map);

      this.updateFields(fields, id);
      this.toggleModal();
    });
  };

  toggleModal = () => {
    if (this.fields) {
      this.modal.openModal('region', this.fields);
    }
  };

  updateFields = (fields: Record<string, Field>, id: number) => {
    this.fields = fields;
    this.id = id;
  };
}

const regionStoreInstance = new RegionStore();

export default regionStoreInstance;
