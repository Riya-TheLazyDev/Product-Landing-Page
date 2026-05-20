import apiClient, { ApiResponse } from "./apiClient";
import { Customer } from "@/data/customers";

export const customerService = {
  async getCustomers(): Promise<ApiResponse<Customer[]>> {
    try {
      // Direct integration mapping to backend user / customer services
      const response = await apiClient.get<ApiResponse<Customer[]>>("/users");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load customers list",
      };
    }
  },

  async updateCustomerStatus(id: string, status: "Active" | "Suspended"): Promise<ApiResponse<Customer>> {
    try {
      const response = await apiClient.patch<ApiResponse<Customer>>(`/users/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || `Failed to update status for customer ${id}`,
      };
    }
  },
};

export default customerService;
