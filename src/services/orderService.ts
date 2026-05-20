import apiClient, { ApiResponse } from "./apiClient";
import { Order } from "@/data/orders";

export const orderService = {
  async getOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Order[]>>("/orders");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load orders",
      };
    }
  },

  async createOrder(order: Omit<Order, "id">): Promise<ApiResponse<Order>> {
    try {
      const response = await apiClient.post<ApiResponse<Order>>("/orders", order);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to create order",
      };
    }
  },

  async updateOrderStatus(id: string, status: string): Promise<ApiResponse<Order>> {
    try {
      const response = await apiClient.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || `Failed to update status for order ${id}`,
      };
    }
  },
};

export default orderService;
