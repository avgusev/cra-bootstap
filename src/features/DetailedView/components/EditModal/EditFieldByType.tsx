import { format, parse } from 'date-fns';
import { observer } from 'mobx-react-lite';

import SkdfDatePicker from '../../../../components/DatePicker';
import { decapitalize } from '../../store/editFieldModalStore';
import { BlockMetadata, ValueElement } from '../../types';
import { FieldType } from '../EditMode/types';
import { DefaultField } from './DefaultField';
import MultiSelect from './MultiSelect';
import RelativeEntity from './RelativeEntity';
import SingleSelect from './SingleSelect';

import type { EditFieldModalStore } from '../../store';

type EditFieldByTypeProps = {
  meta: BlockMetadata;
  store: EditFieldModalStore;
};

const EditFieldByType = ({ meta, store }: EditFieldByTypeProps) => {
  const { newData, updateValue } = store;

  const type = meta.type as unknown as FieldType;
  const value = newData[decapitalize(meta.name)]?.value;
  let d_value: Date | null = null;
  const name = decapitalize(meta.name);

  const locationMarkerCodes = ['START', 'FINISH'];

  // TODO: metadata monkey patch
  if (meta.title === 'Протяженность, м') {
    meta.title = 'Полная длина, м';
  }

  if (type === FieldType.Date && value) {
    d_value = parse(value as string, 'dd.MM.yyyy', new Date('Sun Dec 1 2022 00:00:00 GMT+0300'));
  }

  if (type === FieldType.Date && meta.isRequired && !value) {
    updateValue(name, format(new Date(), 'dd.MM.yyyy'));
  }

  switch (type) {
    case FieldType.Text: {
      if (locationMarkerCodes.includes(meta.code)) {
        return (
          <>
            <div className="form-label">
              {meta.title} {meta.isRequired ? <sup className="text-danger">*</sup> : null}
            </div>
            <input
              className="form-control form-control-sm"
              type="text"
              pattern="[0-9]+\+[0-9]{3}"
              value={value as string}
              onChange={(e) => updateValue(name, e.target.value)}
              required={meta.isRequired}
              title="Введите значение в формате 0+000"
            />
          </>
        );
      }
      return (
        <>
          <div className="form-label">
            {meta.title} {meta.isRequired ? <sup className="text-danger">*</sup> : null}
          </div>
          <input
            className="form-control form-control-sm"
            type="text"
            value={value as string}
            onChange={(e) => updateValue(name, e.target.value)}
            required={meta.isRequired}
          />
        </>
      );
    }
    case FieldType.Number: {
      return (
        <>
          <div className="form-label">
            {meta.title} {meta.isRequired ? <sup className="text-danger">*</sup> : null}
          </div>
          <input
            className="form-control form-control-sm"
            type="number"
            step="0.001"
            min="0"
            value={value as number}
            title="Максимум три знака после запятой"
            pattern={meta.code === 'LENGTH' ? '[0-9]+,?[0-9]{0,3}' : undefined}
            onChange={(e) => updateValue(name, parseFloat(e.target.value))}
            required={meta.isRequired}
          />
        </>
      );
    }
    case FieldType.Date: {
      return (
        <SkdfDatePicker
          id={meta.code}
          label={meta.code === 'DATE_FINISH' ? 'Дата окончания' : meta.title}
          minDate={new Date(1900, 0, 1)}
          maxDate={meta.code === 'DATE_START' ? new Date() : new Date(2050, 0, 1)}
          selected={d_value}
          required={meta.isRequired}
          onChange={(date: Date | null) => {
            if (date) {
              updateValue(name, format(date, 'dd.MM.yyyy'));
            } else {
              updateValue(name, undefined);
            }
          }}
        />
      );
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    case FieldType.Select: {
      if (meta.isEntity || ['Эксплуатирующая организация'].includes(meta.title)) {
        if (!meta.isMultiple) {
          return (
            <RelativeEntity
              isOrganization={['Эксплуатирующая организация'].includes(meta.title)}
              value={value as ValueElement[]}
              metadata={meta}
              onChange={(value: ValueElement | undefined) => {
                updateValue(name, value ? [value] : undefined);
              }}
            />
          );
        }
      } else {
        if (meta.isMultiple) {
          return (
            <MultiSelect
              value={value as ValueElement[]}
              metadata={meta}
              onChange={(value: ValueElement[] | undefined) => {
                updateValue(name, value ? value : undefined);
              }}
            />
          );
        } else {
          return (
            <SingleSelect
              value={value as ValueElement[]}
              metadata={meta}
              onChange={(value: ValueElement[] | undefined) => {
                updateValue(name, value ? value : undefined);
              }}
            />
          );
        }
      }
    }
    // eslint-disable-next-line no-fallthrough
    default: {
      console.log('meta', meta);
      return (
        <>
          <div className="form-label">{meta.title}</div>
          <DefaultField value={value} />
        </>
      );
    }
  }
};

export default observer(EditFieldByType);
