import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { useShowAlert } from "../../../context/AlertProvider";
import type Gear from "../../../interfaces/Gear";
import type User from "../../../interfaces/User";
import type Order from "../../../interfaces/Order";
import type OrderItem from "../../../interfaces/OrderItem";
import Logo from "../../logo";

interface DeleteModalProps {
  show: boolean;
  onHide: () => void;
  item: Gear | User | Order | null;
  type: string;
  revalidator: { revalidate: () => void };
  orderItems?: OrderItem[];
}

export default function ModalDelete({ show, onHide, item, type, revalidator, orderItems }: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showAlert } = useShowAlert();
  const { deleteFetch, putFetch } = useApi();

  const getItemName = () => {
    if (!item) return "";
    if (type === "order") return "Order";
    return (item as any).name || "";
  };

  const getItemTypeName = () => {
    switch (type) {
      case "gear": return "utrustning";
      case "user": return "användare";
      case "order": return "order";
      default: return "objekt";
    }
  };

  const handleDelete = async () => {
    if (!item) return;
    setIsDeleting(true);
    const typeName = type == "gear" ? "products" : `${type}s`;

    const response = await deleteFetch(`/api/${typeName}/${item.id}`);

    if (!response || !response.ok) {
      await showAlert({ title: "Error", message: "Något gick fel vid borttagning. Försök igen.", variant: "danger" });
      setIsDeleting(false);
      return;
    }

    if (type == "order")
      ResetProductsAvailability();

    setIsDeleting(false);
    revalidator.revalidate();
    onHide();
  };

  const ResetProductsAvailability = async () => {
    if (!item || type !== "order" || !orderItems) return;

    const order = item as Order;
    const orderItemsForThisOrder = orderItems.filter(x => x.orderId === order.id);

    try {
      await Promise.all(
        orderItemsForThisOrder.map(orderItem =>
          putFetch(`/api/products/${orderItem.ProductId}`, {
            available: 1
          })
        )
      );

      revalidator.revalidate();
    } catch (error) {
      await showAlert({ title: "Error", message: `Något gick fel vid borttagning. ${error}`, variant: "danger" })
    }
  };

  return <>
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      dialogClassName="custom-modal-border">
      <Modal.Header
        closeButton
        className="modal-background border-light"
        closeVariant="white">
        <Modal.Title>
          <Logo /> Ta bort {getItemTypeName()}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-background p-4">
        <p className="text-white">
          Är du säker på att du vill ta bort "{getItemName()}"?
        </p>
        <p className="text-light small">
          Åtgärden kan inte ångras.
        </p>
      </Modal.Body>

      <Modal.Footer className="border-light modal-background">
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={isDeleting}>
          Avbryt
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={isDeleting}>
          Ta bort
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}
