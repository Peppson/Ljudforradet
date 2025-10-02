import { useLoaderData } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { scrollToElement } from "../../utils/Utilities";
import { Button, Col, Container, Row } from "react-bootstrap";
import { downloadOrderConfirmation } from "../../utils/DownloadOrderConfirmation ";
import type Order from "../../interfaces/Order";
import type OrderItem from "../../interfaces/OrderItem";
import type Gear from "../../interfaces/Gear";
import NotFoundPage from "../notFound/NotFoundPage";
import DownArrow from "../../components/DownArrow";
import Divider from "../../components/Divider";

export default function OrderPage() {
  const { user } = useAuth();

  const { order, orderItems, gear } = useLoaderData() as {
    order: Order;
    orderItems: OrderItem[];
    gear: Gear[];
  };

  // Throw 404 if something is broken/missing
  if (!user) return <NotFoundPage />;
  if (!order?.id) return <NotFoundPage />;
  if (!orderItems || orderItems.length === 0) return <NotFoundPage />;
  if (!gear || gear.length === 0) return <NotFoundPage />;

  // Only allow user to view their own order
  if (user.id !== order.userId) {
    return <NotFoundPage />;
  }

  const getOrderTotal = () => {
    return orderItems
      .filter(orderItem => orderItem.orderId === order.id)
      .reduce((total, orderItem) => {
        const gearItem = gear.find(g => g.id === orderItem.ProductId);
        const dailyPrice = gearItem?.dailyPrice || 0;
        return total + dailyPrice;
      }, 0);
  };

  const handleDownload = () => {
    downloadOrderConfirmation({
      order,
      orderItems,
      gear,
      orderTotal: getOrderTotal()
    });
  };

  return <>
    <section
      className="page-section px-2 background-container-img"
      style={{ "--bg-image": "url('/images/video-still-1.png')" } as React.CSSProperties}>

      <Container className="space-top-header">
        <Row className="align-items-center py-5">
          <Col md={6} className="text-center text-md-start">
            <h5 className="m-1">Tack för din beställning!</h5>
            <h3 className="pb-2 display-4">
              <span className="text-danger">Bekräftelse</span>
            </h3>
            <p className="m-1 d-none d-md-block">
              Din beställning har registrerats och utrustningen är reserverad.
            </p>
            <p className="m-1 d-none d-md-block">
              Hämta utrustningen när det passar dig, betalning sker vid återlämning.
            </p>
          </Col>

          <Col md={6}>
            <div className="background-color-overlay-darker p-4 rounded-2 border border-light">
              <h5 className="text-center fw-bold mb-3">Ordernummer: {order.id}</h5>
              <p className="mb-1 text-light">Utrustning:</p>
              <div className="card bg-dark border-light mb-4">
                <div className="card-body">
                  {orderItems
                    .filter(orderItem => orderItem.orderId === order.id)
                    .map((orderItem, index) => {
                      const gearItem = gear.find(x => x.id === orderItem.ProductId);
                      const gearName = gearItem?.name || `Produkt ID: ${orderItem.ProductId}`;
                      const dailyPrice = gearItem?.dailyPrice || 0; // dangerous fallback ;)

                      return (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center mb-1">
                          <span className="text-light small">
                            {index + 1}. {gearName}
                          </span>
                          <span className="text-success small fw-bold">
                            {dailyPrice} kr
                          </span>
                        </div>
                      );
                    })}

                  <hr className="border-light my-2" />
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-white">Pris/dag:</span>
                    <span className="text-success">
                      {getOrderTotal()} kr
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  onClick={handleDownload}
                  className="btn btn-secondary px-5 py-2 rounded-2 hover-grow">
                  Ladda ner bekräftelse
                  <i className="bi bi-download ms-2"></i>
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <DownArrow onClick={() => scrollToElement("section-2")} />
      </Container>
    </section >

    <Divider />

    <section id="section-2" className="background-color-overlay-darker">
      <Container className="py-4">
        <div className="py-5 text-center text-sm-start">
          <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
            <h2 className="display-4 mb-0">Alltid redo</h2>
            <i className="bi bi-headset ms-2" style={{ fontSize: "3rem", color: "var(--bs-danger)" }}></i>
          </div>
          <p className="lead text-light mb-0">
            Våra specialister på plats är alltid redo att hjälpa dig snabbt, enkelt och smidigt.
          </p>
          <p className="text-light mb-0">
            Oavsett om du behöver råd inför ett event, hjälp med att välja rätt utrustning eller support på plats kan du alltid räkna med oss.
          </p>
          <div className="text-light mt-3">
            <i className="bi bi-telephone-fill text-light me-2"></i>
            <a href="tel:+46701234567" className="text-decoration-none text-light">+46 70 123 45 67</a>
          </div>
        </div>
      </Container>
    </section >

    <Divider />

    <section className="background-color-overlay">
      <Container className="py-4">
        <div className="py-5 text-center text-sm-end">
          <div className="d-flex align-items-center justify-content-center justify-content-sm-end">
            <i className="bi bi-award me-2" style={{ fontSize: "3rem", color: "var(--bs-danger)" }}></i>
            <h2 className="display-4 mb-0">Kvalitet</h2>
          </div>
          <p className="lead text-light mb-0">
            Vi erbjuder noggrant utvald och testad ljudutrustning som alltid är redo för dig.
          </p>
          <p className="text-light mb-0">
            Du kan lita på att vår utrustning håller högsta standard och levereras felfritt varje gång.
          </p>
          <div className="text-light mt-3">
            <i className="bi bi-shield-check text-light me-2"></i>
            <span className="text-light">100% testad innan leverans</span>
          </div>
        </div>
      </Container>
    </section>
  </>;
}
