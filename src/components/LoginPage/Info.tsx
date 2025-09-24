import { Col, Container, Row } from "react-bootstrap";

export default function Info() {
  return <>
    <Container className="py-5">
      <div className="text-center">
        <h4 className="mb-3">Varför skapa ett konto?</h4>
        <Row className="g-4">
          <Col md={4}>
            <i className="bi bi-calendar-check text-danger mb-3" style={{ fontSize: '2.5rem' }}></i>
            <h6>Enkel bokning</h6>
            <p className="text-light">Hantera alla dina bokningar på ett ställe</p>
          </Col>
          <Col md={4}>
            <i className="bi bi-clock-history text-danger mb-3" style={{ fontSize: '2.5rem' }}></i>
            <h6>Bokningshistorik</h6>
            <p className="text-light">Se tidigare ordrar och favoriter</p>
          </Col>
          <Col md={4}>
            <i className="bi bi-bell text-danger mb-3" style={{ fontSize: '2.5rem' }}></i>
            <h6>Notiser</h6>
            <p className="text-light">Få påminnelser om återlämning</p>
          </Col>
        </Row>
      </div>
    </Container>
  </>
}
