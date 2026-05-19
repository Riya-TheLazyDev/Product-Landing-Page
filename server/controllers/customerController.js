import { sendSuccess, sendError } from "../utils/responseHelper.js";

const mockCustomers = [
  { id: "1", name: "Sneha Reddy", email: "sneha@email.com", status: "Active" },
  { id: "2", name: "Rohan Mehta", email: "rohan@email.com", status: "Active" },
];

export const getCustomers = async (req, res) => {
  return sendSuccess(res, mockCustomers, "Customers retrieved successfully");
};

export const updateCustomerStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const found = mockCustomers.find((c) => c.id === id);
  if (found) {
    const updated = { ...found, status };
    return sendSuccess(res, updated, `Customer ${id} status updated to ${status}`);
  }
  return sendError(res, `Customer with ID ${id} not found`, 44);
};
