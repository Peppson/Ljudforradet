import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return <>
    <section className="page-section px-2 background-container-img">
      <Container className="h-custom background-color-overlay py-5 mb-5 mb-lg-0">
        <Row className="d-flex justify-content-center align-items-center h-100 p-2 p-md-0">

          <Col md={9} lg={6} xl={5}>
            <img
              src="images/drums.jpg"
              className="img-fluid"
              alt="login image" />
          </Col>

          {isLogin
            ? <Login setLoginPage={setIsLogin} />
            : <Register setLoginPage={setIsLogin} />}

        </Row>
      </Container>
    </section >
  </>;
}
