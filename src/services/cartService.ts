import { apiClient, ApiResponse } from "./apiClient";
import type { CartLine } from "@/types/cart";

export const cartService = {
  async getCart(): Promise<ApiResponse<CartLine[]>> {
    // In production: fetch active cart session from `/cart`
    const mockCart: CartLine[] = [];
    return apiClient.request<CartLine[]>("/cart", { method: "GET" }, mockCart);
  },

  async addToCart(item: CartLine): Promise<ApiResponse<CartLine>> {
    return apiClient.request<CartLine>(
      "/cart",
      { method: "POST", body: JSON.stringify(item) },
      item
    );
  },

  async updateCart(lineId: string, quantity: number): Promise<ApiResponse<{ lineId: string; quantity: number }>> {
    return apiClient.request<{ lineId: string; quantity: number }>(
      `/cart/${lineId}`,
      { method: "PUT", body: JSON.stringify({ quantity }) },
      { lineId, quantity }
    );
  },

  async removeFromCart(lineId: string): Promise<ApiResponse<{ lineId: string }>> {
    return apiClient.request<{ lineId: string }>(
      `/cart/${lineId}`,
      { method: "DELETE" },
      { lineId }
    );
  },
};

export default cartService;
