import pool from "../config/db.js";
import { sendSuccess, sendError } from "../utils/responseHelper.js";
import { computeOrderTotals } from "../utils/orderPricing.js";
import {
  ORDER_STATUSES,
  findOrderById,
  findOrderItems,
  getOrdersForUser,
  attachItemsToOrders,
} from "../utils/orderQueries.js";
import { notifyProductCatalogChanged } from "../utils/productCatalogNotify.js";

const RESTOCK_STATUSES = ["Cancelled", "Returned", "Refunded"];
const ACTIVE_STATUSES = ["Pending", "Processing", "Shipped", "Delivered"];

function formatOrderResponse(order, items) {
  return {
    id: order.id,
    order_number: order.order_number,
    user_id: order.user_id,
    customer_name: order.customer_name,
    customer_email: order.customer_email,
    customer_avatar: order.customer_avatar || null,
    subtotal: Number(order.subtotal),
    shipping_cost: Number(order.shipping_cost),
    tax_amount: Number(order.tax_amount),
    total_amount: Number(order.total_amount),
    payment_status: order.payment_status,
    order_status: order.order_status,
    payment_method: order.payment_method,
    payment_id: order.payment_id,
    shipping_address: order.shipping_address_id
      ? {
          full_name: order.ship_full_name,
          phone: order.ship_phone,
          address_line_1: order.address_line_1,
          address_line_2: order.address_line_2,
          city: order.ship_city,
          state: order.ship_state,
          postal_code: order.postal_code,
          country: order.ship_country,
        }
      : null,
    items: items.map((i) => ({
      id: i.id,
      product_id: i.product_id,
      product_name: i.product_name,
      product_price: Number(i.product_price),
      quantity: i.quantity,
      image_url: i.image_url,
      sku: i.sku,
    })),
    created_at: order.created_at,
    updated_at: order.updated_at,
  };
}

