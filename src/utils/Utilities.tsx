export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getTrimmedName(name: string | null | undefined, maxLength: number = 10): string {
  if (!name) return "";

  const firstName = String(name).trim().split(" ")[0];
  return firstName.length > maxLength
    ? firstName.slice(0, maxLength) + ".."
    : firstName;
}

export function error(responseData: any) {
  if (!responseData) {
    alert("Något gick fel, försök igen.");
  } else if (responseData.error && responseData.error.includes("UNIQUE constraint failed: users.email")) {
    alert("En användare med denna e-postadress finns redan.");
  } else {
    alert("Registrering misslyckades, kontrollera dina uppgifter och försök igen.");
  }
}
