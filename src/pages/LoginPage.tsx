import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return <>
    <section className="background-container" >
      <img src="/images/video-still-1.png" className="background-img" />
    </section >

    <section className="page-section px-2">
      <Container className="h-custom background-color-overlay py-5">
        <Row className="d-flex justify-content-center align-items-center h-100">

          <Col md={9} lg={6} xl={5}>
            <img
              src="images/crowd.jpg"
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
