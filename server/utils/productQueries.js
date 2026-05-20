import pool from "../config/db.js";

/** Reusable product row lookups. */
export const findProductById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0] ?? null;
};

export const findProductBySlugOrId = async (id) => {
  const isNumeric = /^\d+$/.test(String(id));
  const [rows] = await pool.query(
    isNumeric
      ? "SELECT * FROM products WHERE id = ?"
      : "SELECT * FROM products WHERE slug = ?",
    [id]
  );
  return rows[0] ?? null;
};

export const findSlugOrSkuConflict = async (slug, sku, excludeId = null) => {
  let sql =
    "SELECT id FROM products WHERE slug = ? OR (sku IS NOT NULL AND sku = ? AND sku != '')";
  const params = [slug, sku || null];

  if (excludeId != null) {
    sql += " AND id != ?";
    params.push(excludeId);
  }

  const [rows] = await pool.query(sql, params);
  return rows.length > 0;
};

export const listProducts = async ({ filters = {}, isAdmin = false }) => {
  const { category, featured, status, search, limit } = filters;

  let sql = "SELECT * FROM products WHERE 1=1";
  const params = [];

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (featured !== undefined) {
    sql += " AND featured = ?";
    params.push(featured === "true" || featured === "1" || featured === true ? 1 : 0);
  }

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  } else if (!isAdmin) {
    sql += " AND status = 'Active'";
  }

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
  return products;
};
