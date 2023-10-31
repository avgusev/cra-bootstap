import { useState } from 'react';
import Select, { components, SingleValue } from 'react-select';
import { ISelectOption, options } from '.';
import SkdfIcon from '../../components/SkdfIcon';

const uid = 'uid' + Math.random().toString(16).slice(2);

function SingleSelect() {
  const [selectedValue, setSelectedValue] = useState<SingleValue<ISelectOption>>(null);

  const onChangeHandler = (value: SingleValue<ISelectOption>) => {
    setSelectedValue(value);
  };

  return (
    <div className="mb-3">
      <label htmlFor={uid} className="form-label">
        Single select
      </label>
      <Select
        inputId={uid}
        options={options}
        placeholder="Выберите область"
        isClearable
        classNamePrefix="skdf-select"
        className="skdf-select-container"
        maxMenuHeight={256}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          spacing: { ...theme.spacing, controlHeight: 40, menuGutter: 0 },
        })}
        value={selectedValue}
        onChange={onChangeHandler}
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

export default SingleSelect;
