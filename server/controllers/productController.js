import pool from "../config/db.js";
import { sendSuccess, sendError } from "../utils/responseHelper.js";

// Helper to generate a URL-safe slug from product name
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// GET /api/products - Supports searching, sorting, and category filters
export const getProducts = async (req, res) => {
  try {
    const { category, featured, status, search, limit } = req.query;
    const isAdmin = req.user?.role === "admin";

    let sql = "SELECT * FROM products WHERE 1=1";
    const params = [];

    // Filter by category
    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    // Filter by featured status
    if (featured !== undefined) {
      sql += " AND featured = ?";
      params.push(featured === "true" || featured === "1" ? 1 : 0);
    }

    // Public catalog: active products only. Admins see full inventory unless filtered.
    if (status) {
      sql += " AND status = ?";
      params.push(status);
    } else if (!isAdmin) {
      sql += " AND status = 'Active'";
    }

    // Keyword search filters
    if (search) {
      sql += " AND (name LIKE ? OR description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += " ORDER BY created_at DESC";

    if (limit) {
      sql += " LIMIT ?";
      params.push(parseInt(limit, 10));
    }

    const [products] = await pool.query(sql, params);
    return sendSuccess(res, products, "Products retrieved successfully");
  } catch (error) {
    console.error("GetProducts database error:", error.message);
    return sendError(res, "Failed to retrieve products from database", 500);
  }
};

// GET /api/products/:id — accepts numeric id or slug
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const isNumeric = /^\d+$/.test(id);

    const [rows] = await pool.query(
      isNumeric
        ? "SELECT * FROM products WHERE id = ?"
        : "SELECT * FROM products WHERE slug = ?",
      [id]
    );
    const product = rows[0];

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

// POST /api/products - Protected (Admin Only)
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

    // 1. Validation
    if (!name || name.trim().length < 2) {
      return sendError(res, "Product name is required (min 2 characters)", 400);
    }
    if (!category || !category.trim()) {
      return sendError(res, "Product category is required", 400);
    }
    const parsedPrice = parseFloat(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return sendError(res, "Please provide a valid product price", 400);
    }
    const parsedStock = stock !== undefined ? parseInt(stock, 10) : 0;
    if (Number.isNaN(parsedStock) || parsedStock < 0) {
      return sendError(res, "Stock must be a non-negative number", 400);
    }
    if (discount_price !== undefined && discount_price !== null && discount_price !== "") {
      const parsedDiscount = parseFloat(discount_price);
      if (Number.isNaN(parsedDiscount) || parsedDiscount < 0) {
        return sendError(res, "Discount price must be a valid non-negative number", 400);
      }
    }

    const productSlug = slug || generateSlug(name);

    // 2. Prevent duplicate Slug/SKU indexes
    const [existing] = await pool.query(
      "SELECT id FROM products WHERE slug = ? OR (sku IS NOT NULL AND sku = ?)",
      [productSlug, sku || null]
    );

    if (existing.length > 0) {
      return sendError(res, "A product with this slug or SKU index already exists", 400);
    }

    // 3. Save to database
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

    const newProductId = result.insertId;

    const createdProduct = {
      id: newProductId,
      name,
      slug: productSlug,
      description: description || null,
      price,
      discount_price: discount_price || null,
      category,
      stock: stock || 0,
      sku: sku || null,
      featured: !!featured,
      status: status || "Active",
      image_url: image_url || null,
    };

    return sendSuccess(res, createdProduct, "Product created successfully", 201);
  } catch (error) {
    console.error("CreateProduct database error:", error.message);
    return sendError(res, "Product creation query failed", 500);
  }
};

// PUT /api/products/:id - Protected (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify product exists
    const [existing] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return sendError(res, `Product with ID ${id} not found`, 404);
    }

    const updates = req.body;
    const fields = [];
    const params = [];

    // Dynamically build updating parameters to keep queries clean
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
      const parsedPrice = parseFloat(updates.price);
      if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
        return sendError(res, "Please provide a valid product price", 400);
      }
      updates.price = parsedPrice;
    }
    if (updates.stock !== undefined) {
      const parsedStock = parseInt(updates.stock, 10);
      if (Number.isNaN(parsedStock) || parsedStock < 0) {
        return sendError(res, "Stock must be a non-negative number", 400);
      }
      updates.stock = parsedStock;
    }
    if (updates.discount_price !== undefined && updates.discount_price !== null && updates.discount_price !== "") {
      const parsedDiscount = parseFloat(updates.discount_price);
      if (Number.isNaN(parsedDiscount) || parsedDiscount < 0) {
        return sendError(res, "Discount price must be a valid non-negative number", 400);
      }
      updates.discount_price = parsedDiscount;
    }

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

    await pool.query(
      `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
      params
    );

    // Retrieve freshly updated data
    const [freshRows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    
    return sendSuccess(res, freshRows[0], "Product updated successfully");
  } catch (error) {
    console.error("UpdateProduct database error:", error.message);
    return sendError(res, "Failed to update product details", 500);
  }
};

// DELETE /api/products/:id - Protected (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return sendError(res, `Product with ID ${id} not found`, 404);
    }

    await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return sendSuccess(res, { id }, "Product deleted successfully");
  } catch (error) {
    console.error("DeleteProduct database error:", error.message);
    return sendError(res, "Failed to delete product from database", 500);
  }
};
