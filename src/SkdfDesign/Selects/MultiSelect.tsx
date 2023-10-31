import { useState } from 'react';
import Select, { ActionMeta, components, MultiValue } from 'react-select';
import { ISelectOption, options } from '.';
import SkdfIcon from '../../components/SkdfIcon';

const uid = 'uid' + Math.random().toString(16).slice(2);

function MultuSelect() {
  const [selectedMultiValues, setSelectedMultiValues] = useState<MultiValue<ISelectOption>>([]);

  const getMultiOptions = () => {
    return [{ label: 'Выбрать все', value: 'all' }, ...options];
  };

  const onChangeHandler = (values: MultiValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) => {
    const { action, option } = actionMeta;

    const getValues = () => {
      if (option?.value === 'all') {
        return action === 'select-option' ? getMultiOptions() : [];
      }
      const filtered = values.filter((item) => item.value !== 'all');
      return filtered.length === options.length ? getMultiOptions() : filtered;
    };

    setSelectedMultiValues(getValues());
  };

  return (
    <div className="mb-3">
      <label htmlFor={uid} className="form-label">
        Multi select
      </label>
      <Select
        isMulti
        inputId={uid}
        options={getMultiOptions()}
        placeholder="Выберите область"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        classNamePrefix="skdf-select"
        className="skdf-select-container"
        maxMenuHeight={256}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          spacing: { ...theme.spacing, controlHeight: 40, menuGutter: 0 },
        })}
        value={selectedMultiValues}
        onChange={onChangeHandler}
        filterOption={(option, inputValue) => {
          if (inputValue && option.value === 'all') return false;

          return option.label.toLowerCase().includes(inputValue.toLowerCase());
        }}
        components={{
          IndicatorSeparator: () => null,
          ClearIndicator: () => null,
          NoOptionsMessage: (props) => <components.NoOptionsMessage {...props} children="Не найдено" />,
          DropdownIndicator: ({ cx }) => (
            <div className={cx({ indicator: true, 'dropdown-indicator': true })}>
              <SkdfIcon name="arrow_down" />
            </div>
          ),
          Option: (props) => (
            <components.Option {...props}>
              <input
                className="form-check-input skdf__checkbox me-2"
                type="checkbox"
                readOnly
                checked={props.isSelected}
                value=""
                id={props.data.value}
              />
              {props.children}
            </components.Option>
          ),
          MultiValue: ({ index, getValue }) => {
            let text = '';
            const values = getValue().filter((item) => item.value !== 'all');

            if (values.length === 1) text = values[0].value;
            if (values.length > 1 && index === 0) text = `Выбрано ${values.length}`;

            return index === 0 ? <span className="me-1">{text}</span> : null;
          },
        }}
      />
    </div>
  );
}

export default MultuSelect;
