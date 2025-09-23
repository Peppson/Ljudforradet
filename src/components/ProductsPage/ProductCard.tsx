import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import type Gear from "../../interfaces/Gear";

export default function ProductCard(gear: Gear) {




  return (
    <Card className="h-100 background-color-overlay-darker border border-1 border-light product-card-shadow">
      <Card.Header className="text-white border-light py-3">
        <Card.Title className="h5 mb-0">{gear.name}</Card.Title>

        <div className="position-absolute top-0 end-0 m-3">
          {gear.available ? (
            <Badge bg="success p-2 button-exact-width-small">Tillgänglig</Badge>
          ) : (
            <Badge bg="danger p-2 button-exact-width-small">Uthyrd</Badge>
          )}
        </div>
      </Card.Header>

      <Card.Body className="d-flex flex-column">
        <Row className="mb-1">
          <Col xs={12} className="mb-1">
            <span className="me-2">Märke:</span>
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {gear.brand}
            </Badge>
          </Col>

          <Col xs={12} className="mb-1">
            Modell:{" "}
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {gear.model}
            </Badge>
          </Col>

          <Col xs={12} className="mb-1 d-flex align-items-center">
            <span className="me-3">Skick:</span>
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {gear.condition}
            </Badge>
          </Col>
        </Row>

        <Card.Text className="fw-normal m-0 mt-2">
          Beskrivning:
        </Card.Text>

        <Card.Text className="text-light pt-2">
          {gear.desc}
        </Card.Text>
      </Card.Body>

      <Card.Footer className="text-white border-light d-flex justify-content-between align-items-center py-2">
        <div>
          <span className="me-2">Pris per dag:</span>
          <Badge
            bg="transparent"
            className="pb-1 fs-6 border border-light fw-normal">
            {gear.dailyPrice} kr
          </Badge>
        </div>

        <Button
          className={`btn btn-sm ${gear.available ? "btn-primary" : "btn-outline-light"} hover-grow button-exact-width-small`}
          disabled={!gear.available}>
          {gear.available ? "Boka" : "Uthyrd"}
        </Button>
      </Card.Footer>
    </Card>
  );
}
