import { makeAutoObservable } from 'mobx';
import { fetchAgglomerationMiniPassport } from '../api';
import type { Field } from '../types';

import { modalStoreInstance } from '../../TemplatedModal/store';

export class AgglomerationStore {
  fields: Record<string, Field> | null = null;
  id: number | null = null;
  modal = modalStoreInstance;

  constructor() {
    makeAutoObservable(this);
  }

  getAgglomerationMiniPassport = (id: number) => {
    fetchAgglomerationMiniPassport(id).then((data) => {
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
      this.modal.openModal('agglomeration', this.fields);
    }
  };

  updateFields = (fields: Record<string, Field>, id: number) => {
    this.fields = fields;
    this.id = id;
  };
}

const agglomerationStoreInstance = new AgglomerationStore();

export default agglomerationStoreInstance;
