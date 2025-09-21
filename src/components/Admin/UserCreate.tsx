import { Form } from "react-bootstrap";
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { useErrorHandler } from "../../hooks/useErrorMessage";
import type User from "../../interfaces/User";
import FormText from "../FormFields/FormText";
import FormEmail from "../FormFields/FormEmail";
import FormPassword from "../FormFields/FormPassword";

interface UserCreateProps {
  revalidator: { revalidate: () => void };
  onSuccess?: () => void;
  editItem?: User; // = edit mode
}

export default function UserCreate({ revalidator, onSuccess, editItem }: UserCreateProps) {
  const { showErrorMsg } = useErrorHandler();
  const { postFetch, putFetch } = useApi();
  const isEditMode = !!editItem;

  let [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Prefill if edit mode
  useEffect(() => {
    if (isEditMode) {
      setUserData({
        name: editItem.name || "",
        email: editItem.email || "",
        password: "" // never prefill password
      });
    }
  }, [editItem]);

  function setFormProp(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | null } = event.target as HTMLInputElement;
    setUserData({ ...userData, [name]: value.trim() });
  }

  async function sendForm(event: React.FormEvent) {
    event.preventDefault();

    const success = isEditMode
      ? await putFetch(`/api/users/${editItem.id}`, userData)
      : await postFetch("/api/users", userData);

    const responseData = await success?.json();

    if (success == null || !success.ok) {
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
      <FormText
        setFormProp={setFormProp}
        label="Namn"
        placeholder="Ange ditt namn"
        value={userData.name} />

      <FormEmail
        setFormProp={setFormProp}
        label="E-postadress"
        placeholder="Ange din e-postadress"
        value={userData.email} />

      <FormPassword
        setFormProp={setFormProp}
        label="Lösenord"
        placeholder="Ange ditt lösenord" />
    </Form>
  </>
}
