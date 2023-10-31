import classNames from 'classnames';
import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Button from '../components/Button';
import CloseButton from '../components/CloseButton';

const treningArray = [
  {
    title: 'Поиск по координатам 1',
    text: (
      <>
        <p>
          Вы можете воспользоваться поиском дороги по её названию, идентификационному или учётному номеру, а также по
          географическим координатам
        </p>
        <p>
          Для этого необходимо ввести координаты в виде [широта, долгота] через запятую, без пробела, в градусах с
          десятичной дробной частью, не более 7 знаков после точки
        </p>
        <p>Например, 55.759, 37.623</p>
      </>
    ),
  },
  {
    title: 'Поиск по координатам 2',
    text: (
      <>
        <p>
          Вы можете воспользоваться поиском дороги по её названию, идентификационному или учётному номеру, а также по
          географическим координатам
        </p>
        <p>
          Для этого необходимо ввести координаты в виде [широта, долгота] через запятую, без пробела, в градусах с
          десятичной дробной частью, не более 7 знаков после точки
        </p>
      </>
    ),
  },
  {
    title: 'Поиск по координатам 3',
    text: (
      <>
        <p>
          Для этого необходимо ввести координаты в виде [широта, долгота] через запятую, без пробела, в градусах с
          десятичной дробной частью, не более 7 знаков после точки
        </p>
        <p>Например, 55.759, 37.623</p>
      </>
    ),
  },
];

const popperConfig = { modifiers: [{ name: 'offset', options: { offset: [0, 20] } }] };

function Training() {
  const [isTrening, setIsTrening] = useState(false);
  const [stepTrening, setStepTrening] = useState(0);

  const renderPopover = (
    <Popover className="skdf-popover-lg">
      <div className="d-flex justify-content-between pt-4 px-4">
        <div>
          <h3 className="m-0">{treningArray[stepTrening].title}</h3>
          <span className="small text-muted">
            Шаг {stepTrening + 1} из {treningArray.length}
          </span>
        </div>
        <CloseButton onClick={() => setIsTrening(false)} />
      </div>

      <Popover.Body>
        <div>{treningArray[stepTrening].text}</div>
        <div className="d-flex justify-content-between pt-3 pb-2">
          <Button variant="function" className="p-0" onClick={() => setIsTrening(false)}>
            Завершить обучение
          </Button>
          <div className="d-flex gap-2">
            <Button
              variant="stroke"
              onClick={() => {
                stepTrening === 0 ? setIsTrening(false) : setStepTrening(stepTrening - 1);
              }}
            >
              Назад
            </Button>
            <Button
              onClick={() => {
                stepTrening === treningArray.length - 1 ? setIsTrening(false) : setStepTrening(stepTrening + 1);
              }}
            >
              Далее
            </Button>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Button
        onClick={() => {
          setIsTrening(true);
          setStepTrening(0);
        }}
      >
        Training
      </Button>

      <div className="d-flex gap-3 mt-2">
        <div>
          <OverlayTrigger
            popperConfig={popperConfig}
            trigger="click"
            placement="auto-start"
            show={isTrening && stepTrening === 0}
            overlay={renderPopover}
          >
            <input
              className={classNames('form-control form-control-sm position-relative', {
                'zindex-tooltip': isTrening && stepTrening === 0,
              })}
              placeholder="Поиск по дорогам 1"
            />
          </OverlayTrigger>
        </div>
        <div>
          <OverlayTrigger
            popperConfig={popperConfig}
            trigger="click"
            placement="auto"
            show={isTrening && stepTrening === 1}
            overlay={renderPopover}
          >
            <input
              className={classNames('form-control form-control-sm position-relative', {
                'zindex-tooltip': isTrening && stepTrening === 1,
              })}
              placeholder="Поиск по дорогам 2"
            />
          </OverlayTrigger>
        </div>
        <div>
          <OverlayTrigger
            popperConfig={popperConfig}
            trigger="click"
            placement="auto-end"
            show={isTrening && stepTrening === 2}
            overlay={renderPopover}
          >
            <input
              className={classNames('form-control form-control-sm position-relative', {
                'zindex-tooltip': isTrening && stepTrening === 2,
              })}
              placeholder="Поиск по дорогам 3"
            />
          </OverlayTrigger>
        </div>
      </div>

      <div className={isTrening ? 'modal-backdrop show' : ''} onClick={() => setIsTrening(false)} />

      <hr className="my-5" />
    </>
  );
}

export default Training;
