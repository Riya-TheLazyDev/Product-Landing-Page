export interface Review {
  id: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  status: string;
  productName: string;
  date: string;
}

export const REVIEWS: Review[] = [
  {
    id: "REV-1001",
    customerName: "Aarav Sharma",
    customerEmail: "aarav@email.com",
    rating: 5,
    comment: "This fragrance has an absolutely stunning performance. Midnight orchid notes really stand out.",
    status: "Approved",
    productName: "Oud Noir",
    date: "May 29, 2024",
  },
  {
    id: "REV-1002",
    customerName: "Priya Patel",
    customerEmail: "priya@email.com",
    rating: 4,
    comment: "Excellent packaging and prompt delivery, although the scent profile is sweet.",
    status: "Approved",
    productName: "Amber Majesty",
    date: "May 28, 2024",
  },
  {
    id: "REV-1003",
    customerName: "Kabir Mehta",
    customerEmail: "kabir@email.com",
    rating: 2,
    comment: "Atomizer got stuck. Scent is nice but standard bottle design was imperfect.",
    status: "Pending",
    productName: "Velvet Rose",
    date: "May 28, 2024",
  },
];
