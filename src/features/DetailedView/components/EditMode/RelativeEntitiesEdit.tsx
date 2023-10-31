import { observer } from 'mobx-react-lite';
import AsyncSelect from 'react-select/async';
import { components, MultiValue } from 'react-select';

import SkdfIcon from '../../../../components/SkdfIcon';
import type { FieldStore, ValueElement } from '../../types';
import { fetchRelativeEntities } from '../../api';

type MultiSelectProps = {
  field: FieldStore;
};

function RelativeEntitiesEdit({ field }: MultiSelectProps) {
  const val = (field.val as ValueElement[]).map((el) => ({ label: el.text, value: el }));
  const valIds = val.map((el) => el.value.id);

  const loadOptionsHandler = async (inputValue: string) => {
    const attributes = await fetchRelativeEntities(field.id, inputValue);
    return attributes.data.map((el) => ({ label: el.text, value: el }));
  };

  const changeHandler = (newValue: MultiValue<{ label: string | undefined; value: ValueElement }>) => {
    const duplicateIndexes: number[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, v] of newValue.entries()) {
      const indx = newValue.reduce((a, e, i) => {
        if (e.value.id === v.value.id) {
          a.push(i);
        }
        return a;
      }, [] as number[]);
      if (indx.length > 1) {
        duplicateIndexes.push(...indx);
      }
    }
    const _n = newValue.filter((_, i) => !duplicateIndexes.includes(i)).map((e) => e.value);
    field.updateValue(_n);
  };

  return (
    <div className="mb-3">
      <label htmlFor={`editField-${field.code}`} className="form-label">
        {field.title}
      </label>
      <AsyncSelect
        isMulti
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
          Option: (props) => (
            <components.Option {...props}>
              <input
                className="form-check-input skdf__checkbox me-2"
                type="checkbox"
                readOnly
                checked={valIds.includes(props.data.value.id)}
                value=""
                id={props.data.value.hash as string}
              />
              {props.children}
            </components.Option>
          ),
          MultiValue: ({ index, getValue }) => {
            let text = '';
            const values = getValue();

            if (values.length === 1) text = values[0].value.text || '';
            if (values.length > 1 && index === 0) text = `Выбрано ${values.length}`;

            return index === 0 ? <span className="me-1">{text}</span> : null;
          },
        }}
      />
    </div>
  );
}

export default observer(RelativeEntitiesEdit);
