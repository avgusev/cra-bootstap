import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import Button from '../../../../components/Button';
import { userStoreInstance } from '../../../Auth/store';
import { DetailedViewStore, ValueElement } from '../../types';

type EditPanelProps = {
  storeInstance: DetailedViewStore;
};

const defaultUser = {
  id: 0,
  text: '',
  isNew: true,
  isDeleted: false,
};

const EditPanel = ({ storeInstance }: EditPanelProps) => {
  const fields = storeInstance.fields;

  const isCheckedField = fields['IS_CHECKED'];
  const confirmUserField = (fields['CONFIRM_USER'].val as ValueElement[])[0];
  const dataConfirmation = fields['DATA_CONFIRMATION'].val as string;
  const timeConfirmation = fields['TIME_CONFIRMATION'].val as string;
  const currentUser = userStoreInstance.user;
  const profile = currentUser !== 'anonymous' ? currentUser?.profile : undefined;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(profile?.userId as string, 10);
    const now = new Date();
    isCheckedField.updateValue(e.target.checked);
    fields['CONFIRM_USER'].updateValue([
      {
        ...defaultUser,
        id,
        text: profile?.full_name as string,
      },
    ]);
    fields['DATA_CONFIRMATION'].updateValue(format(now, 'dd.MM.yyyy'));
    fields['TIME_CONFIRMATION'].updateValue(format(now, 'HH:mm:ss'));
  };

  return (
    <>
      <div className="edit-panel__holder"></div>
      <div className="edit-panel">
        <div className="edit-panel__content-box">
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`editField-${isCheckedField.code}`}
                checked={
                  typeof isCheckedField.val === 'boolean'
                    ? isCheckedField.val
                    : (isCheckedField.val as string) === 'true'
                }
                value={
                  typeof isCheckedField.val === 'string'
                    ? isCheckedField.val
                    : (isCheckedField.val as boolean).toString()
                }
                onChange={onChange}
              />
              <label className="form-check-label" htmlFor={`editField-${isCheckedField.code}`}>
                <span className="edit-panel__confirmUserName">
                  {isCheckedField.val ? `Проверено ${confirmUserField?.text || ''}` : 'Не проверено'}
                </span>
                <span className="edit-panel__confirmDateTime">
                  {isCheckedField.val ? `${dataConfirmation || ''} ${timeConfirmation || ''}` : ''}
                </span>
              </label>
            </div>
          </div>
          <div className="edit-panel__actions">
            <Button variant="function" onClick={storeInstance.toggleEditMode}>
              Отменить
            </Button>
            <Button onClick={storeInstance.saveEntity}>Сохранить</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(EditPanel);
