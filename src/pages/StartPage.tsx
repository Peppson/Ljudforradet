import { useOutletContext } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { getTrimmedName } from "../utils/Utilities";
import InstrumentCard from "../components/StartPage/InstrumentCard";
import Divider from "../components/Divider";
import FeatureCard from "../components/StartPage/FeatureCard";
import config from "../config/Config";
import { Container, Row } from "react-bootstrap";

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

  const scrollToNextSection = () => {
    const targetElement = document.getElementById("discover-section");
    if (targetElement) {
      const headerHeight = 99; // Header h + 1px
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  function getWelcomeMessage(user: any, config: any) {
    if (!user)
      return `Välkommen till ${config.appName}`;
    return `Välkommen ${getTrimmedName(user.name)}!`;
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
          <button onClick={scrollToNextSection} className="btn btn-primary px-5 py-2 rounded-5 hover-grow">
            Kom igång!
          </button>
        </div>
      </Container>
    </section>

    <Divider />

    <section id="discover-section" className="background-color-overlay w-100">
      <Container className="py-3">
        <div className="text-center py-5">
          <h2 className="display-4">Upptäck vårt utbud</h2>
          <p className="lead text-light">Utforska vårt breda sortiment av instrument och utrustning för alla dina ljudbehov.</p>
        </div>

        {/* Static content on "/" in case of backend failure... */}
        <Row className="g-4 pb-5">
          <InstrumentCard
            imgSrc="/images/guitar.png"
            title="Elgitarr"
            description="Från klassiker till nya favoriter. Prova olika stilar och tekniker på våra noga utvalda gitarrer."
          />
          <InstrumentCard
            imgSrc="/images/synth.png"
            title="Klaviatur"
            description="Utforska nya sound och rytmer med våra keyboards och synthar, från enkla melodier till avancerade beats."
          />
          <InstrumentCard
            imgSrc="/images/amp.png"
            title="Förstärkare & PA"
            description="Perfekt för övning, livespelningar eller studio."
          />
        </Row>

        <h2 className="text-center py-4 display-6">Varför {config.appName}?</h2>

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
            padding="ps-0"
          />
        </Row>
      </Container>
    </section>
  </>;
}
