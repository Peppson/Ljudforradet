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

export function getCurrentTabName(activeTab: string) {
  switch (activeTab) {
    case "1": return "utrustning";
    case "2": return "användare";
    case "3": return "order";
    default: return "utrustning";
  }
}
