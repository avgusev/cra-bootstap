import { FormEvent } from 'react';
import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import { BlockData } from '../components/EditModal/types';
import { BlockMetadata, BlockStore, DetailedViewStore, FieldValue } from '../types';
import { parse } from 'date-fns';

function valueIsFalsy(value: string | number | undefined) {
  return value === '' || value === undefined || isNaN(value as number);
}

export function decapitalize(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function parseLocationMarker(value: string | undefined) {
  if (value) {
    const valueArr = value.split('+');
    if (valueArr.length === 2 && valueArr[1].length === 3 && valueArr[0].length >= 1) {
      try {
        const parsedArr = valueArr.map((v) => parseInt(v, 10)).join('.');
        return parseFloat(parsedArr);
      } catch (_) {
        return undefined;
      }
    }
  }
  return undefined;
}

export function lengthToLocationMarker(value: number) {
  const integer = Math.floor(value).toString();
  const strungNumber = value.toString();
  let dec = '';
  if (integer.length === strungNumber.length) {
    dec = '0';
  } else {
    dec = strungNumber.substring(integer.length + 1);
  }
  if (dec.length > 3) {
    dec = dec.slice(0, 3);
  }
  if (dec.length < 3) {
    const _t = Array.from(dec);
    _t.length = 3;
    dec = _t.fill('0', dec.length).join('');
  }
  return `${integer}+${dec}`;
}

enum ErrorMessages {
  StartGteFinish = 'Начало участка не может быть больше или равно концу участка',
  StartLtRoadStart = 'Начало участка не может быть меньше начала дороги',
  LengthGteRoadLength = 'Протяженность участка не может быть больше протяженности дороги',
  LocationLtRoadStart = 'Местоположение не может быть меньше начала дороги',
  LocationGtRoadEnd = 'Местоположение не может быть больше конца дороги',
  RequiredFieldsIsEmpty = 'Все обязательные поля должны быть заполнены',
  StartDateGtToday = 'Дата начала не может быть больше текущей даты',
  FinishDateGtStartDate = 'Дата окончания не может быть меньше даты начала',
}

export class EditFieldModalStore {
  title = '';
  isOpened = false;
  isNew = false;
  block: BlockStore | undefined;
  id: number | undefined;
  data: BlockData[] = [];
  newData: BlockData = {} as BlockData;
  errorMessage: string | undefined;
  parentStore: DetailedViewStore;

  constructor(parentStore: DetailedViewStore) {
    this.parentStore = parentStore;

    makeObservable(this, {
      isOpened: observable,
      id: observable,
      title: observable,
      newData: observable,
      errorMessage: observable,

      updateValue: action,
      clearErrorMessage: action,
      syncMarkersAndLength: action,
      validate: action,
      openModal: action,
      closeModal: action,
      saveData: action,
    });
  }

  updateValue = (key: string, value: FieldValue['value']) => {
    if (!this.newData[key]) {
      this.newData[key] = { isChanged: true };
    }
    this.newData[key].isChanged = true;
    this.newData[key].value = value;
    this.validate();
    this.syncMarkersAndLength(key);
  };

  clearErrorMessage = (condition: ErrorMessages) => {
    if (this.errorMessage === condition) {
      this.errorMessage = undefined;
    }
  };

  syncMarkersAndLength = (editedField: string) => {
    const startField = this.newData['start'];
    const finishField = this.newData['finish'];
    const lengthField = this.newData['length'];

    const startValue = parseLocationMarker(startField?.value as string);
    const finishValue = parseLocationMarker(finishField?.value as string);
    if (editedField === 'start') {
      if (valueIsFalsy(finishValue) && !valueIsFalsy(lengthField.value as number) && !valueIsFalsy(startValue)) {
        const lengthValue = lengthField.value as number;
        this.newData['finish'].isChanged = true;
        this.newData['finish'].value = lengthToLocationMarker(lengthValue - (startValue as number));
      }
      if (!valueIsFalsy(startValue) && !valueIsFalsy(finishValue)) {
        this.newData['length'].isChanged = true;
        const newLengthVal = ((finishValue as number) * 1000 - (startValue as number) * 1000) / 1000;
        if (newLengthVal > 0) {
          this.newData['length'].value = newLengthVal;
        }
      }
    }
    if (editedField === 'finish') {
      if (valueIsFalsy(startValue) && !valueIsFalsy(lengthField.value as number) && !valueIsFalsy(finishValue)) {
        const lengthValue = lengthField.value as number;
        this.newData['start'].isChanged = true;
        this.newData['start'].value = lengthToLocationMarker(lengthValue - (finishValue as number));
      }
      if (!valueIsFalsy(startValue) && !valueIsFalsy(finishValue)) {
        this.newData['length'].isChanged = true;
        const newLengthVal = ((finishValue as number) * 1000 - (startValue as number) * 1000) / 1000;
        if (newLengthVal > 0) {
          this.newData['length'].value = newLengthVal;
        }
      }
    }
    if (editedField === 'length') {
      if (!valueIsFalsy(lengthField.value as number) && !valueIsFalsy(startValue)) {
        const lengthValue = lengthField.value as number;
        this.newData['finish'].isChanged = true;
        this.newData['finish'].value = lengthToLocationMarker(lengthValue + (startValue as number));
      }
      if (valueIsFalsy(startValue) && !valueIsFalsy(lengthField.value as number) && !valueIsFalsy(finishValue)) {
        const lengthValue = lengthField.value as number;
        this.newData['start'].isChanged = true;
        this.newData['start'].value = lengthToLocationMarker(lengthValue - (finishValue as number));
      }
    }
  };

  validate = () => {
    const meta = this.block?.data?.defaultMetadata as BlockMetadata[];

    const requiredFieldsIsNotEmpty = meta.every((metaElement) => {
      if (metaElement.isRequired) {
        const val = this.newData[decapitalize(metaElement.name)].value;
        return val !== undefined && val !== null && val !== '';
      }
      return true;
    });

    if (!requiredFieldsIsNotEmpty) {
      this.errorMessage = ErrorMessages.RequiredFieldsIsEmpty;
    } else {
      this.clearErrorMessage(ErrorMessages.RequiredFieldsIsEmpty);
    }

    const startField = this.newData['start'];
    const finishField = this.newData['finish'];
    const startRoad = this.parentStore.fields['LOCATION_START'];
    const endRoad = this.parentStore.fields['LOCATION_END'];
    const lengthField = this.newData['length'];
    const lengthRoad = this.parentStore.fields['LENGTH_POPIKETNO'];
    const locationField = this.newData['location'];
    const dateStart = this.newData['dateStart'];
    const dateFinish = this.newData['dateFinish'];
    if (startField && finishField) {
      const startValue = parseLocationMarker(startField.value as string) as number;
      const finishValue = parseLocationMarker(finishField.value as string) as number;
      if (!valueIsFalsy(startValue) && !valueIsFalsy(finishValue)) {
        if (startValue >= finishValue) {
          this.errorMessage = ErrorMessages.StartGteFinish;
        } else {
          this.clearErrorMessage(ErrorMessages.StartGteFinish);
        }
      }
      if (startRoad && startRoad.val !== undefined) {
        const startRoadVal = parseLocationMarker(startRoad.val as string) as number;
        if (!valueIsFalsy(startValue) && !valueIsFalsy(startRoadVal)) {
          if (startValue < startRoadVal) {
            this.errorMessage = ErrorMessages.StartLtRoadStart;
          } else {
            this.clearErrorMessage(ErrorMessages.StartLtRoadStart);
          }
        }
      }
    }
    if (lengthField && lengthRoad) {
      const lengthFieldValue = lengthField.value as number;
      const lengthRoadValue = lengthRoad.val as number;
      if (!valueIsFalsy(lengthFieldValue) && !valueIsFalsy(lengthRoadValue)) {
        if (lengthFieldValue > lengthRoadValue) {
          this.errorMessage = ErrorMessages.LengthGteRoadLength;
        } else {
          this.clearErrorMessage(ErrorMessages.LengthGteRoadLength);
        }
      }
    }
    if (locationField && startRoad) {
      const locationFieldValue = parseLocationMarker(locationField.value as string) as number;
      const startRoadValue = parseLocationMarker((startRoad.val as string) || '0+000') as number;
      if (!valueIsFalsy(locationFieldValue)) {
        if (locationFieldValue < startRoadValue) {
          this.errorMessage = ErrorMessages.LocationLtRoadStart;
        } else {
          this.clearErrorMessage(ErrorMessages.LocationLtRoadStart);
        }
      }
    }
    if (locationField && endRoad) {
      const locationFieldValue = parseLocationMarker(locationField.value as string) as number;
      const endRoadValue = parseLocationMarker(endRoad.val as string) as number;
      if (!valueIsFalsy(locationFieldValue)) {
        if (locationFieldValue > (endRoadValue as number)) {
          this.errorMessage = ErrorMessages.LocationGtRoadEnd;
        } else {
          this.clearErrorMessage(ErrorMessages.LocationGtRoadEnd);
        }
      }
    }
    if (locationField && lengthRoad) {
      const startRoadValue = parseLocationMarker((startRoad.val as string) || '0+000') as number;
      const locationFieldValue = parseLocationMarker(locationField.value as string) as number;
      const lengthRoadValue = lengthRoad.val as number;
      const endRoadValue = lengthRoadValue ? lengthRoadValue - startRoadValue : undefined;
      if (!valueIsFalsy(endRoadValue) && !valueIsFalsy(locationFieldValue)) {
        if (locationFieldValue > (endRoadValue as number)) {
          this.errorMessage = ErrorMessages.LocationGtRoadEnd;
        } else {
          this.clearErrorMessage(ErrorMessages.LocationGtRoadEnd);
        }
      }
    }
    if (dateStart && dateStart.value) {
      const startDateValue = parse(dateStart.value as string, 'dd.MM.yyyy', new Date());
      if (startDateValue > new Date()) {
        this.errorMessage = ErrorMessages.StartDateGtToday;
      } else {
        this.clearErrorMessage(ErrorMessages.StartDateGtToday);
      }
      if (dateFinish && dateFinish.value) {
        const finishDateValue = parse(dateFinish.value as string, 'dd.MM.yyyy', new Date());
        if (startDateValue >= finishDateValue) {
          this.errorMessage = ErrorMessages.FinishDateGtStartDate;
        } else {
          this.clearErrorMessage(ErrorMessages.FinishDateGtStartDate);
        }
      }
    }
  };

  openModal = (title: string, isNew: boolean, block: BlockStore, id: number | undefined) => {
    this.title = title;
    this.isNew = isNew;
    this.isOpened = true;
    this.block = block;
    this.id = id;
    this.data = toJS(block.data?.data) as BlockData[];
    if (isNew) {
      const meta = this.block.data?.defaultMetadata as BlockMetadata[];
      this.newData = meta
        .filter((el) => el.title)
        .reduce(
          (prev, cur) => {
            return { ...prev, [decapitalize(cur.name)]: { isChanged: true } };
          },
          { isNew: true, isDeleted: false } as BlockData
        );
    } else {
      this.newData = this.data.find((el) => el.id === id) as BlockData;
    }
  };

  saveData = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    this.validate();

    console.log('Error message', this.errorMessage);

    if (this.errorMessage) return;
    if (this.isNew) {
      runInAction(() => {
        if (this.block?.data) {
          this.block.data.data = [...this.block.data.data, toJS(this.newData)];
        }
      });
    } else {
      if (this.block && this.block.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const indx = this.block.data.data.findIndex((el: any) => el.id === this.id);
        this.block.data.data[indx] = toJS(this.newData);
      }
    }

    this.closeModal();
  };

  closeModal = () => {
    this.id = undefined;
    this.title = '';
    this.isNew = false;
    this.block = undefined;
    this.data = [];
    this.newData = {} as BlockData;
    this.errorMessage = undefined;

    this.isOpened = false;
  };
}
