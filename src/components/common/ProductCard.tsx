"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { getPerfumeType, getSizeOptions } from "@/lib/product-cart-meta";
import type { Product } from "@/mock/product";
import { useCartStore } from "@/stores/cart-store";

type Props = {
  id: number | string;
  name: string;
  price: number;
  ratings: number;
  image?: string;
  isLuxuryPerfume?: boolean;
  perfumeType?: string;
  sizeOptions?: string[];
  /** Smaller image area — used on homepage featured grid only */
  variant?: "default" | "compact";
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  ratings,
  isLuxuryPerfume,
  perfumeType,
  sizeOptions,
  variant = "default",
}: Props) {
  const isCompact = variant === "compact";
  const addItem = useCartStore((s) => s.addItem);
  const isNew = parseInt(id.toString()) % 3 === 0;
  const isBestSeller = parseInt(id.toString()) % 5 === 0;
  const productLink = `/products/${id}`;

  const meta: Pick<Product, "sizeOptions" | "isLuxuryPerfume" | "perfumeType"> = {
    sizeOptions,
    isLuxuryPerfume,
    perfumeType,
  };

  const defaultSize = getSizeOptions(meta)[0] ?? "50 ml";
  const typeLabel = getPerfumeType(meta);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: id,
      name,
      image,
      price,
      perfumeType: typeLabel,
      size: defaultSize,
      quantity: 1,
    });
  };

  return (
    <motion.div className="group/card relative flex h-full flex-col">
      <motion.div
        className={`relative ${isCompact ? "mx-auto w-full max-w-[220px] sm:max-w-[240px]" : ""}`}
        whileHover={isCompact ? { y: -4 } : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 sm:top-6 sm:left-6">
          {isNew && (
            <span className="glass-chip border-primary/25 px-3 py-1 text-[7px] font-bold uppercase tracking-[0.3em] text-primary">
              New
            </span>
          )}
          {isBestSeller && (
            <span className="glass-chip px-3 py-1 text-[7px] font-bold uppercase tracking-[0.3em] text-white">
              Best Seller
            </span>
          )}
        </div>

        <Link
          href={productLink}
          className={`glass-card glass-shine perfume-showcase relative block overflow-hidden rounded-2xl ${
            isCompact
              ? "aspect-[3/4] border-white/[0.06]"
              : "aspect-[4/5] border-white/[0.04]"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/35" />
          <Image
            src={image || "/assets/product.jpeg"}
            alt={name}
            fill
            className={`z-10 object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.72)] transition-transform duration-[1.8s] ease-[0.16,1,0.3,1] group-hover/card:-translate-y-2 group-hover/card:scale-110 ${
              isCompact ? "p-12 sm:p-14" : "p-9 sm:p-10"
            }`}
            sizes={
              isCompact
                ? "(max-width: 768px) 40vw, 240px"
                : "(max-width: 768px) 50vw, 25vw"
            }
          />
          <div className="pointer-events-none absolute inset-x-6 bottom-[14%] z-[1] h-[15%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(235,224,205,0.12),transparent_70%)] blur-xl" />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/54 via-transparent to-white/[0.04]" />
          <div className="pointer-events-none absolute inset-x-5 top-4 z-[2] h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />
        </Link>

        <motion.button
          type="button"
          onClick={handleQuickAdd}
          whileTap={{ scale: 0.92 }}
          className={`glass-liquid absolute z-30 flex items-center justify-center rounded-full text-primary transition-all duration-700 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(140,72,210,0.45)] ${
            isCompact
              ? "bottom-3 right-3 h-9 w-9"
              : "bottom-5 right-5 h-11 w-11"
          }`}
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingBag size={isCompact ? 15 : 18} strokeWidth={1.25} />
        </motion.button>
      </motion.div>

      <div
        className={`flex flex-col items-center text-center ${isCompact ? "pt-6" : "pt-8"}`}
      >
        <span className="mb-3 text-[7px] font-bold uppercase tracking-[0.5em] text-primary/45">
          L&apos;Essence Collection
        </span>
        <Link href={productLink}>
          <h3 className="mb-3 font-serif text-sm font-light tracking-[0.05em] text-white transition-colors duration-1000 group-hover/card:text-primary md:text-base">
            {name}
          </h3>
        </Link>

        <div className="mb-4 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={8}
              fill={i < Math.floor(ratings) ? "#D4AF37" : "none"}
              className={
                i < Math.floor(ratings) ? "text-primary" : "text-white/10"
              }
            />
          ))}
          <span className="ml-2 text-[7px] text-white/20">({ratings})</span>
        </div>

        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">
          ${price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
}
