import { Badge, Button, Col, Modal, Row } from "react-bootstrap";
import type Gear from "../../interfaces/Gear";
import Logo from "../logo";


interface ProductModalProps {
  show: boolean;
  item: Gear | null;
  onHide: () => void;
}

export default function ProductModal({ item, show, onHide }: ProductModalProps) {
  if (!item) return null;


  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      size="lg"
      dialogClassName="custom-modal-border">


      <Modal.Header
        closeButton
        className="background-color-overlay-darker border-light text-white border-light py-3"
        closeVariant="white">
        <Modal.Title className="h5 mb-0"><Logo /> {item.name}</Modal.Title>
      </Modal.Header>




      <Modal.Body className="background-color-overlay-darker p-4 d-flex flex-column">




        <Row className="mb-1">
          <Col xs={12} className="mb-1">
            <span className="me-2">Märke:</span>
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {item.brand}
            </Badge>
          </Col>

          <Col xs={12} className="mb-1">
            Modell:{" "}
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {item.model}
            </Badge>
          </Col>

          <Col xs={12} className="mb-1 d-flex align-items-center">
            <span className="me-3">Skick:</span>
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {item.condition}
            </Badge>
          </Col>
        </Row>

        <div className="fw-normal m-0 mt-2">
          Beskrivning:
        </div>

        <div className="text-light pt-2">
          {item.desc}
        </div>

        <div>
          <span className="me-2">Pris per dag:</span>
          <Badge
            bg="transparent"
            className="pb-1 fs-6 border border-light fw-normal">
            {item.dailyPrice} kr
          </Badge>
        </div>

      </Modal.Body>



      <Modal.Footer className="border-light background-color-overlay-darker">

        <Button variant="secondary" onClick={onHide}>
          Avbryt
        </Button>

        <Button variant="success">
          Lägg till
        </Button>


      </Modal.Footer>
    </Modal>
  );
}



/*
<Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      size="lg"
      dialogClassName="custom-modal-border">

      <Modal.Header
        closeButton
        className="modal-background border-light"
        closeVariant="white">
        <Modal.Title>
          <Logo /> {gear.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-background p-4">


      </Modal.Body>

      <Modal.Footer className="border-light modal-background">
        <Button variant="secondary" onClick={onHide}>
          Avbryt
        </Button>
        <Button variant="primary">
          Skapa
        </Button>
      </Modal.Footer>
    </Modal>

*/