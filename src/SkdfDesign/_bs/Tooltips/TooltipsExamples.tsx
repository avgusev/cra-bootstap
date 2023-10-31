import { useRef, useState } from 'react';
import { Button, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/types';

function TooltipExample() {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <Button ref={target} onClick={() => setShow(!show)}>
        Click me!
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            My Tooltip
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

function TooltipPlacements() {
  const placements: Placement[] = ['top', 'right', 'bottom', 'left'];
  return (
    <>
      {placements.map((placement) => (
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
              Tooltip on <strong>{placement}</strong>.
            </Tooltip>
          }
        >
          <Button variant="secondary">Tooltip on {placement}</Button>
        </OverlayTrigger>
      ))}
    </>
  );
}

function TooltipsExamples() {
  return (
    <>
      <h2>Tooltip</h2>
      <TooltipExample />
      <h3>Placements</h3>
      <TooltipPlacements />
    </>
  );
}

export default TooltipsExamples;
