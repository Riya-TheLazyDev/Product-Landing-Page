import apiClient, { ApiResponse } from "./apiClient";
import type { CartLine } from "@/types/cart";

export const cartService = {
  async getCart(): Promise<ApiResponse<CartLine[]>> {
    try {
      const response = await apiClient.get<ApiResponse<CartLine[]>>("/cart");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load cart status",
      };
    }
  },

  async addToCart(item: CartLine): Promise<ApiResponse<CartLine>> {
    try {
      const response = await apiClient.post<ApiResponse<CartLine>>("/cart", item);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to append item to cart",
      };
    }
  },

  async updateCart(lineId: string, quantity: number): Promise<ApiResponse<{ lineId: string; quantity: number }>> {
    try {
      const response = await apiClient.put<ApiResponse<{ lineId: string; quantity: number }>>(`/cart/${lineId}`, { quantity });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to update item quantity",
      };
    }
  },

  async removeFromCart(lineId: string): Promise<ApiResponse<{ lineId: string }>> {
    try {
      const response = await apiClient.delete<ApiResponse<{ lineId: string }>>(`/cart/${lineId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to drop item from cart",
      };
    }
  },
};

export default cartService;
