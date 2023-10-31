import { Dropdown } from 'react-bootstrap';

const items = (
  <>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </>
);

const separatedItems = (
  <>
    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
    <Dropdown.Item eventKey="3">Active Item</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
  </>
);

const menuItems = (
  <>
    <Dropdown.Item>Menu item</Dropdown.Item>
    <Dropdown.Item>Menu item</Dropdown.Item>
    <Dropdown.Item>Menu item</Dropdown.Item>
  </>
);

const staticBlockStyles = {
  position: 'static',
  display: 'block',
} as React.CSSProperties;

export { items, separatedItems, menuItems, staticBlockStyles };
