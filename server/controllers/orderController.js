import { sendSuccess, sendError } from "../utils/responseHelper.js";

const mockOrders = [
  { id: "ORD-12345", total: 6298, status: "Confirmed", date: "May 29, 2024" },
  { id: "ORD-12346", total: 2799, status: "Shipped", date: "May 28, 2024" },
];

export const getOrders = async (req, res) => {
  return sendSuccess(res, mockOrders, "Orders retrieved successfully");
};

export const createOrder = async (req, res) => {
  try {
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    return sendSuccess(res, newOrder, "Order created successfully", 21);
  } catch (error) {
    return sendError(res, error.message);
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const found = mockOrders.find((o) => o.id === id);
  if (found) {
    const updated = { ...found, status };
    return sendSuccess(res, updated, `Order status for ${id} updated to ${status}`);
  }
  return sendError(res, `Order with ID ${id} not found`, 44);
};
