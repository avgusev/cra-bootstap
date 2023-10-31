import { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { table } from './ModalSmallTables';

function MCSmallTables() {
  const [isShow, setIsShow] = useState(false);
  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  return (
    <>
      <h3>Small Tables</h3>
      <Button variant="primary" onClick={show} children="Small Tables" />
      <Modal
        show={isShow}
        onHide={close}
        body={
          <>
            <h3 className="mb-4 mt-2r">Все показатели оценки технического состояния от&nbsp;14.06.2022</h3>
            <div className="d-flex flex-column gap-4">
              {table}
              {table}
              {table}
              {table}
            </div>
          </>
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

export default MCSmallTables;
