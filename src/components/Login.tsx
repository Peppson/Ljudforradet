import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SubmitButton from './SubmitButton';

export default function Login({ setLoginPage }: { setLoginPage: (value: boolean) => void }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let [user, setUser] = useState({
    email: "",
    password: ""
  });

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setUser({ ...user, [name]: value });
  }

  async function sendForm(event: React.FormEvent) {
    event.preventDefault();
    const minSpinnerTime = 800;
    const payload: any = { ...user };

    setIsLoading(true);

    const fetchPromise = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    //await Promise.all([fetchPromise, new Promise((res) => setTimeout(res, minSpinnerTime))]);

    await new Promise((resolve) => setTimeout(resolve, minSpinnerTime));
    /* const success = await loginUser(email, password);
    if (success) {
      navigate("/profile"); */

    navigate("/");
  }

  return <>
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Logga in</p>
      </div>

      <Form onSubmit={sendForm}>

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
              required
            />
          </Form.Label>
        </Form.Group>

        <div className="text-lg-start pt-2 align-items-center d-flex flex-column">

          <SubmitButton isLoading={isLoading}>
            Logga in
          </SubmitButton>

          <p className="small mt-4">
            Har du inget konto?{" "}
            <a
              className="text-light cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setLoginPage(false);
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
