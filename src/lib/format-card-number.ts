export function formatCardNumber(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 19);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function cardDigitsLast4(cardNumber: string): string {
  const digits = cardNumber.replace(/\s/g, "");
  return digits.slice(-4).padStart(4, "0").slice(-4);
}
