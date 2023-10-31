import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Scrolling() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h2>Scrolling long content</h2>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal scrollable show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ minHeight: '1500px' }}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium neque ipsam earum odio dolorem
              beatae facere voluptate voluptates atque. Dolor blanditiis dolores eaque illo beatae illum quibusdam,
              incidunt ipsam, vitae temporibus, ducimus quidem atque odio nam repellat soluta?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Scrolling;
