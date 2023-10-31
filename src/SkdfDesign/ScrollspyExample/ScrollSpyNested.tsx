import useBSScrollSpy from '../../hooks/useBSScrollSpy';
import { Accordion, Nav } from 'react-bootstrap';
import { Lorem } from '.';
import { useEffect, useState } from 'react';

function ScrollSpyNested() {
  const { ref, refTarget, active } = useBSScrollSpy(false);
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    setActiveKey(active.replace(/-\d+$/, ''));
  }, [active]);

  return (
    <div className="container">
      <div className="row">
        <div ref={refTarget} className="col-3">
          <h4>{active}</h4>
          <Accordion activeKey={activeKey} flush onSelect={(eventKey) => setActiveKey(eventKey as string)}>
            <Accordion.Item eventKey="#item-1">
              <Accordion.Header className="mt-4">
                <span className="h4 mb-0" style={{ marginLeft: '0.75rem' }}>
                  Item 1
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <Nav variant="pills" className="skdf flex-column">
                  <Nav.Link href="#item-1-1">Item 1-1</Nav.Link>
                  <Nav.Link href="#item-1-2">Item 1-2</Nav.Link>
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="#item-2">
              <Accordion.Header className="mt-4">
                <span className="h4 mb-0" style={{ marginLeft: '0.75rem' }}>
                  Item 2
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <Nav variant="pills" className="skdf flex-column">
                  <Nav.Link href="#item-2-1">Item 2-1</Nav.Link>
                  <Nav.Link href="#item-2-2">Item 2-2</Nav.Link>
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="#item-3">
              <Accordion.Header className="mt-4">
                <span className="h4 mb-0" style={{ marginLeft: '0.75rem' }}>
                  Item 3
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <Nav variant="pills" className="skdf flex-column">
                  <Nav.Link href="#item-3-1">Item 3-1</Nav.Link>
                  <Nav.Link href="#item-3-2">Item 3-2</Nav.Link>
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="col-9">
          <div ref={ref} style={{ height: '300px', overflow: 'auto' }}>
            <section id="item-1-1">
              <h4>Item 1-1</h4>
              <Lorem />
            </section>
            <section id="item-1-2">
              <h4>Item 1-2</h4>
              <Lorem />
            </section>
            <section id="item-2-1">
              <h4>Item 2-1</h4>
              <Lorem />
            </section>
            <section id="item-2-2">
              <h4>Item 2-2</h4>
              <Lorem />
            </section>
            <section id="item-3-1">
              <h4>Item 3-1</h4>
              <Lorem />
            </section>
            <section id="item-3-2">
              <h4>Item 3-2</h4>
              <Lorem />
            </section>

            {/* <h4 id="item-1">Item 1</h4>
            <Lorem />
            <h4 id="item-1-1">Item 1-1</h4>
            <Lorem />
            <h4 id="item-1-2">Item 1-2</h4>
            <Lorem />
            <h4 id="item-2">Item 2</h4>
            <Lorem />
            <h4 id="item-3">Item 3</h4>
            <Lorem />
            <h4 id="item-3-1">Item 3-1</h4>
            <Lorem />
            <h4 id="item-3-2">Item 3-2</h4>
            <Lorem /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollSpyNested;
