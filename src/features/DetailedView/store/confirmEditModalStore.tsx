import { reaction, makeAutoObservable, runInAction } from 'mobx';

export class ConfirmModalStore {
  isOpened = false;
  isConfirmed: boolean | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  confirm = () => {
    this.isConfirmed = true;
  };

  reject = () => {
    this.isConfirmed = false;
  };

  openModal = (): Promise<boolean> => {
    this.isOpened = true;
    return new Promise((resolve) => {
      const dispose = reaction(
        () => this.isConfirmed,
        (isConfirmed) => {
          resolve(isConfirmed === null || !isConfirmed ? false : true);
          runInAction(() => {
            this.isConfirmed = null;
            this.isOpened = false;
          });
          dispose();
        }
      );
    });
  };
}

const confirmModalStoreInstance = new ConfirmModalStore();

export default confirmModalStoreInstance;
