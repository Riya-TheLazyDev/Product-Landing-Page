"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import AuthGate from "@/components/auth/AuthGate";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();

  return (
    <AuthGate role="user">
      <main className="cinematic-page cinematic-section cinematic-section--a min-h-screen pb-20 pt-28">
        <div className="environment-scene environment-scene--waterfall" />
        <div className="container-page relative z-10">
          <p className="subtitle-luxury mb-5">Saved Rituals</p>
          <h1 className="title-luxury mb-6 text-5xl text-white md:text-7xl">
            Wishlist
          </h1>
          <p className="text-editorial mb-12 max-w-xl text-xs uppercase tracking-[0.35em]">
            Fragrances you saved for your next private order.
          </p>

          {wishlistItems.length === 0 ? (
            <div className="glass-liquid max-w-2xl rounded-3xl p-10 text-center">
              <Heart className="mx-auto mb-6 text-primary" size={28} strokeWidth={1} />
              <h2 className="mb-4 font-serif text-3xl text-white">
                Nothing saved yet
              </h2>
              <p className="mb-8 text-sm text-white/50">
                Explore the collections and add a composition that speaks to you.
              </p>
              <Link
                href="/shop"
                className="glass-shine inline-flex rounded-full bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.34em] text-black hover:bg-primary"
              >
                Shop fragrances
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((item) => {
                const itemId = item.id || item.productId || "";
                return (
                  <div
                    key={itemId}
                    className="glass-card perfume-showcase relative overflow-hidden rounded-3xl p-6 group"
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    <Link href={`/products/${itemId}`} className="block">
                      <div className="relative mb-6 aspect-[4/5]">
                        <Image
                          src={item.image ?? "/assets/product.jpeg"}
                          alt={item.name}
                          fill
                          className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="subtitle-luxury mb-3">L'Essence</p>
                      <h2 className="font-serif text-2xl text-white group-hover:text-primary transition-colors">
                        {item.name}
                      </h2>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </AuthGate>
  );
}
