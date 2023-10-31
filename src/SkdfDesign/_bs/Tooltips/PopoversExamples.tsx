import { useRef, useState } from 'react';
import { Button, Overlay, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/types';

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover.Body>
  </Popover>
);

function PopoverExample() {
  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant="success">Click me to see</Button>
    </OverlayTrigger>
  );
}

function PopoverPlacements() {
  const placements: Placement[] = ['top', 'right', 'bottom', 'left'];
  return (
    <>
      {placements.map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Header as="h3">{`Popover ${placement}`}</Popover.Header>
              <Popover.Body>
                <strong>Holy guacamole!</strong> Check this info.
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">Popover on {placement}</Button>
        </OverlayTrigger>
      ))}
    </>
  );
}

function DisabledElements() {
  return (
    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Tooltip!</Tooltip>}>
      <span className="d-inline-block">
        <Button disabled style={{ pointerEvents: 'none' }}>
          Disabled button
        </Button>
      </span>
    </OverlayTrigger>
  );
}

function ChangingContainers() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<HTMLButtonElement | null>(null);
  const ref = useRef(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShow(!show);
    setTarget(event.target as HTMLButtonElement);
  };
  return (
    <div ref={ref}>
      <Button onClick={handleClick}>Holy guacamole!</Button>

      <Overlay show={show} target={target} placement="bottom" container={ref} containerPadding={20}>
        <Popover id="popover-contained">
          <Popover.Header as="h3">Popover bottom</Popover.Header>
          <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

function PopoversExamples() {
  return (
    <>
      <h2>Popovers</h2>
      <PopoverExample />
      <h3>Placements</h3>
      <PopoverPlacements />
      <h2>Disabled elements</h2>
      <DisabledElements />
      <h2>Changing containers</h2>
      <ChangingContainers />
      <h2>Updating position dynamically...</h2>
      <hr className="my-5" />
    </>
  );
}

export default PopoversExamples;
