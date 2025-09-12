import { Row, Col } from 'react-bootstrap';

export default function Footer() {
  return <footer>
    <Row>
      <Col className="text-center text-bg-dark">
        © Kör bara {new Date().getFullYear()}
      </Col>
    </Row>
  </footer>;
}