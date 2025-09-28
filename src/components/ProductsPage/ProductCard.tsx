import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import type Gear from "../../interfaces/Gear";

interface ProductCardProps {
  item: Gear;
  onBookClick: (item: Gear) => void;
}

export default function ProductCard({ item, onBookClick }: ProductCardProps) {
  return (
    <Card className="card background-color-overlay col-md-4 w-100 h-100 border-0">
      <img
        src={`/images/products/${item.type}.png` || "/images/products/Övrigt.png"}
        className="rounded-top-2 cursor-pointer img-overlay-dark"
        alt={item.type}
        onClick={() => onBookClick(item)} />

      <div className="position-absolute top-0 start-0 m-0 pe-none">
        {item.available ? (
          <Badge bg="success p-2 button-exact-width-small btn btn-sm card-bottom-rounded">Tillgänglig</Badge>
        ) : (
          <Badge bg="danger p-2 button-exact-width-small btn btn-sm card-bottom-rounded">Uthyrd</Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column p-2">
        <Card.Text className="text-white mt-2 fs-5 mb-2">{item.name}</Card.Text>
        <Row className="mb-2 gx-1">
          <Col xs={4}>
            <div className="d-flex flex-column text-start">
              <small className="text-light">Modell</small>
              <span className="text-white ">{item.model}</span>
            </div>
          </Col>
          <Col xs={4}>
            <div className="d-flex flex-column text-center">
              <small className="text-light">Skick</small>
              <span className="text-white">{item.condition}</span>
            </div>
          </Col>
          <Col xs={4}>
            <div className="d-flex flex-column text-end">
              <small className="text-light">Pris/dag</small>
              <span className="text-white">{item.dailyPrice} kr</span>
            </div>
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className="border-0 p-2 pt-0">
        <Button
          onClick={() => onBookClick(item)}
          className="btn btn-sm btn-primary hover-grow w-100">
          Mer info
        </Button>
      </Card.Footer>
    </Card>
  );
}
