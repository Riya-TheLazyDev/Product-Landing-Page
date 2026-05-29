import pool from "../config/db.js";
import { sendSuccess, sendError } from "../utils/responseHelper.js";
import {
  ORDER_STATUSES,
  findOrderById,
  findOrderItems,
  getAllOrdersAdmin,
  attachItemsToOrders,
} from "../utils/orderQueries.js";
import { restoreOrderStock, RESTOCK_STATUSES } from "./orderController.js";
import { notifyProductCatalogChanged } from "../utils/productCatalogNotify.js";

function formatAdminOrder(order) {
  return {
    id: order.id,
    order_number: order.order_number,
    user_id: order.user_id,
    customer: {
      name: order.customer_name,
      email: order.customer_email,
      avatar: order.customer_avatar || "/assets/product.jpeg",
    },
    subtotal: Number(order.subtotal),
    shipping_cost: Number(order.shipping_cost),
    tax_amount: Number(order.tax_amount),
    total_amount: Number(order.total_amount),
    payment_status: order.payment_status,
    order_status: order.order_status,
    payment_method: order.payment_method,
    items: (order.items || []).map((i) => ({
      product_id: i.product_id,
      product_name: i.product_name,
      product_price: Number(i.product_price),
      quantity: i.quantity,
      image_url: i.image_url || "/assets/product.jpeg",
    })),
    created_at: order.created_at,
    updated_at: order.updated_at,
  };
}

/** GET /api/admin/orders */
export const getAdminOrders = async (req, res) => {
  try {
    const { order_status, payment_status, search } = req.query;
    const orders = await getAllOrdersAdmin({ order_status, payment_status, search });
    const withItems = await attachItemsToOrders(orders);
    const payload = withItems.map(formatAdminOrder);

    const stats = {
      total: payload.length,
      pending: payload.filter((o) => o.order_status === "Pending").length,
      processing: payload.filter((o) => o.order_status === "Processing").length,
      shipped: payload.filter((o) => o.order_status === "Shipped").length,
      delivered: payload.filter((o) => o.order_status === "Delivered").length,
      cancelled: payload.filter((o) => o.order_status === "Cancelled").length,
    };

    return sendSuccess(res, { orders: payload, stats }, "Admin orders retrieved successfully");
  } catch (error) {
    console.error("GetAdminOrders error:", error.message);
    return sendError(res, "Failed to retrieve orders", 500);
  }
};

/** PUT /api/admin/orders/:id/status */
export const updateAdminOrderStatus = async (req, res) => {
  const connection = await pool.getConnection();
  let began = false;
  try {
    const orderId = parseInt(req.params.id, 10);
    const { status, payment_status: paymentStatus } = req.body;

    if (Number.isNaN(orderId)) {
      return sendError(res, "Invalid order ID", 400);
    }

    if (!status || !ORDER_STATUSES.includes(status)) {
      return sendError(
        res,
        `Invalid status. Allowed: ${ORDER_STATUSES.join(", ")}`,
        400
      );
    }

    const order = await findOrderById(orderId);
    if (!order) {
      return sendError(res, "Order not found", 404);
    }

    const wasRestocked = RESTOCK_STATUSES.includes(order.order_status);
    const shouldRestock = RESTOCK_STATUSES.includes(status) && !wasRestocked;

    await connection.beginTransaction();
    began = true;

    await connection.query(
      "UPDATE orders SET order_status = ?, payment_status = COALESCE(?, payment_status) WHERE id = ?",
      [status, paymentStatus || null, orderId]
    );

    if (shouldRestock) {
      await restoreOrderStock(connection, orderId);
    }

    await connection.commit();
    notifyProductCatalogChanged();

    const updated = await findOrderById(orderId);
    const items = await findOrderItems(orderId);

    return sendSuccess(
      res,
      formatAdminOrder({ ...updated, items }),
      "Order status updated successfully"
    );
  } catch (error) {
    if (began) await connection.rollback();
    console.error("UpdateAdminOrderStatus error:", error.message);
    return sendError(res, "Failed to update order status", 500);
  } finally {
    connection.release();
  }
};
