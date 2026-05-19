import { apiClient, ApiResponse } from "./apiClient";
import type { WishlistItem } from "@/store/wishlistStore";

export const wishlistService = {
  async getWishlist(): Promise<ApiResponse<WishlistItem[]>> {
    // In production: fetch from `/wishlist` via JWT token headers
    const mockWishlist: WishlistItem[] = [];
    return apiClient.request<WishlistItem[]>("/wishlist", { method: "GET" }, mockWishlist);
  },

  async addToWishlist(product: WishlistItem): Promise<ApiResponse<WishlistItem>> {
    return apiClient.request<WishlistItem>(
      "/wishlist",
      { method: "POST", body: JSON.stringify(product) },
      product
    );
  },

  async removeFromWishlist(productId: string): Promise<ApiResponse<{ productId: string }>> {
    return apiClient.request<{ productId: string }>(
      `/wishlist/${productId}`,
      { method: "DELETE" },
      { productId }
    );
  },
};

export default wishlistService;
