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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        title: "Error",
        message: "Inloggning misslyckades, kontrollera dina uppgifter och försök igen.",
        variant: "danger"
      })
      setIsLoading(false);
      return;
    }

    // Login successful
    navigate("/");
  }

  return <>
    <Form onSubmit={sendForm} className="py-2 pt-3">
      <h5 className="text-center fw-bold">Logga in</h5>

      <FormEmail
        setFormProp={setFormProp}
        label="E-postadress"
        placeholder="Ange din e-postadress" />
      <FormPassword
        setFormProp={setFormProp}
        label="Lösenord"
        placeholder="Ange ditt lösenord" />

      <div className="pt-3 d-flex flex-column">
        <div className="d-grid gap-2">
          <SubmitButton isLoading={isLoading}>
            Logga in
          </SubmitButton>
        </div>

        <p className="small mt-4 text-center text-light">
          Inget konto?{" "}
          <a
            className="text-danger cursor-pointer text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginPage(false);
            }}>
            Registrera dig
          </a>
        </p>
      </div>
    </Form>
  </>
}
