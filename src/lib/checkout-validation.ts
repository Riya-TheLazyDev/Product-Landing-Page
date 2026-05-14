import type { CheckoutDraft } from "@/types/checkout";

export type FieldErrors = Record<string, string>;

function cleanCardDigits(value: string): string {
  return value.replace(/\s/g, "");
}

export function validateCheckoutStep(
  step: number,
  draft: CheckoutDraft
): FieldErrors {
  if (step >= 3) return {};
  const e: FieldErrors = {};

  if (step === 0) {
    if (!draft.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()))
      e.email = "Enter a valid email";
    if (draft.fullName.trim().length < 2)
      e.fullName = "Please enter your full name";
    if (draft.phone.trim().length < 8) e.phone = "A valid phone number is required";
  }

  if (step === 1) {
    if (draft.address.trim().length < 4)
      e.address = "Street address is required";
    if (draft.city.trim().length < 2) e.city = "City is required";
    if (!draft.state.trim()) e.state = "State / province is required";
    if (draft.zip.trim().length < 3) e.zip = "Postal code is required";
    if (!draft.country.trim()) e.country = "Country is required";
  }

  if (step === 2) {
    if (draft.cardName.trim().length < 2)
      e.cardName = "Name on card is required";
    const digits = cleanCardDigits(draft.cardNumber);
    if (digits.length < 15 || digits.length > 19 || !/^\d+$/.test(digits))
      e.cardNumber = "Enter a valid card number";
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(draft.cardExpiry.trim()))
      e.cardExpiry = "Use MM / YY";
    if (!/^\d{3,4}$/.test(draft.cardCvc.trim()))
      e.cardCvc = "Security code required";
  }

  return e;
}
