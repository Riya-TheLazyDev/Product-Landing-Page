import { sendSuccess } from "../utils/responseHelper.js";

const mockInventory = [
  { id: "1", sku: "SKU-OUD-100", name: "Oud Noir", stock: 15, status: "In Stock" },
  { id: "2", sku: "SKU-AMB-50", name: "Amber Majesty", stock: 3, status: "Low Stock" },
];

export const getInventory = async (req, res) => {
  return sendSuccess(res, mockInventory, "Inventory list retrieved successfully");
};

export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  return sendSuccess(res, { id, stock: quantity }, `Stock for inventory item ${id} updated to ${quantity}`);
};
