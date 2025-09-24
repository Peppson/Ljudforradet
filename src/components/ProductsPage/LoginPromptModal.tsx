import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../logo";

interface ModalCreateProps {
  show: boolean;
  onHide: () => void;
}

export default function LoginPromptModal({ show, onHide }: ModalCreateProps) {
  const navigate = useNavigate();

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
        className="modal-background border-light"
        closeVariant="white">
        <Modal.Title>
          <Logo /> Logga in
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-background p-4">
        <div className="text-white">
          <h6>Du behöver vara inloggad för se ytterligare information</h6>
          <ul>
            <li className="text-light">Om du inte har ett konto, vänligen registrera dig först.</li>
          </ul>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-light modal-background">
        <Button variant="secondary" onClick={onHide}>
          Avbryt
        </Button>
        <Button
          onClick={() => { navigate("/login") }}
          variant="primary">
          Logga in
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
