export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  status: string;
  joinedAt: string;
}

export const CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Sneha Reddy",
    email: "sneha@email.com",
    phone: "+91 98765 43210",
    totalOrders: 12,
    totalSpent: 42560,
    status: "Active",
    joinedAt: "Jan 15, 2024",
  },
  {
    id: "CUST-002",
    name: "Rohan Mehta",
    email: "rohan@email.com",
    phone: "+91 98765 43211",
    totalOrders: 8,
    totalSpent: 28790,
    status: "Active",
    joinedAt: "Feb 02, 2024",
  },
  {
    id: "CUST-003",
    name: "Ananya Sharma",
    email: "ananya@email.com",
    phone: "+91 98765 43212",
    totalOrders: 5,
    totalSpent: 16800,
    status: "Active",
    joinedAt: "Mar 10, 2024",
  },
];