/** POST /api/orders */
export const createOrder = async (req, res) => {
  const connection = await pool.getConnection();
  let began = false;
  try {
    const userId = req.user.id;
    const {
      items,
      shippingAddress,
      paymentMethod = "COD",
      idempotencyKey,
      saveAddress = false,
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return sendError(res, "Cart is empty. Add products before checkout.", 400);
    }

    if (!shippingAddress?.full_name?.trim() || !shippingAddress?.phone?.trim()) {
      return sendError(res, "Shipping name and phone are required.", 400);
    }
    if (!shippingAddress?.address_line_1?.trim() || !shippingAddress?.city?.trim()) {
      return sendError(res, "Complete shipping address is required.", 400);
    }

    if (idempotencyKey) {
      const [existing] = await connection.query(
        "SELECT id FROM orders WHERE idempotency_key = ? AND user_id = ?",
        [idempotencyKey, userId]
      );
      if (existing[0]) {
        const order = await findOrderById(existing[0].id);
        const orderItems = await findOrderItems(existing[0].id);
        return sendSuccess(res, formatOrderResponse(order, orderItems), "Order already placed");
      }
    }

    const productIds = items.map((i) => parseInt(i.productId, 10)).filter((id) => !Number.isNaN(id));
    if (productIds.length !== items.length) {
      return sendError(res, "Invalid product in cart.", 400);
    }

    const [products] = await connection.query(
      `SELECT * FROM products WHERE id IN (${productIds.map(() => "?").join(",")}) AND status = 'Active'`,
      productIds
    );

    if (products.length !== productIds.length) {
      return sendError(res, "One or more products are unavailable.", 400);
    }

    const productMap = new Map(products.map((p) => [p.id, p]));
    let subtotal = 0;
    const lineSnapshots = [];

    for (const line of items) {
      const pid = parseInt(line.productId, 10);
      const qty = parseInt(line.quantity, 10);
      if (Number.isNaN(qty) || qty < 1) {
        return sendError(res, "Invalid quantity in cart.", 400);
      }
      const product = productMap.get(pid);
      if (!product) {
        return sendError(res, `Product ${line.productId} not found.`, 400);
      }
      if (product.stock < qty) {
        return sendError(
          res,
          `Insufficient stock for "${product.name}". Only ${product.stock} available.`,
          400
        );
      }
      const unitPrice = Number(product.discount_price ?? product.price);
      subtotal += unitPrice * qty;
      lineSnapshots.push({
        product_id: pid,
        product_name: product.name,
        product_price: unitPrice,
        quantity: qty,
        image_url: product.image_url,
        sku: product.sku,
      });
    }

    const totals = computeOrderTotals(subtotal);
    const payment_status = "Pending";
    const order_status = "Pending";

    await connection.beginTransaction();
    began = true;

    let shippingAddressId = null;
    if (saveAddress) {
      const [addrResult] = await connection.query(
        `INSERT INTO shipping_addresses
        (user_id, full_name, phone, address_line_1, address_line_2, city, state, postal_code, country, is_default)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          shippingAddress.full_name.trim(),
          shippingAddress.phone.trim(),
          shippingAddress.address_line_1.trim(),
          shippingAddress.address_line_2?.trim() || null,
          shippingAddress.city.trim(),
          shippingAddress.state?.trim() || "",
          shippingAddress.postal_code?.trim() || "",
          shippingAddress.country?.trim() || "India",
          1,
        ]
      );
      shippingAddressId = addrResult.insertId;
    } else {
      const [addrResult] = await connection.query(
        `INSERT INTO shipping_addresses
        (user_id, full_name, phone, address_line_1, address_line_2, city, state, postal_code, country, is_default)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        [
          userId,
          shippingAddress.full_name.trim(),
          shippingAddress.phone.trim(),
          shippingAddress.address_line_1.trim(),
          shippingAddress.address_line_2?.trim() || null,
          shippingAddress.city.trim(),
          shippingAddress.state?.trim() || "",
          shippingAddress.postal_code?.trim() || "",
          shippingAddress.country?.trim() || "India",
        ]
      );
      shippingAddressId = addrResult.insertId;
    }

    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    const [orderResult] = await connection.query(
      `INSERT INTO orders
      (order_number, user_id, shipping_address_id, subtotal, shipping_cost, tax_amount, total_amount,
       payment_status, order_status, payment_method, payment_id, idempotency_key)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?)`,
      [
        orderNumber,
        userId,
        shippingAddressId,
        totals.subtotal,
        totals.shipping_cost,
        totals.tax_amount,
        totals.total_amount,
        payment_status,
        order_status,
        paymentMethod,
        idempotencyKey || null,
      ]
    );

    const orderId = orderResult.insertId;

    for (const snap of lineSnapshots) {
      await connection.query(
        `INSERT INTO order_items
        (order_id, product_id, product_name, product_price, quantity, image_url, sku)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          snap.product_id,
          snap.product_name,
          snap.product_price,
          snap.quantity,
          snap.image_url,
          snap.sku,
        ]
      );

      const [stockResult] = await connection.query(
        "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?",
        [snap.quantity, snap.product_id, snap.quantity]
      );
      if (stockResult.affectedRows === 0) {
        await connection.rollback();
        return sendError(res, `Stock update failed for "${snap.product_name}".`, 409);
      }
    }

    await connection.commit();

    notifyProductCatalogChanged();

    const order = await findOrderById(orderId);
    const orderItems = await findOrderItems(orderId);
    return sendSuccess(res, formatOrderResponse(order, orderItems), "Order created successfully", 201);
  } catch (error) {
    if (began) await connection.rollback();
    console.error("CreateOrder error:", error.message);
    return sendError(res, "Failed to create order. Please try again.", 500);
  } finally {
    connection.release();
  }
};

/** GET /api/orders/my-orders */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await getOrdersForUser(req.user.id);
    const withItems = await attachItemsToOrders(orders);
    const payload = withItems.map((o) =>
      formatOrderResponse(
        {
          ...o,
          customer_name: req.user.name,
          customer_email: req.user.email,
        },
        o.items
      )
    );
    return sendSuccess(res, payload, "Orders retrieved successfully");
  } catch (error) {
    console.error("GetMyOrders error:", error.message);
    return sendError(res, "Failed to retrieve orders", 500);
  }
};

/** GET /api/orders/:id */
export const getOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    if (Number.isNaN(orderId)) {
      return sendError(res, "Invalid order ID", 400);
    }

    const order = await findOrderById(orderId);
    if (!order) {
      return sendError(res, "Order not found", 404);
    }

    const isAdmin = req.user.role === "admin";
    if (!isAdmin && order.user_id !== req.user.id) {
      return sendError(res, "Not authorized to view this order", 403);
    }

    const items = await findOrderItems(orderId);
    return sendSuccess(res, formatOrderResponse(order, items), "Order retrieved successfully");
  } catch (error) {
    console.error("GetOrderById error:", error.message);
    return sendError(res, "Failed to retrieve order", 500);
  }
};

/** PUT /api/orders/:id/cancel */
export const cancelOrder = async (req, res) => {
  const connection = await pool.getConnection();
  let began = false;
  try {
    const orderId = parseInt(req.params.id, 10);
    if (Number.isNaN(orderId)) {
      return sendError(res, "Invalid order ID", 400);
    }

    const order = await findOrderById(orderId);
    if (!order) {
      return sendError(res, "Order not found", 404);
    }

    if (order.user_id !== req.user.id) {
      return sendError(res, "Not authorized to cancel this order", 403);
    }

    if (order.order_status === "Cancelled") {
      return sendError(res, "Order is already cancelled", 400);
    }

    if (order.order_status !== "Pending" && order.order_status !== "Processing") {
      return sendError(res, `Order cannot be cancelled because it is already ${order.order_status}`, 400);
    }

    await connection.beginTransaction();
    began = true;

    await connection.query(
      "UPDATE orders SET order_status = 'Cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [orderId]
    );

    await restoreOrderStock(connection, orderId);

    await connection.commit();

    return sendSuccess(res, null, "Order cancelled successfully");
  } catch (error) {
    if (began) await connection.rollback();
    console.error("CancelOrder error:", error.message);
    return sendError(res, "Failed to cancel order", 500);
  } finally {
    connection.release();
  }
};

/** Restore inventory when order is cancelled/returned/refunded */
async function restoreOrderStock(connection, orderId) {
  const [items] = await connection.query(
    "SELECT product_id, quantity FROM order_items WHERE order_id = ?",
    [orderId]
  );
  for (const item of items) {
    await connection.query(
      "UPDATE products SET stock = stock + ? WHERE id = ?",
      [item.quantity, item.product_id]
    );
  }
}

export { restoreOrderStock, ORDER_STATUSES, RESTOCK_STATUSES, ACTIVE_STATUSES };
