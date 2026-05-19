import { sendSuccess, sendError } from "../utils/responseHelper.js";

const mockReturns = [
  { id: "RET-2024-0248", orderId: "ORD-2024-0687", customer: "Sneha Reddy", status: "Pending" },
  { id: "RET-2024-0247", orderId: "ORD-2024-0686", customer: "Rohan Mehta", status: "Under Review" },
];

export const getReturns = async (req, res) => {
  return sendSuccess(res, mockReturns, "Return requests retrieved successfully");
};

export const updateReturnStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const found = mockReturns.find((r) => r.id === id);
  if (found) {
    const updated = { ...found, status };
    return sendSuccess(res, updated, `Return request ${id} updated to status ${status}`);
  }
  return sendError(res, `Return request ${id} not found`, 44);
};
