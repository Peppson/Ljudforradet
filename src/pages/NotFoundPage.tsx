import { useLocation, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return <>
    <section className="background-container">
      <img src="/images/video-still-1.png" className="background-img" />
    </section>

    <section className="page-section">
      <div className="container">
        <div className="text-center pd-5 mb-4">
          <h2 className="pb-2 display-4">404: Sidan kunde inte hittas</h2>
          <p className="m-1">Tyvärr verkar det inte finnas någon sida som matchar den angivna adressen:</p>
          <p><strong>{location.pathname}</strong></p>
        </div>

        <div className="d-flex justify-content-center">
          <button onClick={() => navigate("/")} className="btn btn-primary px-5 py-2 rounded-5 hover-grow">
            Till startsidan!
          </button>
        </div>
      </div>
    </section>
  </>;
}
