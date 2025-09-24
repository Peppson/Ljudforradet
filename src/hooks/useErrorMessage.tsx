import { useShowAlert } from "../context/AlertProvider";

export function useErrorMessage() {
  const { showAlert } = useShowAlert();

  const showErrorMsg = async (responseData: any) => {
    if (!responseData) {
      await showAlert({
        title: "Error",
        message: "Något gick fel, försök igen.",
        variant: "danger"
      });

    } else if (responseData.error && responseData.error.includes("UNIQUE constraint failed: users.email")) {
      await showAlert({
        title: "Varning",
        message: "Denna e-postadress är redan upptagen.",
        variant: "warning"
      });

    } else {
      await showAlert({
        title: "Varning",
        message: "Registrering misslyckades, kontrollera dina uppgifter och försök igen.",
        variant: "warning"
      });
    }
  };

  return { showErrorMsg };
}
