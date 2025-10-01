import { Col, Form, Row } from "react-bootstrap";
import { useApi } from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import type Gear from "../../../interfaces/Gear";
import FormText from "../../formFields/FormText";
import { GearTypes } from "../../../interfaces/GearType";
import FormNumber from "../../formFields/FormNumber";

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
    dailyPrice: 0,
    condition: "Sliten",
    available: "1",
    desc: "",
    type: "Övrigt"
  });

  // Prefill if edit mode
  useEffect(() => {
    if (isEditMode) {
      setGearData({
        name: editItem.name || "",
        brand: editItem.brand || "",
        model: editItem.model || "",
        dailyPrice: editItem.dailyPrice || 0,
        condition: editItem.condition || "Sliten",
        available: editItem.available ? "1" : "0",
        desc: editItem.desc || "",
        type: editItem.type || "Övrigt"
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
        </Col>

        <Col md={6}>
          <FormText
            setFormProp={setFormProp}
            label="Märke"
            placeholder="Märke"
            typeName="brand"
            value={gearData.brand} />
          <FormNumber
            setFormProp={setFormProp}
            label="Pris"
            placeholder="Pris per dag i kronor"
            typeName="dailyPrice"
            value={gearData.dailyPrice} />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
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

        <Col md={4}>
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

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="d-block">
              <p className="mb-1 text-light">Typ</p>
              <Form.Select
                name="type"
                onChange={setFormProp}
                required
                className="modal-select-options"
                value={gearData.type}>
                {GearTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>

      <FormText
        setFormProp={setFormProp}
        label="Beskrivning"
        placeholder="Beskrivning"
        typeName="desc"
        textArea={true}
        value={gearData.desc} />
    </Form >
  </>
}
