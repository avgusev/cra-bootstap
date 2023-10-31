import { makeAutoObservable } from 'mobx';

import { TMenuItem, TMenuItemGroup } from '../../../menu';

export class SidebarStore {
  isActive = false;
  isSubActive = false;
  activeMenuGroup: TMenuItemGroup | null = null;
  subItems: TMenuItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setActive = (val: boolean) => {
    this.isActive = val;
  };

  close = () => {
    this.isActive = false;
    this.isSubActive = false;
    this.activeMenuGroup = null;
  };

  toggleLinkGroup = (group: TMenuItemGroup) => {
    this.isActive = true;
    const sameGroup = this.activeMenuGroup?.title === group.title;
    this.activeMenuGroup = null;
    if (!sameGroup) {
      this.activeMenuGroup = group;
    }
    if (this.isSubActive) {
      if (sameGroup) {
        this.isSubActive = false;
      } else {
        this.subItems = group.sub;
      }
    } else {
      this.isSubActive = true;
      this.subItems = group.sub;
    }
  };
}

export default new SidebarStore();
