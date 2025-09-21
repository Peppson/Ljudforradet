import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useShowAlert } from "../../context/AlertProvider";
import SubmitButton from "./SubmitButton";
import config from "../../config/Config";
import FormEmail from "../FormFields/FormEmail";
import FormPassword from "../FormFields/FormPassword";

export default function Login({ setIsLoginPage: setIsLoginPage }: { setIsLoginPage: (value: boolean) => void }) {
  const { showAlert } = useShowAlert();
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let [payload, setPayload] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setPayload({ ...payload, [name]: value.trim() });
  }

  async function sendForm(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    const success = await loginUser(payload.email, payload.password);
    await Promise.all([success, new Promise((res) => setTimeout(res, config.loadingSpinnerMinDuration))]);

    if (!success) {
      await showAlert({
        title: "Varning",
        message: "Inloggning misslyckades, kontrollera dina uppgifter och försök igen.",
        variant: "warning"
      })
      setIsLoading(false);
      return;
    }

    // Login successful
    navigate("/");
  }

  return <>
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Logga in</p>
      </div>

      <Form onSubmit={sendForm}>
        <FormEmail
          setFormProp={setFormProp}
          label="E-postadress"
          placeholder="Ange din e-postadress" />
        <FormPassword
          setFormProp={setFormProp}
          label="Lösenord"
          placeholder="Ange ditt lösenord" />

        <div className="text-lg-start pt-2 align-items-center d-flex flex-column">

          <SubmitButton isLoading={isLoading}>
            Logga in
          </SubmitButton>

          <p className="small mt-4">
            Har du inget konto?{" "}
            <a
              className="text-danger cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginPage(false);
              }}
            >
              Registrera dig
            </a>
          </p>
        </div>
      </Form>
    </div>
  </>
}
