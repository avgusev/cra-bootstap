import { Form } from 'react-bootstrap';
import { ChangeEvent, useState } from 'react';
import Button from '../../components/Button';

export type CheckSelectProps<Option> = {
  options?: Option[];
  value?: readonly Option[];
  search?: boolean;
  placeholder?: string;
  maxHeight?: string;
  disabled?: boolean;
  inputWrapperClassName?: string;
  optionsWrapperClassName?: string;
  onChange: (value: Option[]) => void;
  onApply?: () => void;
  getOptionValue: (option: Option) => string | number;
  getOptionLabel: (option: Option) => string;
  optionIsDisabled?: (option: Option) => boolean;
};

function CheckSelect<Option>({
  options,
  value = [],
  search,
  placeholder,
  maxHeight = '16.75rem',
  disabled,
  inputWrapperClassName = 'mb-3',
  optionsWrapperClassName = 'mb-3 border-bottom',
  onChange,
  onApply,
  getOptionValue,
  getOptionLabel,
  optionIsDisabled,
}: CheckSelectProps<Option>) {
  const [inputText, setInputText] = useState('');

  let optionsFilter = options;
  if (inputText.length > 0) optionsFilter = options?.filter((o) => getOptionLabel(o).toLowerCase().includes(inputText));

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, item: Option) => {
    const updatedList = [...value];

    if (event.target.checked) {
      updatedList.push(item);
    } else {
      const index = value.findIndex((o) => getOptionValue(o) === getOptionValue(item));
      if (index > -1) updatedList.splice(index, 1);
    }
    onChange(updatedList);
  };

  return (
    <Form>
      {search && (
        <div className={inputWrapperClassName}>
          <Form.Control
            type="search"
            size="sm"
            placeholder={placeholder}
            onChange={(e) => setInputText(e.target.value.toLowerCase())}
            disabled={disabled}
          />
        </div>
      )}
      <div className={optionsWrapperClassName}>
        {optionsFilter && optionsFilter.length > 0 ? (
          <div className="overflow-auto pb-2.5" style={{ maxHeight: maxHeight }}>
            {optionsFilter.map((item, index) => (
              <Form.Check
                key={index}
                id={'checkSelect-' + getOptionValue(item)}
                label={getOptionLabel(item)}
                className="mb-2.5 ps-2r"
                checked={value.map((o) => getOptionValue(o)).includes(getOptionValue(item))}
                disabled={disabled || (optionIsDisabled && optionIsDisabled(item))}
                onChange={(event) => onChangeHandler(event, item)}
              />
            ))}
          </div>
        ) : (
          <span className="d-block pb-4 text-muted">Не найдено</span>
        )}
      </div>
      {onApply ? (
        <div className="border-bottom">
          <Button variant="secondary" disabled={disabled} className="w-100 mb-3" onClick={onApply}>
            Применить
          </Button>
        </div>
      ) : null}
    </Form>
  );
}

export default CheckSelect;
