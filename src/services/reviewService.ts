import { apiClient, ApiResponse } from "./apiClient";
import { REVIEWS, Review } from "@/data/reviews";

export const reviewService = {
  async getReviews(): Promise<ApiResponse<Review[]>> {
    return apiClient.request<Review[]>("/reviews", { method: "GET" }, REVIEWS);
  },

  async updateReviewStatus(id: string, status: "Approved" | "Pending" | "Rejected"): Promise<ApiResponse<Review>> {
    const found = REVIEWS.find((r) => r.id === id);
    if (found) {
      const updated = { ...found, status };
      return apiClient.request<Review>(`/reviews/${id}/status`, { method: "PATCH" }, updated);
    }
    return { success: false, error: `Review with ID ${id} not found` };
  },

  async submitReview(review: Omit<Review, "id" | "date" | "status">): Promise<ApiResponse<Review>> {
    const newReview: Review = {
      ...review,
      id: `REV-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      status: "Pending",
    };
    return apiClient.request<Review>("/reviews", { method: "POST" }, newReview);
  },
};

export default reviewService;
