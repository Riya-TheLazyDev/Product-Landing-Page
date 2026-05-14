"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, MapPin, Minus, Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import type { CartTotals } from "@/lib/cart-totals";
import { useCartStore } from "@/stores/cart-store";
import type { CartLine } from "@/types/cart";

type Props = {
  totals: CartTotals;
  step: number;
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  busy?: boolean;
  onExpress: () => void;
  deliveryPreview?: string;
};

function SummaryLine({
  line,
  onInc,
  onDec,
  onRemove,
}: {
  line: CartLine;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  const lineTotal = line.price * line.quantity;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="flex gap-4 border-b border-white/[0.05] py-5 last:border-b-0"
    >
      <Link
        href={`/products/${line.productId}`}
        className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-[#0a0a12]"
      >
        <Image
          src={line.image}
          alt=""
          fill
          loading="lazy"
          sizes="64px"
          className="object-contain p-2"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${line.productId}`}
          className="font-serif text-base text-white hover:text-primary transition-colors duration-500 line-clamp-1"
        >
          {line.name}
        </Link>
        <p className="text-[9px] uppercase tracking-[0.3em] text-primary/80 mt-1">
          {line.perfumeType}
        </p>
        <p className="text-[11px] text-white/40 mt-0.5">{line.size}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] p-0.5">
            <button
              type="button"
              onClick={onDec}
              disabled={line.quantity <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/45 hover:bg-white/[0.06] hover:text-white disabled:opacity-25"
              aria-label="Decrease quantity"
            >
              <Minus size={12} strokeWidth={1.25} />
            </button>
            <span className="min-w-[1.5rem] text-center text-[11px] font-medium text-white/85">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={onInc}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/45 hover:bg-white/[0.06] hover:text-white"
              aria-label="Increase quantity"
            >
              <Plus size={12} strokeWidth={1.25} />
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-white/25 hover:text-white/60 transition-colors p-1"
            aria-label="Remove"
          >
            <Trash2 size={14} strokeWidth={1.25} />
          </button>
        </div>
      </div>
      <div className="shrink-0 text-right pt-1">
        <p className="font-serif text-base text-primary">
          ${lineTotal.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
}

export default function CheckoutOrderSummary({
  totals,
  step,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  busy,
  onExpress,
  deliveryPreview,
}: Props) {
  const items = useCartStore((s) => s.items);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const paymentBrands = useMemo(
    () => ["Visa", "Mastercard", "Apple Pay", "Google Pay", "PayPal"],
    []
  );

  return (
    <aside className="relative h-fit overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[rgba(6,8,16,0.65)] p-6 sm:p-8 shadow-[0_36px_100px_-48px_rgba(0,0,0,0.88)] backdrop-blur-2xl lg:sticky lg:top-28">
      <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-primary/[0.07] blur-3xl" />
      <div className="relative">
        <h2 className="font-serif text-2xl text-white mb-2 tracking-wide">
          Order summary
        </h2>
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 mb-8">
          Step {step + 1} of 4 · live totals
        </p>

        <div className="max-h-[min(52vh,420px)] overflow-y-auto pr-1 -mr-1">
          <AnimatePresence initial={false}>
            {items.map((line) => (
              <SummaryLine
                key={line.lineId}
                line={line}
                onInc={() => incrementQuantity(line.lineId)}
                onDec={() => decrementQuantity(line.lineId)}
                onRemove={() => removeItem(line.lineId)}
              />
            ))}
          </AnimatePresence>
        </div>

        {deliveryPreview ? (
          <div className="mb-6 rounded-xl border border-white/[0.08] bg-black/45 px-4 py-3">
            <div className="mb-1.5 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.35em] text-white/40">
              <MapPin size={12} className="text-primary/75" strokeWidth={1.25} />
              Delivery
            </div>
            <p className="text-xs leading-relaxed text-white/75">{deliveryPreview}</p>
          </div>
        ) : null}

        <dl className="mt-8 space-y-4 border-t border-white/[0.06] pt-8 text-sm">
          <div className="flex justify-between gap-4 text-white/50">
            <dt className="uppercase tracking-[0.22em] text-[10px]">Subtotal</dt>
            <dd className="font-serif text-lg text-white/90">
              ${totals.subtotal.toFixed(2)}
            </dd>
          </div>
          <div className="flex justify-between gap-4 text-white/50">
            <dt className="uppercase tracking-[0.22em] text-[10px]">Shipping</dt>
            <dd>
              {totals.subtotal === 0 ? (
                <span className="text-white/35">—</span>
              ) : totals.shipping === 0 ? (
                <span className="text-emerald-400/90 text-xs font-medium uppercase tracking-wide">
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
            <dt className="uppercase tracking-[0.22em] text-[10px]">Taxes</dt>
            <dd className="font-serif text-lg text-white/90">
              ${totals.taxes.toFixed(2)}
            </dd>
          </div>
        </dl>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex justify-between items-end gap-4 mb-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/35 font-bold">
            Total
          </span>
          <p className="font-serif text-3xl sm:text-4xl text-primary">
            ${totals.total.toFixed(2)}
          </p>
        </div>
        {totals.promotionalSavings > 0 && (
          <p className="text-xs text-emerald-400/85 font-medium mb-8">
            You saved ${totals.promotionalSavings.toFixed(2)}
          </p>
        )}
        {totals.promotionalSavings === 0 && totals.subtotal > 0 && (
          <p className="text-xs text-white/30 mb-8">
            Complimentary gift wrap on all orders.
          </p>
        )}

        <button
          type="button"
          onClick={onPrimary}
          disabled={primaryDisabled || busy}
          className="group relative mb-3 w-full overflow-hidden rounded-none border border-primary/40 bg-gradient-to-r from-primary via-[#e8dcc8] to-primary py-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0a0a0c] shadow-[0_20px_60px_-28px_rgba(214,195,165,0.55)] transition-all duration-700 hover:tracking-[0.38em] disabled:opacity-40 disabled:hover:tracking-[0.32em]"
        >
          <span className="relative z-10 inline-flex items-center justify-center gap-3">
            {busy ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border border-[#0a0a0c]/30 border-t-[#0a0a0c]" />
            ) : (
              <Lock size={14} strokeWidth={1.5} />
            )}
            {primaryLabel}
          </span>
          <div className="absolute inset-0 translate-x-[-100%] bg-white/25 transition-transform duration-1000 ease-out group-hover:translate-x-[100%] pointer-events-none" />
        </button>

        <button
          type="button"
          onClick={onExpress}
          className="mb-8 w-full rounded-none border border-white/15 bg-white/[0.03] py-3.5 text-[9px] font-bold uppercase tracking-[0.36em] text-white/70 backdrop-blur-md transition-all duration-700 hover:border-primary/30 hover:text-primary hover:shadow-[0_0_36px_-16px_rgba(214,195,165,0.25)] active:scale-[0.99]"
        >
          Express checkout
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {paymentBrands.map((label) => (
            <span
              key={label}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[7px] uppercase tracking-widest text-white/35"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
