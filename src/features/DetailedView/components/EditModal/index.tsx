import { observer } from 'mobx-react-lite';
import { Modal } from 'react-bootstrap';

import Button from '../../../../components/Button';
import EditFieldByType from './EditFieldByType';
import type { EditFieldModalStore } from '../../store';

const EditFieldModal = ({ editFieldModalStore }: { editFieldModalStore: EditFieldModalStore }) => {
  const { isOpened, title, isNew, block, errorMessage, closeModal, saveData } = editFieldModalStore;

  const defaultMetadata = block?.data?.defaultMetadata?.filter((el) => el.title);

  console.log('errorMessage', errorMessage);

  return (
    <Modal show={isOpened} size="lg">
      <form onSubmit={saveData}>
        <Modal.Header>
          <Modal.Title>
            {isNew ? 'Добавление' : 'Редактирование'} {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {defaultMetadata
              ? defaultMetadata.map((element) => {
                  return (
                    <div key={element.code} className="mb-4 col-6" style={{ wordBreak: 'break-all' }}>
                      <EditFieldByType meta={element} store={editFieldModalStore} />
                    </div>
                  );
                })
              : null}
          </div>
          {errorMessage ? <div className="text-danger col-12">{errorMessage}</div> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button type="reset" variant="secondary" onClick={closeModal}>
            Отмена
          </Button>
          <Button type="submit" disabled={errorMessage !== undefined}>
            Сохранить
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default observer(EditFieldModal);
