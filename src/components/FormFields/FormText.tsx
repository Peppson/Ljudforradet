import { Form } from "react-bootstrap";

interface TextFormProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  typeName?: string;
  value?: string;
}

export default function FormText({ setFormProp, label, placeholder, typeName = "name", value = "" }: TextFormProps) {
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
          defaultValue={value}
        />
      </Form.Label>
    </Form.Group>
  </>
}
