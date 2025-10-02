import { useOutletContext } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getTrimmedName, scrollToElement } from "../../utils/Utilities";
import { Button, Container, Row } from "react-bootstrap";
import InstrumentCard from "./InstrumentCard";
import FeatureCard from "./FeatureCard";
import DownArrow from "../../components/DownArrow";
import config from "../../config/Config";
import Divider from "../../components/Divider";

export default function StartPage() {
  const { user } = useAuth();

  // Start playing video after StartupModal is closed
  const { isVideoPlaying } = useOutletContext<{ isVideoPlaying: boolean }>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlaying]);

  function getWelcomeMessage(user: any, config: { appName: string }) {
    if (!user) {
      return `Välkommen till ${config.appName}`;
    } else {
      return <>
        Välkommen <span className="text-danger">{getTrimmedName(user.name)}!</span>
      </>;
    }
  }

  return <>
    <section className="background-container">
      <video
        ref={videoRef}
        autoPlay={isVideoPlaying}
        muted
        loop
        playsInline
        className="background-video">
        <source src="video/video.mp4" type="video/mp4" />
      </video>
    </section>

    <section className="page-section">
      <Container className="space-top-header">
        <div className="text-center mb-4">
          <h2 className="pb-2 display-4">
            {getWelcomeMessage(user, config)}
          </h2>
          <p className="m-1">Din lokala plats för uthyrning av ljudutrustning, instrument och tillbehör.</p>
          <p className="m-1">Vi erbjuder ett brett sortiment av produkter för både privatpersoner och företag.</p>
        </div>

        <div className="d-flex justify-content-center">
          <Button
            onClick={() => scrollToElement("discover-section")}
            className="btn btn-primary px-5 py-2 rounded-5 hover-grow">
            Kom igång!
          </Button>
        </div>

        <DownArrow onClick={() => scrollToElement("discover-section")} />
      </Container>
    </section>

    <Divider />

    <section
      id="discover-section"
      className="background-color-overlay-darker w-100">
      <Container className="py-3">
        <div className="text-center py-5">
          <h2 className="display-4">Upptäck vårt utbud</h2>
          <p className="lead text-light">Utforska vårt breda sortiment av instrument och utrustning för alla dina ljudbehov.</p>
        </div>

        {/* Static content on "/" in case of backend failure... */}
        <Row className="pb-5 g-4 ">
          <InstrumentCard
            imgSrc="/images/guitar.png"
            title="Elgitarr"
            description="Från klassiker till nya favoriter. Prova olika stilar och tekniker på våra noga utvalda gitarrer." />
          <InstrumentCard
            imgSrc="/images/synth.png"
            title="Klaviatur"
            description="Utforska nya sound och rytmer med våra keyboards och synthar, från enkla melodier till avancerade beats." />
          <InstrumentCard
            imgSrc="/images/amp.png"
            title="Förstärkare & PA"
            description="Perfekt för övning, livespelningar eller studio." />
        </Row>
      </Container >
    </section>

    <Divider />

    <section className="background-color-overlay w-100">
      <Container className="pt-3 pb-4">
        <h2 className="text-center pt-5 pb-4 display-5">Varför {config.appName}?</h2>
        <Row className="pb-5 g-3">
          <FeatureCard
            imgSrc={"/svg/work.svg"}
            title={"Expertis"}
            description={"Vårt team har lång erfarenhet inom musikuthyrning och kan ge dig vägledning och stöd."}
            padding="ps-3" />
          <FeatureCard
            imgSrc={"/svg/quality.svg"}
            title={"Kvalitet"}
            description={"All vår utrustning är pålitlig, väl underhållen och alltid redo för användning."}
            padding="ps-3" />
          <FeatureCard
            imgSrc={"/svg/chat.svg"}
            title={"Enkelhet"}
            description={"Hyr utrustning snabbt och smidigt, vi gör processen enkel så att du kan komma igång direkt."}
            padding="ps-0" />
        </Row>
      </Container>
    </section >
  </>;
}
