import type { Order, OrderItem, AdminOrderRow } from "@/data/orders";

export type ApiOrderItem = {
  id?: number;
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image_url?: string | null;
  sku?: string | null;
};

export type ApiOrder = {
  id: number;
  order_number: string;
  user_id?: number;
  customer_name?: string;
  customer_email?: string;
  customer_avatar?: string | null;
  customer?: { name: string; email: string; avatar?: string };
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  total_amount: number;
  payment_status: string;
  order_status: string;
  payment_method: string;
  payment_id?: string | null;
  items: ApiOrderItem[];
  shipping_address?: {
    full_name: string;
    phone: string;
    address_line_1: string;
    address_line_2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  } | null;
  created_at: string;
  updated_at?: string;
};

export function mapApiOrder(raw: ApiOrder): Order {
  return {
    id: raw.id,
    orderNumber: raw.order_number,
    customerName: raw.customer_name || raw.customer?.name || "",
    customerEmail: raw.customer_email || raw.customer?.email || "",
    items: raw.items.map(
      (i): OrderItem => ({
        productId: i.product_id,
        name: i.product_name,
        price: Number(i.product_price),
        quantity: i.quantity,
        imageUrl: i.image_url || "/assets/product.jpeg",
      })
    ),
    subtotal: Number(raw.subtotal),
    shippingCost: Number(raw.shipping_cost),
    taxAmount: Number(raw.tax_amount),
    totalAmount: Number(raw.total_amount),
    paymentStatus: raw.payment_status,
    orderStatus: raw.order_status,
    paymentMethod: raw.payment_method,
    createdAt: raw.created_at,
    shippingAddress: raw.shipping_address || undefined,
  };
}

export function formatOrderAmountINR(value: number): string {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export function formatOrderDateTime(iso: string): { date: string; time: string } {
  try {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
  } catch {
    return { date: "—", time: "" };
  }
}

/** Maps API order to admin table row (preserves existing UI shape). */
export function toAdminOrderRow(order: ApiOrder): AdminOrderRow {
  const customer = order.customer || {
    name: order.customer_name || "Guest",
    email: order.customer_email || "",
    avatar: order.customer_avatar || "/assets/product.jpeg",
  };
  const { date, time } = formatOrderDateTime(order.created_at);
  const firstItem = order.items[0];
  const totalQty = order.items.reduce((s, i) => s + i.quantity, 0);

  let paymentLabel = order.payment_status;
  if (order.payment_method === "COD" && order.payment_status === "Pending") {
    paymentLabel = "COD";
  }

  return {
    id: order.order_number,
    numericId: order.id,
    customer: {
      name: customer.name,
      email: customer.email,
      avatar: customer.avatar || "/assets/product.jpeg",
    },
    products: order.items.slice(0, 3).map((i) => ({
      image: i.image_url || "/assets/product.jpeg",
      count: i.quantity,
    })),
    productOverflow: totalQty > (firstItem?.quantity ?? 0) ? totalQty - (firstItem?.quantity ?? 0) : 0,
    amount: formatOrderAmountINR(order.total_amount),
    paymentStatus: paymentLabel,
    orderStatus: order.order_status,
    date,
    time,
  };
}

export type CreateOrderPayload = {
  items: { productId: string | number; quantity: number }[];
  shippingAddress: {
    full_name: string;
    phone: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  paymentMethod: string;
  idempotencyKey?: string;
  saveAddress?: boolean;
};
