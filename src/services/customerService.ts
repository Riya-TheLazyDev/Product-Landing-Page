import { apiClient, ApiResponse } from "./apiClient";
import { CUSTOMERS, Customer } from "@/data/customers";

export const customerService = {
  async getCustomers(): Promise<ApiResponse<Customer[]>> {
    return apiClient.request<Customer[]>("/customers", { method: "GET" }, CUSTOMERS);
  },

  async updateCustomerStatus(id: string, status: "Active" | "Suspended"): Promise<ApiResponse<Customer>> {
    const found = CUSTOMERS.find((c) => c.id === id);
    if (found) {
      const updated = { ...found, status };
      return apiClient.request<Customer>(`/customers/${id}/status`, { method: "PATCH" }, updated);
    }
    return { success: false, error: `Customer with ID ${id} not found` };
  },
};

export default customerService;
