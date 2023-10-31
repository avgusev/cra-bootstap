import { makeAutoObservable } from 'mobx';

import type { ChangeElementInfo, Field } from '../../DetailedView/types';
import type { TemplateUnion } from '../templates';

export class ModalStore {
  template: TemplateUnion = 'organization';
  fields: Record<string, Field> | null = null;
  isOpened = false;

  withFooter?: boolean = true;

  changeFileds?: ChangeElementInfo[];
  totalCount?: number;

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (
    template: TemplateUnion,
    fields: Record<string, Field>,
    withFooter = true,
    changeFields?: ChangeElementInfo[],
    totalCount?: number
  ) => {
    this.template = template;
    this.fields = fields;
    this.isOpened = true;

    this.withFooter = withFooter;

    if (changeFields) {
      this.changeFileds = changeFields;
    }

    if (totalCount) {
      this.totalCount = totalCount;
    }
  };

  closeModal = () => {
    this.isOpened = false;
  };
}

const modalStoreInstance = new ModalStore();

export default modalStoreInstance;
