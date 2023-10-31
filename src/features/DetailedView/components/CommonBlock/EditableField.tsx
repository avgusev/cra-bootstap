import { observer } from 'mobx-react-lite';
import { DetailedViewStore, FieldStore } from '../../types';
import EditMode from '../EditMode/EditMode';
import Field from './Field';

type EditFieldProps = {
  label?: string;
  field: FieldStore | FieldStore[];
  className?: string;
  store: DetailedViewStore;
  onClick?: (id: number) => void;
};

const EditableField = ({ label, field, className, store, onClick }: EditFieldProps) => {
  const { editMode } = store;
  const isReadonly = field ? (Array.isArray(field) ? field[0].isReadonly : field.isReadonly) : true;

  return !isReadonly && editMode ? (
    <EditMode label={label} field={field} className={className} />
  ) : (
    <Field label={label} field={field} className={className} onClick={onClick} />
  );
};

export default observer(EditableField);
