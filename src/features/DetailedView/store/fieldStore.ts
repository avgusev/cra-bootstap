import { action, makeObservable, observable, toJS } from 'mobx';
import { DetailedViewStore, FieldValue, ResponseField, FieldStore } from '../types';
import { parseLocationMarker } from './editFieldModalStore';

const validateLocation = (value: string) => {
  return parseLocationMarker(value) !== undefined;
};

const validationRules: Record<string, (value: string) => boolean> = {
  LOCATION_START: validateLocation,
};

class FieldStoreImpl implements FieldStore {
  #parentStore: DetailedViewStore;

  value: FieldValue = { value: undefined, isChanged: false };

  isCustom = false;
  id = 0;
  code = '';
  type = 0;
  isMultiple = false;
  isRequired = false;
  isReadonly = true;
  isEntity = false;
  isPaged?: boolean;
  title?: string;
  errorMessage: string | undefined;

  constructor(parentStore: DetailedViewStore, field: ResponseField) {
    this.#parentStore = parentStore;

    this.fromJSON(field);

    makeObservable(this, {
      value: observable,
      fromJSON: action,
      updateValue: action,
    });
  }

  get val() {
    return this.value.value;
  }

  set val(value: FieldValue['value']) {
    this.value = {
      isChanged: true,
      value,
    };
  }

  updateValue = (value: FieldValue['value']) => {
    this.#parentStore.onChangeValues();
    if (Object.hasOwn(validationRules, this.code)) {
      if (!validationRules[this.code](value as string)) {
        this.errorMessage = 'Введите данные в заданном формате';
      } else {
        this.errorMessage = undefined;
      }
    }
    this.val = value;
  };

  toJSON(): ResponseField {
    return {
      value: toJS(this.value),
      isCustom: this.isCustom,
      id: this.id,
      code: this.code,
      type: this.type,
      isMultiple: this.isMultiple,
      isRequired: this.isRequired,
      isReadonly: this.isReadonly,
      isEntity: this.isEntity,
      isPaged: this.isPaged,
      title: this.title,
    };
  }

  fromJSON = (field: ResponseField): void => {
    this.value = field.value;
    this.isCustom = field.isCustom;
    this.id = field.id;
    this.code = field.code;
    this.type = field.type;
    this.isMultiple = field.isMultiple;
    this.isRequired = field.isRequired;
    this.isReadonly = field.isReadonly;
    this.isEntity = field.isEntity;
    this.isPaged = field.isPaged;
    this.title = field.title;
  };
}

export default FieldStoreImpl;
