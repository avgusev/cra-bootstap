import { observer } from 'mobx-react-lite';
import Button from '../../../../components/Button';

import { Modal } from 'react-bootstrap';

import { confirmModalStoreInstance } from '../../store';

const ConfirmModal = () => {
  const { isOpened, confirm, reject } = confirmModalStoreInstance;
  return (
    <Modal show={isOpened} size="sm">
      <Modal.Body>Уверены, что хотите выйти без сохранения? Внесенные изменения не сохранятся</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={reject}>
          Отмена
        </Button>
        <Button onClick={confirm}>Выйти без сохранения</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default observer(ConfirmModal);
