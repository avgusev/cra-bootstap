import { ButtonGroup, DropdownButton, SplitButton } from 'react-bootstrap';
import { separatedItems } from './Helpers';

function Sizing() {
  return (
    <>
      <h2>Sizing</h2>
      <div>
        <DropdownButton variant="secondary" as={ButtonGroup} size="lg" title="Large Button">
          {separatedItems}
        </DropdownButton>{' '}
        <SplitButton variant="secondary" as={ButtonGroup} size="lg" title="Large Button">
          {separatedItems}
        </SplitButton>
      </div>
      <br />
      <div>
        <DropdownButton variant="secondary" as={ButtonGroup} size="sm" title="Small button">
          {separatedItems}
        </DropdownButton>{' '}
        <SplitButton variant="secondary" as={ButtonGroup} size="sm" title="Small button">
          {separatedItems}
        </SplitButton>
      </div>
    </>
  );
}

export default Sizing;
