import { useCart } from "../context/ShoppingCartProvider";
import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import Divider from "./Divider";
import Logo from "./logo";

export default function ShoppingCart() {
  const {
    showShoppingCart,
    closeCart: closeShoppingCart,
    cartItems,
    totalPrice,
    removeFromCart,
    clearCart
  } = useCart();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    /* updateQuantity(productId, newQuantity); */
  };


  return <>
    <Offcanvas
      show={showShoppingCart}
      onHide={closeShoppingCart}
      placement="end"
      className="background-color-overlay-darker">

      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title className="pt-1">
          <Logo height={32} width={32} />
          <b className="ms-2">Kundvagn</b>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Divider />

      <Offcanvas.Body className="background-color-overlay">
        {/*  {cartContents.status ||
          <table className="table table-primary table-sm table-striped">
            <tbody>
              {cartContents.map(
                ({ productId, productName, quantity, productPrice$, rowSum$ }: CartLine, i: number) =>
                  <tr key={i} style={productId ? {} : { fontWeight: 'bold' }}>

                    <td colSpan={productId ? 1 : 2}>{productName}</td>
                    <td className="text-end">{productId ? '$' + productPrice$.toFixed(2) : ''}</td>
                    <td className="text-center">{productId ? '×' : ''}</td>
                    <td className="text-end">{!productId ? '' :
                      <input
                        placeholder="1"
                        type="number"
                        min="1"
                        max="99"
                        data-value={quantity}
                        defaultValue={quantity}
                        onChange={e => quantityChange(e, productId)}
                      />}
                    </td>

                    <td className="text-end">${rowSum$.toFixed(2)}</td>
                    <td>{productId ?
                      <i
                        className="bi bi-trash3-fill"

                      ></i> :
                      <i className="bi bi-hand-thumbs-up-fill"></i>
                    }</td>
                  </tr>
              )}
            </tbody>
          </table>
        } */}

      </Offcanvas.Body>

      <Divider />

      <Row className="px-3 pt-3">
        <Col className="px-2 text-start text-light"> Pris/dag:</Col>
        <Col className="px-2 text-end">230kr</Col>
      </Row>
      <Row className="px-3 py-3">
        <Col className="px-2">
          <Button
            variant="secondary"
            className="w-100">
            <i className="bi bi-cart-x pe-2"></i>Töm
          </Button>
        </Col>
        <Col className="px-2">
          <Button
            variant="success"
            className="w-100"
            onClick={() => { }}>
            <i className="bi bi-cart-check pe-2"></i>Boka
          </Button>
        </Col>
      </Row>
    </Offcanvas >
  </>;
}