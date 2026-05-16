"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import AuthGate from "@/components/auth/AuthGate";
import { useCartStore } from "@/stores/cart-store";

export default function WishlistPage() {
  const wishlist = useCartStore((s) => s.wishlist);

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

        {wishlist.length === 0 ? (
          <div className="glass-liquid max-w-2xl rounded-3xl p-10 text-center">
            <Heart className="mx-auto mb-6 text-primary" size={28} strokeWidth={1} />
            <h2 className="mb-4 font-serif text-3xl text-white">
              Nothing saved yet
            </h2>
            <p className="mb-8 text-sm text-white/50">
              Move items from your cart to wishlist to keep them here.
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
            {wishlist.map((item) => (
              <Link
                key={item.productId}
                href={`/products/${item.productId}`}
                className="glass-card perfume-showcase relative overflow-hidden rounded-3xl p-6"
              >
                <div className="relative mb-6 aspect-[4/5]">
                  <Image
                    src={item.image ?? "/assets/product.jpeg"}
                    alt={item.name}
                    fill
                    className="object-contain p-8"
                  />
                </div>
                <p className="subtitle-luxury mb-3">L'Essence</p>
                <h2 className="font-serif text-2xl text-white">{item.name}</h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
    </AuthGate>
  );
}
