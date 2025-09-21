import { Form } from "react-bootstrap";
import type FormProps from "../../interfaces/FormProps";

export default function FormPassword({ setFormProp, label, placeholder }: FormProps) {
  return <>
    <Form.Group className="mb-4">
      <Form.Label className="d-block">
        <p className="mb-1 text-light">{label}</p>
        <Form.Control
          name="password"
          type="password"
          onChange={setFormProp}
          autoComplete="off"
          placeholder={placeholder}
          maxLength={100}
          minLength={6}
          required
        />
      </Form.Label>
    </Form.Group>
  </>
}
