import { useContext } from 'react';
import { Accordion, AccordionContext, Card, useAccordionButton } from 'react-bootstrap';

const accordionList = (
  <>
    <Accordion.Item eventKey="0">
      <Accordion.Header>Accordion Item #1</Accordion.Header>
      <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header>Accordion Item #2</Accordion.Header>
      <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Accordion.Body>
    </Accordion.Item>
  </>
);

function CustomToggle({ children = 'Click me!', eventKey = '0' }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => console.log('totally custom!'));

  return (
    <button type="button" style={{ backgroundColor: 'pink' }} onClick={decoratedOnClick}>
      {children}
    </button>
  );
}

function ContextAwareToggle({ children = 'Click me!', eventKey = '0' }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, () => console.log('Click me'));

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function Accordions() {
  return (
    <>
      <h1>
        <a href="https://react-bootstrap.netlify.app/components/accordion" target="_blank" rel="noreferrer">
          Accordion
        </a>
      </h1>

      <h2>Examples</h2>
      <Accordion defaultActiveKey="0">{accordionList}</Accordion>

      <h2>Fully Collapsed State</h2>
      <Accordion>{accordionList}</Accordion>

      <h2>Flush</h2>
      <Accordion defaultActiveKey="0" flush>
        {accordionList}
      </Accordion>

      <h2>Always open</h2>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {accordionList}
      </Accordion>

      <hr className="my-5" />

      <h2>Custom Accordions</h2>

      <h3>Custom Toggle</h3>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <CustomToggle eventKey="0">Click me!</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <CustomToggle eventKey="1">Click me!</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <h3>Custom Toggle with Expansion Awareness</h3>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <ContextAwareToggle eventKey="1">Click me!</ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <hr className="my-5" />
    </>
  );
}

export default Accordions;
