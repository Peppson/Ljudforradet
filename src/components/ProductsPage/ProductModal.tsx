import { Badge, Button, Col, Modal, Row } from "react-bootstrap";
import { useCart } from "../../context/ShoppingCartProvider";
import type Gear from "../../interfaces/Gear";
import InfoCard from "./InfoCard";

interface ProductModalProps {
  show: boolean;
  item: Gear | null;
  onHide: () => void;
}

export default function ProductModal({ item, show, onHide }: ProductModalProps) {
  const { addToCart, cartItems } = useCart();

  if (!item) return null;

  const isItemInCart = cartItems.some(cartItem => cartItem.id === item.id);

  const getButtonText = () => {
    if (!item.available) return "Uthyrd";
    if (isItemInCart) return "Tillagd";
    return "Boka";
  };

  const getButtonClass = () => {
    if (!item.available)
      return "btn-danger";
    if (isItemInCart)
      return "btn-outline-success";
    return "btn-success";
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      size="lg"
      dialogClassName="custom-modal-border">

      <Modal.Body className="background-color-overlay-darker p-3 rounded-top-3">
        <Row className="mb-3 text-light">
          <h4 className="text-white mb-0">{item.name}</h4>
        </Row>

        <Row className="mb-4">
          <Col>
            <div className="position-relative">
              <img
                src={`/images/products/${item.type}.png` || "/images/products/Övrigt.png"}
                className="w-100 rounded img-overlay-dark"
                alt={item.type}
                style={{ height: "280px", objectFit: "cover" }} />
            </div>
          </Col>
        </Row>

        <Row className="g-2 mb-2">
          <InfoCard icon="bi-tag" label="Märke" value={item.brand} />
          <InfoCard icon="bi-hash" label="Modell" value={item.model} />
          <InfoCard icon="bi-star" label="Skick" value={item.condition} />
          <InfoCard icon="bi-layers" label="Typ" value={item.type} />
          <InfoCard icon="bi-cash" label="Pris/dag" value={`${item.dailyPrice} kr`} />
        </Row>

        <Row>
          <Col>
            <div className="card background-color-overlay border-light">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <small className="text-light mb-0 fw-semibold">Beskrivning</small>
                  <i className={`bi bi-info-circle text-light ms-1`}></i>
                </div>
                <p className="text-primary mb-0 small">
                  {item.desc || "Ingen beskrivning tillgänglig för denna produkt."}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="border-light background-color-overlay-darker text-center">
        <Button variant="secondary" onClick={onHide} className="px-3">
          Stäng
        </Button>
        <Button
          onClick={() => { addToCart(item); onHide(); }}
          className={`${getButtonClass()} hover-grow button-exact-width-small`}
          disabled={!item.available || isItemInCart}>
          {getButtonText()}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}