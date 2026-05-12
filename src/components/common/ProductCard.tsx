"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";

type Props = {
  id: number | string;
  name: string;
  price: number;
  ratings: number;
  image?: string;
};

export default function ProductCard({ id, name, price, image, ratings }: Props) {
  const isNew = parseInt(id.toString()) % 3 === 0;
  const isBestSeller = parseInt(id.toString()) % 5 === 0;

  return (
    <div className="group relative flex flex-col h-full">
      <Link href={`/products/${id}`} className="relative block aspect-[4/5] overflow-hidden bg-[#0a0a0a] border border-white/[0.03]">
        {/* Status Tags */}
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

        {/* Wishlist Button */}
        <button className="absolute top-6 right-6 z-20 text-white/20 hover:text-primary transition-colors duration-500">
          <Heart size={14} />
        </button>

        <Image
          src={image || "/assets/product.jpeg"}
          alt={name}
          fill
          className="object-contain p-8 transition-transform duration-[1.5s] ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        
        {/* Quick Add - Bag Icon */}
        <button className="absolute bottom-6 right-6 z-20 w-10 h-10 flex items-center justify-center bg-white/5 border border-white/5 text-white/40 hover:bg-white hover:text-black transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
          <ShoppingBag size={14} />
        </button>
      </Link>

      <div className="flex flex-col items-center pt-8 text-center">
        <span className="text-[7px] uppercase tracking-[0.5em] text-white/20 font-bold mb-3">L'Essence Collection</span>
        <h3 className="text-sm md:text-base font-serif font-light text-white mb-3 tracking-[0.05em] group-hover:text-primary transition-colors duration-1000">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={8} 
              fill={i < Math.floor(ratings) ? "#D4AF37" : "none"} 
              className={i < Math.floor(ratings) ? "text-primary" : "text-white/10"} 
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

