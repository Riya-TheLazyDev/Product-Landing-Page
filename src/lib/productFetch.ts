import type { Product } from "@/data/products";
import { getApiBaseUrl } from "@/lib/apiConfig";
import { ApiProduct, mapApiProduct, mapApiProducts } from "@/lib/productMapper";

const API_BASE = getApiBaseUrl();

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
    const res = await fetch(url, { cache: "no-store" });
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
      cache: "no-store",
    });
    const json: ApiEnvelope<ApiProduct> = await res.json();
    if (json.success && json.data) return mapApiProduct(json.data);
    return null;
  } catch {
    return null;
  }
}
