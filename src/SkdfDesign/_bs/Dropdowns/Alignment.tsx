import { ButtonGroup, DropdownButton } from 'react-bootstrap/';
import { separatedItems, menuItems } from './Helpers';

function Alignment() {
  return (
    <>
      <h2>Menu alignment</h2>
      <div className="d-flex gap-1">
        <DropdownButton align="end" variant="secondary" title="Right-aligned menu example">
          {separatedItems}
        </DropdownButton>
        <DropdownButton
          as={ButtonGroup}
          align={{ lg: 'end' }}
          variant="secondary"
          title="Left-aligned but right aligned when large screen"
        >
          {separatedItems}
        </DropdownButton>
        <DropdownButton
          as={ButtonGroup}
          align={{ lg: 'start' }}
          variant="secondary"
          title="Right-aligned but left aligned when large screen"
        >
          {separatedItems}
        </DropdownButton>
      </div>

      <h3>Alignment option</h3>
      <div className="d-flex gap-1">
        <DropdownButton as={ButtonGroup} variant="secondary" title="Dropdown">
          {menuItems}
        </DropdownButton>
        <DropdownButton align="end" as={ButtonGroup} variant="secondary" title="Right-aligned menu">
          {menuItems}
        </DropdownButton>
        <DropdownButton
          align={{ lg: 'end' }}
          as={ButtonGroup}
          variant="secondary"
          title="Left-aligned, right-aligned lg"
        >
          {menuItems}
        </DropdownButton>
      </div>
      <br />
      <div className="d-flex gap-1">
        <DropdownButton
          align={{ lg: 'start' }}
          as={ButtonGroup}
          variant="secondary"
          title="Right-aligned, left-aligned lg"
        >
          {menuItems}
        </DropdownButton>
        <DropdownButton drop="start" as={ButtonGroup} variant="secondary" title="Dropstart">
          {menuItems}
        </DropdownButton>
        <DropdownButton drop="end" as={ButtonGroup} variant="secondary" title="Dropend">
          {menuItems}
        </DropdownButton>
        <DropdownButton drop="up" as={ButtonGroup} variant="secondary" title="Dropup">
          {menuItems}
        </DropdownButton>
      </div>
    </>
  );
}

export default Alignment;
