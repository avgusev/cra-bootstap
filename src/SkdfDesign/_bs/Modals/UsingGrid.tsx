import { useState } from 'react';
import { Button, Col, Container, Modal, ModalProps, Row } from 'react-bootstrap';

function MydModalWithGrid(props: ModalProps) {
  const col = (
    <Col xs={6} md={4}>
      .col-xs-6 .col-md-4
    </Col>
  );
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Using Grid in Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            {col}
          </Row>

          <Row>
            {col}
            {col}
            {col}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function UsingGrid() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <h2>Using the grid</h2>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch modal with grid
      </Button>

      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default UsingGrid;
