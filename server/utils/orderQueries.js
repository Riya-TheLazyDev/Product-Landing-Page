import pool from "../config/db.js";

export const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
  "Refunded",
];

export const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

export async function findOrderById(orderId) {
  const [rows] = await pool.query(
    `SELECT o.*, u.name AS customer_name, u.email AS customer_email, u.avatar AS customer_avatar,
      sa.full_name AS ship_full_name, sa.phone AS ship_phone,
      sa.address_line_1, sa.address_line_2, sa.city AS ship_city,
      sa.state AS ship_state, sa.postal_code, sa.country AS ship_country
     FROM orders o
     JOIN users u ON u.id = o.user_id
     LEFT JOIN shipping_addresses sa ON sa.id = o.shipping_address_id
     WHERE o.id = ?`,
    [orderId]
  );
  return rows[0] ?? null;
}

export async function findOrderItems(orderId) {
  const [rows] = await pool.query(
    "SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC",
    [orderId]
  );
  return rows;
}

export async function getOrdersForUser(userId) {
  const [orders] = await pool.query(
    `SELECT o.* FROM orders o WHERE o.user_id = ? ORDER BY o.created_at DESC`,
    [userId]
  );
  return orders;
}

export async function getAllOrdersAdmin(filters = {}) {
  let sql = `
    SELECT o.*, u.name AS customer_name, u.email AS customer_email, u.avatar AS customer_avatar
    FROM orders o
    JOIN users u ON u.id = o.user_id
    WHERE 1=1
  `;
  const params = [];

  if (filters.order_status) {
    sql += " AND o.order_status = ?";
    params.push(filters.order_status);
  }
  if (filters.payment_status) {
    sql += " AND o.payment_status = ?";
    params.push(filters.payment_status);
  }
  if (filters.search) {
    sql += " AND (o.order_number LIKE ? OR u.name LIKE ? OR u.email LIKE ?)";
    const term = `%${filters.search}%`;
    params.push(term, term, term);
  }

  sql += " ORDER BY o.created_at DESC";
  const [orders] = await pool.query(sql, params);
  return orders;
}

export async function attachItemsToOrders(orders) {
  if (!orders.length) return [];
  const ids = orders.map((o) => o.id);
  const [items] = await pool.query(
    `SELECT * FROM order_items WHERE order_id IN (${ids.map(() => "?").join(",")})`,
    ids
  );
  const byOrder = new Map();
  for (const item of items) {
    if (!byOrder.has(item.order_id)) byOrder.set(item.order_id, []);
    byOrder.get(item.order_id).push(item);
  }
  return orders.map((o) => ({
    ...o,
    items: byOrder.get(o.id) || [],
  }));
}
