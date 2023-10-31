import { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Button from '../../components/Button';
import CloseButton from '../../components/CloseButton';

const popperConfig = { modifiers: [{ name: 'offset', options: { offset: [0, 20] } }] };

function PopoverSmall() {
  const [show, setShow] = useState(false);
  const close = () => setShow(false);

  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      popperConfig={popperConfig}
      show={show}
      onToggle={(nextShow) => setShow(nextShow)}
      overlay={
        <Popover className="skdf-popover-sm">
          <Popover.Body>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <h3 className="m-0">Заголовок</h3>
                <span className="text-caption">Caption</span>
              </div>
              {/* <CloseButton onClick={close} /> */}
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <Button variant="stroke" className="mt-4 w-100" onClick={close}>
              Сбросить все фильтры
            </Button>
          </Popover.Body>
        </Popover>
      }
    >
      <Button>Popover (click)</Button>
    </OverlayTrigger>
  );
}

function PopoverMedium() {
  const [show, setShow] = useState(false);
  const close = () => setShow(false);

  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      popperConfig={popperConfig}
      show={show}
      onToggle={(nextShow) => setShow(nextShow)}
      overlay={
        <Popover className="skdf-popover-md">
          <Popover.Body>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <h3 className="m-0">880 330 дорог</h3>
                <span className="text-caption">Протяжённостью 1 451 142,989 км</span>
              </div>
              {/* <CloseButton onClick={close} /> */}
            </div>
            <div>Проверенные дороги, шт Протяжённость опорной сети, км</div>
            <Button variant="function" className="mt-3" onClick={close}>
              Подробнее
            </Button>
          </Popover.Body>
        </Popover>
      }
    >
      <Button>Popover (click)</Button>
    </OverlayTrigger>
  );
}

function PopoverLarge() {
  const [show, setShow] = useState(false);
  const close = () => setShow(false);

  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      popperConfig={popperConfig}
      show={show}
      onToggle={(nextShow) => setShow(nextShow)}
      overlay={
        <Popover className="skdf-popover-lg">
          <Popover.Body>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <h3 className="m-0">Заголовок</h3>
                <span className="text-caption">Caption</span>
              </div>
              <CloseButton onClick={close} />
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <div className="d-flex justify-content-between gap-2 mt-3">
              <Button variant="function" className="p-0" onClick={close}>
                Button
              </Button>
              <div className="flex-grow-1" />
              <Button variant="stroke" onClick={close}>
                Button
              </Button>
              <Button onClick={close}>Button</Button>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <Button>Popover (click)</Button>
    </OverlayTrigger>
  );
}

function PopoverExample() {
  return (
    <div>
      <h2>Small</h2>
      <PopoverSmall />
      <h2>Medium</h2>
      <PopoverMedium />
      <h2>Large</h2>
      <PopoverLarge />
    </div>
  );
}

export default PopoverExample;
