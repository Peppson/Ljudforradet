import { Form, Button } from 'react-bootstrap';

export default function Login() {
  return <>
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Logga in</p>
      </div>

      <Form onSubmit={() => { }}>

        <Form.Group className="mb-3">
          <Form.Label className="d-block">
            <p className="mb-1 text-light">E-postadress</p>
            <Form.Control
              onChange={() => { }}
              type="email"
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
              onChange={() => { }}
              type="password"
              autoComplete='off'
              placeholder="Ange ditt lösenord"
              maxLength={100}
              required
            />
          </Form.Label>
        </Form.Group>

        <div className="text-lg-start pt-2 align-items-center d-flex flex-column">
          <Button
            type="submit"
            className="btn btn-primary px-5 py-2 rounded-5 hover-grow">
            Logga in
          </Button>
          <p className="small mt-4">Har du inget konto? <a href="#!" className="text-light">Registrera dig</a></p>
        </div>

      </Form>
    </div>
  </>
}
