import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import Register from "../components/LoginPage/Register";
import Login from "../components/LoginPage/Login";

export default function LoginPage() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return <>
    <section
      className="page-section px-2 background-container-img"
      style={{ "--bg-image": "url('/images/video-still-1.png')" } as React.CSSProperties}>

      <Container className="space-top-header">
        <Row className="align-items-center py-5">
          <Col>
            <h5 className="m-1">Hej!</h5>
            <h3 className="pb-2 display-4">
              <span className="text-underline">Logga</span> in!
            </h3>
            <p className="m-1">
              Våra kollegor arbetar tätt tillsammans.
            </p>
            <p className="m-1">
              Med ett engagerat team som brinner för ljud.
            </p>
          </Col>

          <Col>
            <Login setIsLoginPage={setIsLoginPage} />
          </Col>

        </Row>

      </Container>
    </section >






    {/* <section className="page-section px-2 background-container-img">
      <Container className="h-custom background-color-overlay-darker mb-0 mb-md-5 mb-5 mb-lg-0 rounded-2 border border-1 border-light">
        <Row className="d-flex justify-content-center align-items-center h-100 py-3 p-2 p-md-4 ">
          <Col md={9} lg={6}>
            <img
              src="images/drums.jpg"
              className="img-fluid rounded-1"
              alt="login image" />
          </Col>

          {isLoginPage
            ? <Login setIsLoginPage={setIsLoginPage} />
            : <Register setIsLoginPage={setIsLoginPage} />}

        </Row>
      </Container>
    </section > */}







  </>;
}
