import { Col, Container, Row } from "react-bootstrap";
import { scrollToElement } from "../utils/Utilities";
import Divider from "../components/Divider";
import DownArrow from "../components/DownArrow";

export default function AboutPage() {
  return <>
    <section
      className="page-section px-2 background-container-img"
      style={{ "--bg-image": "url('/images/team-fullsize.jpg')" } as React.CSSProperties}>

      <Container className="space-top-header">
        <Row className="align-items-center py-5">
          <Col className="text-center text-md-start">
            <h5 className="m-1">Om oss</h5>
            <h3 className="pb-2 display-4">
              <span className="text-underline">Tusentals</span> timmar ljud levererade!
            </h3>
            <p className="m-1">
              Våra kollegor arbetar tätt tillsammans för att planera och genomföra varje projekt på ett tryggt och effektivt sätt.
            </p>
            <p className="m-1">
              Med ett engagerat team som brinner för ljud och service kan vi leverera lösningar som gör skillnad för våra kunder.
            </p>
          </Col>
        </Row>

        <DownArrow onClick={() => scrollToElement("section-2")} />
      </Container>
    </section >

    <Divider />

    <section id="section-2" className="background-color-overlay-darker">
      <Container className="py-4">
        <div className="py-5 text-center text-sm-start">
          <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
            <h2 className="display-4 mb-0">Alltid redo</h2>
            <i className="bi bi-headset ms-2" style={{ fontSize: "3rem", color: "var(--bs-danger)" }}></i>
          </div>
          <p className="lead text-light mb-0">
            Våra specialister på plats är alltid redo att hjälpa dig snabbt, enkelt och smidigt.
          </p>
          <p className="text-light mb-0">
            Oavsett om du behöver råd inför ett event, hjälp med att välja rätt utrustning eller support på plats kan du alltid räkna med oss.
          </p>
          <div className="text-light mt-3">
            <i className="bi bi-telephone-fill text-light me-2"></i>
            <a href="tel:+46701234567" className="text-decoration-none text-light">+46 70 123 45 67</a>
          </div>
        </div>
      </Container>
    </section >

    <Divider />

    <section className="background-color-overlay">
      <Container className="py-4">
        <div className="py-5 text-center text-sm-end">
          <div className="d-flex align-items-center justify-content-center justify-content-sm-end">
            <i className="bi bi-award me-2" style={{ fontSize: "3rem", color: "var(--bs-danger)" }}></i>
            <h2 className="display-4 mb-0">Kvalitet</h2>
          </div>
          <p className="lead text-light mb-0">
            Vi erbjuder noggrant utvald och testad ljudutrustning som alltid är redo för dig.
          </p>
          <p className="text-light mb-0">
            Du kan lita på att vår utrustning håller högsta standard och levereras felfritt varje gång.
          </p>
          <div className="text-light mt-3">
            <i className="bi bi-shield-check text-light me-2"></i>
            <span className="text-light">100% testad innan leverans</span>
          </div>
        </div>
      </Container>
    </section>
  </>;
}
