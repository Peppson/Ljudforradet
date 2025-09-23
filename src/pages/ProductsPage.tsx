import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import type Gear from "../interfaces/Gear";
import ProductCard from "../components/ProductsPage/ProductCard";
import Divider from "../components/Divider";

export default function ProductsPage() {
  const allGear = useLoaderData() as {
    gear: Gear[];
  };

  const scrollUpToSection = () => {
    const targetElement = document.getElementById("products-section");
    if (targetElement) {
      const headerHeight = 99; // Header h + 1px
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };



  return <>
    <section
      className="page-section-products background-container-img"
      style={{ "--bg-image": "url('/images/video-still-1.png')" } as React.CSSProperties}>

      <Container className="mb-5 pb-3">
        <Row className="align-items-center py-5">
          <Col>
            <h2 className="pb-1 display-4">
              Utrustning
            </h2>
            <p className="m-1"> Vi erbjuder ett brett sortiment av högkvalitativ utrustning för både hobbyister och professionella.</p>
            <p className="m-1"> Bläddra bland våra produkter nedan och hitta exakt det du behöver.</p>
          </Col>
        </Row>
      </Container>
    </section>

    <Divider />

    <section id="products-section" className="background-color-overlay pt-2 pb-4">

      {/* Search and Sort Header */}
      <Container className="pt-4 pb-2">
        <Row>
          <Col md={5} className="pb-3 pb-md-0">
            <Form.Group>
              <Form.Label>Sök utrustning</Form.Label>
              <Form.Control
                type="text"
                maxLength={40}
                className="border-light rounded-2"
                placeholder="Sök efter utrustning"
                onChange={() => { }}
              />
            </Form.Group>
          </Col>

          <Col md={4} className="pb-3 pb-md-0">
            <Form.Group>
              <Form.Label>Sortera efter</Form.Label>
              <Form.Select
                /* onChange={(e) => setSortBy(e.target.value)} */
                className="border-light modal-select-options ">
                <option value="nameAsc">Namn A–Ö</option>
                <option value="nameDsc">Namn Ö–A</option>
                <option value="priceAsc">Billigast först</option>
                <option value="priceDsc">Dyrast först</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Visa uthyrda</Form.Label>
              <Form.Select
                /* onChange={(e) => setSortBy(e.target.value)} */
                className="border-light modal-select-options">
                <option value="nameAsc">Ja</option>
                <option value="nameDsc">Nej</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="divider-products d-flex align-items-center mt-4 pt-3 pb-1">
          <p className="text-center mx-3 mb-0">Visar <span className="text-danger">{allGear.gear.length}</span> produkter</p>
        </div>
      </Container >

      {/* Products */}
      <Container>
        <Row className="mt-1 pb-5 g-4 ">

          {allGear.gear.map((item) => (
            <Col key={item.id} lg={6} md={12}>
              <ProductCard {...item} />
            </Col>
          ))}
        </Row>
      </Container>

      <Button onClick={scrollUpToSection} className="btn btn-primary px-5 py-2 rounded-5 hover-grow d-flex mx-auto mb-3">
        Till toppen!
      </Button>
    </section>
  </>;
}
