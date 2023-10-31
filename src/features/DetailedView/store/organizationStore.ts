import { makeAutoObservable } from 'mobx';
import { fetchOrganizationMiniPassport } from '../api';
import type { Field } from '../types';

import { modalStoreInstance } from '../../TemplatedModal/store';

export class OrganizationStore {
  ownerFields: Record<string, Field> | null = null;
  ownerId: number | null = null;
  modal = modalStoreInstance;

  constructor() {
    makeAutoObservable(this);
  }

  getOrganizationMiniPassport = (id: number) => {
    fetchOrganizationMiniPassport(id).then((data) => {
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
    if (this.ownerFields) {
      this.modal.openModal('organization', this.ownerFields);
    }
  };

  updateFields = (fields: Record<string, Field>, ownerId: number) => {
    this.ownerFields = fields;
    this.ownerId = ownerId;
  };
}

const organizationStoreInstance = new OrganizationStore();

export default organizationStoreInstance;
