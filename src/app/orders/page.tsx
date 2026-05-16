"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import AuthGate from "@/components/auth/AuthGate";
import { useCartStore } from "@/stores/cart-store";

export default function OrdersPage() {
  const orders = useCartStore((s) => s.orders);

  return (
    <AuthGate role="user">
    <main className="cinematic-page cinematic-section cinematic-section--b min-h-screen pb-20 pt-28">
      <div className="environment-scene environment-scene--rain" />
      <div className="container-page relative z-10">
        <p className="subtitle-luxury mb-5">Private Client</p>
        <h1 className="title-luxury mb-6 text-5xl text-white md:text-7xl">
          My Orders
        </h1>
        <p className="text-editorial mb-12 max-w-xl text-xs uppercase tracking-[0.35em]">
          Your maison order history, preserved with your private account.
        </p>

        {orders.length === 0 ? (
          <div className="glass-liquid max-w-2xl rounded-3xl p-10 text-center">
            <Package className="mx-auto mb-6 text-primary" size={28} strokeWidth={1} />
            <h2 className="mb-4 font-serif text-3xl text-white">No orders yet</h2>
            <p className="mb-8 text-sm text-white/50">
              Your first confirmed fragrance order will appear here.
            </p>
            <Link
              href="/shop"
              className="glass-shine inline-flex rounded-full bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.34em] text-black hover:bg-primary"
            >
              Explore collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order, index) => (
              <motion.article
                key={order.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="glass-liquid rounded-3xl p-6 md:p-8"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-primary">
                      {order.id}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl text-white">
                      {order.status}
                    </h2>
                    <p className="mt-2 text-sm text-white/45">
                      {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                      {order.items.length} item{order.items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <p className="font-serif text-3xl text-primary">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
    </AuthGate>
  );
}
