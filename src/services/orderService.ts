import { apiClient, ApiResponse } from "./apiClient";
import { ORDERS, Order } from "@/data/orders";

export const orderService = {
  async getOrders(): Promise<ApiResponse<Order[]>> {
    return apiClient.request<Order[]>("/orders", { method: "GET" }, ORDERS);
  },

  async createOrder(order: Omit<Order, "id">): Promise<ApiResponse<Order>> {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now().toString().slice(-6)}`,
    };
    return apiClient.request<Order>("/orders", { method: "POST" }, newOrder);
  },

  async updateOrderStatus(id: string, status: string): Promise<ApiResponse<Order>> {
    const found = ORDERS.find((o) => o.id === id);
    if (found) {
      const updated = { ...found, status };
      return apiClient.request<Order>(`/orders/${id}/status`, { method: "PATCH" }, updated);
    }
    return { success: false, error: `Order with ID ${id} not found` };
  },
};

export default orderService;
