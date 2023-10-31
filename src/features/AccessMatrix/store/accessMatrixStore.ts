import { makeAutoObservable, action } from 'mobx';

import type { AccessMatrix, AccessMatrixKey } from '../types';
import { fetchAccessMatrix } from '../api';
import { defaultAccessMatrix } from '../defaultAccessMatrix';

export class AccessMatrixStore {
  accessMatrix: AccessMatrix = defaultAccessMatrix;
  fetchState: 'pending' | 'done' | 'error' = 'pending';

  constructor() {
    makeAutoObservable(this);
  }

  doesHaveAccess = (matrixKey: AccessMatrixKey): boolean => {
    return this.accessMatrix?.[matrixKey] || false;
  };

  doesHaveAccessAtLeastOne = (keys: AccessMatrixKey[]): boolean => {
    return keys.some((matrixKey) => this.doesHaveAccess(matrixKey));
  };

  getAccessMatrix = async () => {
    this.fetchState = 'pending';

    fetchAccessMatrix().then(
      action((accessMatrix) => {
        this.accessMatrix = accessMatrix;
        this.accessMatrix.menu_desktop = true;
        this.accessMatrix.menu_notifications = true;
        this.accessMatrix.menu_account_page = true;
        this.accessMatrix.menu_newsletter = true;
        this.fetchState = 'done';
      }),
      action(() => {
        this.fetchState = 'error';
      })
    );
  };

  // TODO: internal state leak, need to make model SOLID-friendly
  setDone = () => {
    this.fetchState = 'done';
  };
}

const accessMatrixStoreInstance = new AccessMatrixStore();

if (import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window['accessMatrixStoreInstance'] = accessMatrixStoreInstance;
}

export default accessMatrixStoreInstance;
