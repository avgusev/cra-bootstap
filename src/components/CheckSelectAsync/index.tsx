import { ChangeEvent, UIEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Spinner from '../Spinner';
import Button from '../../components/Button';
import useDebounce from './../../hooks/useDebounce';

export type CheckSelectAsyncProps<Option> = {
  options?: Option[];
  value?: readonly Option[];
  // inputValue?: string;
  search?: boolean;
  placeholder?: string;
  maxHeight?: string;
  disabled?: boolean;
  isLoading?: boolean;
  inputWrapperClassName?: string;
  optionsWrapperClassName?: string;
  onChange: (value: Option[]) => void;
  onApply?: () => void;
  getOptionValue: (option: Option) => string | number;
  getOptionLabel: (option: Option) => string;
  optionIsDisabled?: (option: Option) => boolean;
  onInputChange?: (value: string) => void;
  onScrollToBottom?: () => void;
};

function CheckSpinner() {
  return (
    <div className="d-flex gap-2">
      <Spinner color="#ccced2" />
      Загрузка
    </div>
  );
}

function TextMark({ inputText, optionText }: { inputText?: string; optionText: string }) {
  if (!inputText) return <>{optionText}</>;

  const highlightedLabel = optionText.replace(
    new RegExp(inputText, 'gi'),
    (highlighted: string) => `<mark>${highlighted}</mark>`
  );

  return <span dangerouslySetInnerHTML={{ __html: highlightedLabel }} />;
}

function CheckSelectAsync<Option>({
  options,
  value = [],
  // inputValue,
  search,
  placeholder,
  maxHeight = '16.75rem',
  disabled,
  isLoading,
  inputWrapperClassName = 'mb-3',
  optionsWrapperClassName = 'mb-3 border-bottom',
  onChange,
  onApply,
  getOptionValue,
  getOptionLabel,
  optionIsDisabled,
  onInputChange,
  onScrollToBottom,
}: CheckSelectAsyncProps<Option>) {
  const [inputText, setInputText] = useState<string | undefined>();

  const debounced = useDebounce(inputText);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, item: Option) => {
    if (event.target.checked) {
      onChange([...value, item]);
    } else {
      onChange(value.filter((o) => getOptionValue(o) !== getOptionValue(item)));
    }
  };

  function handleScroll(e: UIEvent<HTMLElement>) {
    if (!onScrollToBottom) return;
    const epsilon = 5;
    const { offsetHeight, scrollHeight, scrollTop } = e.currentTarget;
    if (!isLoading && scrollTop + offsetHeight + epsilon >= scrollHeight) {
      onScrollToBottom();
    }
  }

  useEffect(() => {
    if (debounced === undefined) return;
    onInputChange && onInputChange(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <Form>
      {search ? (
        <div className={inputWrapperClassName}>
          <Form.Control
            type="search"
            size="sm"
            placeholder={placeholder}
            // disabled={disabled}
            onChange={(e) => setInputText(e.target.value.toLowerCase())}
            // value={inputValue}
            // onChange={(e) => onInputChange && onInputChange(e.currentTarget.value.toLowerCase())}
          />
        </div>
      ) : null}
      <div className={optionsWrapperClassName}>
        {options && options.length > 0 ? (
          <div className="overflow-auto pb-2.5" style={{ maxHeight: maxHeight }} onScroll={handleScroll}>
            {options.map((item, index) => (
              <Form.Check
                key={index}
                id={'checkSelect-' + getOptionValue(item)}
                label={<TextMark inputText={inputText} optionText={getOptionLabel(item)} />}
                className="mb-2.5 ps-2r"
                checked={value.map((o) => getOptionValue(o)).includes(getOptionValue(item))}
                disabled={disabled || (optionIsDisabled && optionIsDisabled(item))}
                onChange={(event) => onChangeHandler(event, item)}
              />
            ))}
            {isLoading ? <CheckSpinner /> : null}
          </div>
        ) : (
          // <div className="pb-4">
          //   {isLoading ? <CheckSpinner /> : <span className="d-block text-muted">Не найдено</span>}
          // </div>
          <span className="d-block text-muted pb-4">Не найдено</span>
        )}
      </div>
      {onApply ? (
        <div className="border-bottom">
          <Button variant="secondary" disabled={disabled || isLoading} className="w-100 mb-3" onClick={onApply}>
            Применить
          </Button>
        </div>
      ) : null}
    </Form>
  );
}

export default CheckSelectAsync;
