import { Col, Container, Row } from "react-bootstrap";
import Divider from "../components/Divider";

export default function AboutPage() {
  return <>
    <section
      className="page-section px-2 background-container-img"
      style={{ "--bg-image": "url('/images/team-fullsize.jpg')" } as React.CSSProperties}>

      <Container className="space-top-header">
        <Row className="align-items-center py-5">
          <Col>
            <h5 className="m-1">Om oss</h5>
            <h3 className="pb-1 display-4">
              Tusentals timmar ljud levererade!
            </h3>
            <div className="decorative-line ms-1"></div>
            <p className="m-1">
              Våra kollegor arbetar tätt tillsammans för att planera och genomföra varje projekt på ett tryggt och effektivt sätt.
            </p>
            <p className="m-1">
              Med ett engagerat team som brinner för ljud och service kan vi leverera lösningar som gör skillnad för våra kunder.
            </p>
          </Col>
        </Row>
      </Container>
    </section >

    <Divider />

    <section className="background-color-overlay-darker">
      <Container className="py-4">
        <div className="py-5 text-center text-sm-start">
          <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
            <h2 className="display-4 mb-0">Alltid redo</h2>
            <img
              src="/svg/chat.svg"
              className="mb-2"
              style={{ width: '3rem', height: '3rem' }} />
          </div>
          <p className="lead text-light mb-0">Våra specialister på plats är alltid redo att hjälpa dig snabbt, enkelt och smidigt.</p>
        </div>
      </Container>
    </section >

    <Divider />

    <section className="background-color-overlay">
      <Container className="py-4">
        <div className="py-5 text-center text-sm-end">
          <div className="d-flex align-items-center justify-content-center justify-content-sm-end">
            <img
              src="/svg/lightbulb.svg"
              className="mb-2"
              style={{ width: '3rem', height: '3rem' }} />
            <h2 className="display-4 mb-0">Kvalitet</h2>
          </div>
          <p className="lead text-light mb-0">
            Vi erbjuder noggrant utvald ljudutrustning som alltid är testad och redo för ditt evenemang.
          </p>
        </div>
      </Container>
    </section>
  </>;
}
