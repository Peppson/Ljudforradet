import InstrumentCard from "../components/InstrumentCard";
import Divider from "../components/divider";
import FeatureCard from "../components/FeatureCard";

export default function StartPage() {
  const scrollToNextSection = () => {
    const targetElement = document.getElementById('discover-section'); // ById ugh...
    if (targetElement) {
      const headerHeight = 99;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return <>
    <section className="background-container">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="video/video.mp4" type="video/mp4" />
      </video>
    </section>

    <section className="page-section">
      <div className="container">
        <div className="text-center pd-5 mb-4">
          <h2 className="pb-2 display-4">Välkommen till Ljudförrådet</h2>
          <p className="m-1">Din lokala plats för uthyrning av ljudutrustning, instrument och tillbehör.</p>
          <p>Vi erbjuder ett brett sortiment av produkter för både privatpersoner och företag.</p>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={scrollToNextSection} className="btn btn-primary px-5 py-2 rounded-5 hover-grow">
            Kom igång!
          </button>
        </div>
      </div>
    </section>

    <Divider />

    <section id="discover-section" className="bg-black w-100">
      <div className="container py-3">

        <div className="text-center py-5">
          <h2 className="display-4">Upptäck vårt utbud</h2>
          <p className="lead text-light">Utforska vårt breda sortiment av instrument och utrustning för alla dina ljudbehov.</p>
        </div>

        {/* Static content on "/" incase of backend failure */}
        <div className="row g-4 pb-5">
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
        </div>

        <h2 className="text-center py-3 pb-4 display-6">Varför Ljudförrådet?</h2>

        <div className="row pb-5 g-3">
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
            description={"Hyr utrustning snabbt och smidigt – vi gör processen enkel så att du kan komma igång direkt."}
            padding="ps-0"
          />
        </div>
      </div>
    </section>
  </>;
}
