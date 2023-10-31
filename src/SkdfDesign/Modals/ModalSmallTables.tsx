import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SkdfIcon from '../../components/SkdfIcon';
import useShowBottomShadow from '../../hooks/useShowBottomShadow';
import classNames from 'classnames';
import CloseButton from '../../components/CloseButton';

export const table = (
  <div className="table-responsive">
    <table className="table skdf table-sticky-header table-hover text-nowrap">
      <thead>
        <tr>
          <th scope="col" className="text-primary">
            <SkdfIcon name="settings" />
          </th>
          <th scope="col">Начало участка</th>
          <th scope="col">Конец участка</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-primary">
            <SkdfIcon name="map" />
          </td>
          <td>0+000</td>
          <td>2+900</td>
        </tr>
        <tr>
          <td className="text-muted">
            <SkdfIcon name="map" />
          </td>
          <td>13+390</td>
          <td>149+000</td>
        </tr>
        <tr>
          <td className="text-muted">
            <SkdfIcon name="map" />
          </td>
          <td>47+755</td>
          <td>48+844</td>
        </tr>
        <tr>
          <td className="text-primary">
            <SkdfIcon name="map" />
          </td>
          <td>209+669</td>
          <td>684+001</td>
        </tr>
      </tbody>
    </table>
  </div>
);

function ModalSmallTables() {
  const [isShow, setIsShow] = useState(false);

  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  const [hasScrollbar, showBottomShadow, modalBodyRef] = useShowBottomShadow();

  return (
    <>
      <h3>Small Tables</h3>

      <Button variant="skdf-primary" onClick={show}>
        Small Tables
      </Button>

      <Modal centered scrollable show={isShow} onHide={close} contentClassName="skdf-shadow-down-16dp">
        <CloseButton absolute onClick={close} />
        <Modal.Body className={classNames('px-5', { 'pe-4': Boolean(hasScrollbar) })} ref={modalBodyRef}>
          <h3 className="mt-2 mb-4">Все показатели оценки технического состояния от&nbsp;14.06.2022</h3>
          <div className="d-flex flex-column gap-4">
            {table}
            {table}
            {table}
            {table}
          </div>
        </Modal.Body>
        <Modal.Footer className={classNames('px-5', { 'skdf-shadow-right-4dp': Boolean(showBottomShadow) })}>
          <Button variant="skdf-stroke" onClick={close}>
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

export default ModalSmallTables;
