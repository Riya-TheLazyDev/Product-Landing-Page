import { apiClient, ApiResponse } from "./apiClient";

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
    const coupons: Coupon[] = [
      { id: "1", code: "ELEVARASUMMER", discount: 15, type: "percentage", expiryDate: "2026-08-31", status: "Active" },
      { id: "2", code: "WELCOME100", discount: 100, type: "fixed", expiryDate: "2026-12-31", status: "Active" },
      { id: "3", code: "SPRING20", discount: 20, type: "percentage", expiryDate: "2026-04-30", status: "Expired" },
    ];
    return apiClient.request<Coupon[]>("/coupons", { method: "GET" }, coupons);
  },

  async createCoupon(coupon: Omit<Coupon, "id">): Promise<ApiResponse<Coupon>> {
    const newCoupon: Coupon = {
      ...coupon,
      id: Date.now().toString(),
    };
    return apiClient.request<Coupon>("/coupons", { method: "POST" }, newCoupon);
  },

  async deleteCoupon(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiClient.request<{ id: string }>(`/coupons/${id}`, { method: "DELETE" }, { id });
  },
};

export default couponService;
