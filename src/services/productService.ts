import apiClient, { ApiResponse } from "./apiClient";
import { Product } from "@/data/products";
import {
  ApiProduct,
  mapApiProduct,
  mapApiProducts,
  toApiPayload,
  toApiUpdatePayload,
  ProductFormPayload,
} from "@/lib/productMapper";

export type ProductQueryParams = {
  category?: string;
  featured?: boolean;
  status?: string;
  search?: string;
  limit?: number;
};

function buildQuery(params?: ProductQueryParams): string {
  if (!params) return "";
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.featured !== undefined) search.set("featured", params.featured ? "true" : "false");
  if (params.status) search.set("status", params.status);
  if (params.search) search.set("search", params.search);
  if (params.limit) search.set("limit", String(params.limit));
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const productService = {
  async getProducts(params?: ProductQueryParams): Promise<ApiResponse<Product[]>> {
    try {
      const response = await apiClient.get<ApiResponse<ApiProduct[]>>(
        `/products${buildQuery(params)}`
      );
      const body = response.data;
      if (body.success && body.data) {
        return { ...body, data: mapApiProducts(body.data) };
      }
      return { success: false, error: body.error || "Failed to load products" };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || "Failed to load products",
      };
    }
  },

  async getProductById(id: string | number): Promise<ApiResponse<Product>> {
    try {
      const response = await apiClient.get<ApiResponse<ApiProduct>>(`/products/${id}`);
      const body = response.data;
      if (body.success && body.data) {
        return { ...body, data: mapApiProduct(body.data) };
      }
      return { success: false, error: body.error || `Failed to fetch product ${id}` };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || `Failed to fetch product ${id}`,
      };
    }
  },

  async createProduct(
    product: Omit<Product, "id"> | Partial<Product>
  ): Promise<ApiResponse<Product>> {
    try {
      const payload: ProductFormPayload = toApiPayload(product);
      const response = await apiClient.post<ApiResponse<ApiProduct>>("/products", payload);
      const body = response.data;
      if (body.success && body.data) {
        return { ...body, data: mapApiProduct(body.data) };
      }
      return { success: false, error: body.error || "Failed to create product" };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || "Failed to create product",
      };
    }
  },

  async updateProduct(
    id: string | number,
    updates: Partial<Product>
  ): Promise<ApiResponse<Product>> {
    try {
      const payload = toApiUpdatePayload(updates);
      const response = await apiClient.put<ApiResponse<ApiProduct>>(`/products/${id}`, payload);
      const body = response.data;
      if (body.success && body.data) {
        return { ...body, data: mapApiProduct(body.data) };
      }
      return { success: false, error: body.error || `Failed to update product ${id}` };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || `Failed to update product ${id}`,
      };
    }
  },

  async deleteProduct(
    id: string | number
  ): Promise<ApiResponse<{ id: string | number }>> {
    try {
      const response = await apiClient.delete<ApiResponse<{ id: string | number }>>(
        `/products/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      return {
        success: false,
        error: err.response?.data?.error || err.message || `Failed to delete product ${id}`,
      };
    }
  },
};

export default productService;
