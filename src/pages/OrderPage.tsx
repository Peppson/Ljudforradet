/* import React from "react";
import { Col, Container, Row } from "react-bootstrap"; */
import { useLoaderData, useParams } from "react-router-dom";
/* import { scrollToElement } from "../utils/Utilities"; */
import { useAuth } from "../context/AuthProvider";
import type Order from "../interfaces/Order";
/* import type OrderItem from "../interfaces/OrderItem";
import type Gear from "../interfaces/Gear";
import Divider from "../components/Divider";
import DownArrow from "../components/DownArrow"; */
import NotFoundPage from "./NotFoundPage";

export default function OrderPage() {
  const params = useParams();
  const { user } = useAuth();


  const { order /*, orderItems,  gear */ } = useLoaderData() as {
    order: Order;
    //orderItems: OrderItem[];
    //gear: Gear[]; 
  };

  /* console.log(params.id);


  if (!user) {
    console.log("NO USER");
    return <NotFoundPage />;
  }

  console.log(user);

  if (order) {
    console.log("NO order");
    return <NotFoundPage />;
  } */






  /* console.log('Order:', orders);
  console.log('OrderItems:', orderItems); */
  console.log('Order:', order);







  /* const getOrderTotal = () => {
    return orderItems.reduce((total, orderItem) => {
      const totalDays = Math.ceil((Date.now() - new Date(order.created).getTime()) / (1000 * 60 * 60 * 24));
      const gearItem = gear.find(g => g.id === orderItem.ProductId);
      const dailyPrice = gearItem?.dailyPrice || 0;
      return total + (dailyPrice * totalDays);
    }, 0);
  }; */

  /* const getTotalDays = () => {
    return Math.ceil((Date.now() - new Date(order.created).getTime()) / (1000 * 60 * 60 * 24));
  }; */

  return <>
    <h1 className="text-black"> ORDERPAGE </h1>

    {/*  <section
      className="page-section px-2 background-container-img"
      style={{ "--bg-image": "url('/images/video-still-1.png')" } as React.CSSProperties}>

      <Container className="space-top-header">
        <Row className="align-items-center py-5">
          <Col className="text-center text-md-start">
            <h5 className="m-1">Tack för din beställning!</h5>
            <h3 className="pb-2 display-4">
              <span className="text-danger">Bekräftelse</span>
            </h3>
            <p className="m-1">
              Din beställning har registrerats och utrustningen är reserverad.
            </p>
            <p className="m-1">
              Hämta utrustningen när det passar dig, betalning sker vid återlämning.
            </p>
          </Col>
        </Row>

        <DownArrow onClick={() => scrollToElement("order-details")} />
      </Container>
    </section>

    <Divider /> */}

    {/* <section id="order-details" className="background-color-overlay-darker py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="bg-dark border-light">
              <Card.Header className="bg-dark border-light">
                <h4 className="text-light mb-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Order #{order.id}
                </h4>
                <small className="text-muted">
                  Beställd: {new Date(order.created).toLocaleDateString('sv-SE')}
                </small>
              </Card.Header>

              <Card.Body>
                <h5 className="text-light mb-3">Din uthyrda utrustning:</h5>

                {orderItems.map((orderItem, index) => {
                  const gearItem = gear.find(g => g.id === orderItem.ProductId);
                  const totalDays = getTotalDays();
                  const days = totalDays > 1 ? "dagar" : "dag";
                  const dailyPrice = gearItem?.dailyPrice || 0;
                  const itemTotal = dailyPrice * totalDays;

                  return (
                    <div key={index} className="mb-3 p-3 border border-secondary rounded">
                      <Row className="align-items-center">
                        <Col md={8}>
                          <h6 className="text-light mb-1">
                            {gearItem?.name || `Produkt ID: ${orderItem.ProductId}`}
                          </h6>
                          <p className="text-muted small mb-1">
                            {gearItem?.brand} • {gearItem?.model}
                          </p>
                          <p className="text-info small mb-0">
                            {totalDays} {days} × {dailyPrice} kr/dag
                          </p>
                        </Col>
                        <Col md={4} className="text-md-end">
                          <span className="text-success fw-bold fs-5">
                            {itemTotal} kr
                          </span>
                        </Col>
                      </Row>
                    </div>
                  );
                })}

                <hr className="border-light my-4" />

                <Row className="align-items-center">
                  <Col>
                    <h5 className="text-white mb-0">Totalt belopp:</h5>
                    <small className="text-muted">
                      Inkl. {getTotalDays()} {getTotalDays() > 1 ? "dagar" : "dag"} hyra
                    </small>
                  </Col>
                  <Col xs="auto">
                    <span className="text-success fw-bold display-6">
                      {getOrderTotal()} kr
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <div className="mb-3">
                <i className="bi bi-telephone-fill text-light me-2"></i>
                <a href="tel:+46701234567" className="text-decoration-none text-light">
                  +46 70 123 45 67
                </a>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="me-3 px-4"
                onClick={() => navigate("/products")}>
                Hyra mer utrustning
              </Button>

              <Button
                variant="outline-light"
                size="lg"
                className="px-4"
                onClick={() => navigate("/")}>
                Tillbaka till startsidan
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <Divider />

    <section className="background-color-overlay py-5">
      <Container>
        <Row className="text-center">
          <Col>
            <h4 className="text-light mb-3">Nästa steg</h4>
            <Row className="g-4">
              <Col md={4}>
                <div className="p-3">
                  <i className="bi bi-1-circle-fill text-danger mb-2" style={{ fontSize: "2rem" }}></i>
                  <h6 className="text-light">Kontakta oss</h6>
                  <p className="text-muted small">
                    Ring eller maila för att boka upphämtningstid
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="p-3">
                  <i className="bi bi-2-circle-fill text-danger mb-2" style={{ fontSize: "2rem" }}></i>
                  <h6 className="text-light">Hämta utrustning</h6>
                  <p className="text-muted small">
                    Kom och hämta din utrustning på överenskommen tid
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="p-3">
                  <i className="bi bi-3-circle-fill text-danger mb-2" style={{ fontSize: "2rem" }}></i>
                  <h6 className="text-light">Återlämna</h6>
                  <p className="text-muted small">
                    Lämna tillbaka utrustningen i samma skick
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section> */}

  </>;
}