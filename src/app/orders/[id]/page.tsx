"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Package } from "lucide-react";
import AuthGate from "@/components/auth/AuthGate";
import { orderService } from "@/services/orderService";
import type { Order } from "@/data/orders";
import { formatOrderAmountINR } from "@/lib/orderMapper";

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelOrder = async () => {
    if (!order) return;
    setIsCancelling(true);
    const res = await orderService.cancelOrder(order.id);
    if (res.success) {
      setOrder({ ...order, orderStatus: "Cancelled" });
      setIsCancelModalOpen(false);
    } else {
      alert(res.error || "Failed to cancel order");
    }
    setIsCancelling(false);
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      setError("");
      const res = await orderService.getOrderById(id);
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setError(res.error || "Order not found");
      }
      setLoading(false);
    })();
  }, [id]);

  return (
    <AuthGate role="user">
    <main className="cinematic-page cinematic-section cinematic-section--b min-h-screen pb-20 pt-28">
      <div className="container-page relative z-10">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-primary mb-10"
        >
          <ArrowLeft size={14} />
          Back to orders
        </Link>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-white/40">
            <Loader2 size={22} className="animate-spin text-primary" />
            <span className="text-[11px] uppercase tracking-widest">Loading order...</span>
          </div>
        ) : error || !order ? (
          <div className="glass-liquid max-w-2xl rounded-3xl p-10 text-center">
            <p className="text-sm text-white/50">{error || "Order not found"}</p>
          </div>
        ) : (
          <div className="glass-liquid rounded-3xl p-8 md:p-10 max-w-3xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-primary">{order.orderNumber}</p>
                <h1 className="mt-4 flex items-center gap-4 font-serif text-4xl text-white">
                  {order.orderStatus}
                  {order.orderStatus === "Cancelled" && (
                    <span className="text-xs font-sans font-bold uppercase tracking-widest bg-red-900/30 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
                      Cancelled
                    </span>
                  )}
                </h1>
              </div>
              {(order.orderStatus === "Pending" || order.orderStatus === "Processing") && (
                <button
                  type="button"
                  onClick={() => setIsCancelModalOpen(true)}
                  className="glass-liquid text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 hover:border-red-400/50 transition border border-white/10 px-4 py-2.5 rounded-xl"
                >
                  Cancel Order
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-white/45">
              Placed {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="mt-6 font-serif text-3xl text-primary">
              {formatOrderAmountINR(order.totalAmount)}
            </p>

            <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
              <h2 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Items</h2>
              {order.items.map((item) => (
                <div key={`${item.productId}-${item.name}`} className="flex gap-4 items-center">
                  <div className="h-14 w-12 rounded-lg overflow-hidden bg-black/40 border border-white/10">
                    <img
                      src={item.imageUrl || "/assets/product.jpeg"}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                    <p className="text-xs text-white/40">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm text-white font-bold">
                    {formatOrderAmountINR(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {order.shippingAddress ? (
              <div className="mt-10 space-y-2 border-t border-white/10 pt-8">
                <h2 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Shipping</h2>
                <p className="text-sm text-white/70">{order.shippingAddress.full_name}</p>
                <p className="text-sm text-white/50">{order.shippingAddress.address_line_1}</p>
                <p className="text-sm text-white/50">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postal_code}
                </p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-4 text-[10px] uppercase tracking-widest text-white/40">
              <span>Payment: {order.paymentMethod}</span>
              <span>Status: {order.paymentStatus}</span>
            </div>
          </div>
        )}

        {isCancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="glass-liquid p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-white/10">
              <h3 className="font-serif text-3xl text-white mb-4">Cancel Order?</h3>
              <p className="text-sm text-white/60 mb-8 leading-relaxed">
                Are you sure you want to cancel this order?
                <br />
                This action cannot be undone.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsCancelModalOpen(false)}
                  className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] py-4 rounded-xl hover:bg-primary transition"
                  disabled={isCancelling}
                >
                  Keep Order
                </button>
                <button
                  type="button"
                  onClick={handleCancelOrder}
                  className="w-full glass-liquid font-bold uppercase tracking-[0.2em] text-[10px] text-red-400 py-4 rounded-xl border border-white/10 hover:border-red-500/30 hover:bg-red-950/20 transition flex justify-center items-center gap-2"
                  disabled={isCancelling}
                >
                  {isCancelling && <Loader2 size={14} className="animate-spin" />}
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
    </AuthGate>
  );
}
