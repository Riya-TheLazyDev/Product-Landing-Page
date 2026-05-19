import { sendSuccess, sendError } from "../utils/responseHelper.js";

const mockReviews = [
  { id: "REV-1", name: "Ananya Sharma", content: "Superb longevity", rating: 5, status: "Approved" },
];

export const getReviews = async (req, res) => {
  return sendSuccess(res, mockReviews, "Reviews retrieved successfully");
};

export const updateReviewStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const found = mockReviews.find((r) => r.id === id);
  if (found) {
    const updated = { ...found, status };
    return sendSuccess(res, updated, `Review ${id} status updated to ${status}`);
  }
  return sendError(res, `Review with ID ${id} not found`, 44);
};

export const submitReview = async (req, res) => {
  const newReview = {
    id: `REV-${Date.now()}`,
    date: new Date().toLocaleDateString(),
    status: "Pending",
    ...req.body,
  };
  return sendSuccess(res, newReview, "Review submitted successfully", 21);
};
