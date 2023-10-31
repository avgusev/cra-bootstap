import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import Button from '../../../../components/Button';
import type { FieldStore, ValueElement } from '../../types';

type MultipleProps = {
  field: FieldStore;
};

const defaultNumericValue = {
  value: 0,
  isNew: true,
  isDeleted: false,
} as ValueElement;

const MultipleNumberComponent = ({ field }: MultipleProps) => {
  const val = field.val as ValueElement[];

  const addValue = () => {
    field.updateValue([...(val || []), defaultNumericValue]);
  };

  const editValue = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      val[index].value = parseFloat(e.target.value) || '';
    });
  };

  const deleteValue = (index: number) => () => {
    runInAction(() => {
      val[index].isDeleted = true;
    });
  };

  return (
    <div className="form-group">
      {val &&
        val.map((v, i) => {
          return !v.isDeleted ? (
            <div key={`${field.id}__${i}`} className="mb-2 d-flex">
              <input
                className="form-control form-control-sm"
                type="number"
                value={v.value as number}
                onChange={editValue(i)}
              />
              <Button variant="function" icon="cross" onClick={deleteValue(i)} />
            </div>
          ) : null;
        })}
      <Button variant="function" icon="plus" onClick={addValue}>
        Добавить
      </Button>
    </div>
  );
};

const defaultStringValue = {
  value: '',
  isNew: true,
  isDeleted: false,
} as ValueElement;

const MultipleTextComponent = ({ field }: MultipleProps) => {
  const val = field.val as ValueElement[];

  const addValue = () => {
    field.updateValue([...(val || []), defaultStringValue]);
  };

  const editValue = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      val[index].value = e.target.value || '';
    });
  };

  const deleteValue = (index: number) => () => {
    runInAction(() => {
      val[index].isDeleted = true;
    });
  };

  return (
    <div className="form-group">
      {val
        ? val.map((v, i) => {
            return !v.isDeleted ? (
              <div key={`${field.id}__${i}`} className="mb-2 input-group">
                <input
                  className="form-control form-control-sm"
                  type="number"
                  value={v.value as number}
                  onChange={editValue(i)}
                />
                <Button variant="function" icon="small_cross" onClick={deleteValue(i)} />
              </div>
            ) : null;
          })
        : null}
      <Button variant="function" icon="plus" onClick={addValue}>
        Добавить
      </Button>
    </div>
  );
};

const MultipleValue = {
  Number: observer(MultipleNumberComponent),
  Text: observer(MultipleTextComponent),
};

export default MultipleValue;
