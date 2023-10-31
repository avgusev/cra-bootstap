import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';
import SkdfIcon from '../../components/SkdfIcon';
import useShowBottomShadow from '../../hooks/useShowBottomShadow';
import FilterButton from '../../components/FilterButton';
import CloseButton from '../../components/CloseButton';

export function MyTable({ isSmall = false, className }: { isSmall: boolean; className?: string }) {
  const tableRowMax = Array.from({ length: isSmall ? 10 : 30 });
  return (
    <table className={classNames('table skdf table-sticky-header table-hover text-nowrap', className)}>
      <thead>
        <tr>
          <th scope="col" className="text-primary">
            <SkdfIcon name="settings" />
          </th>
          <th scope="col">Начало участка</th>
          <th scope="col">Конец участка</th>
          <th scope="col" className="text-end">
            Протяженность, км
          </th>
          <th scope="col" className="text-end">
            Площадь, м²
          </th>
          <th scope="col" className="text-end">
            Балансовая стоимость, тыс. ₽
          </th>
          <th scope="col" className="text-end">
            Остаточная стоимость, тыс. ₽
          </th>
          {!isSmall && (
            <>
              <th scope="col">Владелец</th>
              <th scope="col">Начало участка</th>
              <th scope="col">Конец участка</th>
              <th scope="col" className="text-end">
                Протяженность, км
              </th>
              <th scope="col" className="text-end">
                Площадь, м²
              </th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {tableRowMax.map((item, index) => (
          <tr key={index}>
            <td className="text-primary">
              <SkdfIcon name="map" />
            </td>
            <td>0+000</td>
            <td>2+900</td>
            <td className="text-end">2,735</td>
            <td className="text-end">87,70</td>
            <td className="text-end">0</td>
            <td className="text-end">0</td>
            {!isSmall && (
              <>
                <td>
                  <a href="#/tables">Государственная компания "Российские автомобильные дороги"</a>
                </td>
                <td className="text-end">2,735</td>
                <td className="text-end">87,70</td>
                <td className="text-end">0</td>
                <td className="text-end">0</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ModalTables() {
  const [isShow, setIsShow] = useState(false);

  const show = () => setIsShow(true);
  const close = () => setIsShow(false);

  const [isSmall, setIsSmall] = useState(false);
  const [withFooter, setWithFooter] = useState(false);

  const [hasScrollbar, showBottomShadow, modalBodyRef] = useShowBottomShadow();

  const clickHandler = (isSmall = false, withFooter = false) => {
    setIsSmall(isSmall);
    setWithFooter(withFooter);
    show();
  };

  return (
    <>
      <h3>Modal Tables</h3>
      <Button variant="skdf-primary" onClick={() => clickHandler(true, true)} children="Table Sm Footer" />{' '}
      <Button variant="skdf-primary" onClick={() => clickHandler(false, true)} children="Table Lg Footer" />{' '}
      <Button variant="skdf-primary" onClick={() => clickHandler(true, false)} children="Table Sm No Footer" />{' '}
      <Button variant="skdf-primary" onClick={() => clickHandler(false, false)} children="Table Lg No Footer" />
      <Modal
        centered
        scrollable
        show={isShow}
        onHide={close}
        dialogClassName="mx-4 justify-content-center modal-100w"
        contentClassName="w-auto skdf-shadow-down-16dp"
        // contentClassName="skdf-shadow-down-16dp"
        // size="lg"
      >
        <CloseButton absolute onClick={close} />
        <Modal.Header className="px-5 pb-3 flex-column align-items-stretch">
          <div className="d-flex justify-content-between align-items-start mt-2 me-3 gap-3">
            {/*<h1 className="mb-0">История изменений</h1>*/}
            <h1 className="mb-0">Автоматическое формирование расчётно-прогнозных аварийно-опасных участков</h1>
            <FilterButton count={99} />
          </div>
          <span className="pt-4 pb-2">183 изменения</span>
        </Modal.Header>
        <Modal.Body className={classNames('px-5 py-0', { 'pe-4': hasScrollbar })} ref={modalBodyRef}>
          <MyTable isSmall={isSmall} />
        </Modal.Body>
        {withFooter && (
          <Modal.Footer className={classNames('px-5', { 'skdf-shadow-right-4dp': Boolean(showBottomShadow) })}>
            <Button variant="skdf-stroke" onClick={close} children="Отменить" />
            <Button variant="skdf-primary" onClick={close} children="Сохранить" />
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default ModalTables;
