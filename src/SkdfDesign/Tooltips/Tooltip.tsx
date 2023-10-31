import { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Form, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';
import { placements, Select } from '.';
import { OverlayInjectedProps } from 'react-bootstrap/Overlay';

const popperConfig = { modifiers: [{ name: 'offset', options: { offset: [0, 4] } }] };

const UpdatingTooltip = forwardRef<HTMLDivElement, OverlayInjectedProps>(
  ({ popper, children, show: _, ref, ...props }, forwardedRef) => {
    useEffect(() => {
      if (popper && popper.scheduleUpdate) popper.scheduleUpdate();
    }, [children, popper]);

    return (
      <Tooltip ref={forwardedRef} {...props}>
        {children}
      </Tooltip>
    );
  }
);

function TooltipOverlay() {
  const [placement, setPlacement] = useState<Placement>('right');
  const [isShort, setIsShort] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div className="row mb-5">
      <h2>Overlay</h2>
      <div className="col-4">
        <form>
          <Select
            options={placements}
            defaultValue={placement}
            onChange={(value) => setPlacement(value as Placement)}
          />
          <Form.Check
            id="shortLongCheck"
            label="Short text"
            defaultChecked={isShort}
            onClick={(e) => {
              setIsShort(e.currentTarget.checked);
            }}
          />
        </form>
      </div>
      <div className="col-8">
        <Button size="sm" ref={target} onClick={() => setShow(!show)}>
          TooltipOverlay (click)
        </Button>
        <Overlay target={target.current} show={show} placement={placement} flip popperConfig={popperConfig}>
          {(props) => (
            <UpdatingTooltip {...props}>
              {isShort ? 'Lorem' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
            </UpdatingTooltip>
          )}
        </Overlay>
      </div>
    </div>
  );
}

function TooltipOverlayTrigger() {
  return (
    <>
      <h2>OverlayTrigger</h2>
      <OverlayTrigger
        placement="right"
        popperConfig={popperConfig}
        overlay={<Tooltip>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Tooltip>}
      >
        <Button variant="secondary">TooltipOverlayTrigger</Button>
      </OverlayTrigger>
    </>
  );
}

function TooltipExample() {
  return (
    <div className="container">
      <TooltipOverlay />
      <TooltipOverlayTrigger />
    </div>
  );
}

export default TooltipExample;
