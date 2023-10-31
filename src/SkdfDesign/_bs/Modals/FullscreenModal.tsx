import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function FullscreenModal() {
  const values: (string | true)[] = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState<string | true>(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint: string | true) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      <h2>Fullscreen Modal</h2>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
          Full screen
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>
    </>
  );
}

export default FullscreenModal;
