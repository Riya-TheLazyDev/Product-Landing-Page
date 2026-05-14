import { products, type Product } from "@/mock/product";

export type MockProduct = Product;

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

function featuredOrder(excludeIdStr: string): MockProduct[] {
  return [...products]
    .filter((p) => p.id.toString() !== excludeIdStr)
    .sort((a, b) => {
      if (a.isLuxuryPerfume && !b.isLuxuryPerfume) return -1;
      if (!a.isLuxuryPerfume && b.isLuxuryPerfume) return 1;
      return b.ratings - a.ratings;
    });
}

export function getRelatedProducts(
  currentId: string | number,
  limit = 6
): MockProduct[] {
  const currentIdStr = currentId.toString();
  const current = products.find((p) => p.id.toString() === currentIdStr);
  const others = products.filter((p) => p.id.toString() !== currentIdStr);

  if (!current || others.length === 0) {
    return featuredOrder(currentIdStr).slice(0, limit);
  }

  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  const ordered = [...sameCategory, ...rest];

  const seen = new Set<string>();
  const unique: MockProduct[] = [];
  for (const p of ordered) {
    const key = p.id.toString();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(p);
    if (unique.length >= limit) return unique;
  }

  for (const p of featuredOrder(currentIdStr)) {
    const key = p.id.toString();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(p);
    if (unique.length >= limit) break;
  }

  return unique.slice(0, limit);
}
