import { sendSuccess } from "../utils/responseHelper.js";

export const getAnalyticsData = async (req, res) => {
  const mockAnalytics = {
    salesOverview: [
      { date: "May 28", amount: 24500 },
      { date: "May 29", amount: 29800 },
    ],
    visitorMetrics: [
      { date: "May 28", pageViews: 2500, uniqueVisitors: 980 },
      { date: "May 29", pageViews: 3200, uniqueVisitors: 1200 },
    ],
  };
  return sendSuccess(res, mockAnalytics, "Analytics data retrieved successfully");
};
