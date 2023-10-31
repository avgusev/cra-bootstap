import classNames from 'classnames';

import Button from '../../../../components/Button';
import SkdfIcon from '../../../../components/SkdfIcon';

import { FieldStore } from '../../types';
import { formatNumber } from '../../../../utils';

export function FieldValue({ field, onClick }: { field: FieldStore; onClick?: (id: number) => void }) {
  const value = field?.value?.value;
  let valueEl = <pre>{JSON.stringify(value, null, 2)}</pre>;

  if (typeof value === 'number') {
    valueEl = <span>{formatNumber(value)}</span>;
  } else if (field?.code === 'TIMEZONE') {
    valueEl = <span>(UTC{String(value)[0] !== '+' && String(value)[0] !== '−' ? '+' + value : String(value)})</span>;
  } else if (typeof value === 'string') {
    valueEl = <span>{value}</span>;
  } else if (field?.code === 'MALE') {
    switch (value) {
      case true: {
        return <span>Мужской</span>;
      }
      case false: {
        return <span>Женский</span>;
      }
      default: {
        return <span>Не определен</span>;
      }
    }
  } else if (typeof value === 'boolean') {
    valueEl = (
      <span className={classNames(value ? 'text-success' : 'text-danger')}>
        <SkdfIcon name={value ? 'circle_verified' : 'circle_not_verified'} />
      </span>
    );
  } else if (value && Array.isArray(value)) {
    value.forEach((v) => {
      const _id = typeof v.id === 'number' ? v.id : parseInt(v.id, 10);
      if (v.hash || field?.code === 'ORGANIZATION') {
        if (onClick) {
          valueEl = (
            <Button variant="function" className="text-start" onClick={() => onClick && onClick(_id)}>
              {v.value || v.text}
            </Button>
          );
        } else {
          valueEl = (
            <Button variant="function" className="text-start" href={`/roads/${v.id}`}>
              {v.value || v.text}
            </Button>
          );
        }
      } else {
        valueEl = <span>{value.map((v) => v.value || v.text).join('; ')}</span>;
      }
    });
  }

  if (value === undefined || (Array.isArray(value) && !value.length))
    valueEl = <span className="text-muted">нет данных</span>;

  return valueEl;
}
