import { sendSuccess, sendError } from "../utils/responseHelper.js";

// Mock products store (matching PDP and shop models)
const mockProducts = [
  { id: "1", name: "Oud Noir", price: 3499, category: "Luxury", ratings: 4.8 },
  { id: "2", name: "Amber Majesty", price: 2799, category: "Artisan", ratings: 4.6 },
  { id: "3", name: "Velvet Rose", price: 3299, category: "Luxury", ratings: 4.9 },
];

export const getProducts = async (req, res) => {
  return sendSuccess(res, mockProducts, "Products retrieved successfully");
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const found = mockProducts.find((p) => p.id === id);
  if (found) {
    return sendSuccess(res, found, "Product retrieved successfully");
  }
  return sendError(res, `Product with ID ${id} not found`, 44);
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = {
      id: Date.now().toString(),
      ...req.body,
    };
    return sendSuccess(res, newProduct, "Product created successfully", 21);
  } catch (error) {
    return sendError(res, error.message);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const found = mockProducts.find((p) => p.id === id);
  if (found) {
    const updated = { ...found, ...req.body };
    return sendSuccess(res, updated, `Product ${id} updated successfully`);
  }
  return sendError(res, `Product with ID ${id} not found`, 44);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  return sendSuccess(res, { id }, `Product ${id} deleted successfully`);
};
