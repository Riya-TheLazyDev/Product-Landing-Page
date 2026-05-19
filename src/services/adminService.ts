import { apiClient, ApiResponse } from "./apiClient";

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  conversionRate: number;
}

export const adminService = {
  async getDashboardStats(): Promise<ApiResponse<AdminStats>> {
    const stats: AdminStats = {
      totalRevenue: 148250,
      totalOrders: 342,
      totalCustomers: 289,
      averageOrderValue: 433.48,
      conversionRate: 3.42,
    };
    return apiClient.request<AdminStats>("/admin/stats", { method: "GET" }, stats);
  },
};

export default adminService;
