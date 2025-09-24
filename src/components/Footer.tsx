import { Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import routes from "../routes";
import Divider from "./Divider";
import config from "../config/Config";
import Logo from "./logo";

export default function Footer() {
  const allowedPaths = ["/", "/about-us", "/products"];

  return (
    <footer className="background-color-overlay-darker">
      <Divider />
      <Container className="pt-5">
        <Row>
          <Col md={4} xs={12} className="d-flex flex-column align-items-md-center pb-3">
            <h6 className="mb-2">Genvägar</h6>
            <div>
              {routes
                .filter(route => route.menuLabel && allowedPaths.includes(route.path))
                .map((route, i) => (
                  <p className="mb-2" key={i}>
                    <NavLink
                      to={route.path}
                      className="text-decoration-none text-light">
                      {route.menuLabel}
                    </NavLink>
                  </p>
                ))}
            </div>
          </Col>

          <Col md={4} xs={12} className="d-flex align-items-md-center flex-column pb-3">
            <h6 className="mb-2">Kontakt</h6>
            <div className="mb-2">
              <i className="bi bi-geo-alt-fill text-light me-2"></i>
              <span className="text-light">Gatan 123, Norrköping</span>
            </div>
            <div className="mb-2">
              <i className="bi bi-telephone-fill text-light me-2"></i>
              <a href="tel:+46701234567" className="text-decoration-none text-light">+46 70 123 45 67</a>
            </div>
            <div className="mb-2">
              <i className="bi bi-envelope-fill text-light me-2"></i>
              <a
                href="mailto:info@ljudforradet.se"
                className="text-decoration-none text-light"
                target="_blank"
                rel="noopener noreferrer">
                info@ljudforradet.se
              </a>
            </div>
          </Col>

          <Col md={4} xs={12} className="d-flex align-items-md-center flex-column pb-3">
            <h6 className="mb-2">Öppettider</h6>
            <p className="mb-2 text-light">Mån-Fre: 09:00 - 17:00</p>
            <p className="mb-2 text-light">Lör: 10:00 - 13:00</p>
            <p className="mb-2 text-light">Sön: Stängt</p>
          </Col>
        </Row>
      </Container>

      <Container className="text-center py-3 pb-5">
        <small className="text-light">
          © {new Date().getFullYear()} {config.appName}. Alla rättigheter förbehållna.
          <span className="mb-1 ms-1 position-absolute">
            <Logo width={16} height={16} />
          </span>
          <span style={{ display: "inline-block", width: "16px" }}></span>
        </small>
      </Container>
    </footer>
  );
}
