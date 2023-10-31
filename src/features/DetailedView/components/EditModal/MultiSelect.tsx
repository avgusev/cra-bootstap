import { observer } from 'mobx-react-lite';
import AsyncSelect from 'react-select/async';
import { components, MultiValue } from 'react-select';

import SkdfIcon from '../../../../components/SkdfIcon';
import type { BlockMetadata, ValueElement } from '../../types';
import { fetchFieldAttributes } from '../../api';

type MultiSelectProps = {
  value: ValueElement[] | undefined;
  metadata: BlockMetadata;
  onChange: (value: ValueElement[] | undefined) => void;
};

function MultiSelect({ metadata, value, onChange }: MultiSelectProps) {
  const val = value ? (value as ValueElement[]).map((el) => ({ label: el.text, value: el })) : undefined;
  const valIds = val?.map((el) => el.value.id) || [];

  const loadOptionsHandler = async (inputValue: string) => {
    const attributes = await fetchFieldAttributes(metadata.id);
    return attributes
      .map((el) => ({ label: el.text, value: el }))
      .filter((el) =>
        inputValue ? el.label?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1 : true
      );
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
    onChange(_n);
  };

  return (
    <div className="mb-3">
      <label htmlFor={`editField-${metadata.code}`} className="form-label">
        {metadata.title} {metadata.isRequired ? <sup className="text-danger">*</sup> : null}
      </label>
      <AsyncSelect
        isMulti
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

export default observer(MultiSelect);
