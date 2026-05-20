import type { Product } from "@/data/products";

/** Raw product row from Express/MySQL API (snake_case). */
export type ApiProduct = {
  id: number | string;
  name: string;
  slug: string;
  description?: string | null;
  price: number | string;
  discount_price?: number | string | null;
  category: string;
  stock?: number;
  sku?: string | null;
  featured?: boolean | number;
  status?: string;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

export function mapApiProduct(raw: ApiProduct): Product {
  const price = Number(raw.price);
  const discountPrice =
    raw.discount_price != null && raw.discount_price !== ""
      ? Number(raw.discount_price)
      : undefined;

  const imageUrl = raw.image_url || "/assets/product.jpeg";

  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description || "",
    price,
    discountPrice,
    images: [imageUrl],
    image_url: raw.image_url || imageUrl,
    category: raw.category,
    stock: raw.stock ?? 0,
    sku: raw.sku || "",
    featured: !!raw.featured,
    status: raw.status || "Active",
    created_at: raw.created_at,
    updated_at: raw.updated_at,
    ratings: 4.8,
    isLuxuryPerfume: raw.category === "Luxury",
    perfumeType: raw.category === "Luxury" ? "Eau de Parfum" : undefined,
    sizeOptions: raw.category === "Luxury" ? ["50 ml", "100 ml", "200 ml · Maison"] : undefined,
  };
}

export function mapApiProducts(rows: ApiProduct[]): Product[] {
  return rows.map(mapApiProduct);
}

/** Card/grid props used by CollectionProductCard. */
export function toCollectionCardProps(product: Product) {
  return {
    id: product.id,
    name: product.name,
    price: product.discountPrice ?? product.price,
    image: product.images[0],
    isLuxuryPerfume: product.isLuxuryPerfume,
    perfumeType: product.perfumeType,
    sizeOptions: product.sizeOptions,
  };
}

export type ProductFormPayload = {
  name: string;
  slug?: string;
  description: string;
  price: number;
  discount_price?: number | null;
  category: string;
  stock: number;
  sku?: string;
  featured: boolean;
  status: string;
  image_url: string;
};

export function toApiPayload(
  form: Partial<Product> & {
    title?: string;
    imageUrl?: string;
    discount_price?: number | null;
    image_url?: string;
  }
): ProductFormPayload {
  return {
    name: (form.name || form.title || "").trim(),
    slug: form.slug,
    description: form.description || "",
    price: Number(form.price),
    discount_price:
      form.discount_price ?? form.discountPrice ?? null,
    category: form.category || "",
    stock: Number(form.stock ?? 0),
    sku: form.sku || undefined,
    featured: !!form.featured,
    status: form.status || "Active",
    image_url: form.image_url || form.imageUrl || form.images?.[0] || "",
  };
}

/** Sends only fields present in a partial update. */
export function toApiUpdatePayload(
  updates: Partial<Product> & {
    title?: string;
    imageUrl?: string;
    discount_price?: number | null;
    image_url?: string;
  }
): Partial<ProductFormPayload> {
  const payload: Partial<ProductFormPayload> = {};

  if (updates.name !== undefined || updates.title !== undefined) {
    payload.name = (updates.name || updates.title || "").trim();
  }
  if (updates.slug !== undefined) payload.slug = updates.slug;
  if (updates.description !== undefined) payload.description = updates.description;
  if (updates.price !== undefined) payload.price = Number(updates.price);
  if (updates.discount_price !== undefined || updates.discountPrice !== undefined) {
    payload.discount_price = updates.discount_price ?? updates.discountPrice ?? null;
  }
  if (updates.category !== undefined) payload.category = updates.category;
  if (updates.stock !== undefined) payload.stock = Number(updates.stock);
  if (updates.sku !== undefined) payload.sku = updates.sku;
  if (updates.featured !== undefined) payload.featured = !!updates.featured;
  if (updates.status !== undefined) payload.status = updates.status;
  if (
    updates.image_url !== undefined ||
    updates.imageUrl !== undefined ||
    updates.images !== undefined
  ) {
    payload.image_url =
      updates.image_url || updates.imageUrl || updates.images?.[0] || "";
  }

  return payload;
}

export function formatPriceINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function getStockStatus(stock: number): "In Stock" | "Low Stock" | "Out of Stock" {
  if (stock <= 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
}

/** Maps API product to admin inventory table row shape. */
export function toInventoryRow(product: Product) {
  const stockStatus = getStockStatus(product.stock);
  return {
    id: product.id,
    product: {
      name: product.name,
      type: product.perfumeType || "Eau de Parfum",
      image: product.images[0] || "/assets/product.jpeg",
    },
    sku: product.sku || "—",
    category: product.category,
    currentStock: product.stock,
    reserved: 0,
    available: product.stock,
    status: stockStatus,
    lastUpdated: product.updated_at
      ? new Date(product.updated_at).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).replace(", ", "\n")
      : "—",
  };
}

export function formatCreatedAt(dateStr?: string): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}
