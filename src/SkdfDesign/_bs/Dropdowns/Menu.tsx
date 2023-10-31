import { Dropdown, DropdownButton } from 'react-bootstrap/';
import { items, staticBlockStyles } from './Helpers';

function Menu() {
  return (
    <>
      <h2>Menu items</h2>
      <DropdownButton variant="secondary" title="Dropdown">
        <Dropdown.Item as="button">Action</Dropdown.Item>
        <Dropdown.Item as="button">Another action</Dropdown.Item>
        <Dropdown.Item as="button">Something else</Dropdown.Item>
      </DropdownButton>

      <h3>Non-interactive</h3>
      <Dropdown.Menu show style={staticBlockStyles}>
        <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
        {items}
      </Dropdown.Menu>

      <h3>Active</h3>
      <Dropdown.Menu show style={staticBlockStyles}>
        <Dropdown.Item>Regular link</Dropdown.Item>
        <Dropdown.Item active>Regular link</Dropdown.Item>
        <Dropdown.Item>Regular link</Dropdown.Item>
      </Dropdown.Menu>
      <h3>Disabled</h3>
      <Dropdown.Menu show style={staticBlockStyles}>
        <Dropdown.Item>Regular link</Dropdown.Item>
        <Dropdown.Item disabled>Regular link</Dropdown.Item>
        <Dropdown.Item>Regular link</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
}

export default Menu;
