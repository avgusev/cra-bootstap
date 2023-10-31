import { observer } from 'mobx-react-lite';
import AsyncSelect from 'react-select/async';
import { components, SingleValue } from 'react-select';

import SkdfIcon from '../../../../components/SkdfIcon';
import type { FieldStore, ValueElement } from '../../types';
import { fetchRelativeEntities } from '../../api';

export interface ISelectOption {
  value: FieldStore['val'];
  label: string;
}

type SingleSelectProps = {
  field: FieldStore;
};

function RelativeEntityEdit({ field }: SingleSelectProps) {
  const value = (field.val as ValueElement[])[0] || null;
  const val = value ? { label: value.text, value } : null;

  const loadOptionsHandler = async (inputValue: string) => {
    const attributes = await fetchRelativeEntities(field.id, inputValue);
    return attributes.data.map((el) => ({ label: el.text, value: el }));
  };

  const changeHandler = (newValue: SingleValue<{ label: string | undefined; value: ValueElement }>) => {
    field.updateValue(newValue ? [newValue?.value] : undefined);
  };

  return (
    <div className="mb-3">
      <label htmlFor={`editField-${field.code}`} className="form-label">
        {field.title}
      </label>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={val}
        loadOptions={loadOptionsHandler}
        inputId={`editField-${field.code}`}
        onChange={changeHandler}
        placeholder="Выберите значение"
        isClearable
        classNamePrefix="skdf-select"
        className="skdf-select-container"
        maxMenuHeight={256}
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

export default observer(RelativeEntityEdit);
