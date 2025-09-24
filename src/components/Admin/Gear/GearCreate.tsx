import { Col, Form, Row } from "react-bootstrap";
import { useApi } from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import type Gear from "../../../interfaces/Gear";
import FormText from "../../FormFields/FormText";

interface GearCreateProps {
  revalidator: { revalidate: () => void };
  onSuccess?: () => void;
  editItem?: Gear; // = edit mode
}

export default function GearCreate({ revalidator, onSuccess, editItem }: GearCreateProps) {
  const { showErrorMsg } = useErrorMessage();
  const { postFetch, putFetch } = useApi();
  const isEditMode = !!editItem;

  let [gearData, setGearData] = useState({
    name: "",
    brand: "",
    model: "",
    dailyPrice: "",
    condition: "Sliten",
    available: "1",
    desc: ""
  });

  // Prefill if edit mode
  useEffect(() => {
    if (isEditMode) {
      setGearData({
        name: editItem.name || "",
        brand: editItem.brand || "",
        model: editItem.model || "",
        dailyPrice: editItem.dailyPrice?.toString() || "",
        condition: editItem.condition || "Sliten",
        available: editItem.available ? "1" : "0",
        desc: editItem.desc || ""
      });
    }
  }, [editItem]);

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setGearData({ ...gearData, [name]: value.trim() });
  }

  async function sendForm(event: React.FormEvent) {
    event.preventDefault();

    const success = isEditMode
      ? await putFetch(`/api/products/${editItem.id}`, gearData)
      : await postFetch("/api/products", gearData);

    const responseData = await success?.json();

    if (!success || !success.ok) {
      showErrorMsg(responseData);
      return;
    }

    revalidator.revalidate();

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
            typeName="name"
            value={gearData.name} />

          <FormText
            setFormProp={setFormProp}
            label="Modell"
            placeholder="Modell"
            typeName="model"
            value={gearData.model} />

          <Form.Group className="mb-3">
            <Form.Label className="d-block">
              <p className="mb-1 text-light">Skick</p>
              <Form.Select
                name="condition"
                onChange={setFormProp}
                required
                className="modal-select-options"
                value={gearData.condition}>
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
            typeName="brand"
            value={gearData.brand} />

          <FormText
            setFormProp={setFormProp}
            label="Pris"
            placeholder="Pris per dag i kronor"
            typeName="dailyPrice"
            value={gearData.dailyPrice} />

          <Form.Group className="mb-3">
            <Form.Label className="d-block">
              <p className="mb-1 text-light">Tillgänglighet</p>
              <Form.Select
                name="available"
                onChange={setFormProp}
                required
                className="modal-select-options"
                value={gearData.available}>
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
          typeName="desc"
          value={gearData.desc} />
      </Row>
    </Form>
  </>
}
