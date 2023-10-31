import { Button, Modal } from 'react-bootstrap';

function Examples() {
  return (
    <>
      <h2>Examples</h2>
      <div className="modal position-static d-block bg-dark" tabIndex={-1}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
}

export default Examples;
