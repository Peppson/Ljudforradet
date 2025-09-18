import { Col, Container, Row } from "react-bootstrap";

export default function AboutPage() {
  return <>
    <section className="page-section px-2 background-container-img">
      <Container className="mb-0 mb-md-5 mb-5 mb-lg-0">
        <Row className="background-color-overlay py-3 p-2 p-md-4">
          <Col md={6}>
            <h6 className="pb-2">Om oss</h6>
            <div className="d-flex flex-column justify-content-center">
              <h3 className="pb-2" >Tusentals timmar ljud levererade!</h3>
              <p className="text-light">
                Oavsett om det gäller en fest, konferens eller konsert kan du lita på oss för utrustning och support som fungerar.
              </p>
              <p className="text-light">
                Våra kollegor arbetar tätt tillsammans för att planera och genomföra varje projekt på ett tryggt och effektivt sätt.
                Med ett engagerat team som brinner för ljud och service kan vi leverera lösningar som gör skillnad för våra kunder.
              </p>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <img src="images/team.jpg" className="w-100 align-self-center" />
          </Col>
        </Row>
      </Container >
    </section >
  </>;
}
