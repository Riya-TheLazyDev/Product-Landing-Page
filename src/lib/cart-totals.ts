const FREE_SHIPPING_MIN = 150;
const SHIPPING_FLAT = 15;
const TAX_RATE = 0.1;

export type CartTotals = {
  subtotal: number;
  shipping: number;
  shippingLabel: string;
  taxes: number;
  total: number;
  promotionalSavings: number;
};

export function computeCartTotals(
  lines: { price: number; quantity: number }[]
): CartTotals {
  const subtotal = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0
  );
  const shipping =
    subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FLAT;
  const shippingLabel =
    subtotal === 0
      ? "—"
      : subtotal >= FREE_SHIPPING_MIN
        ? "Complimentary"
        : `$${shipping.toFixed(2)}`;
  const taxes = subtotal > 0 ? Math.round(subtotal * TAX_RATE * 100) / 100 : 0;
  const promotionalSavings =
    subtotal > 0
      ? Math.min(45, Math.round(subtotal * 0.05 * 100) / 100)
      : 0;
  const total =
    subtotal === 0
      ? 0
      : Math.round((subtotal + shipping + taxes) * 100) / 100;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    shipping,
    shippingLabel,
    taxes,
    total,
    promotionalSavings,
  };
}
