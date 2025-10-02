import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import config from "../config/Config";
import Logo from "./Logo";

interface StartupModalProps {
  onClose?: () => void;
}

export default function StartupModal({ onClose }: StartupModalProps) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem(config.startupModalStorageKey, "true"); // Dont show this again
    onClose?.();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      size="lg"
      dialogClassName="custom-modal-border"
      backdropClassName="modal-backdrop">
      <Modal.Header
        closeButton
        className="modal-background border-light"
        closeVariant="white">
        <Modal.Title>
          <Logo /> Information
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-background px-4 pt-4">
        <div className="text-white">
          <h6>Admin:</h6>
          <ul>
            <li className="text-light">E-post: thomas@nodehill.com</li>
            <li className="text-light">Lösenord: 123456</li>
          </ul>
          <h6>User:</h6>
          <ul>
            <li className="text-light">E-post: user@user.com</li>
            <li className="text-light">Lösenord: 123456</li>
          </ul>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-light modal-background">
        <div className="d-flex flex-column flex-sm-row align-items-center w-100 gap-2">
          <p className="text-light px-2 m-0 flex-grow-1">
            Detta fönster visas endast första gången sidan laddas.
          </p>
          <Button variant="primary" onClick={handleClose}>
            Förstått
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
