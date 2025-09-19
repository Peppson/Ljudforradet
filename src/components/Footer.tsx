import { Row, Col, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import routes from "../routes";
import Divider from './divider';
import config from "../config/Config";

export default function Footer() {
  return (
    <footer className="background-color-overlay">
      <Divider />
      <div className="pt-5">
        <Container>
          <Row>
            <Col md={4} xs={12} className="d-flex flex-column align-items-md-center pb-3">
              <div>
                {routes
                  .filter(route => route.menuLabel)
                  .map((route, i) => (
                    <p className="mb-2" key={i}>
                      <NavLink
                        to={route.path}
                        className="text-decoration-none">
                        {route.menuLabel}
                      </NavLink>
                    </p>
                  ))}
              </div>
            </Col>

            <Col md={4} xs={12} className="d-flex align-items-md-center flex-column pb-3">
              <div>
                <div className="mb-2">
                  <i className="bi bi-geo-alt-fill text-light"></i>
                  <span>Gränden 123, Norrköping</span>
                </div>
                <div className="mb-2">
                  <i className="bi bi-telephone-fill text-light"></i>
                  <a href="tel:+46701234567" className="text-decoration-none">+46 70 123 45 67</a>
                </div>
                <div className="mb-2">
                  <i className="bi bi-envelope-fill text-light"></i>
                  <a href="mailto:info@ljudforradet.se" className="text-decoration-none">info@ljudforradet.se</a>
                </div>
              </div>
            </Col>

            <Col md={4} xs={12} className="d-flex align-items-md-center flex-column pb-3">
              <div>
                <h6 className="mb-2 ">Öppettider</h6>
                <small>
                  Mån-Fre: 09:00 - 17:00<br />
                  Lör: 10:00 - 13:00<br />
                  Sön: Stängt
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="text-center py-4">
        <small className="text-secondary">
          © {new Date().getFullYear()} {config.appName}. Alla rättigheter förbehållna.
        </small>
      </Container>
    </footer>
  );
}
