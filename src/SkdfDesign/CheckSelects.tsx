import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import CheckSelect from '../components/CheckSelect';
import SkdfIcon from '../components/SkdfIcon';

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

function CheckSelects() {
  const [values, setValues] = useState<ISelectOption[]>([
    { value: 'Брянская область', label: 'Брянская область' },
    { value: 'Владимирская область', label: 'Владимирская область' },
  ]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Accordion defaultActiveKey="0" alwaysOpen={false} flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="h4 mb-0">
                  Регион
                  {values.length > 0 && (
                    <SkdfIcon
                      name="dot"
                      className="text-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        setValues([]);
                      }}
                    />
                  )}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <CheckSelect
                  options={options}
                  value={values}
                  search
                  placeholder="Поиск"
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  onChange={(updatedList) => setValues(updatedList)}
                  onApply={() => alert('onApply')}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="col-9">{JSON.stringify(values, null, 2)}</div>
      </div>
    </div>
  );
}

export default CheckSelects;
