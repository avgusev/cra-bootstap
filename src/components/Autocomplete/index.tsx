import { useEffect, useState, useRef, KeyboardEvent } from 'react';
import useDebounce from '../../hooks/useDebounce';
import SkdfIcon from '../SkdfIcon';
import Spinner from '../Spinner';

export type AutocompleteProps<Option> = React.InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean;
  options: Option[];
  hasFooter?: boolean;
  className?: string;
  defaultText?: string;
  minLength?: number;
  getOptionLabel: (option: Option) => string;
  onInputChange: (textSearch: string) => string | void;
  onSelectValue: (option: Option) => Option | void;
  onShowAll?: (inputText: string) => string | void;
  renderItem: (optionLabel: JSX.Element) => JSX.Element;
};

function CheckSpinner() {
  return (
    <div className="d-flex gap-2 p-2 ps-2.5">
      <Spinner color="#ccced2" />
      Загрузка
    </div>
  );
}

function Autocomplete<Option>({
  isLoading,
  options,
  hasFooter = false,
  className,
  defaultText,
  minLength = 3,
  getOptionLabel,
  onInputChange,
  onSelectValue,
  onShowAll,
  renderItem,
  ...props
}: AutocompleteProps<Option>) {
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debounced = useDebounce(inputText);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (elementRef.current && !elementRef.current.contains(event.target as HTMLDivElement)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setInputText(defaultText === undefined ? '' : defaultText);
  }, [defaultText]);

  useEffect(() => {
    if (debounced === undefined) return;
    if (debounced.length < minLength && debounced !== '') return;
    if (!isOpen) return;

    onInputChange && onInputChange(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]); // TODO: требует зависимости onInputChange и isOpen, но нам необходимо реагировать только на debounced

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputText) onShowAllHandler();
  };

  const onSelectValueHandler = (option: Option) => {
    setInputText(getOptionLabel(option));
    setIsOpen(false);
    onSelectValue(option);
  };

  const onShowAllHandler = () => {
    if (!inputText) return;
    setIsOpen(false);

    onShowAll && onShowAll(inputText);
  };

  const textMark = (optionText: string) => {
    if (!inputText) return <>{optionText}</>;

    const highlightedLabel = optionText.replace(
      new RegExp(inputText, 'gi'),
      (highlighted: string) => `<mark>${highlighted}</mark>`
    );

    return <span dangerouslySetInnerHTML={{ __html: highlightedLabel }} />;
  };

  const OptionList = () => {
    if (!options) return null;
    return (
      <>
        {options.map((option, key) => (
          <div key={key} className="autocomplete-option" onClick={() => onSelectValueHandler(option)}>
            {renderItem(textMark(getOptionLabel(option)))}
          </div>
        ))}
      </>
    );
  };

  const EmptyResult = () => <div className="d-flex align-items-start p-2 ps-2.5 text-muted">Не найдено</div>;

  const Footer = () => (
    <div className="d-flex align-items-end p-2 ps-2.5 pe-2.5">
      <SkdfIcon name="enter" width={22} height={22} className="pe-2.5" style={{ color: '#999ea5' }} />
      <div className="text-primary fw-semibold" style={{ cursor: 'pointer' }} onClick={onShowAllHandler}>
        Все результаты по запросу «{inputText}»
      </div>
      <div className="flex-grow-1 text-end text-xs" style={{ color: '#999ea5' }}>
        Нажмите клавишу Enter
      </div>
    </div>
  );

  const isShowOptions = isOpen && debounced?.length >= minLength && options !== undefined;
  const inputBorderRadius = isShowOptions ? '8px 8px 0 0' : '8px';

  return (
    <div ref={elementRef} className={className}>
      <input
        type="search"
        spellCheck={false}
        className="form-control w-100"
        style={{ borderRadius: inputBorderRadius }}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={onKeyDownHandler}
        value={inputText}
        {...props}
      />
      {isShowOptions && (
        <div className="autocomplete-list position-relative w-100">
          <div
            className="position-absolute top-0 left-0 bg-white w-100 border border-top-0 border-primary overflow-hidden"
            style={{ borderRadius: '0 0 8px 8px' }}
          >
            <div className="overflow-auto pt-2 pb-2" style={{ maxHeight: 256 }}>
              {isLoading ? (
                <CheckSpinner />
              ) : (
                <>
                  {options?.length ? (
                    <>
                      <OptionList />
                      {hasFooter && <Footer />}
                    </>
                  ) : (
                    <EmptyResult />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
