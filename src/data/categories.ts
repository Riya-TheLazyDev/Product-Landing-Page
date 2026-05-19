export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export const CATEGORIES: Category[] = [
  { id: "cat-1", name: "Men", slug: "men", description: "Luxury fragrances tailored for men" },
  { id: "cat-2", name: "Women", slug: "women", description: "Elegant scents designed for women" },
  { id: "cat-3", name: "Unisex", slug: "unisex", description: "Transcendent notes for everyone" },
  { id: "cat-4", name: "Gift Sets", slug: "gift-sets", description: "Exquisite sets for special occasions" },
];
