"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Package } from "lucide-react";
import AuthGate from "@/components/auth/AuthGate";
import { useOrders } from "@/hooks/useOrders";
import { formatOrderAmountINR } from "@/lib/orderMapper";

export default function OrdersPage() {
  const { orders, loading, error, refetch } = useOrders();

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

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-white/40">
            <Loader2 size={22} className="animate-spin text-primary" />
            <span className="text-[11px] uppercase tracking-widest">Loading orders...</span>
          </div>
        ) : error ? (
          <div className="glass-liquid max-w-2xl rounded-3xl p-10 text-center">
            <p className="text-sm text-red-300/90 mb-6">{error}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-[10px] font-bold uppercase tracking-[0.34em] text-primary"
            >
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
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
                <Link href={`/orders/${order.id}`} className="block">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-primary">
                        {order.orderNumber}
                      </p>
                      <h2 className="mt-3 font-serif text-3xl text-white">
                        {order.orderStatus}
                      </h2>
                      <p className="mt-2 text-sm text-white/45">
                        {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                        {order.items.length} item{order.items.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <p className="font-serif text-3xl text-primary">
                      {formatOrderAmountINR(order.totalAmount)}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
    </AuthGate>
  );
}
