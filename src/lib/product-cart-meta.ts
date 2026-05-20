import type { Product } from "@/data/products";

export function getPerfumeType(product: Pick<Product, "perfumeType">): string {
  return product.perfumeType ?? "Eau de Parfum";
}

export function getSizeOptions(
  product: Pick<Product, "sizeOptions" | "isLuxuryPerfume">
): string[] {
  if (product.sizeOptions?.length) return product.sizeOptions;
  if (product.isLuxuryPerfume) return ["50 ml", "100 ml", "100 ml · Atelier"];
  return ["50 ml", "100 ml"];
}
