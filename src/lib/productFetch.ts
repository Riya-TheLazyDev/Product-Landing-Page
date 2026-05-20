import type { Product } from "@/data/products";
import { ApiProduct, mapApiProduct, mapApiProducts } from "@/lib/productMapper";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

/** Server-safe product fetch (no localStorage). */
export async function fetchProductsServer(
  params?: Record<string, string>
): Promise<Product[]> {
  const search = new URLSearchParams(params);
  const qs = search.toString();
  const url = `${API_BASE}/products${qs ? `?${qs}` : ""}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    const json: ApiEnvelope<ApiProduct[]> = await res.json();
    if (json.success && json.data) return mapApiProducts(json.data);
    return [];
  } catch {
    return [];
  }
}

export async function fetchProductByIdServer(
  id: string
): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      next: { revalidate: 60 },
    });
    const json: ApiEnvelope<ApiProduct> = await res.json();
    if (json.success && json.data) return mapApiProduct(json.data);
    return null;
  } catch {
    return null;
  }
}
