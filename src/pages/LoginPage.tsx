import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import Register from "../components/LoginPage/Register";
import Login from "../components/LoginPage/Login";

export default function LoginPage() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return <>
    <section className="page-section px-2 background-container-img">
      <Container className="h-custom background-color-overlay mb-0 mb-md-5 mb-5 mb-lg-0">
        <Row className="d-flex justify-content-center align-items-center h-100 py-3 p-2 p-md-4">
          <Col md={9} lg={6}>
            <img
              src="images/drums.jpg"
              className="img-fluid"
              alt="login image" />
          </Col>

          {isLoginPage
            ? <Login setIsLoginPage={setIsLoginPage} />
            : <Register setIsLoginPage={setIsLoginPage} />}

        </Row>
      </Container>
    </section >
  </>;
}
