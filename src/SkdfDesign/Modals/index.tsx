import ModalOwner from './ModalOwner';
import ModalNewFilter from './ModalNewFilter';
import ModalSmallTables from './ModalSmallTables';
import ModalSm from './ModalSm';
import ModalTables from './ModalTables';
import { Col, Container, Row } from 'react-bootstrap';
import MCSmallTables from './MCSmallTables';
import MCOwner from './MCOwner';
import MCNewFilter from './MCNewFilter';
import MCSm from './MCSm';
import MCTables from './MCTables';

function Modals() {
  return (
    <>
      <h2>SKDF Modals</h2>
      <Container fluid>
        <Row>
          <Col>
            <h2>Non component</h2>
            <ModalOwner />
            <ModalNewFilter />
            <ModalSmallTables />
            <ModalSm />
            <ModalTables />
          </Col>
          <Col>
            <h2>Component</h2>
            <MCOwner />
            <MCNewFilter />
            <MCSmallTables />
            <MCSm />
            <MCTables />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Modals;
