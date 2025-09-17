import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import Login from '../components/Login';


export default function LoginPage() {





  return <>
    <section className="background-container">
      <img src="/images/video-still-1.png" className="background-img" />
    </section>

    <section className="page-section px-2 ">
      <Container className="h-custom background-color-overlay py-5">


        <div className="row d-flex justify-content-center align-items-center h-100">
          <Login />

          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="images/guitar.png"
              className="img-fluid"
              alt="login image" />
          </div>






        </div>
      </Container>

    </section>



  </>;
}
