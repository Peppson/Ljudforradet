import { Button, Modal } from "react-bootstrap";
import { getCurrentTabName } from "../../../utils/Utilities";
import type Gear from "../../../interfaces/Gear";
import type User from "../../../interfaces/User";
import type Order from "../../../interfaces/Order";
import UserCreate from "../user/UserCreate";
import GearCreate from "../gear/GearCreate";
import OrderCreate from "../order/OrderCreate";
import Logo from "../../../components/Logo";

interface ModalEditProps {
  show: boolean;
  onHide: () => void;
  activeTab: string;
  item: Gear | User | Order | null;
  revalidator: { revalidate: () => void };
  users: User[];
  gear: Gear[];
}

export default function ModalEdit({ show, onHide, activeTab, item, revalidator, users, gear }: ModalEditProps) {
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
        className="modal-background border-light"
        closeVariant="white">
        <Modal.Title>
          <Logo /> Redigera {getCurrentTabName(activeTab)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-background p-4">
        {activeTab === "1" &&
          <GearCreate
            revalidator={revalidator}
            onSuccess={onHide}
            editItem={item as Gear} />}
        {activeTab === "2" &&
          <UserCreate
            revalidator={revalidator}
            onSuccess={onHide}
            editItem={item as User} />}
        {activeTab === "3" &&
          <OrderCreate
            revalidator={revalidator}
            onSuccess={onHide}
            users={users}
            gear={gear} />}
      </Modal.Body>
      <Modal.Footer className="border-light modal-background">
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