import type { Metadata } from "next";
import CartPageView from "@/views/cart/CartPageView";

export const metadata: Metadata = {
  title: "Your Cart | Elevāra",
  description:
    "Review your Elevāra fragrance collection before checkout.",
};

export default function CartPage() {
  return <CartPageView />;
}
