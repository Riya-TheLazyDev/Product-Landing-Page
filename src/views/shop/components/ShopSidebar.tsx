"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const FILTER_SECTIONS = [
  {
    title: "Categories",
    options: ["All Fragrances (24)", "Men (12)", "Women (8)", "Unisex (4)"],
  },
  {
    title: "Collections",
    options: ["Ocean Collection", "Desert Collection", "Noir Collection", "Oud Collection"],
  },
  {
    title: "Fragrance Type",
    options: ["Woody", "Fresh", "Oriental", "Citrus", "Spicy"],
  },
  {
    title: "Intensity",
    options: ["Light", "Medium", "Strong"],
  },
];

export default function ShopSidebar({ filters, setFilters }: any) {
  return (
    <div className="flex flex-col gap-10">
      {/* Search/Filter Header */}
      <div className="glass-card p-4 border-white/5 flex items-center justify-between group cursor-pointer">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white group-hover:text-primary transition-colors">Filters</span>
        <div className="flex gap-1">
          <div className="w-3 h-[1px] bg-white/20" />
          <div className="w-1 h-[1px] bg-white/20" />
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {FILTER_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 flex items-center justify-between group cursor-pointer">
              {section.title}
              <ChevronDown size={10} className="text-white/10 group-hover:text-primary transition-colors" />
            </h3>
            
            <div className="flex flex-col gap-4">
              {section.options.map((option) => (
                <label key={option} className="flex items-center gap-4 group cursor-pointer">
                  <div className="relative w-4 h-4 border border-white/10 group-hover:border-primary/40 transition-colors">
                    <div className="absolute inset-1 bg-primary opacity-0 scale-50 group-hover:opacity-10 group-hover:scale-100 transition-all" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Price Range - Custom UI */}
        <div className="flex flex-col gap-8">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Price Range</h3>
          <div className="relative h-[2px] bg-white/5 w-full">
            <div className="absolute left-1/4 right-1/4 h-full bg-primary/40" />
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-black" />
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-black" />
          </div>
          <div className="flex justify-between text-[8px] uppercase tracking-widest text-white/20 font-bold">
            <span>$120</span>
            <span>$500+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
