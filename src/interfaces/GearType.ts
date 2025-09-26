export const GearTypes = [
  "Gitarr",
  "Bas",
  "Slagverk",
  "Klaviatur",
  "Sträng",
  "Stråk",
  "Blås",
  "Förstärkare",
  "Övrigt"
] as const;

export type GearType = typeof GearTypes[number];
