export const GearTypes = [
  "Övrigt",
  "Gitarr",
  "Bas",
  "Slagverk",
  "Klaviatur",
  "Sträng",
  "Stråk",
  "Blås",
  "Förstärkare"
] as const;

export type GearType = typeof GearTypes[number];
