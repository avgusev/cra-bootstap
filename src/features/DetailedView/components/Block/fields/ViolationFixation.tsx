import { observer } from 'mobx-react-lite';

import Button from '../../../../../components/Button';
import { Field, FieldValue } from '../../../types';

import { violationFixationStoreInstance } from '../../../store';

type ViolationFixationProps = {
  // @TODO inherits value from block
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
};

const modalFields = ['checkDate', 'regNum', 'antiRadarFixation'];
const text = {
  checkDate: 'Дата проверки',
  regNum: 'Регистрационный номер',
  antiRadarFixation: 'Фиксация антирадаром',
};

function pick(obj: Record<string, unknown>, keys: string[]) {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowValuesToFieldsRecord(row: any): Record<string, Field> {
  const map: Record<string, Field> = {};

  return Object.entries(row)
    .map(([key, value]) => {
      return {
        val: (value as FieldValue).value,
        value: value,
        isCustom: false,
        id: 0,
        code: key,
        type: 0,
        isMultiple: false,
        isRequired: false,
        isReadonly: false,
        isEntity: false,
        title: text[key as keyof typeof text],
      } as Field;
    })
    .reduce((p, field) => {
      p[field.code] = field;
      p[field.code].val = field.value.value;
      return p;
    }, map);
}

const ViolationFixation = ({ row }: ViolationFixationProps) => {
  const { updateFields, toggleModal } = violationFixationStoreInstance;

  const text = row.type.value[0].text as string;

  const pickedFields = pick(row, modalFields);

  const onClick = () => {
    updateFields(rowValuesToFieldsRecord(pickedFields), row.id);
    toggleModal();
  };

  return (
    <Button variant="function" className="text-start inline-block" onClick={onClick}>
      {text}
    </Button>
  );
};

export default observer(ViolationFixation);
