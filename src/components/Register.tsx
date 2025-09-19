import { useState } from 'react';
import { Form } from 'react-bootstrap';
import SubmitButton from './SubmitButton';
import config from '../config/Config';
import { useApi } from '../hooks/useApi';

export default function Register({ setIsLoginPage: setIsLoginPage }: { setIsLoginPage: (value: boolean) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { postFetch } = useApi();

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
    const responseData = await success!.json();

    if (success == null || !success.ok) {
      error(responseData);
      return;
    }

    // Register successful
    setIsLoading(false);
    alert(`Välkommen ${createUser.name}! Logga in med dina uppgifter.`);
    setIsLoginPage(true);
  }

  function error(responseData: any) {
    if (!responseData) {
      alert("Något gick fel, försök igen.");
    } else if (responseData.error && responseData.error.includes("UNIQUE constraint failed: users.email")) {
      alert("En användare med denna e-postadress finns redan.");
    } else {
      alert("Registrering misslyckades, kontrollera dina uppgifter och försök igen.");
    }
    setIsLoading(false);
  }

  return <>
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Registrera dig</p>
      </div>
      <Form onSubmit={sendForm}>

        <Form.Group className="mb-3">
          <Form.Label className="d-block">
            <p className="mb-1 text-light">Namn</p>
            <Form.Control
              name="name"
              onChange={setFormProp}
              autoComplete="off"
              placeholder="Ange ditt namn"
              maxLength={100}
              minLength={2}
              required
            />
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="d-block">
            <p className="mb-1 text-light">E-postadress</p>
            <Form.Control
              name="email"
              type="email"
              onChange={setFormProp}
              autoComplete="email"
              placeholder="Ange din e-postadress"
              maxLength={100}
              minLength={5}
              required
              inputMode="email"
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            />
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="d-block">
            <p className="mb-1 text-light">Lösenord</p>
            <Form.Control
              name="password"
              type="password"
              onChange={setFormProp}
              autoComplete='off'
              placeholder="Ange ditt lösenord"
              maxLength={100}
              minLength={6}
              required
            />
          </Form.Label>
        </Form.Group>

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