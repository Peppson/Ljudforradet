import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useShowAlert } from "../context/AlertProvider";
import { useState } from "react";
import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import { useCart } from "../context/ShoppingCartProvider";
import Divider from "./Divider";
import Logo from "./logo";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { postFetch } = useApi();
  const { showAlert } = useShowAlert();
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    navigate("/order/14");
    closeCart();

    /* try {
      // Create order
      const orderData = {
        items: cartItems.map(item => ({
          ProductId: item.id,
          // Add any other order item properties you need
        }))
      };

      const response = await postFetch("/api/orders", orderData);

      if (!response || !response.ok) {
        await showAlert({
          title: "Fel",
          message: "Något gick fel vid beställningen. Försök igen.",
          variant: "danger"
        });
        return;
      }

      const order = await response.json();

      // Clear cart and close it
      clearCart();
      closeCart();

      // Navigate to confirm page with order ID
      navigate(`/confirm/${order.id}`);

    } catch (error) {
      await showAlert({
        title: "Fel",
        message: "Något gick fel vid beställningen. Försök igen.",
        variant: "danger"
      });
    } finally {
      setIsProcessing(false);
    } */
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
            onClick={() => { handleCheckout() }}>
            <i className="bi bi-cart-check pe-2"></i>Slutför
          </Button>
        </Col>
      </Row>
    </Offcanvas >
  </>;
}
