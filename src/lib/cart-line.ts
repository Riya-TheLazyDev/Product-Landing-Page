export function makeLineId(productId: string | number, size: string): string {
  return `${String(productId)}::${size}`;
}
