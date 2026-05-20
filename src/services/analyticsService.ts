import apiClient, { ApiResponse } from "./apiClient";

export interface AnalyticsData {
  salesOverview: { date: string; amount: number }[];
  visitorMetrics: { date: string; pageViews: number; uniqueVisitors: number }[];
  popularCategories: { name: string; percentage: number }[];
}

export const analyticsService = {
  async getAnalyticsData(): Promise<ApiResponse<AnalyticsData>> {
    try {
      const response = await apiClient.get<ApiResponse<AnalyticsData>>("/analytics");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Failed to load analytics summaries",
      };
    }
  },
};

export default analyticsService;
