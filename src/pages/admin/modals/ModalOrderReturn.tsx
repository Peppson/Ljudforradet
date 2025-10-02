import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { useShowAlert } from "../../../context/AlertProvider";
import type Gear from "../../../interfaces/Gear";
import type Order from "../../../interfaces/Order";
import type OrderItem from "../../../interfaces/OrderItem";
import Logo from "../../../components/Logo";

interface DeleteModalProps {
  show: boolean;
  onHide: () => void;
  item: Order | null;
  gear: Gear[] | null;
  revalidator: { revalidate: () => void };
  orderItems?: OrderItem[];
}

export default function ModalOrderReturn({ show, onHide, item, revalidator, orderItems, gear }: DeleteModalProps) {
  const { showAlert } = useShowAlert();
  const { deleteFetch, putFetch } = useApi();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!item || !orderItems || !gear) return;

  const getOrderTotal = () => {
    return orderItems
      .filter(orderItem => orderItem.orderId === item.id)
      .reduce((total, orderItem) => {
        const order = item as Order;
        const totalDays = Math.ceil((Date.now() - new Date(order.created).getTime()) / (1000 * 60 * 60 * 24));
        const gearItem = gear.find(g => g.id === orderItem.ProductId);
        const dailyPrice = gearItem?.dailyPrice || 0;
        return total + (dailyPrice * totalDays);
      }, 0);
  };

  const handleDelete = async () => {
    if (!item) return;
    setIsDeleting(true);

    const typeName = "orders";
    const response = await deleteFetch(`/api/${typeName}/${item.id}`);

    if (!response || !response.ok) {
      await showAlert({ title: "Error", message: "Något gick fel vid borttagning. Försök igen.", variant: "danger" });
      setIsDeleting(false);
      return;
    }

    ResetProductsAvailability();
    setIsDeleting(false);
    revalidator.revalidate();
    onHide();
  };

  const ResetProductsAvailability = async () => {
    if (!item || !orderItems) return;

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
          <Logo /> Slutför återlämning
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-background p-4">
        <p className="text-light small">
          Är all utrustning återlämnad och i gott skick?
        </p>

        {item && orderItems ? (
          <div className="mb-3">
            <div className="card bg-dark border-light">
              <div className="card-body">
                <h6 className="text-light mb-2">Orderdetaljer:</h6>

                {orderItems
                  .filter(orderItem => orderItem.orderId === item.id)
                  .map((orderItem, index) => {
                    const order = item as Order;
                    const totalDays = Math.ceil((Date.now() - new Date(order.created).getTime()) / (1000 * 60 * 60 * 24));

                    // Get dailyprice and name of gear
                    const days = totalDays > 1 ? "dagar" : "dag";
                    const gearItem = gear.find(x => x.id === orderItem.ProductId);
                    const dailyPrice = gearItem?.dailyPrice || 0; // dangerous fallback ;)
                    const gearName = gearItem?.name || `Produkt ID: ${orderItem.ProductId}`;
                    const itemTotal = dailyPrice * totalDays;

                    return (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-light small">
                          {gearName} × {totalDays} {days}
                        </span>
                        <span className="text-success small fw-bold">
                          {itemTotal} kr
                        </span>
                      </div>
                    );
                  })}

                <hr className="border-light my-2" />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white fw-bold">Totalt:</span>
                  <span className="text-success fw-bold">
                    {getOrderTotal()} kr
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal.Body >

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
          Slutför återlämning
        </Button>
      </Modal.Footer>
    </Modal >
  </>
}
