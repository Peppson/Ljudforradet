import { useNavigate } from "react-router-dom";
import { Offcanvas, Button, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { useShowAlert } from "../context/AlertProvider";
import { useCart } from "../context/ShoppingCartProvider";
import { useAuth } from "../context/AuthProvider";
import { validateCreateOrderResponse } from "../utils/Utilities";
import Divider from "./Divider";
import Logo from "./logo";

export default function ShoppingCart() {
  const { postFetch, putFetch } = useApi();
  const { showAlert } = useShowAlert();
  const { user } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  const {
    showCart,
    closeCart,
    cartItems,
    totalPrice,
    removeFromCart,
    clearCart
  } = useCart();

  const isButtonDisabled = () => {
    return cartItems.length === 0;
  };

  const handleCheckoutClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCheckout = async () => {
    setShowConfirmModal(false);

    if (cartItems.length === 0) return;

    try {
      // Order
      const response = await postFetch("/api/orders", { userId: user!.id });
      const validation = await validateCreateOrderResponse(response);
      if (!validation.isValid) {
        await showAlert({ title: "Error", message: "Något gick fel. Försök igen.", variant: "danger" });
        return;
      }

      const orderData = validation.data;
      const orderId = orderData.insertId;

      // OrderItems
      const orderItemPromises = cartItems.map(item =>
        postFetch("/api/orderItems", {
          orderId: orderId,
          productId: item.id
        })
      );
      await Promise.all(orderItemPromises);

      // Gear
      const gearUpdatePromises = cartItems.map(item =>
        putFetch(`/api/products/${item.id}`, {
          available: 0
        })
      );
      await Promise.all(gearUpdatePromises);

      clearCart();
      closeCart();
      navigate(`/order/${orderId}`);

    } catch (error) {
      await showAlert({ title: "Error", message: "Något gick fel. Försök igen.", variant: "danger" });
    }
  };

  return <>
    <Offcanvas
      show={showCart}
      onHide={closeCart}
      placement="end"
      className="background-color-overlay-darker">

      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title className="pt-1">
          <Logo height={32} width={32} />
          <b className="ms-2">Kundvagn</b>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Divider />

      <Offcanvas.Body>
        {cartItems.length === 0 && (
          <p className="text-center text-light">Din kundvagn är tom</p>
        )}
        {cartItems.map((item, index) => (
          <Row key={item.id} className="my-2 d-flex align-items-center">
            <Col xs={6} className="text-primary">
              {index + 1}. {item.name}
            </Col>
            <Col xs={4} className="text-light text-end">
              {item.dailyPrice} kr
            </Col>
            <Col xs={2} className="text-end">
              <Button
                variant="light"
                className="bg-transparent border-0 "
                size="sm"
                onClick={() => removeFromCart(item.id)}>
                <i className="bi bi-x-lg"></i>
              </Button>
            </Col>
            <Divider />
          </Row>
        ))}
      </Offcanvas.Body>

      <Divider />

      <Row className="px-3 pt-3">
        <Col className="px-2 text-start text-light"> Pris/dag:</Col>
        <Col className="px-2 text-end">{totalPrice} kr</Col>
      </Row>
      <Row className="px-3 pt-2">
        <Col className="px-2 text-start text-light">Utrustning:</Col>
        <Col className="px-2 text-end">{cartItems.length} st</Col>
      </Row>
      <Row className="px-3 py-3 pb-4">
        <Col className="px-2">
          <Button
            variant="secondary"
            disabled={isButtonDisabled()}
            onClick={() => { clearCart(); }}
            className="w-100">
            <i className="bi bi-cart-x pe-2"></i>Töm
          </Button>
        </Col>
        <Col className="px-2">
          <Button
            variant="success"
            className="w-100"
            disabled={isButtonDisabled()}
            onClick={() => { handleCheckoutClick() }}>
            <i className="bi bi-cart-check pe-2"></i>Slutför
          </Button>
        </Col>
      </Row>
    </Offcanvas >

    <Modal
      show={showConfirmModal}
      onHide={() => setShowConfirmModal(false)}
      centered
      backdrop="static"
      dialogClassName="custom-modal-border"
      className="text-dark">
      <Modal.Header
        closeButton
        className="modal-background border-light"
        closeVariant="white">
        <Modal.Title>Bekräfta beställning</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-background">
        <p className="text-light ">Är du säker på att du vill slutföra beställningen?</p>
        <div className="card bg-dark border-light mb-4">
          <div className="card-body">

            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-light small">
                  {index + 1}. {item.name}
                </span>
                <span className="text-success small fw-bold">
                  {item.dailyPrice} kr
                </span>
              </div>
            ))}
            <hr className="border-light my-2" />
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-white">Pris/dag:</span>
              <span className="text-success">
                {totalPrice} kr
              </span>
            </div>
          </div>
        </div>
      </Modal.Body >

      <Modal.Footer className="border-light modal-background">
        <Button
          variant="secondary"
          onClick={() => setShowConfirmModal(false)}>
          Avbryt
        </Button>
        <Button
          variant="success"
          onClick={handleConfirmCheckout}>
          Slutför beställning
        </Button>
      </Modal.Footer>
    </Modal >
  </>;
}
