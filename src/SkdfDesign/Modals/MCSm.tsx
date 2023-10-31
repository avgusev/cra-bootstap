import { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

function MCSm() {
  const [isShow, setIsShow] = useState(false);

  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  return (
    <>
      <h3>Modal Sm</h3>
      <Button variant="primary" onClick={show} children="Modal Sm" />

      <Modal
        show={isShow}
        onHide={close}
        size="sm"
        header={<h3 className="mb-0">Редактирование показателя</h3>}
        body={
          <div className="d-grid gap-4 my-3">
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
        }
        footer={
          <>
            <Button variant="stroke" onClick={close} children="Отменить" />
            <Button variant="primary" onClick={close} children="Сохранить" />
          </>
        }
      />
    </>
  );
}

export default MCSm;
