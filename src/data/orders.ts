export interface OrderItem {
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string | number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  paymentMethod: string;
  createdAt: string;
  shippingAddress?: {
    full_name: string;
    phone: string;
    address_line_1: string;
    address_line_2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

/** Admin orders table row shape (matches existing mock structure). */
export type AdminOrderRow = {
  id: string;
  numericId: number;
  customer: { name: string; email: string; avatar: string };
  products: { image: string; count: number }[];
  productOverflow: number;
  amount: string;
  paymentStatus: string;
  orderStatus: string;
  date: string;
  time: string;
};

export type AdminOrderStats = {
  total: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
};
