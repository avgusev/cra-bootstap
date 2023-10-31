import { observer } from 'mobx-react-lite';
import AsyncSelect from 'react-select/async';
import { components, SingleValue } from 'react-select';

import SkdfIcon from '../../../../components/SkdfIcon';
import type { BlockMetadata, FieldStore, ValueElement } from '../../types';
import { fetchFieldAttributes } from '../../api';

export interface ISelectOption {
  value: FieldStore['val'];
  label: string;
}

type SingleSelectProps = {
  value: ValueElement[] | undefined;
  metadata: BlockMetadata;
  onChange: (value: ValueElement[] | undefined) => void;
};

function SingleSelect({ value, metadata, onChange }: SingleSelectProps) {
  const val = value && value.length ? { label: value[0].text, value: value[0] } : null;

  const loadOptionsHandler = async (inputValue: string) => {
    const attributes = await fetchFieldAttributes(metadata.id);
    return attributes
      .map((el) => ({ label: el.text, value: el }))
      .filter((el) =>
        inputValue ? el.label?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1 : true
      );
  };

  const changeHandler = (newValue: SingleValue<{ label: string | undefined; value: ValueElement }>) => {
    onChange(newValue ? [newValue?.value] : undefined);
  };

  return (
    <div className="mb-3">
      <label htmlFor={`editField-${metadata.code}`} className="form-label">
        {metadata.title} {metadata.isRequired ? <sup className="text-danger">*</sup> : null}
      </label>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={val}
        loadOptions={loadOptionsHandler}
        inputId={`editField-${metadata.code}`}
        onChange={changeHandler}
        placeholder="Выберите значение"
        isClearable
        classNamePrefix="skdf-select"
        className="skdf-select-container"
        maxMenuHeight={256}
        required={metadata.isRequired}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          spacing: { ...theme.spacing, controlHeight: 40, menuGutter: 0 },
        })}
        components={{
          IndicatorSeparator: () => null,
          ClearIndicator: () => null,
          NoOptionsMessage: (props) => <components.NoOptionsMessage {...props} children="Не найдено" />,
          DropdownIndicator: ({ cx }) => (
            <div className={cx({ indicator: true, 'dropdown-indicator': true })}>
              <SkdfIcon name="arrow_down" />
            </div>
          ),
        }}
      />
    </div>
  );
}

export default observer(SingleSelect);
