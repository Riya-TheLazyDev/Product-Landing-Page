"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { getPerfumeType, getSizeOptions } from "@/lib/product-cart-meta";
import { useCartStore } from "@/stores/cart-store";
import { useWishlist } from "@/hooks/useWishlist";

export type PdpAddToCartProduct = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  isLuxuryPerfume?: boolean;
  perfumeType?: string;
  sizeOptions?: string[];
};

type Props = {
  product: PdpAddToCartProduct;
};

export default function PdpAddToCart({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const sizes = getSizeOptions(product);
  const [size, setSize] = useState(sizes[0] ?? "50 ml");
  const perfumeType = getPerfumeType(product);
  const wishlisted = isInWishlist(product.id.toString());

  useEffect(() => {
    const next = getSizeOptions(product)[0] ?? "50 ml";
    setSize(next);
  }, [product.id]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/35 font-bold mb-4">
          Select volume
        </p>
        <div className="flex flex-wrap gap-3">
          {sizes.map((s) => {
            const active = s === size;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-full border px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] transition-all duration-700 ${
                  active
                    ? "border-primary/50 bg-primary/10 text-primary shadow-[0_0_32px_-12px_rgba(214,195,165,0.35)]"
                    : "border-white/10 text-white/45 hover:border-white/25 hover:text-white/80"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <motion.button
          type="button"
          layout
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              image: product.image,
              price: product.price,
              perfumeType,
              size,
              quantity: 1,
            })
          }
          whileTap={{ scale: 0.985 }}
          className="btn-luxury group relative flex-1 overflow-hidden py-5 flex items-center justify-center gap-4"
        >
          <ShoppingBag
            size={18}
            className="transition-transform duration-700 group-hover:-translate-y-0.5"
          />
          <span className="text-xs uppercase tracking-[0.3em] font-bold">
            Add to collection
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() =>
            toggleWishlist({
              id: product.id.toString(),
              name: product.name,
              image: product.image,
              price: product.price,
            })
          }
          whileTap={{ scale: 0.95 }}
          className={`px-5 rounded-none border transition-all duration-700 flex items-center justify-center ${
            wishlisted
              ? "border-primary/50 bg-primary/10 text-primary shadow-[0_0_32px_-12px_rgba(214,195,165,0.35)]"
              : "border-white/10 text-white/45 hover:border-white/20 hover:text-white"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            className={wishlisted ? "fill-primary text-primary" : ""}
          />
        </motion.button>
      </div>
    </div>
  );
}
