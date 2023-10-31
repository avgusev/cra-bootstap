import { makeAutoObservable } from 'mobx';

import type { Field } from '../types';

import { modalStoreInstance } from '../../TemplatedModal/store';

export class ViolationFixationStore {
  fields: Record<string, Field> | null = null;
  id: number | null = null;
  modal = modalStoreInstance;

  constructor() {
    makeAutoObservable(this);
  }

  toggleModal = () => {
    if (this.fields) {
      this.modal.openModal('violationFixation', this.fields);
    }
  };

  updateFields = (fields: Record<string, Field>, id: number) => {
    this.fields = fields;
    this.id = id;
  };
}

const violationFixationStoreInstance = new ViolationFixationStore();

export default violationFixationStoreInstance;
