import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CloseButton from '../../components/CloseButton';

function ModalNewFilter() {
  const [isShow, setIsShow] = useState(false);

  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  return (
    <>
      <h3>New Filter</h3>

      <Button variant="skdf-primary" onClick={show}>
        New Filter
      </Button>

      <Modal centered scrollable show={isShow} onHide={close} contentClassName="skdf-shadow-down-16dp">
        <CloseButton absolute onClick={close} />
        <Modal.Header className="px-5 pb-3">
          <h3 className="mb-0 mt-2">Новая фильтрация</h3>
        </Modal.Header>
        <Modal.Body className="px-5 py-3">
          <input type="text" className="form-control form-control-sm" placeholder="Название фильтрации" />
        </Modal.Body>
        <Modal.Footer className="px-5">
          <Button variant="skdf-ghost" onClick={close}>
            Отменить
          </Button>
          <Button variant="skdf-primary" onClick={close}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalNewFilter;
