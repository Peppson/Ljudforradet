import { Form } from "react-bootstrap";

interface TextFormProps {
  setFormProp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  value?: number | null;
  typeName?: string;
}

export default function FormNumber({ setFormProp, label, placeholder, value, typeName = "name" }: TextFormProps) {
  return <>
    <Form.Group className="mb-3">
      <Form.Label className="d-block">
        <p className="mb-1 text-light">{label}</p>
        <Form.Control
          name={typeName}
          type="number"
          onChange={setFormProp}
          autoComplete="off"
          placeholder={placeholder}
          required
          value={!value ? "" : value} />
      </Form.Label>
    </Form.Group>
  </>
}
