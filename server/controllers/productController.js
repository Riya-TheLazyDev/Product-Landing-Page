import pool from "../config/db.js";
import { sendSuccess, sendError } from "../utils/responseHelper.js";
import {
  findProductById,
  findProductBySlugOrId,
  findSlugOrSkuConflict,
  listProducts,
} from "../utils/productQueries.js";

const generateSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parsePrice = (value) => {
  const parsed = parseFloat(value);
  if (Number.isNaN(parsed) || parsed < 0) return null;
  return parsed;
};

const parseStock = (value, fallback = 0) => {
  const parsed = value !== undefined ? parseInt(value, 10) : fallback;
  if (Number.isNaN(parsed) || parsed < 0) return null;
  return parsed;
};

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const isAdmin = req.user?.role === "admin";
    const products = await listProducts({ filters: req.query, isAdmin });
    return sendSuccess(res, products, "Products retrieved successfully");
  } catch (error) {
    console.error("GetProducts database error:", error.message);
    return sendError(res, "Failed to retrieve products from database", 500);
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await findProductBySlugOrId(id);

    if (!product) {
      return sendError(res, `Product with ID ${id} not found`, 404);
    }

    if (product.status !== "Active" && req.user?.role !== "admin") {
      return sendError(res, `Product with ID ${id} not found`, 404);
    }

    return sendSuccess(res, product, "Product retrieved successfully");
  } catch (error) {
    console.error("GetProductById database error:", error.message);
    return sendError(res, "Database query execution failed", 500);
  }
};

// POST /api/products — Admin only
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      discount_price,
      category,
      stock,
      sku,
      featured,
      status,
      image_url,
    } = req.body;

    if (!name || name.trim().length < 2) {
      return sendError(res, "Product name is required (min 2 characters)", 400);
    }
    if (!category || !category.trim()) {
      return sendError(res, "Product category is required", 400);
    }

    const parsedPrice = parsePrice(price);
    if (parsedPrice === null) {
      return sendError(res, "Please provide a valid product price", 400);
    }

    const parsedStock = parseStock(stock, 0);
    if (parsedStock === null) {
      return sendError(res, "Stock must be a non-negative number", 400);
    }

    if (discount_price !== undefined && discount_price !== null && discount_price !== "") {
      const parsedDiscount = parsePrice(discount_price);
      if (parsedDiscount === null) {
        return sendError(res, "Discount price must be a valid non-negative number", 400);
      }
    }

    const productSlug = slug?.trim() || generateSlug(name);

    if (await findSlugOrSkuConflict(productSlug, sku)) {
      return sendError(res, "A product with this slug or SKU already exists", 400);
    }

    const [result] = await pool.query(
      `INSERT INTO products 
      (name, slug, description, price, discount_price, category, stock, sku, featured, status, image_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        productSlug,
        description || null,
        parsedPrice,
        discount_price || null,
        category.trim(),
        parsedStock,
        sku || null,
        featured ? 1 : 0,
        status || "Active",
        image_url || null,
      ]
    );

    const created = await findProductById(result.insertId);
    return sendSuccess(res, created, "Product created successfully", 201);
  } catch (error) {
    console.error("CreateProduct database error:", error.message);
    return sendError(res, "Product creation query failed", 500);
  }
};

// PUT /api/products/:id — Admin only
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await findProductById(id);

    if (!existing) {
      return sendError(res, `Product with ID ${id} not found`, 404);
    }

    const updates = { ...req.body };
    const allowedFields = [
      "name",
      "slug",
      "description",
      "price",
      "discount_price",
      "category",
      "stock",
      "sku",
      "featured",
      "status",
      "image_url",
    ];

    if (updates.price !== undefined) {
      const parsedPrice = parsePrice(updates.price);
      if (parsedPrice === null) {
        return sendError(res, "Please provide a valid product price", 400);
      }
      updates.price = parsedPrice;
    }

    if (updates.stock !== undefined) {
      const parsedStock = parseStock(updates.stock);
      if (parsedStock === null) {
        return sendError(res, "Stock must be a non-negative number", 400);
      }
      updates.stock = parsedStock;
    }

    if (
      updates.discount_price !== undefined &&
      updates.discount_price !== null &&
      updates.discount_price !== ""
    ) {
      const parsedDiscount = parsePrice(updates.discount_price);
      if (parsedDiscount === null) {
        return sendError(res, "Discount price must be a valid non-negative number", 400);
      }
      updates.discount_price = parsedDiscount;
    }

    const nextSlug = updates.slug?.trim() || existing.slug;
    const nextSku = updates.sku !== undefined ? updates.sku : existing.sku;

    if (
      (updates.slug && updates.slug !== existing.slug) ||
      (updates.sku && updates.sku !== existing.sku)
    ) {
      if (await findSlugOrSkuConflict(nextSlug, nextSku, id)) {
        return sendError(res, "A product with this slug or SKU already exists", 400);
      }
    }

    const fields = [];
    const params = [];

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);
        params.push(key === "featured" ? (value ? 1 : 0) : value);
      }
    }

    if (fields.length === 0) {
      return sendError(res, "No valid updates provided", 400);
    }

    params.push(id);
    await pool.query(`UPDATE products SET ${fields.join(", ")} WHERE id = ?`, params);

    const fresh = await findProductById(id);
    return sendSuccess(res, fresh, "Product updated successfully");
  } catch (error) {
    console.error("UpdateProduct database error:", error.message);
    return sendError(res, "Failed to update product details", 500);
  }
};

// DELETE /api/products/:id — Admin only
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await findProductById(id);

    if (!existing) {
      return sendError(res, `Product with ID ${id} not found`, 404);
    }

    await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return sendSuccess(res, { id: Number(id) }, "Product deleted successfully");
  } catch (error) {
    console.error("DeleteProduct database error:", error.message);
    return sendError(res, "Failed to delete product from database", 500);
  }
};
