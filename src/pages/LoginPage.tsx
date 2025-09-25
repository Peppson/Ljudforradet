import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { scrollToElement } from "../utils/Utilities";
import Register from "../components/LoginPage/Register";
import Login from "../components/LoginPage/Login";
import DownArrow from "../components/DownArrow";
import Info from "../components/LoginPage/Info";
import Divider from "../components/Divider";

export default function LoginPage() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const getLoginMessage = () => {
    if (isLoginPage) {
      return <>
        <span className="text-danger">Logga in </span>
      </>;
    } else {
      return <>
        <span className="text-danger">Registrera</span>
      </>;
    }
  };

  return <>
    <section
      className="page-section px-2 background-container-img"
      style={{ "--bg-image": "url('/images/video-still-1.png')" } as React.CSSProperties}>

      <Container className="space-top-header pt-5">
        <Row className="align-items-center py-5">
          <Col md={6} className="text-center text-md-start">
            <h5 className="m-1">Hej!</h5>
            <h3 className="pb-2 display-4">
              {getLoginMessage()} för att börja!
            </h3>
            <p className="m-1 d-none d-md-block">
              Få tillgång till ditt konto och hantera dina bokningar enkelt.
            </p>
            <p className="m-1 d-none d-md-block">
              Har du funderingar? Vårt team svarar gärna.
            </p>
          </Col>

          <Col md={6}>
            <div className="background-color-overlay-darker p-4 rounded-2 border border-light">
              {isLoginPage
                ? <Login setIsLoginPage={setIsLoginPage} />
                : <Register setIsLoginPage={setIsLoginPage} />}
            </div>
          </Col>
        </Row>
        <DownArrow onClick={() => { scrollToElement("info-section") }} />
      </Container>
    </section>

    <Divider />

    <section id="info-section" className="background-color-overlay">
      <Info />
    </section>
  </>;
}
