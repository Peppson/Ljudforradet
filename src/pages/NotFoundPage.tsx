import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return <>
    <section className="page-section background-container-img">
      <Container className="space-top-header">
        <div className="text-center mb-4">
          <h2 className="pb-2 display-4"><span className="text-danger">404:</span> Sidan kunde inte hittas</h2>
          <p className="m-1">Tyvärr verkar det inte finnas någon sida som matchar den angivna adressen:</p>
          <p className="m-1">{location.pathname}</p>
        </div>

        <div className="d-flex justify-content-center">
          <button onClick={() => navigate("/")} className="btn btn-primary px-5 py-2 rounded-5 hover-grow">
            Till startsidan!
          </button>
        </div>
      </Container>
    </section >
  </>;
}
