import apiClient, { ApiResponse } from "./apiClient";

export interface Coupon {
  id: string;
  code: string;
  discount: number; // Percent or Absolute
  type: "percentage" | "fixed";
  expiryDate: string;
  status: "Active" | "Expired";
}

export const couponService = {
  async getCoupons(): Promise<ApiResponse<Coupon[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Coupon[]>>("/coupons");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load coupons list",
      };
    }
  },

  async createCoupon(coupon: Omit<Coupon, "id">): Promise<ApiResponse<Coupon>> {
    try {
      const response = await apiClient.post<ApiResponse<Coupon>>("/coupons", coupon);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to create promo coupon",
      };
    }
  },

  async deleteCoupon(id: string): Promise<ApiResponse<{ id: string }>> {
    try {
      const response = await apiClient.delete<ApiResponse<{ id: string }>>(`/coupons/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || `Failed to delete coupon ${id}`,
      };
    }
  },
};

export default couponService;
