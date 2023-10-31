import useBSScrollSpy from '../../hooks/useBSScrollSpy';
import { Nav } from 'react-bootstrap';
import { Lorem } from '.';

function ScrollSpySimple() {
  const { ref, refTarget } = useBSScrollSpy();

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Nav as="nav" ref={refTarget} variant="pills" className="skdf flex-column">
            <Nav.Link href="#list-item-1">Item 1</Nav.Link>
            <Nav.Link href="#list-item-2">Item 2</Nav.Link>
            <Nav.Link href="#list-item-3">Item 3</Nav.Link>
            <Nav.Link href="#list-item-4">Item 4</Nav.Link>
          </Nav>
        </div>
        <div className="col-9">
          <div ref={ref} style={{ height: '200px', overflow: 'auto' }}>
            <section id="list-item-1">
              <h4>Item 1</h4>
              <Lorem />
            </section>
            <section id="list-item-2">
              <h4>Item 2</h4>
              <Lorem />
            </section>
            <section id="list-item-3">
              <h4>Item 3</h4>
              <Lorem />
            </section>
            <section id="list-item-4">
              <h4>Item 4</h4>
              <Lorem />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollSpySimple;
