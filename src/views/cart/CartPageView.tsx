"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  Shield,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import CartTrustStrip from "@/components/cart/CartTrustStrip";
import { computeCartTotals } from "@/lib/cart-totals";
import { useCartStore } from "@/stores/cart-store";
import CartLineRow from "@/views/cart/CartLineRow";

export default function CartPageView() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const moveToWishlist = useCartStore((s) => s.moveToWishlist);
  const showToast = useCartStore((s) => s.showToast);

  const totals = useMemo(() => computeCartTotals(items), [items]);
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div className="min-h-screen bg-[#03040a] pt-28 pb-24 px-4 md:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(214,195,165,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#070b18]/90 via-[#03040a] to-[#020205] pointer-events-none" />

      <div className="container-page">
        <header className="mb-16 md:mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="subtitle-luxury mb-5">Elevāra · Maison</p>
            <h1 className="title-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              Your Cart
            </h1>
            <p className="text-editorial text-[10px] sm:text-xs uppercase tracking-[0.35em] max-w-md">
              Review your selections and proceed to checkout — each bottle
              hand-vetted for your private collection.
            </p>
          </div>
          <div className="relative w-full max-w-md aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/[0.06] glass-card shadow-[0_40px_120px_-50px_rgba(0,0,0,0.85)]">
            <Image
              src="/assets/product.jpeg"
              alt=""
              fill
              loading="lazy"
              className="object-cover object-center opacity-80"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03040a] via-[#03040a]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[9px] uppercase tracking-[0.45em] text-primary font-bold mb-2">
                Atelier still life
              </p>
              <p className="font-serif text-2xl text-white/90 tracking-wide">
                Dominance of light
              </p>
            </div>
          </div>
        </header>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-lg rounded-[2rem] border border-white/[0.06] bg-[rgba(8,10,18,0.6)] px-10 py-16 text-center backdrop-blur-2xl"
          >
            <p className="subtitle-luxury mb-4">Your cart awaits</p>
            <h2 className="font-serif text-3xl text-white mb-6 tracking-wide">
              No fragrances yet
            </h2>
            <p className="text-sm text-white/45 font-light leading-relaxed mb-10">
              Discover the collection and add a composition that speaks to you.
            </p>
            <Link
              href="/shop"
              className="shine-sweep inline-flex items-center gap-3 rounded-full border border-primary/35 bg-transparent px-10 py-4 text-[10px] uppercase tracking-[0.35em] font-bold text-primary transition-all duration-700 hover:bg-primary/10 hover:shadow-[0_0_40px_-12px_rgba(214,195,165,0.35)]"
            >
              <ArrowLeft size={14} />
              Continue shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] xl:gap-16">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[rgba(6,8,14,0.55)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />
              <div className="relative px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
                <div className="mb-2 hidden md:grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.5fr)_minmax(0,0.55fr)_minmax(0,0.5fr)_auto] md:gap-4 md:border-b md:border-white/[0.06] md:pb-4">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-primary font-bold">
                    Product
                  </span>
                  <span className="text-right text-[9px] uppercase tracking-[0.4em] text-primary font-bold">
                    Price
                  </span>
                  <span className="text-center text-[9px] uppercase tracking-[0.4em] text-primary font-bold">
                    Quantity
                  </span>
                  <span className="text-right text-[9px] uppercase tracking-[0.4em] text-primary font-bold">
                    Total
                  </span>
                  <span />
                </div>

                <LayoutGroup>
                  <AnimatePresence mode="popLayout">
                    {items.map((line) => (
                      <CartLineRow
                        key={line.lineId}
                        line={line}
                        onIncrement={() => incrementQuantity(line.lineId)}
                        onDecrement={() => decrementQuantity(line.lineId)}
                        onRemove={() => removeItem(line.lineId)}
                        onWishlist={() => moveToWishlist(line.lineId)}
                      />
                    ))}
                  </AnimatePresence>
                </LayoutGroup>

                <div className="mt-4 flex flex-col gap-6 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href="/shop"
                    className="shine-sweep group inline-flex items-center justify-center gap-3 rounded-full border border-primary/35 bg-transparent px-8 py-3.5 text-[10px] uppercase tracking-[0.35em] font-bold text-primary transition-all duration-700 hover:bg-primary/10 hover:shadow-[0_0_40px_-12px_rgba(214,195,165,0.35)] active:scale-[0.98]"
                  >
                    <ArrowLeft
                      size={14}
                      className="transition-transform duration-700 group-hover:-translate-x-1"
                    />
                    Continue shopping
                  </Link>
                  <div className="flex items-center gap-4">
                    {confirmClear ? (
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">
                          Clear all?
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            clearCart();
                            setConfirmClear(false);
                          }}
                          className="rounded-full border border-red-500/40 px-4 py-2 text-[9px] uppercase tracking-widest text-red-300/90 hover:bg-red-500/10 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmClear(false)}
                          className="text-[9px] uppercase tracking-widest text-white/40 hover:text-white/70"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmClear(true)}
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/35 transition-colors hover:text-white/70"
                      >
                        <Trash2 size={14} strokeWidth={1.25} />
                        Clear cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative h-fit overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[rgba(6,8,16,0.65)] p-8 md:p-10 shadow-[0_36px_100px_-48px_rgba(0,0,0,0.88)] backdrop-blur-2xl lg:sticky lg:top-28"
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/[0.05] to-transparent" />
              <div className="relative">
                <h2 className="font-serif text-2xl md:text-3xl text-white mb-10 tracking-wide">
                  Order summary
                </h2>

                <dl className="space-y-5 text-sm">
                  <div className="flex justify-between gap-4 text-white/50">
                    <dt className="uppercase tracking-[0.25em] text-[10px]">
                      Subtotal
                    </dt>
                    <dd className="font-serif text-lg text-white/90">
                      ${totals.subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 text-white/50">
                    <dt className="uppercase tracking-[0.25em] text-[10px]">
                      Shipping
                    </dt>
                    <dd>
                      {totals.subtotal === 0 ? (
                        <span className="text-white/35">—</span>
                      ) : totals.shipping === 0 ? (
                        <span className="text-emerald-400/90 font-medium tracking-wide text-xs uppercase">
                          Complimentary
                        </span>
                      ) : (
                        <span className="font-serif text-lg text-white/90">
                          ${totals.shipping.toFixed(2)}
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 text-white/50">
                    <dt className="uppercase tracking-[0.25em] text-[10px]">
                      Taxes
                    </dt>
                    <dd className="font-serif text-lg text-white/90">
                      ${totals.taxes.toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="flex justify-between items-end gap-4 mb-3">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-white/35 font-bold">
                    Total
                  </span>
                  <p className="font-serif text-4xl text-primary">
                    ${totals.total.toFixed(2)}
                  </p>
                </div>
                {totals.promotionalSavings > 0 && (
                  <p className="text-xs text-emerald-400/85 font-medium mb-10">
                    Member savings · ${totals.promotionalSavings.toFixed(2)}{" "}
                    reflected at checkout
                  </p>
                )}
                {totals.promotionalSavings === 0 && totals.subtotal > 0 && (
                  <p className="text-xs text-white/30 mb-10">
                    Complimentary gift wrap on all orders.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() =>
                    showToast("Checkout experience opens very soon.")
                  }
                  className="group relative mb-4 w-full overflow-hidden rounded-none border border-primary/40 bg-gradient-to-r from-primary via-[#e8dcc8] to-primary py-5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#0a0a0c] shadow-[0_20px_60px_-28px_rgba(214,195,165,0.55)] transition-all duration-700 hover:tracking-[0.42em] active:scale-[0.99]"
                >
                  <span className="relative z-10 inline-flex items-center justify-center gap-3">
                    <Lock size={14} strokeWidth={1.5} />
                    Proceed to checkout
                  </span>
                  <div className="absolute inset-0 translate-x-[-100%] bg-white/25 transition-transform duration-1000 ease-out group-hover:translate-x-[100%]" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    showToast("Express checkout — Apple Pay & more — soon.")
                  }
                  className="mb-10 w-full rounded-none border border-white/15 bg-white/[0.03] py-4 text-[9px] font-bold uppercase tracking-[0.38em] text-white/70 backdrop-blur-md transition-all duration-700 hover:border-primary/30 hover:text-primary hover:shadow-[0_0_36px_-16px_rgba(214,195,165,0.25)] active:scale-[0.99]"
                >
                  Express checkout
                </button>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  {["Visa", "Mastercard", "Apple Pay", "Google Pay", "PayPal"].map(
                    (label) => (
                      <span
                        key={label}
                        className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[8px] uppercase tracking-widest text-white/35"
                      >
                        {label}
                      </span>
                    )
                  )}
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-4">
                  <Shield
                    size={18}
                    strokeWidth={1.25}
                    className="mt-0.5 shrink-0 text-primary/80"
                  />
                  <p className="text-[11px] leading-relaxed text-white/45 tracking-wide">
                    Secure checkout — your details are encrypted and never
                    shared.
                  </p>
                </div>
              </div>
            </motion.aside>
          </div>
        )}

        <CartTrustStrip />
      </div>
    </div>
  );
}
