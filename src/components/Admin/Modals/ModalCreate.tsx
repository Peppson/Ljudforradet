import { Button, Modal } from "react-bootstrap";
import { getCurrentTabName } from "../../../utils/Utilities";
import type User from "../../../interfaces/User";
import type Gear from "../../../interfaces/Gear";
import GearCreate from "../Gear/GearCreate";
import UserCreate from "../User/UserCreate";
import OrderCreate from "../Order/OrderCreate";
import Logo from "../../logo";

interface ModalCreateProps {
  show: boolean;
  onHide: () => void;
  activeTab: string;
  revalidator: { revalidate: () => void };
  users: User[];
  gear: Gear[];
}

export default function ModalCreate({ show, onHide, activeTab, revalidator, users, gear }: ModalCreateProps) {
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
          <Logo /> Skapa ny {getCurrentTabName(activeTab)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-background p-4">
        {activeTab === "1" && <GearCreate revalidator={revalidator} onSuccess={onHide} />}
        {activeTab === "2" && <UserCreate revalidator={revalidator} onSuccess={onHide} />}
        {activeTab === "3" && <OrderCreate revalidator={revalidator} onSuccess={onHide} users={users} gear={gear} />}
      </Modal.Body>
      <Modal.Footer className="border-light modal-background">
        <Button variant="secondary" onClick={onHide}>
          Avbryt
        </Button>
        <Button type="submit" form="registerForm" variant="primary">
          Skapa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
