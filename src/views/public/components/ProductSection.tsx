"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../../components/common/ProductCard";
import { products as initialProducts } from "../../../mock/product";
import InfoButton from "../../../components/common/InfoButton";
import { ArrowRight, Filter, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/shadcn/ui/dropdown-menu";
import { Button } from "@/components/shadcn/ui/button";

const InfoData = [
  { details: "All needs" },
  { details: "Protect" },
  { details: "Regenerates" },
  { details: "Revitalizes" },
  { details: "Feeds" },
  { details: "Regulates" },
  { details: "Purifies" },
];

const SORT_OPTIONS = {
  DEFAULT: "default",
  PRICE_LOW: "price-low",
  PRICE_HIGH: "price-high",
  RATING: "rating",
} as const;

export default function ProductSection() {
  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS.DEFAULT);
  const [activeFilter, setActiveFilter] = useState<string>("All needs");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Reduced for better performance

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, activeFilter]);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...initialProducts];
    if (activeFilter !== "All needs") {
      list = list.filter((p) => p.category === activeFilter);
    }
    switch (sortBy) {
      case SORT_OPTIONS.PRICE_LOW:
        list.sort((a, b) => a.price - b.price);
        break;
      case SORT_OPTIONS.PRICE_HIGH:
        list.sort((a, b) => b.price - a.price);
        break;
      case SORT_OPTIONS.RATING:
        list.sort((a, b) => b.ratings - a.ratings);
        break;
      default:
        break;
    }
    return list;
  }, [sortBy, activeFilter]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  return (
    <section className="py-24 relative">
      <div className="container-page relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-10 mb-16"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="relative flex-1 min-w-0 w-full overflow-hidden">
              <div
                id="category-scroll"
                className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pr-12"
              >
                {InfoData.map((data) => (
                  <InfoButton
                    key={data.details}
                    details={data.details}
                    active={activeFilter === data.details}
                    onClick={() => setActiveFilter(data.details)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button className="glass-card rounded-full px-6 py-2 h-auto text-[10px] font-bold uppercase tracking-[0.2em] flex gap-2">
                <Filter size={12} strokeWidth={3} />
                Filter
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="glass-card rounded-full px-6 py-2 h-auto text-[10px] font-bold uppercase tracking-[0.2em] flex gap-2 min-w-[160px] justify-between">
                    <span>Sort: {sortBy}</span>
                    <ChevronDown size={12} strokeWidth={3} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card border-white/10">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                      <DropdownMenuRadioItem key={key} value={value} className="text-[10px] uppercase tracking-wider">
                        {key.replace("_", " ")}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {currentProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-20">
            <button
              className="text-[10px] uppercase tracking-widest font-bold opacity-50 hover:opacity-100 disabled:opacity-20 transition-all"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-[10px] uppercase tracking-widest font-bold">
              {currentPage} / {totalPages}
            </span>
            <button
              className="text-[10px] uppercase tracking-widest font-bold opacity-50 hover:opacity-100 disabled:opacity-20 transition-all"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
