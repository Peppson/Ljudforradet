import { Form } from "react-bootstrap";

interface TextFormProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  typeName?: string;
}

export default function FormText({ setFormProp, label, placeholder, typeName = "name" }: TextFormProps) {
  return <>
    <Form.Group className="mb-3">
      <Form.Label className="d-block">
        <p className="mb-1 text-light">{label}</p>
        <Form.Control
          name={typeName}
          onChange={setFormProp}
          autoComplete="off"
          placeholder={placeholder}
          maxLength={200}
          minLength={2}
          required
        />
      </Form.Label>
    </Form.Group>
  </>
}
