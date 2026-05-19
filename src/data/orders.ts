export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export const ORDERS: Order[] = [
  {
    id: "ORD-1025",
    customerName: "Sneha Reddy",
    customerEmail: "sneha@email.com",
    items: [
      { productId: "noir-eternel", name: "Noir Éternel", price: 385, quantity: 1 }
    ],
    totalAmount: 385,
    status: "Completed",
    createdAt: "May 29, 2024",
  },
  {
    id: "ORD-1024",
    customerName: "Rohan Mehta",
    customerEmail: "rohan@email.com",
    items: [
      { productId: "harmony", name: "Harmony", price: 25, quantity: 2 }
    ],
    totalAmount: 50,
    status: "Processing",
    createdAt: "May 28, 2024",
  },
];
