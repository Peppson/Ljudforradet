import { Col, Container, Form, Row } from "react-bootstrap";
import Divider from "../components/Divider";



export default function ProductsPage() {
  return <>
    <section className="page-section background-color-overlay">
      <Container className="space-top-header mb-5">

        {/* <div className="mb-4">
          <h2 className="pb-2 display-4">
            Utrustning
          </h2>
          <p className="m-1">sdhjk hjksfdkjh  hfhdjfh dfjshf jd jgfkdj gkfdjg todo</p>
          <p className="m-1">Vi erbjufjdskh hjkfsdhjk hjksfdkjh  hfhdjfh dfjshf jdsf hj df</p>
        </div> */}

        <Row className="align-items-center">
          <Col md={8}>
            <div className="">
              <h2 className="pb-2 display-4">
                Utrustning
              </h2>
              <p className="m-1">sdhjk hjksfdkjh  hfhdjfh dfjshf jd jgfkdj gkfdjg todo</p>
              <p className="m-1">Vi erbjufjdskh hjkfsdhjk hjksfdkjh  hfhdjfh dfjshf jdsf hj df</p>
            </div>
          </Col>

          {/* <Col md={4} className="text-center">
            <img
              src="/images/guitar.png"
              alt="Ljudutrustning"
              className="img-fluid rounded-3 img-hover-zoom" />
          </Col> */}

        </Row>
      </Container>


      <Divider />



      <Container>

        {/* Search and Sort Header */}
        <Row className="bg-black p-3 rounded-2">
          <Col md={8}>
            <Form.Group>
              <Form.Label className=" mb-2">Sök utrustning</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sök efter utrustning..."
                value="test"
                onChange={() => { }}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className=" mb-2">Sortera efter</Form.Label>
              <Form.Select
                value="test"
                /* onChange={(e) => setSortBy(e.target.value)} */
                className="bg-dark text-white border-secondary">
                <option value="name">Namn</option>
                <option value="category">Kategori</option>
                <option value="price">Pris</option>
                <option value="availability">Tillgänglighet</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>



      </Container>


      {/* Load More Button */}
      {/* <Row className="mt-5">
          <Col className="text-center">
            <button className="btn btn-outline-primary px-4 py-2">
              Ladda fler produkter
            </button>
          </Col>
        </Row> */}



    </section>
  </>;
}
