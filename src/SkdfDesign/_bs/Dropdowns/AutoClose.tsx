import { Dropdown } from 'react-bootstrap';
import { menuItems } from './Helpers';

function AutoClose() {
  return (
    <>
      <h2>Auto close behavior</h2>
      <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle variant="secondary">Default dropdown</Dropdown.Toggle>

        <Dropdown.Menu>{menuItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown className="d-inline mx-2" autoClose="inside">
        <Dropdown.Toggle variant="secondary">Clickable outside</Dropdown.Toggle>

        <Dropdown.Menu>{menuItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown className="d-inline mx-2" autoClose="outside">
        <Dropdown.Toggle variant="secondary">Clickable inside</Dropdown.Toggle>

        <Dropdown.Menu>{menuItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown className="d-inline mx-2" autoClose={false}>
        <Dropdown.Toggle variant="secondary">Manual close</Dropdown.Toggle>

        <Dropdown.Menu>{menuItems}</Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default AutoClose;
