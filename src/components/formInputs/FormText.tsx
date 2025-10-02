import { Form } from "react-bootstrap";

interface TextFormProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  typeName?: string;
  value?: string;
  textArea?: boolean;
}

export default function FormText({ setFormProp, label, placeholder, typeName = "name", value = "", textArea = false }: TextFormProps) {
  return <>
    <Form.Group className="mb-3">
      <Form.Label className="d-block">
        <p className="mb-1 text-light">{label}</p>
        <Form.Control
          name={typeName}
          onChange={setFormProp}
          autoComplete="off"
          placeholder={placeholder}
          maxLength={300}
          minLength={2}
          as={textArea ? "textarea" : "input"}
          required
          defaultValue={value} />
      </Form.Label>
    </Form.Group>
  </>
}
