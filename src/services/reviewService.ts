import apiClient, { ApiResponse } from "./apiClient";
import { Review } from "@/data/reviews";

export const reviewService = {
  async getReviews(): Promise<ApiResponse<Review[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Review[]>>("/reviews");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load reviews",
      };
    }
  },

  async updateReviewStatus(id: string, status: "Approved" | "Pending" | "Rejected"): Promise<ApiResponse<Review>> {
    try {
      const response = await apiClient.patch<ApiResponse<Review>>(`/reviews/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || `Failed to update status for review ${id}`,
      };
    }
  },

  async submitReview(review: Omit<Review, "id" | "date" | "status">): Promise<ApiResponse<Review>> {
    try {
      const response = await apiClient.post<ApiResponse<Review>>("/reviews", review);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to submit review",
      };
    }
  },
};

export default reviewService;
