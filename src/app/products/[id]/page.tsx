import React from "react";
import { products } from "@/mock/product";
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  Shield,
  Truck,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PdpRelatedFragrances from "@/components/pdp/PdpRelatedFragrances";
import {
  getLuxurySubtitle,
  getRelatedProducts,
} from "@/lib/pdp-related";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 6);
  const relatedItems = relatedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
    subtitle: getLuxurySubtitle(p),
  }));

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-[#050505]">
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

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-card p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="relative w-full h-full">
              <Image
                src={product.image || "/assets/product.jpeg"}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4">
              {product.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 text-white leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
              <p className="text-3xl font-serif text-primary">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={
                        i < Math.floor(product.ratings)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-white/40 font-medium">
                  ({product.ratings})
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

            <button className="btn-luxury w-full py-5 group flex items-center justify-center gap-4">
              <ShoppingBag size={18} />
              <span className="text-xs uppercase tracking-[0.3em] font-bold">
                Add to Collection
              </span>
            </button>
          </div>
        </div>

        <PdpRelatedFragrances items={relatedItems} />
      </div>
    </div>
  );
}
