import { Form } from "react-bootstrap";
import type FormProps from "../../interfaces/FormProps";

export default function FormEmail({ setFormProp, label, placeholder, value = "" }: FormProps) {
  return <>
    <Form.Group className="mb-3">
      <Form.Label className="d-block">
        <p className="mb-1 text-light">{label}</p>
        <Form.Control
          name="email"
          type="email"
          onChange={setFormProp}
          autoComplete="email"
          placeholder={placeholder}
          maxLength={100}
          minLength={5}
          required
          inputMode="email"
          pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
          defaultValue={value} />
      </Form.Label>
    </Form.Group>
  </>
}
