import { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

function MCNewFilter() {
  const [isShow, setIsShow] = useState(false);

  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  return (
    <>
      <h3>New Filter</h3>
      <Button variant="primary" onClick={show} children="New Filter" />
      <Modal
        show={isShow}
        onHide={close}
        header={<h3 className="mb-0">Новая фильтрация</h3>}
        body={
          <div className="py-3">
            <input type="text" className="form-control form-control-sm" placeholder="Название фильтрации" />
          </div>
        }
        footer={
          <>
            <Button variant="stroke" onClick={close} children="Отменить" />
            <Button variant="primary" onClick={close} children="Сохранить" />
          </>
        }
      ></Modal>
    </>
  );
}

export default MCNewFilter;
