import { apiClient, ApiResponse } from "./apiClient";
import { PRODUCTS, Product } from "@/data/products";

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
    const items: InventoryItem[] = PRODUCTS.map((p) => {
      const stock = p.stock ?? 15;
      let status: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock";
      if (stock === 0) status = "Out of Stock";
      else if (stock < 5) status = "Low Stock";

      return {
        id: p.id.toString(),
        sku: p.sku || `SKU-${p.id}`,
        name: p.name,
        stock,
        location: "Warehouse A",
        status,
      };
    });
    return apiClient.request<InventoryItem[]>("/inventory", { method: "GET" }, items);
  },

  async updateStock(id: string, quantity: number): Promise<ApiResponse<{ id: string; stock: number }>> {
    return apiClient.request<{ id: string; stock: number }>(
      `/inventory/${id}/stock`,
      { method: "PATCH", body: JSON.stringify({ quantity }) },
      { id, stock: quantity }
    );
  },
};

export default inventoryService;
