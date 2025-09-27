import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import type Gear from "../../interfaces/Gear";

interface ProductCardProps {
  item: Gear;
  onBookClick: (item: Gear) => void;
}

export default function ProductCardOLD({ item, onBookClick }: ProductCardProps) {
  return (
    <Card className="h-100 background-color-overlay-darker border border-0 border-light">
      <Card.Header className="text-white border-light py-3">
        <Card.Title className="h5 mb-0">{item.name}</Card.Title>

        <div className="position-absolute top-0 end-0 m-3">
          {item.available ? (
            <Badge bg="success p-2 button-exact-width-small">Tillgänglig</Badge>
          ) : (
            <Badge bg="danger p-2 button-exact-width-small">Uthyrd</Badge>
          )}
        </div>
      </Card.Header>

      <Card.Body className="d-flex flex-column">
        <Row className="mb-1">
          {/* <Col xs={12} className="mb-1">
            <span className="me-2">Märke:</span>
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {item.brand}
            </Badge>
          </Col>

          <Col xs={12} className="mb-1">
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              Modell:{" "}
              {item.model}
            </Badge>
          </Col>*/}

          <Col xs={12} className="mb-1 d-flex align-items-center">
            <span className="me-3 fs-1">TYP BA:</span>
            <Badge bg="danger" className="pb-1 fs-1  border border-light fw-normal">
              {item.type}
            </Badge>
          </Col>

          <Col xs={12} className="mb-1 d-flex align-items-center">
            <span className="me-3">Skick:</span>
            <Badge bg="transparent" className="pb-1 fs-6 border border-light fw-normal">
              {item.condition}
            </Badge>
          </Col>

          <Col xs={12} className="mb-1 d-flex align-items-center">
            <span className="me-4">Pris:</span>
            <Badge
              bg="transparent"
              className="pb-1 fs-6 border border-light fw-normal">
              {item.dailyPrice} kr
            </Badge>
          </Col>
        </Row>

        <Card.Text className="fw-normal m-0 mt-2">
          Beskrivning:
        </Card.Text>

        <Card.Text className="text-light pt-2">
          {item.desc}
        </Card.Text>
      </Card.Body>

      <Card.Footer className="text-white border-light d-flex justify-content-end align-items-center py-2">
        <Button
          onClick={() => onBookClick(item)}
          className={`btn btn-sm ${item.available ? "btn-primary" : "btn-outline-light"} hover-grow button-exact-width-small`}
          disabled={!item.available}>
          {item.available ? "Mer info" : "Uthyrd"}
        </Button>
      </Card.Footer>
    </Card>
  );
}
