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
}: Props) {
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
    <div className="group/card relative flex h-full flex-col">
      <div className="relative">
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-primary/20 text-primary text-[7px] uppercase tracking-[0.3em] font-bold backdrop-blur-md border border-primary/20">
              New
            </span>
          )}
          {isBestSeller && (
            <span className="px-3 py-1 bg-white/10 text-white text-[7px] uppercase tracking-[0.3em] font-bold backdrop-blur-md border border-white/10">
              Best Seller
            </span>
          )}
        </div>

        <Link
          href={productLink}
          className="relative block aspect-[4/5] overflow-hidden bg-[#0a0a0a] border border-white/[0.03]"
        >
          <Image
            src={image || "/assets/product.jpeg"}
            alt={name}
            fill
            className="object-contain p-8 transition-transform duration-[1.5s] ease-[0.16, 1, 0.3, 1] group-hover/card:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>

        <motion.button
          type="button"
          onClick={handleQuickAdd}
          whileTap={{ scale: 0.92 }}
          className="absolute bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[rgba(6,6,8,0.75)] text-primary shadow-[0_12px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-700 hover:border-primary/40 hover:bg-primary/15 hover:shadow-[0_0_36px_-10px_rgba(214,195,165,0.45)]"
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingBag size={18} strokeWidth={1.25} />
        </motion.button>
      </div>

      <div className="flex flex-col items-center pt-8 text-center">
        <span className="text-[7px] uppercase tracking-[0.5em] text-white/20 font-bold mb-3">
          L&apos;Essence Collection
        </span>
        <Link href={productLink}>
          <h3 className="text-sm md:text-base font-serif font-light text-white mb-3 tracking-[0.05em] group-hover/card:text-primary transition-colors duration-1000">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-4">
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
          <span className="text-[7px] text-white/20 ml-2">({ratings})</span>
        </div>

        <p className="text-[9px] font-bold text-white tracking-[0.3em] uppercase">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
