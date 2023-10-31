import { observer } from 'mobx-react-lite';
import AsyncSelect from 'react-select/async';
import { components, SingleValue } from 'react-select';

import SkdfIcon from '../../../../components/SkdfIcon';
import type { BlockMetadata, FieldStore, ValueElement } from '../../types';
import { fetchRelativeEntities, fetchRelativeOrganizations } from '../../api';

export interface ISelectOption {
  value: FieldStore['val'];
  label: string;
}

type RelativeEntityProps = {
  value: ValueElement[] | undefined;
  metadata: BlockMetadata;
  isOrganization: boolean;
  onChange: (value: ValueElement | undefined) => void;
};

function RelativeEntity({ value, metadata, isOrganization, onChange }: RelativeEntityProps) {
  const val = value ? { label: value[0].text, value: value[0] } : null;

  const loadOptionsHandler = async (inputValue: string) => {
    let attributes;
    if (isOrganization) {
      attributes = await fetchRelativeOrganizations(inputValue);
    } else {
      attributes = await fetchRelativeEntities(metadata.id, inputValue);
      attributes.data = attributes.data.filter((el) =>
        inputValue ? el.text?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1 : true
      );
    }
    return attributes.data.map((el) => ({ label: el.text, value: el }));
  };

  const changeHandler = (newValue: SingleValue<{ label: string | undefined; value: ValueElement }>) => {
    onChange(newValue?.value);
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

export default observer(RelativeEntity);
