import { ResponseField } from '../../DetailedView/types';

export function Field({ fields, type }: { fields: ResponseField[]; type?: string }) {
  const value = fields[0].value.value;
  const valueJoin = fields.map((v) => v.value.value).join('/');
  const codeJoin = fields.map((v) => v.code).join('/');
  const titleJoin = fields.map((v) => v.title).join('/');

  let valueEl = <pre>{JSON.stringify(value, null, 2)}</pre>;

  if (Array.isArray(value)) {
    valueEl = <>{value.map((v) => v.text).join(', ')}</>;
  }
  if (typeof value === 'boolean') {
    valueEl = (
      <div className="form-check">
        <input id={codeJoin} className="form-check-input" type="checkbox" checked={value} disabled />
        <label className="form-check-label" htmlFor={codeJoin}>
          {titleJoin}
        </label>
      </div>
    );
  }
  if (typeof value === 'number') {
    valueEl = <span className="d-block">{value}</span>;
  }
  if (typeof value === 'string') {
    valueEl = <span className="d-block">{valueJoin}</span>;
    if (type === 'link') {
      valueEl = (
        <a href={value.toString()} target="_blank" className="d-block" rel="noreferrer">
          {value}
        </a>
      );
    }
    if (type === 'mail') {
      valueEl = (
        <a href={'mailto:' + value.toString()} target="_blank" className="d-block" rel="noreferrer">
          {value}
        </a>
      );
    }
  }

  if (value === undefined || (Array.isArray(value) && !value.length))
    valueEl = <span className="text-muted">нет данных</span>;

  return (
    <div title={codeJoin} className="mt-3">
      {typeof value !== 'boolean' ? <div className="form-label">{titleJoin}</div> : null}
      {valueEl}
    </div>
  );
}

export default Field;
