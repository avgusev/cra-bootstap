import { Fragment } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { format, parse } from 'date-fns';

import SkdfDatePicker from '../../../../components/DatePicker';

import type { FieldStore } from '../../types';
import { FieldValue } from '../CommonBlock/FieldValue';
import { FieldType } from './types';
import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';
import MultipleValue from './MultipleValue';

type EditModeProps = {
  label?: string;
  field: FieldStore | FieldStore[];
  className?: string;
};

const EditModeFieldByType = observer(({ field }: { field: FieldStore }) => {
  switch (field.type) {
    case FieldType.Text: {
      return (
        <>
          <div className="form-label">{field.title}</div>
          {field.isMultiple ? (
            <MultipleValue.Text field={field} />
          ) : (
            <input
              className="form-control form-control-sm"
              type="text"
              value={field.val as string}
              onChange={(e) => {
                field.updateValue(e.target.value);
              }}
            />
          )}
          {field.errorMessage ? (
            <div className="text-danger col-12 edit-error">
              <small>{field.errorMessage}</small>
            </div>
          ) : null}
        </>
      );
    }
    case FieldType.Number: {
      return (
        <>
          <div className="form-label">{field.title}</div>
          {field.isMultiple ? (
            <MultipleValue.Number field={field} />
          ) : (
            <input
              className="form-control form-control-sm"
              type="number"
              value={field.val as number}
              onChange={(e) => {
                field.updateValue(e.target.value);
              }}
            />
          )}
        </>
      );
    }
    case FieldType.Bool: {
      return (
        <>
          <div className="form-label">&nbsp;</div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`editField-${field.code}`}
              checked={typeof field.val === 'boolean' ? field.val : (field.val as string) === 'true'}
              value={typeof field.val === 'string' ? field.val : (field.val as boolean).toString()}
              onChange={(e) => {
                field.updateValue(e.target.checked);
              }}
            />
            <label className="form-check-label" htmlFor={`editField-${field.code}`}>
              {field.title}
            </label>
          </div>
        </>
      );
    }
    case FieldType.Date: {
      return (
        <SkdfDatePicker
          id={field.code}
          label={field.title}
          minDate={new Date(1950, 0, 1)}
          maxDate={new Date(2050, 0, 1)}
          selected={
            field.val ? parse(field.val as string, 'dd.MM.yyyy', new Date('Sun Dec 1 2022 00:00:00 GMT+0300')) : null
          }
          onChange={(date: Date | null) => field.updateValue(date ? format(date, 'dd.MM.yyyy') : undefined)}
        />
      );
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    case FieldType.Select: {
      if (field.id !== 0) {
        if (field.isMultiple) {
          return <MultiSelect field={field} />;
        } else {
          return <SingleSelect field={field} />;
        }
      }
    }
    // eslint-disable-next-line no-fallthrough
    default: {
      return (
        <>
          <div className="form-label">{field.title}</div>
          <FieldValue field={field} />
        </>
      );
    }
  }
});

const EditMode = ({ field, className }: EditModeProps) => {
  const isArray = Array.isArray(field);

  return (
    <div className={classNames('mb-4', className)}>
      {isArray ? (
        field.map((f) => (
          <Fragment key={f.id}>
            <EditModeFieldByType field={f} />
          </Fragment>
        ))
      ) : (
        <>
          <EditModeFieldByType field={field} />
        </>
      )}
    </div>
  );
};

export default observer(EditMode);
