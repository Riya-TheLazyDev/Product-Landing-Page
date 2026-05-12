"use client";

import ShopHero from "../../views/shop/components/ShopHero";
import ShopSidebar from "../../views/shop/components/ShopSidebar";
import ShopGrid from "../../views/shop/components/ShopGrid";
import ShopCTA from "../../views/shop/components/ShopCTA";
import { useState } from "react";

export default function ShopPage() {
  const [activeFilters, setActiveFilters] = useState({
    category: "All",
    collection: "All",
    priceRange: [120, 500],
    type: "All",
    intensity: "All",
  });

  return (
    <div className="min-h-screen bg-[#020202]">
      <ShopHero />
      
      <main className="container-page py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 sticky top-24">
            <ShopSidebar 
              filters={activeFilters} 
              setFilters={setActiveFilters} 
            />
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/[0.03]">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                Showing 1-12 of 48 products
              </p>
              <div className="flex items-center gap-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Sort By:</span>
                <select className="bg-transparent text-[10px] uppercase tracking-[0.3em] font-bold text-white focus:outline-none cursor-pointer">
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>
            </div>

            <ShopGrid filters={activeFilters} />
            
            {/* Pagination */}
            <div className="flex items-center justify-center gap-12 mt-24">
              <button className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 hover:text-white transition-all">Prev</button>
              <div className="flex gap-6">
                {[1, 2, 3].map(p => (
                  <button key={p} className={`text-[10px] font-bold tracking-widest ${p === 1 ? 'text-primary' : 'text-white/20 hover:text-white'}`}>{p}</button>
                ))}
              </div>
              <button className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 hover:text-white transition-all">Next</button>
            </div>
          </div>
        </div>
      </main>

      <ShopCTA />
    </div>
  );
}
