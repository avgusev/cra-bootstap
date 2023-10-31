import { RefAttributes, useRef, useState } from 'react';
import { Button, Overlay, OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import SkdfIcon from '../../../components/SkdfIcon';

const renderTooltip = (props: TooltipProps & RefAttributes<HTMLDivElement>) => (
  <Tooltip id="button-tooltip" {...props}>
    Simple tooltip
  </Tooltip>
);

function OverlayExample() {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
        Click me to see
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Simple tooltip
          </div>
        )}
      </Overlay>
    </>
  );
}

function OverlayDelay() {
  return (
    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
      <Button variant="success">Hover me to see</Button>
    </OverlayTrigger>
  );
}

function CustomizingTrigger() {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>}>
      {({ ref, ...triggerHandler }) => (
        <Button variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
          {/* <Image ref={ref} roundedCircle src="holder.js/20x20?text=J&bg=28a745&fg=FFF" /> */}
          <div ref={ref}>
            <SkdfIcon name="info" />
          </div>
          <span className="ms-1">Hover to see</span>
        </Button>
      )}
    </OverlayTrigger>
  );
}

function Overlays() {
  return (
    <>
      <h2>Overlay</h2>
      <OverlayExample />
      <h2>OverlayTrigger</h2>
      <OverlayDelay />
      <h2>Customizing trigger behavior</h2>
      <CustomizingTrigger />
    </>
  );
}

export default Overlays;
