import { useState } from "react";
import { Form } from "react-bootstrap";
import { useApi } from "../../hooks/useApi";
import { useErrorHandler } from "../../hooks/useErrorMessage";
import { useShowAlert } from "../../context/AlertProvider";
import SubmitButton from "./SubmitButton";
import config from "../../config/Config";
import FormText from "../FormFields/FormText";
import FormEmail from "../FormFields/FormEmail";
import FormPassword from "../FormFields/FormPassword";

export default function Register({ setIsLoginPage: setIsLoginPage }: { setIsLoginPage: (value: boolean) => void }) {
  const { showErrorMsg } = useErrorHandler();
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
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Registrera</p>
      </div>
      <Form onSubmit={sendForm}>
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

        <div className="text-lg-start pt-2 align-items-center d-flex flex-column">
          <SubmitButton isLoading={isLoading}>
            Registrera
          </SubmitButton>
          <p className="small mt-4">
            Har du redan ett konto?{" "}
            <a
              className="text-light cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginPage(true);
              }}
            >
              Logga in
            </a>
          </p>
        </div>
      </Form>
    </div>
  </>;
}
