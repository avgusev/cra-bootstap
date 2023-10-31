import { DropdownButton, ButtonGroup, SplitButton } from 'react-bootstrap';
import { separatedItems } from './Helpers';

function Directions() {
  return (
    <>
      <h2>Directions</h2>
      <h3>Centered</h3>
      <p>Отсутствует в React-bootstrap...</p>
      <h3>Dropup</h3>
      <DropdownButton variant="secondary" as={ButtonGroup} title="Dropup" drop="up">
        {separatedItems}
      </DropdownButton>{' '}
      <SplitButton variant="secondary" as={ButtonGroup} title="Dropup" drop="up">
        {separatedItems}
      </SplitButton>
      <h3>Dropup centered</h3>
      <p>Отсутствует в React-bootstrap...</p>
      <h3>Dropend</h3>
      <DropdownButton variant="secondary" as={ButtonGroup} title="Dropend" drop="end">
        {separatedItems}
      </DropdownButton>{' '}
      <SplitButton variant="secondary" as={ButtonGroup} title="Dropend" drop="end">
        {separatedItems}
      </SplitButton>
      <h3>Dropstart</h3>
      <DropdownButton variant="secondary" as={ButtonGroup} title="Dropstart" drop="start">
        {separatedItems}
      </DropdownButton>{' '}
      <SplitButton variant="secondary" as={ButtonGroup} title="Dropstart" drop="start">
        {separatedItems}
      </SplitButton>
    </>
  );
}
export default Directions;
