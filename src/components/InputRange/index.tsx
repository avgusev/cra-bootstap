import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';

export type Pair = [number | undefined, number | undefined];

export type InputRangeProps = {
  id?: string;
  label?: string;
  min?: number;
  max?: number;
  minRequired?: boolean;
  maxRequired?: boolean;
  step?: number;
  disabled?: boolean;
  value?: Pair;
  className?: string;
  onChange?: (value: Pair) => void;
};

function InputRange({
  id,
  label,
  min,
  max,
  minRequired = false,
  maxRequired = false,
  step = 1,
  disabled,
  value = [undefined, undefined],
  className,
  onChange,
}: InputRangeProps) {
  const [isHoverTooltip, setIsHoverTooltip] = useState(false);
  const [error, setError] = useState<string>();
  const [fromNum, setFromNum] = useState<string>(String(value[0] || ''));
  const [toNum, setToNum] = useState<string>(String(value[1] || ''));
  // const [fromIsTouched, setFromIsTouched] = useState(false);
  // const [toIsTouched, setToIsTouched] = useState(false);

  const onChangeRange = (inputValue: string, index: number) => {
    index === 0 ? setFromNum(inputValue) : setToNum(inputValue);
    // index === 0 ? setFromIsTouched(true) : setToIsTouched(true);
    setError(undefined);
    verifyInterval(inputValue, index);
  };

  useEffect(() => {
    setFromNum(String(value[0] || ''));
    setToNum(String(value[1] || ''));
  }, [value]);

  const verify = useCallback(
    (fromNum: number, toNum: number): string | undefined => {
      // if (isNaN(fromNum)) {
      //   return minRequired ? 'Заполните начало интервала' : 'Начало интервала не является числом';
      // }
      // if (isNaN(toNum)) {
      //   return maxRequired ? 'Заполните конец интервала' : 'Конец интервала не является числом';
      // }
      if (isNaN(fromNum) && minRequired) {
        return 'Заполните начало интервала';
      }
      if (isNaN(toNum) && maxRequired) {
        return 'Заполните конец интервала';
      }

      if (fromNum < 0) return 'Начало интервала не может быть отрицательным';
      if (toNum < 0) return 'Конец интервала не может быть отрицательным';

      if (fromNum > toNum) return 'Начало интервала не должно быть больше, чем его конец';

      if (min && fromNum < min) return `Начало интервала не может быть меньше ${min}`;
      if (max && fromNum > max) return `Начало интервала не может быть больше ${max}`;
      if (min && toNum < min) return `Конец интервала не может быть меньше ${min}`;
      if (max && toNum > max) return `Конец интервала не может быть больше ${max}`;

      return;
    },
    [max, maxRequired, min, minRequired]
  );

  const verifyInterval = useCallback(
    (inputValue: string, index: number) => {
      // if (fromNum === undefined && minRequired) {
      //   setError('Заполните начало интервала');
      //   return;
      // }
      // if (toNum === undefined && maxRequired) {
      //   setError('Заполните конец интервала');
      //   return;
      // }

      const val1 = parseFloat(index === 0 ? inputValue : fromNum);
      const val2 = parseFloat(index === 1 ? inputValue : toNum);

      const isError = verify(val1, val2);
      if (isError) {
        setError(isError);
        return;
      }

      // onChange && onChange([val1, val2]);
    },
    [fromNum, toNum, verify]
  );

  const notify = () => {
    if (error) return;
    const val1 = parseFloat(fromNum);
    const val2 = parseFloat(toNum);
    onChange && onChange([val1, val2]);
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}

      <OverlayTrigger
        placement="right-start"
        show={!!error && isHoverTooltip}
        popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [-14, 4] } }] }}
        overlay={<Tooltip show={!!error}>{error}</Tooltip>}
      >
        <div
          className="d-inline-flex w-100"
          onMouseEnter={() => setIsHoverTooltip(true)}
          onMouseLeave={() => setIsHoverTooltip(false)}
        >
          <FormControl
            id={id}
            disabled={disabled}
            type="number"
            size="sm"
            min={min}
            max={max}
            placeholder={min !== undefined ? 'от ' + min : ''}
            value={fromNum === undefined ? '' : fromNum}
            step={step}
            className={classNames(className, { 'is-invalid bg-gradient pe-3': error })}
            onChange={(e) => onChangeRange(e.target.value, 0)}
            onBlur={notify}
            onKeyDown={(e) => {
              if (e.key === 'Enter') notify();
            }}
          />
          <span className="align-self-center text-muted" style={{ padding: '0.125rem' }}>
            &ndash;
          </span>
          <FormControl
            disabled={disabled}
            type="number"
            size="sm"
            min={min}
            max={max}
            placeholder={max !== undefined ? 'до ' + max : ''}
            value={toNum === undefined ? '' : toNum}
            step={step}
            className={classNames(className, { 'is-invalid bg-gradient pe-3': error })}
            onChange={(e) => onChangeRange(e.target.value, 1)}
            onBlur={notify}
            onKeyDown={(e) => {
              if (e.key === 'Enter') notify();
            }}
          />
        </div>
      </OverlayTrigger>
    </div>
  );
}

export default InputRange;
