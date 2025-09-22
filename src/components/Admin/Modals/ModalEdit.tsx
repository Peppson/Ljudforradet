import { Button, Modal } from "react-bootstrap";
import { getCurrentTabName } from "../../../utils/Utilities";
import type Gear from "../../../interfaces/Gear";
import type User from "../../../interfaces/User";
import type Order from "../../../interfaces/Order";
import Logo from "../../logo";
import UserCreate from "../User/UserCreate";
import GearCreate from "../Gear/GearCreate";
import OrderCreate from "../Order/OrderCreate";

interface ModalEditProps {
  show: boolean;
  onHide: () => void;
  activeTab: string;
  item: Gear | User | Order | null;
  revalidator: { revalidate: () => void };
}

export default function ModalEdit({ show, onHide, activeTab, item, revalidator }: ModalEditProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      backdrop="static"
      dialogClassName="custom-modal-border">
      <Modal.Header
        closeButton
        className="modal-background border-secondary"
        closeVariant="white">
        <Modal.Title>
          <Logo /> Redigera {getCurrentTabName(activeTab)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-background p-4">
        {activeTab === "1" && <GearCreate revalidator={revalidator} onSuccess={onHide} editItem={item as Gear} />}
        {activeTab === "2" && <UserCreate revalidator={revalidator} onSuccess={onHide} editItem={item as User} />}
        {activeTab === "3" && <OrderCreate revalidator={revalidator} onSuccess={onHide} editItem={item as Order} />}
      </Modal.Body>
      <Modal.Footer className="border-secondary modal-background">
        <Button variant="secondary" onClick={onHide}>
          Avbryt
        </Button>
        <Button type="submit" form="registerForm" variant="primary">
          Uppdatera
        </Button>
      </Modal.Footer>
    </Modal>
  );
}