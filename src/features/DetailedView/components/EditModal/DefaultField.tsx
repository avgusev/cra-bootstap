import classNames from 'classnames';
import SkdfIcon from '../../../../components/SkdfIcon';

import { FieldValue } from '../../types';
import { formatNumber } from '../../../../utils';

type DefaultFieldProps = {
  value: FieldValue['value'];
};

export function DefaultField({ value }: DefaultFieldProps) {
  let valueEl = <pre>{JSON.stringify(value, null, 2)}</pre>;

  if (typeof value === 'number') {
    valueEl = <span>{formatNumber(value)}</span>;
  } else if (typeof value === 'string') {
    valueEl = <span>{value}</span>;
  } else if (typeof value === 'boolean') {
    valueEl = (
      <span className={classNames(value ? 'text-success' : 'text-danger')}>
        <SkdfIcon name={value ? 'circle_verified' : 'circle_not_verified'} />
      </span>
    );
  } else if (value && Array.isArray(value)) {
    value.forEach((v) => {
      valueEl = <span>{value.map((v) => v.value || v.text).join('; ')}</span>;
    });
  }

  if (value === undefined || (Array.isArray(value) && !value.length))
    valueEl = <span className="text-muted">нет данных</span>;

  return valueEl;
}
