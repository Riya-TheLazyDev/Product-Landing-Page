"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, X } from "lucide-react";
import type { CartLine } from "@/types/cart";

type Props = {
  line: CartLine;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  onWishlist: () => void;
};

export default function CartLineRow({
  line,
  onIncrement,
  onDecrement,
  onRemove,
  onWishlist,
}: Props) {
  const lineTotal = line.price * line.quantity;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid grid-cols-1 gap-6 border-b border-white/[0.05] py-8 last:border-b-0 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.5fr)_minmax(0,0.55fr)_minmax(0,0.5fr)_auto] md:items-center md:gap-4"
    >
      <div className="flex gap-5 min-w-0">
        <Link
          href={`/products/${line.productId}`}
          className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a12]"
        >
          <Image
            src={line.image}
            alt={line.name}
            fill
            loading="lazy"
            sizes="96px"
            className="object-contain p-3 transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </Link>
        <div className="min-w-0 flex flex-col justify-center gap-2">
          <Link
            href={`/products/${line.productId}`}
            className="font-serif text-lg md:text-xl text-white tracking-wide hover:text-primary transition-colors duration-700"
          >
            {line.name}
          </Link>
          <p className="text-[10px] uppercase tracking-[0.35em] text-primary/90 font-semibold">
            {line.perfumeType}
          </p>
          <p className="text-xs text-white/40 tracking-wide">{line.size}</p>
          <button
            type="button"
            onClick={onWishlist}
            className="mt-1 inline-flex items-center gap-2 self-start text-[10px] uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-primary"
          >
            <Heart size={12} strokeWidth={1.25} className="text-primary/70" />
            Move to wishlist
          </button>
        </div>
      </div>

      <div className="hidden md:block text-right">
        <p className="font-serif text-lg text-primary">
          ${line.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 md:justify-center">
        <span className="text-[9px] uppercase tracking-[0.35em] text-white/25 md:hidden">
          Quantity
        </span>
        <div className="inline-flex items-center gap-0 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={onDecrement}
            disabled={line.quantity <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-all duration-500 hover:bg-white/[0.06] hover:text-white disabled:opacity-25 disabled:hover:bg-transparent"
            aria-label="Decrease quantity"
          >
            <Minus size={14} strokeWidth={1.25} />
          </button>
          <span className="min-w-[2rem] text-center text-xs font-medium tracking-widest text-white/90">
            {line.quantity}
          </span>
          <button
            type="button"
            onClick={onIncrement}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-all duration-500 hover:bg-white/[0.06] hover:text-white"
            aria-label="Increase quantity"
          >
            <Plus size={14} strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between md:block md:text-right">
        <span className="text-[9px] uppercase tracking-[0.35em] text-white/25 md:hidden">
          Total
        </span>
        <p className="font-serif text-xl text-primary md:text-lg">
          ${lineTotal.toFixed(2)}
        </p>
      </div>

      <div className="flex justify-end md:justify-center">
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-2 text-white/25 transition-all duration-500 hover:bg-white/[0.05] hover:text-white/70"
          aria-label={`Remove ${line.name}`}
        >
          <X size={18} strokeWidth={1.25} />
        </button>
      </div>

      <div className="md:hidden text-sm text-white/50">
        <span className="text-white/30">Unit </span>
        <span className="text-primary">${line.price.toFixed(2)}</span>
      </div>
    </motion.article>
  );
}
