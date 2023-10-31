import { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import FilterButton from '../../components/FilterButton';
import { MyTable } from './ModalTables';

function MCTables() {
  const [isShow, setIsShow] = useState(false);
  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  const [isSmall, setIsSmall] = useState(false);
  const [withFooter, setWithFooter] = useState(false);

  const clickHandler = (isSmall = false, withFooter = false) => {
    setIsSmall(isSmall);
    setWithFooter(withFooter);
    show();
  };

  return (
    <>
      <h3>Modal Tables</h3>
      <Button variant="primary" onClick={() => clickHandler(true, true)} children="Table Sm Footer" />{' '}
      <Button variant="primary" onClick={() => clickHandler(false, true)} children="Table Lg Footer" />{' '}
      <Button variant="primary" onClick={() => clickHandler(true, false)} children="Table Sm No Footer" />{' '}
      <Button variant="primary" onClick={() => clickHandler(false, false)} children="Table Lg No Footer" />
      <Modal
        show={isShow}
        onHide={close}
        dialogClassName="mx-4 justify-content-center modal-100w"
        contentClassName="w-auto"
        header={
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-start me-3 gap-3">
              <h1 className="mb-0">Автоматическое формирование расчётно-прогнозных аварийно-опасных участков</h1>
              <FilterButton count={99} />
            </div>
            <div className="mt-4 mb-2">183 изменения</div>
          </div>
        }
        body={<MyTable isSmall={isSmall} />}
        footer={
          withFooter && (
            <>
              <Button variant="stroke" onClick={close} children="Отменить" />
              <Button variant="primary" onClick={close} children="Сохранить" />
            </>
          )
        }
      />
    </>
  );
}

export default MCTables;
