import { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import SkdfIcon from '../../components/SkdfIcon';
import { logo, mockBody } from './ModalOwner';

function MCOwner() {
  const [isShow, setIsShow] = useState(false);

  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  return (
    <>
      <h3>Owner</h3>
      <Button variant="primary" onClick={show} children="Owner" />
      <Modal
        show={isShow}
        onHide={close}
        size="lg"
        header={
          <div className="d-flex gap-3">
            {logo}
            <section>
              <h3 className="mb-0">Государственная компания «Российские автомобильные дороги»</h3>
              <small className="text-caption">ГК Автодор</small>
            </section>
          </div>
        }
        body={<div className="mb-4">{mockBody}</div>}
        footer={
          <Button variant="ghost" className="px-0 d-inline-flex gap-2" onClick={close}>
            <SkdfIcon name={'text_version'} />В карточку организации
          </Button>
        }
      />
    </>
  );
}
export default MCOwner;
