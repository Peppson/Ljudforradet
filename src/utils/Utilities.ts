import config from "../config/Config";
import type Gear from "../interfaces/Gear";
import type User from "../interfaces/User";

export const scrollToElement = (elementId: string, headerOffset: number = 100) => {
  const targetElement = document.getElementById(elementId);
  if (targetElement) {
    const targetPosition = targetElement.offsetTop - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  }
};

export const forceCorrectType = (gear: Gear[] | null) => {
  if (!gear) return null;

  // TS/JS who knows? What is a type anyway? >;-(
  // Force it!
  return gear.map((item: any) => ({
    ...item,
    id: Number(item.id || 0),
    name: String(item.name || ""),
    brand: String(item.brand || ""),
    model: String(item.model || ""),
    dailyPrice: Number(item.dailyPrice || 0),
    condition: String(item.condition || ""),
    available: Boolean(item.available || false),
    desc: String(item.desc || ""),
    type: String(item.type || "Övrigt")
  }));
};

export const isUserLoggedIn = async (user: User | null) => {
  if (!user || user.role === "visitor") {
    return false;
  }
  return true;
};

export function getTrimmedDesc(str: string, maxLength: number = config.descriptionMaxLength): string {
  if (!str) return "";

  return str.length > maxLength
    ? str.substring(0, maxLength) + "..."
    : str;
}

export function getTrimmedName(name: string | null | undefined, maxLength: number = 10): string {
  if (!name) return "";
  
  const firstName = String(name).trim().split(" ")[0];
  return firstName.length > maxLength
  ? firstName.slice(0, maxLength) + ".."
  : firstName;
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getCurrentTabName(activeTab: string) {
  switch (activeTab) {
    case "1": return "utrustning";
    case "2": return "användare";
    case "3": return "order";
    default: return "utrustning";
  }
}

export async function validateCreateOrderResponse(success: Response | null) {
  if (!success || !success.ok) {
    return { isValid: false, data: null };
  }

  const responseData = await success.json();
  return { isValid: true, data: responseData };
}
