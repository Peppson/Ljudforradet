import { useNavigate } from "react-router-dom";
import InstrumentCard from "../components/InstrumentCard";
import Divider from "../components/divider";


export default function StartPage() {
  const navigate = useNavigate();
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
          <button onClick={() => navigate("/login")} className="btn btn-primary px-5 py-2 rounded-5 hover-grow">
            Kom igång!
          </button>
        </div>
      </div>
    </section>

    <Divider />

    <section className="bg-black w-100">
      <div className="container py-3">
        <div className="text-center py-5">
          <h2 className="display-4">Upptäck vårt utbud</h2>
          <p className="lead text-light">Utforska vårt breda sortiment av instrument och utrustning för alla dina ljudbehov.</p>
        </div>

        {/* Static content on /home incase of backend failure */}
        <div className="row g-4 pb-5">
          <InstrumentCard
            imgSrc="/images/guitar.png"
            title="Elgitarr"
            description="Från klassiker till nya favoriter. Prova olika stilar och tekniker på våra noga utvalda gitarrer."
          />
          <InstrumentCard
            imgSrc="/images/synth.png"
            title="Synth"
            description="Utforska nya sound och rytmer med våra keyboards och synthar, från enkla melodier till avancerade beats."
          />
          <InstrumentCard
            imgSrc="/images/amp.png"
            title="Förstärkare"
            description="Perfekt för övning, livespelningar eller studio."
          />
        </div>
      </div>

      <Divider />

    </section>
  </>;
}