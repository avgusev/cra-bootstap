import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';
import SingleSelectHighlight from './SingleSelectHighlight';
import Select from '../../components/Select';
import { useState } from 'react';

export interface ISelectOption {
  value: string;
  label: string;
}

export const options: ISelectOption[] = [
  { value: 'Алтайский край', label: 'Алтайский край' },
  { value: 'Амурская область', label: 'Амурская область' },
  { value: 'Архангельская область', label: 'Архангельская область' },
  { value: 'Астраханская область', label: 'Астраханская область' },
  { value: 'Белгородская область', label: 'Белгородская область' },
  { value: 'Брянская область', label: 'Брянская область' },
  { value: 'Владимирская область', label: 'Владимирская область' },
  { value: 'Волгоградская область', label: 'Волгоградская область' },
  { value: 'Воронежская область', label: 'Воронежская область' },
  { value: 'Г. Москва', label: 'Г. Москва' },
  { value: 'Г. Санкт-Петербург', label: 'Г. Санкт-Петербург' },
  { value: 'Г. Севастополь', label: 'Г. Севастополь' },
];

function Selects() {
  const [value, setValue] = useState<ISelectOption | null>(null);
  const [values, setValues] = useState<readonly ISelectOption[]>([]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4">
          <SingleSelect />
        </div>

        <div className="col-4">
          <MultiSelect />
        </div>

        <div className="col-4">
          <SingleSelectHighlight />
        </div>

        <div className="col-4">
          <div className="mb-3">
            <label htmlFor="select-component" className="form-label">
              Select Component
            </label>
            <Select
              inputId="select-component"
              placeholder="Выберите..."
              options={options}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>
        </div>

        <div className="col-4">
          <div className="mb-3">
            <label htmlFor="select-component-clearable" className="form-label">
              Select isClearable Component
            </label>
            <Select
              isClearable
              inputId="select-component-clearable"
              placeholder="Выберите..."
              options={options}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>
        </div>

        <div className="col-4">
          <div className="mb-3">
            <label htmlFor="select-component-multi" className="form-label">
              Select Multi Component
            </label>
            <Select
              isMulti
              inputId="select-component-multi"
              placeholder="Выберите..."
              options={options}
              value={values}
              onChange={(newValue) => setValues(newValue)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selects;
