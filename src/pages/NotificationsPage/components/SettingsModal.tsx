import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { notificationStore } from '../store';

function SettingsModal() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button variant="function" icon="settings" children="Настройки" onClick={() => setShow(true)} />
      <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        header={<h3 className="mb-0">Настройки уведомлений</h3>}
        body={
          <div className="py-3">
            <div className="row mb-3">
              <h4 className="col">Событие</h4>
              <h4 className="col-2 text-center mb-0">В системе</h4>
              <h4 className="col-2 text-center mb-0">На email</h4>
            </div>
            {notificationStore.notificationSettings.map((setting, index) => (
              <div key={index} className="row mb-3">
                <div className="col">{setting.label}</div>
                <FormCheck className="col-2 text-center" disabled defaultChecked={setting.system} />
                <FormCheck className="col-2 text-center" defaultChecked={setting.email} />
              </div>
            ))}
          </div>
        }
        footer={
          <>
            <Button variant="stroke" onClick={() => setShow(false)} children="Отменить" />
            <Button variant="primary" onClick={() => setShow(false)} children="Применить" />
          </>
        }
      />
    </>
  );
}

export default observer(SettingsModal);
