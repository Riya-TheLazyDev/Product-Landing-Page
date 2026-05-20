"use client";

import { ArrowLeft, Star, Shield, Truck, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PdpAddToCart from "@/components/pdp/PdpAddToCart";
import PdpRelatedFragrances from "@/components/pdp/PdpRelatedFragrances";
import type { Product } from "@/data/products";
import { getLuxurySubtitle } from "@/lib/pdp-related";
import { toCollectionCardProps } from "@/lib/productMapper";

type Props = {
  product: Product;
  relatedProducts: Product[];
};

export default function ProductDetailView({ product, relatedProducts }: Props) {
  const displayPrice = product.discountPrice ?? product.price;
  const ratings = product.ratings ?? 4.8;
  const image = product.images[0] || "/assets/product.jpeg";

  const relatedItems = relatedProducts.map((p) => {
    const card = toCollectionCardProps(p);
    return {
      id: card.id,
      name: card.name,
      price: card.price,
      image: card.image,
      subtitle: getLuxurySubtitle({
        id: p.id,
        name: p.name,
        price: p.price,
        ratings: p.ratings ?? 4.8,
        category: p.category,
        image: card.image,
      }),
    };
  });

  const pdpProduct = {
    id: product.id,
    name: product.name,
    price: displayPrice,
    image,
    isLuxuryPerfume: product.isLuxuryPerfume,
    perfumeType: product.perfumeType,
    sizeOptions: product.sizeOptions,
  };

  return (
    <div className="cinematic-page cinematic-section cinematic-section--b min-h-screen pb-16 pt-24 sm:pb-20 sm:pt-28 md:pt-32">
      <div className="container-page">
        <Link
          href="/#shop"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Collection
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl glass-card p-6 sm:rounded-[2rem] sm:p-10 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4">
              {product.category}
            </span>
            <h1 className="heading-section mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
              <p className="text-3xl font-serif text-primary">
                ${displayPrice.toFixed(2)}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={
                        i < Math.floor(ratings)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-white/40 font-medium">
                  ({ratings})
                </span>
              </div>
            </div>

            <p className="text-white/60 text-lg leading-relaxed mb-10 font-light max-w-lg">
              {product.description ||
                "A meticulously crafted essence designed to revitalize your skin's natural radiance. Infused with liquid glass technology and premium botanical extracts."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Shield, text: "Pure Ingredients" },
                { icon: Truck, text: "Global Shipping" },
                { icon: RefreshCw, text: "30-Day Returns" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center sm:items-start gap-3"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-primary">
                    <item.icon size={18} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <PdpAddToCart product={pdpProduct} />
          </div>
        </div>

        <PdpRelatedFragrances items={relatedItems} />
      </div>
    </div>
  );
}
