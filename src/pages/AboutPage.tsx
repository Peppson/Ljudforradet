import { Col, Container, Row } from "react-bootstrap";

export default function AboutPage() {
  return <>
    <section className="background-container">
      <img src="/images/video-still-1.png" className="background-img" />
    </section>

    <section className="page-section px-2 ">
      <Container className="mt-5">
        <Row className="bg-dark py-3 p-2 p-md-4 mt-5">
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
      <div className="my-3"> </div>
    </section >
  </>;
}
