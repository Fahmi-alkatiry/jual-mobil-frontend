const FALLBACK_WHATSAPP_NUMBER = "6289668125652";

export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WATCHAPP_NUMBER || FALLBACK_WHATSAPP_NUMBER
).replace(/[^\d]/g, "");

export function buildWaLink(message: string, number = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
