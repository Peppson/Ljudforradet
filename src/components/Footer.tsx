import { Row, Col } from 'react-bootstrap';

export default function Footer() {
  return <footer>

    <Row>
      <Col className="d-flex flex-column justify-content-center align-items-center py-3 bg-black ">






        <h2>Ljudförrådet</h2>

        <span>© Ljudförrådet {new Date().getFullYear()}</span>

        <hr className="w-100" style={{ borderColor: "gray" }} />
      </Col>
    </Row>
  </footer>
}