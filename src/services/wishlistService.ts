import apiClient, { ApiResponse } from "./apiClient";
import type { WishlistItem } from "@/store/wishlistStore";

export const wishlistService = {
  async getWishlist(): Promise<ApiResponse<WishlistItem[]>> {
    try {
      const response = await apiClient.get<ApiResponse<WishlistItem[]>>("/wishlist");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load wishlist",
      };
    }
  },

  async addToWishlist(product: WishlistItem): Promise<ApiResponse<WishlistItem>> {
    try {
      const response = await apiClient.post<ApiResponse<WishlistItem>>("/wishlist", product);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to add to wishlist",
      };
    }
  },

  async removeFromWishlist(productId: string): Promise<ApiResponse<{ productId: string }>> {
    try {
      const response = await apiClient.delete<ApiResponse<{ productId: string }>>(`/wishlist/${productId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to remove from wishlist",
      };
    }
  },
};

export default wishlistService;
