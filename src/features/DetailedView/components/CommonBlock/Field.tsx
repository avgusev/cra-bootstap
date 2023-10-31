import { Fragment } from 'react';
import classNames from 'classnames';

import { FieldStore } from '../../types';

import { FieldValue } from './FieldValue';

type FieldProps = {
  label?: string;
  field: FieldStore | FieldStore[];
  className?: string;
  onClick?: (id: number) => void;
};

function Field({ field, label, className, onClick }: FieldProps) {
  const _f = Array.isArray(field) ? field[0] : field;

  const valueEl = Array.isArray(field) ? (
    field.map((f) => (
      <Fragment key={f.id}>
        <FieldValue field={f} onClick={onClick} />
        {', '}
      </Fragment>
    ))
  ) : (
    <FieldValue key={field?.id || label} field={field} onClick={onClick} />
  );

  return (
    <div className={classNames('mb-4', className)}>
      <div className="form-label">{label ? label : _f.title}</div>
      {valueEl}
    </div>
  );
}

export default Field;
