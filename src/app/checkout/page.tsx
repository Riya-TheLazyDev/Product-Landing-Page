import type { Metadata } from "next";
import CheckoutPageView from "@/views/checkout/CheckoutPageView";

export const metadata: Metadata = {
  title: "Checkout | Elevāra",
  description: "Complete your Elevāra fragrance purchase with secure checkout.",
};

export default function CheckoutPage() {
  return <CheckoutPageView />;
}
