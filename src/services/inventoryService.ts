import apiClient, { ApiResponse } from "./apiClient";

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  stock: number;
  location: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export const inventoryService = {
  async getInventory(): Promise<ApiResponse<InventoryItem[]>> {
    try {
      const response = await apiClient.get<ApiResponse<InventoryItem[]>>("/inventory");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load inventory items",
      };
    }
  },

  async updateStock(id: string, quantity: number): Promise<ApiResponse<{ id: string; stock: number }>> {
    try {
      const response = await apiClient.patch<ApiResponse<{ id: string; stock: number }>>(`/inventory/${id}/stock`, { quantity });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || `Failed to update stock for item ${id}`,
      };
    }
  },
};

export default inventoryService;
