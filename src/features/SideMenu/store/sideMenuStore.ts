import { makeAutoObservable } from 'mobx';
import { Block, NavigationKeys, Section } from '../../DetailedView/types';

export class SideMenuStore {
  switches?: Record<string, boolean>;
  commonBlocks?: Section;
  additionalBlocks?: Record<string, Section>;
  navKeys?: NavigationKeys;
  searchText = '';

  constructor() {
    makeAutoObservable(this);
  }

  init = (commonBlocks: Section, additionalBlocks: Record<string, Section>, navKeys: NavigationKeys) => {
    this.navKeys = navKeys;
    this.commonBlocks = commonBlocks;
    this.additionalBlocks = additionalBlocks;

    this.initSwitches(false);
  };

  clear = () => {
    this.commonBlocks = undefined;
    this.additionalBlocks = undefined;
    this.navKeys = undefined;
    this.switches = undefined;
  };

  initSwitches = (value: boolean) => {
    if (!this.additionalBlocks) return;

    const updatedSwitches: Record<string, boolean> = {};
    Object.entries(this.additionalBlocks).forEach(([key]) => (updatedSwitches[key] = value));

    this.switches = updatedSwitches;
  };

  toggleSwitch = (key: string) => {
    if (!this.switches) return;

    this.switches[key] = !this.switches[key];
  };

  setSearchText = (text: string) => {
    this.searchText = text;

    this.initSwitches(!!text);
  };

  get filteredCommonBlocks() {
    if (this.searchText === '') return this.commonBlocks?.blocks;

    return this.commonBlocks?.blocks?.filter((block: Block) =>
      block.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get filteredAdditionalBlocks() {
    if (this.searchText === '') return this.additionalBlocks;
    if (this.navKeys === undefined) return;

    const filteredAdditionalBlocks: Record<string, Section> = {};

    this.navKeys.forEach((key: string) => {
      if (this.additionalBlocks === undefined) return;

      const filteredBlocks = this.additionalBlocks[key]?.blocks.filter((block: Block) =>
        block.name.toLowerCase().includes(this.searchText.toLowerCase())
      );

      if (filteredBlocks?.length) {
        filteredAdditionalBlocks[key] = {
          ...this.additionalBlocks[key],
          blocks: filteredBlocks,
        };
      }
    });

    return filteredAdditionalBlocks;
  }
}

const sideMenuStoreInstance = new SideMenuStore();

export default sideMenuStoreInstance;
