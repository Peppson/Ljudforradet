/* import { Badge, Button, Col, Modal, Row } from "react-bootstrap";
import { useCart } from "../../context/ShoppingCartProvider";
import type Gear from "../../interfaces/Gear";
import Logo from "../logo";

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
    if (!item.available || isItemInCart)
      return "btn-outline-light";
    return "btn-success";
  };


  // TODO


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
        className="background-color-overlay-darker border-light text-white border-light py-3"
        closeVariant="white">
        <Modal.Title className="h5 mb-0"><Logo /> {item.name}</Modal.Title>
      </Modal.Header>




      <Modal.Body className="background-color-overlay-darker p-4 d-flex flex-column">




        <Row className="mb-1">
          <Col xs={12} className="mb-1">
            <span className="me-2">Märke:</span>
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {item.brand}
            </Badge>
          </Col>

          <Col xs={12} className="mb-1">
            Modell:{" "}
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {item.model}
            </Badge>
          </Col>

          <Col xs={12} className="mb-1 d-flex align-items-center">
            <span className="me-3">Skick:</span>
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {item.condition}
            </Badge>
          </Col>
        </Row>

        <div className="fw-normal m-0 mt-2 ">
          Beskrivning:
        </div>

        <div className="text-light pt-2 text-break">
          {item.desc}
        </div>

        <div>
          <span className="me-2">Pris per dag:</span>
          <Badge
            bg="transparent"
            className="pb-1 fs-6 border border-light fw-normal">
            {item.dailyPrice} kr
          </Badge>
        </div>

      </Modal.Body>



      <Modal.Footer className="border-light background-color-overlay-darker">

        <Button variant="secondary" onClick={onHide}>
          Avbryt
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
 */