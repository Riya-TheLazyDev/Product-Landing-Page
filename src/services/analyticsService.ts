import { apiClient, ApiResponse } from "./apiClient";

export interface AnalyticsData {
  salesOverview: { date: string; amount: number }[];
  visitorMetrics: { date: string; pageViews: number; uniqueVisitors: number }[];
  popularCategories: { name: string; percentage: number }[];
}

export const analyticsService = {
  async getAnalyticsData(): Promise<ApiResponse<AnalyticsData>> {
    const data: AnalyticsData = {
      salesOverview: [
        { date: "May 23", amount: 12400 },
        { date: "May 24", amount: 15100 },
        { date: "May 25", amount: 11800 },
        { date: "May 26", amount: 18900 },
        { date: "May 27", amount: 22000 },
        { date: "May 28", amount: 24500 },
        { date: "May 29", amount: 29800 },
      ],
      visitorMetrics: [
        { date: "May 23", pageViews: 1200, uniqueVisitors: 450 },
        { date: "May 24", pageViews: 1450, uniqueVisitors: 510 },
        { date: "May 25", pageViews: 1100, uniqueVisitors: 380 },
        { date: "May 26", pageViews: 1980, uniqueVisitors: 720 },
        { date: "May 27", pageViews: 2100, uniqueVisitors: 840 },
        { date: "May 28", pageViews: 2500, uniqueVisitors: 980 },
        { date: "May 29", pageViews: 3200, uniqueVisitors: 1200 },
      ],
      popularCategories: [
        { name: "Oud Noir", percentage: 38 },
        { name: "Amber Majesty", percentage: 28 },
        { name: "Velvet Rose", percentage: 20 },
        { name: "Others", percentage: 14 },
      ],
    };
    return apiClient.request<AnalyticsData>("/analytics", { method: "GET" }, data);
  },
};

export default analyticsService;
