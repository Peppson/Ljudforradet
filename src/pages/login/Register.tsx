import { useState } from "react";
import { Form } from "react-bootstrap";
import { useApi } from "../../hooks/useApi";
import { useErrorMessage } from "../../hooks/useErrorMessage";
import { useShowAlert } from "../../context/AlertProvider";
import SubmitButton from "./SubmitButton";
import config from "../../config/Config";
import FormText from "../../components/formInputs/FormText";
import FormEmail from "../../components/formInputs/FormEmail";
import FormPassword from "../../components/formInputs/FormPassword";

export default function Register({ setIsLoginPage: setIsLoginPage }: { setIsLoginPage: (value: boolean) => void }) {
  const { showErrorMsg } = useErrorMessage();
  const { showAlert } = useShowAlert();
  const { postFetch } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  let [createUser, setCreateUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setCreateUser({ ...createUser, [name]: value.trim() });
  }

  async function sendForm(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    const success = await postFetch("/api/users", createUser);
    await Promise.all([success, new Promise((res) => setTimeout(res, config.loadingSpinnerMinDuration))]);
    const responseData = await success?.json();

    if (success == null || !success.ok) {
      showErrorMsg(responseData);
      setIsLoading(false);
      return;
    }

    // Register successful
    setIsLoading(false);
    await showAlert({
      title: `Välkommen ${createUser.name}!`,
      message: "Ditt konto är skapat och du kan nu logga in.",
      variant: "success"
    })
    setIsLoginPage(true);
  }

  return <>
    <Form onSubmit={sendForm} className="py-2 pt-3">
      <h5 className="text-center fw-bold">Registrera</h5>

      <FormText
        setFormProp={setFormProp}
        label="Namn"
        placeholder="Ange ditt namn" />
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
            Registrera
          </SubmitButton>
        </div>

        <p className="small mt-4 text-center text-light">
          Har du redan ett konto?{" "}
          <a
            className="text-danger cursor-pointer text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginPage(true);
            }}>
            Logga in
          </a>
        </p>
      </div>
    </Form>
  </>;
}
