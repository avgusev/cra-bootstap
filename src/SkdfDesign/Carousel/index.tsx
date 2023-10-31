import { Modal } from 'react-bootstrap';
import SkdfCarousel from './Carousel';

function CarouselPage() {
  return (
    <div className="modal position-static d-block">
      <Modal.Dialog className="skdf-shadow-down-16dp">
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-0">
          <SkdfCarousel />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default CarouselPage;
