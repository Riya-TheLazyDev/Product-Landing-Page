import type { Product } from "@/data/products";

export type MockProduct = Pick<
  Product,
  "id" | "name" | "price" | "category" | "ratings"
> & { image?: string };

const CATEGORY_SUBTITLE: Record<string, string> = {
  Luxury: "Noir oud · velvet dusk accord",
  Protect: "Luminous veil · ritual of care",
  Regenerates: "Silken renewal · cellular poetry",
  Revitalizes: "Radiant awakening · botanic depth",
  Feeds: "Nourishing absolue · supple veil",
  Regulates: "Harmonic balance · refined clarity",
  Purifies: "Crystalline purity · weightless cleanse",
};

export function getLuxurySubtitle(product: MockProduct): string {
  return (
    CATEGORY_SUBTITLE[product.category] ??
    "Maison-crafted · artisan sillage"
  );
}

export function getRelatedProducts(
  catalog: MockProduct[],
  currentId: string | number,
  limit = 6
): MockProduct[] {
  const currentIdStr = currentId.toString();
  const current = catalog.find((p) => p.id.toString() === currentIdStr);
  const others = catalog.filter((p) => p.id.toString() !== currentIdStr);

  if (!current || others.length === 0) {
    return others.slice(0, limit);
  }

  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
