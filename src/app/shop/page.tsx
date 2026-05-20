"use client";

import ShopHero from "../../views/shop/components/ShopHero";
import ShopSidebar from "../../views/shop/components/ShopSidebar";
import ShopGrid from "../../views/shop/components/ShopGrid";
import ShopCTA from "../../views/shop/components/ShopCTA";
import ProductCollectionsSection from "@/components/common/ProductCollectionsSection";
import { useState } from "react";

export default function ShopPage() {
  const [productCount, setProductCount] = useState(0);
  const [activeFilters, setActiveFilters] = useState({
    category: "All",
    collection: "All",
    priceRange: [120, 500],
    type: "All",
    intensity: "All",
  });

  return (
    <div className="cinematic-page min-h-screen">
      <ShopHero />

      <main className="cinematic-section cinematic-section--b relative overflow-hidden py-12 sm:py-16 md:py-20">
        <div className="environment-scene environment-scene--waterfall" />
        <div className="container-page relative z-10">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-16">
            <aside className="w-full lg:sticky lg:top-24 lg:w-72 lg:shrink-0">
              <ShopSidebar
                filters={activeFilters}
                setFilters={setActiveFilters}
              />
            </aside>

            <div className="w-full flex-1">
              <ProductCollectionsSection embedded showViewAll={false}>
                <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/45 sm:text-[10px] sm:tracking-[0.4em]">
                    {productCount > 0
                      ? `Showing ${Math.min(productCount, 12)} of ${productCount} products`
                      : "Loading products..."}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/45 sm:text-[10px] sm:tracking-[0.4em]">
                      Sort By:
                    </span>
                    <select className="min-w-0 flex-1 cursor-pointer bg-transparent text-[9px] font-bold uppercase tracking-[0.25em] text-white focus:outline-none sm:flex-none sm:text-[10px] sm:tracking-[0.3em]">
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Best Rating</option>
                    </select>
                  </div>
                </div>

                <ShopGrid
                  filters={activeFilters}
                  onCountChange={setProductCount}
                />
              </ProductCollectionsSection>

              <div className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:mt-24 sm:gap-12">
                <button
                  type="button"
                  className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 transition-all hover:text-white"
                >
                  Prev
                </button>
                <div className="flex gap-6">
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`text-[10px] font-bold tracking-widest ${p === 1 ? "text-primary" : "text-white/20 hover:text-white"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 transition-all hover:text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ShopCTA />
    </div>
  );
}
