/** Server-side cart totals — must match src/lib/cart-totals.ts */
const FREE_SHIPPING_MIN = 150;
const SHIPPING_FLAT = 15;
const TAX_RATE = 0.1;

export function computeOrderTotals(subtotal) {
  const safeSubtotal = Math.max(0, Number(subtotal) || 0);
  const shipping =
    safeSubtotal === 0 ? 0 : safeSubtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FLAT;
  const tax =
    safeSubtotal > 0 ? Math.round(safeSubtotal * TAX_RATE * 100) / 100 : 0;
  const total = Math.round((safeSubtotal + shipping + tax) * 100) / 100;

  return {
    subtotal: Math.round(safeSubtotal * 100) / 100,
    shipping_cost: shipping,
    tax_amount: tax,
    total_amount: total,
  };
}
