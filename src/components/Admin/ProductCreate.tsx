import { Col, Form, Row } from "react-bootstrap";
import FormText from "../FormFields/FormText";
import { useApi } from "../../hooks/useApi";
import { useState } from "react";
import { error } from "../../utils/Utilities";

export default function ProductCreate({ revalidator, onSuccess }: {
  revalidator: { revalidate: () => void };
  onSuccess?: () => void;
}) {
  const { postFetch } = useApi();

  let [createProduct, setCreateProduct] = useState({
    name: "",
    brand: "",
    model: "",
    dailyPrice: "",
    condition: "Sliten",
    available: "1",
    desc: ""
  });

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setCreateProduct({ ...createProduct, [name]: value.trim() });

    console.log(createProduct);
  }

  async function sendForm(event: React.FormEvent) {
    event.preventDefault();
    const success = await postFetch("/api/products", createProduct);
    const responseData = await success?.json();

    if (success == null || !success.ok) {
      error(responseData);
      return;
    }

    revalidator.revalidate();
    alert(`Utrustning: ${createProduct.name} skapad!`);

    if (onSuccess) {
      onSuccess();
    }
  }

  return <>
    <Form id="registerForm" onSubmit={sendForm}>
      <Row>
        <Col md={6}>
          <FormText
            setFormProp={setFormProp}
            label="Namn"
            placeholder="Utrustningens namn"
            typeName="name" />

          <FormText
            setFormProp={setFormProp}
            label="Modell"
            placeholder="Modell"
            typeName="model" />

          <Form.Group className="mb-3">
            <Form.Label className="d-block">
              <p className="mb-1 text-light">Skick</p>
              <Form.Select
                name="condition"
                onChange={setFormProp}
                required
                className="modal-select-options"
                value={createProduct.condition}>
                <option value="Sliten">Sliten</option>
                <option value="Bra">Bra</option>
                <option value="Mycket bra">Mycket bra</option>
                <option value="Ny">Ny</option>
              </Form.Select>
            </Form.Label>
          </Form.Group>
        </Col>

        <Col md={6}>
          <FormText
            setFormProp={setFormProp}
            label="Märke"
            placeholder="Märke"
            typeName="brand" />

          <FormText
            setFormProp={setFormProp}
            label="Pris"
            placeholder="Pris per dag i kronor"
            typeName="dailyPrice" />

          <Form.Group className="mb-3">
            <Form.Label className="d-block">
              <p className="mb-1 text-light">Tillgänglighet</p>
              <Form.Select
                name="available"
                onChange={setFormProp}
                required
                className="modal-select-options"
                value={createProduct.available}>
                <option value="1">Tillgänglig</option>
                <option value="0">Uthyrd</option>
              </Form.Select>
            </Form.Label>
          </Form.Group>
        </Col>

        <FormText
          setFormProp={setFormProp}
          label="Beskrivning"
          placeholder="Beskrivning"
          typeName="desc" />
      </Row>
    </Form>
  </>
}
