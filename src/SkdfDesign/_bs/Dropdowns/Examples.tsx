import { Button, ButtonGroup, Dropdown, DropdownButton, SplitButton, Anchor } from 'react-bootstrap';
import { items, separatedItems } from './Helpers';

function Examples() {
  return (
    <>
      <h2>Single Button</h2>
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle variant="secondary">Dropdown Button</Dropdown.Toggle>
        <Dropdown.Menu>{items}</Dropdown.Menu>
      </Dropdown>{' '}
      <DropdownButton className="d-inline-block" variant="secondary" title="Dropdown button">
        {items}
      </DropdownButton>
      <br />
      <p>And with &lt;a&gt; elements:...</p>
      <Dropdown>
        <Dropdown.Toggle className="btn btn-secondary" as={Anchor}>
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>{items}</Dropdown.Menu>
      </Dropdown>
      <br />
      <div className="d-flex gap-1">
        <DropdownButton variant="primary" title="Primary">
          {separatedItems}
        </DropdownButton>
        <DropdownButton variant="secondary" title="Secondary">
          {separatedItems}
        </DropdownButton>
        <DropdownButton variant="success" title="Success">
          {separatedItems}
        </DropdownButton>
        <DropdownButton variant="info" title="Info">
          {separatedItems}
        </DropdownButton>
        <DropdownButton variant="warning" title="Warning">
          {separatedItems}
        </DropdownButton>
        <DropdownButton variant="danger" title="Danger">
          {separatedItems}
        </DropdownButton>
      </div>
      <hr />
      <h2>Split button</h2>
      <div className="d-flex gap-1">
        <Dropdown as={ButtonGroup}>
          <Button variant="primary">Primary</Button>
          <Dropdown.Toggle split variant="primary"></Dropdown.Toggle>
          <Dropdown.Menu>{separatedItems}</Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="secondary">Secondary</Button>
          <Dropdown.Toggle split variant="secondary"></Dropdown.Toggle>
          <Dropdown.Menu>{separatedItems}</Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Button variant="success">Success</Button>
          <Dropdown.Toggle split variant="success"></Dropdown.Toggle>
          <Dropdown.Menu>{separatedItems}</Dropdown.Menu>
        </Dropdown>
        <SplitButton variant="info" title="Info">
          {separatedItems}
        </SplitButton>
        <SplitButton variant="warning" title="Warning">
          {separatedItems}
        </SplitButton>
        <SplitButton variant="danger" title="Danger">
          {separatedItems}
        </SplitButton>
      </div>
      <br />
    </>
  );
}
export default Examples;
