"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { getPerfumeType, getSizeOptions } from "@/lib/product-cart-meta";
import type { Product } from "@/mock/product";
import { useCartStore } from "@/stores/cart-store";

const GLOW_VARIANTS = [
  "collection-card__glow--obsidian",
  "collection-card__glow--amber",
  "collection-card__glow--charcoal",
  "collection-card__glow--gold",
  "collection-card__glow--navy",
] as const;

type Props = {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  isLuxuryPerfume?: boolean;
  perfumeType?: string;
  sizeOptions?: string[];
  glowIndex?: number;
};

export default function CollectionProductCard({
  id,
  name,
  price,
  image,
  isLuxuryPerfume,
  perfumeType,
  sizeOptions,
  glowIndex = 0,
}: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const productLink = `/products/${id}`;

  const meta: Pick<Product, "sizeOptions" | "isLuxuryPerfume" | "perfumeType"> = {
    sizeOptions,
    isLuxuryPerfume,
    perfumeType,
  };

  const typeLabel = getPerfumeType(meta);
  const defaultSize = getSizeOptions(meta)[0] ?? "50 ml";
  const glowClass = GLOW_VARIANTS[glowIndex % GLOW_VARIANTS.length];

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
    <article className="collection-card group/card">
      <Link href={productLink} className="collection-card__link">
        <div className={`collection-card__glow ${glowClass}`} aria-hidden />
        <div className="collection-card__visual relative">
          <Image
            src={image || "/assets/product.jpeg"}
            alt={name}
            fill
            className="collection-card__image object-contain p-6 pb-16 transition-transform duration-[1.2s] ease-[0.16,1,0.3,1] group-hover/card:scale-105 group-hover/card:-translate-y-1"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
          />
        </div>
        <div className="collection-card__footer">
          <div className="min-w-0 pr-12">
            <h3 className="truncate font-sans text-sm font-semibold tracking-wide text-white md:text-[15px]">
              {name}
            </h3>
            <p className="mt-1 truncate text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
              {typeLabel}
            </p>
            <p className="mt-2 text-sm font-bold text-white">
              ${price.toFixed(0)}
            </p>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setWishlisted((v) => !v);
        }}
        className="collection-card__wishlist"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={15}
          strokeWidth={1.25}
          className={wishlisted ? "fill-primary text-primary" : "text-white/55"}
        />
      </button>

      <button
        type="button"
        onClick={handleQuickAdd}
        className="collection-card__add"
        aria-label={`Add ${name} to cart`}
      >
        <Plus size={16} strokeWidth={1.5} />
      </button>
    </article>
  );
}
