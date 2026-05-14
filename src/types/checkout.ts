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
