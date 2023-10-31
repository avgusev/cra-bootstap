import { makeAutoObservable } from 'mobx';
import { RootStore } from '.';
import { FiltersRequest } from '../api';

export type FilterStatePreset = {
  name: string;
  filter: FiltersRequest['filters'];
};

export class PresetStore {
  rootStore: RootStore;

  showSaveFilterModal = false;
  presetInputValue = '';
  presetError?: string;
  presets: FilterStatePreset[] = [];
  activePreset?: string;
  showAllPresets = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setShowSaveFilterModal(value: boolean) {
    this.showSaveFilterModal = value;
    if (!value) {
      this.presetInputValue = '';
      this.presetError = undefined;
    }
  }

  setPresetInputValue(value: string) {
    this.presetInputValue = value;
    this.presetError = undefined;
  }

  setShowAllPresets(value: boolean) {
    this.showAllPresets = value;
  }

  loadPresets() {
    this.presets = JSON.parse(localStorage.getItem('savedFilters__bridges') || '[]');
  }

  savePresets() {
    localStorage.setItem('savedFilters__bridges', JSON.stringify(this.presets));
  }

  addPreset() {
    const name = this.presetInputValue;

    if (name.length < 1) {
      this.presetError = 'Введите название для фильтрации';
      return;
    }

    if (this.presets.some((preset) => preset.name === name)) {
      this.presetError = 'Фильтрация с таким названием уже существует';
      return;
    }

    // const newPresets = [{ name, filter: request.filters }, ...this.presets];
    // localStorage.setItem('savedFilters__bridges', JSON.stringify(newPresets));
    this.presets.unshift({ name, filter: this.rootStore.bridgesStore.requestFilters });
    this.savePresets();

    // this.setPresets(newPresets);
    // this.setShowSaveFilterModal(false);
    // this.setActivePreset(name);
    // this.presets = newPresets;
    this.showSaveFilterModal = false;
    this.activePreset = name;
  }

  activatePreset(name: string) {
    const preset = this.presets.find((preset) => preset.name === name);
    if (!preset?.filter) return;
    this.activePreset = name;
    this.rootStore.bridgesStore.stateFilters = preset.filter;
    this.rootStore.bridgesStore.loadFilter();
  }

  removeActivePreset(name?: string) {
    name ||= this.activePreset;
    if (name === undefined) return;

    const index = this.presets.findIndex((preset) => preset.name === name);
    // const newPresets = [...this.presets.slice(0, index), ...this.presets.slice(index + 1)];
    // localStorage.setItem('savedFilters__bridges', JSON.stringify(newPresets));

    this.presets.splice(index, 1);
    this.savePresets();
    // this.setPresets(newPresets);
    // this.setActivePreset();
    // this.presets = newPresets;
    this.activePreset = undefined;
    this.rootStore.bridgesStore.clearFilter();
  }

  get showPresets() {
    return this.showAllPresets || this.presets.length < 5 ? this.presets : this.presets.slice(0, 3);
  }
}
