export type CheckoutDraft = {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  saveInfo: boolean;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  billingSameAsShipping: boolean;
};

export const defaultCheckoutDraft = (): CheckoutDraft => ({
  email: "",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  saveInfo: false,
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  billingSameAsShipping: true,
});

export const CHECKOUT_STEP_LABELS = [
  "Information",
  "Shipping",
  "Payment",
  "Review",
] as const;

export type SavedAddress = {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
};

export type SavedAddressInput = Omit<SavedAddress, "id" | "isDefault"> & {
  isDefault?: boolean;
};

export type SavedContact = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  isDefault: boolean;
};

export type SavedContactInput = Omit<SavedContact, "id" | "isDefault"> & {
  isDefault?: boolean;
};

/** Persisted payment profile: full PAN/CVC are never stored — only last4 for display. */
export type SavedPaymentMethod = {
  id: string;
  cardName: string;
  last4: string;
  cardExpiry: string;
  billingSameAsShipping: boolean;
  isDefault: boolean;
};

export type SavedPaymentMethodInput = {
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  billingSameAsShipping: boolean;
  isDefault?: boolean;
};

function newAddressId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `addr-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export { newAddressId };
