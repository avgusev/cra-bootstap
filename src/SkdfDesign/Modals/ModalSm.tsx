import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CloseButton from '../../components/CloseButton';

function ModalSm() {
  const [isShow, setIsShow] = useState(false);

  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  return (
    <>
      <h3>Modal Sm</h3>

      <Button variant="skdf-primary" onClick={show}>
        Modal Sm
      </Button>

      <Modal centered scrollable show={isShow} onHide={close} contentClassName="skdf-shadow-down-16dp" size="sm">
        <CloseButton absolute onClick={close} />
        <Modal.Header className="px-5 pb-3">
          <h3 className="mb-0 mt-2">Редактирование показателя</h3>
        </Modal.Header>
        <Modal.Body className="px-5 py-3">
          <div className="d-grid gap-4">
            <div>
              <label htmlFor="input1" className="form-label">
                Наименование
              </label>
              <input
                id="input1"
                type="text"
                className="form-control form-control-sm"
                defaultValue="Коэффициент полосности"
              />
            </div>
            <div>
              <label htmlFor="input2" className="form-label">
                Расчётное значение
              </label>
              <input id="input2" type="text" className="form-control form-control-sm" defaultValue="1" />
            </div>
            <div>
              <label htmlFor="input3" className="form-label">
                Экспертное значение
              </label>
              <input id="input3" type="text" className="form-control form-control-sm" defaultValue="1" />
            </div>
          </div>
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

export default ModalSm;
