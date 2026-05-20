import apiClient, { ApiResponse } from "./apiClient";

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  conversionRate: number;
}

export const adminService = {
  async getDashboardStats(): Promise<ApiResponse<AdminStats>> {
    try {
      const response = await apiClient.get<ApiResponse<AdminStats>>("/admin/stats");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load dashboard metrics",
      };
    }
  },
};

export default adminService;
