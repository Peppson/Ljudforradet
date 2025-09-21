import { Form } from "react-bootstrap";
import FormText from "../FormFields/FormText";
import FormEmail from "../FormFields/FormEmail";
import FormPassword from "../FormFields/FormPassword";
import { useApi } from "../../hooks/useApi";
import { useState } from "react";
import { error } from "../../utils/Utilities";

export default function UserCreate({ revalidator, onSuccess }: {
  revalidator: { revalidate: () => void };
  onSuccess?: () => void;
}) {
  const { postFetch } = useApi();

  let [createUser, setCreateUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setCreateUser({ ...createUser, [name]: value.trim() });
  }

  async function sendForm(event: React.FormEvent) {
    event.preventDefault();

    const success = await postFetch("/api/users", createUser);
    const responseData = await success?.json();

    if (success == null || !success.ok) {
      error(responseData);
      return;
    }

    revalidator.revalidate();

    if (onSuccess) {
      onSuccess();
    }
  }

  return <>
    <Form id="registerForm" onSubmit={sendForm}>
      <FormText
        setFormProp={setFormProp}
        label="Namn"
        placeholder="Ange ditt namn" />
      <FormEmail
        setFormProp={setFormProp}
        label="E-postadress"
        placeholder="Ange din e-postadress" />
      <FormPassword
        setFormProp={setFormProp}
        label="Lösenord"
        placeholder="Ange ditt lösenord" />
    </Form>
  </>
}
