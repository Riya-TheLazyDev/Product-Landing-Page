import { useState, useMemo } from "react";
import ProductCard from "../../../components/common/ProductCard";
import { products as initialProducts } from "../../../mock/product";
import InfoButton from "../../../components/common/InfoButton";
import { ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/shadcn/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { Filter } from "lucide-react";

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

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...initialProducts];

    // Apply Filter
    if (activeFilter !== "All needs") {
      list = list.filter((p) => p.category === activeFilter);
    }

    // Apply Sort
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
        // No sorting or default sorting
        break;
    }
    return list;
  }, [sortBy, activeFilter]);

  const getSortLabel = (value: string) => {
    switch (value) {
      case SORT_OPTIONS.PRICE_LOW:
        return "Price: Low to High";
      case SORT_OPTIONS.PRICE_HIGH:
        return "Price: High to Low";
      case SORT_OPTIONS.RATING:
        return "Rating";
      default:
        return "Featured";
    }
  };

  return (
    <section className="container-page pb-12 md:pb-24 bg-background">
      {/* FILTER BAR */}
      <div className="flex flex-col gap-8 mb-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-2 md:gap-3 flex-nowrap overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {InfoData.map((data) => (
              <InfoButton
                key={data.details}
                details={data.details}
                active={activeFilter === data.details}
                onClick={() => setActiveFilter(data.details)}
              />
            ))}

            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 border-foreground/20 hover:bg-foreground hover:text-white transition-all shrink-0"
            >
              <ArrowRight size={14} />
            </Button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:flex-none rounded-full px-6 py-1.5 h-auto text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] flex gap-2 border-foreground/20 hover:bg-foreground hover:text-white transition-all"
            >
              <Filter size={12} strokeWidth={3} />
              Filter
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 md:flex-none rounded-full px-6 py-1.5 h-auto text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] flex gap-2 border-foreground/20 transition-all outline-none focus:outline-none min-w-[140px] justify-between"
                >
                  <span className="truncate">Sort: {getSortLabel(sortBy)}</span>
                  <ChevronDown size={12} strokeWidth={3} className="shrink-0" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <DropdownMenuRadioItem
                    value={SORT_OPTIONS.DEFAULT}
                    className="text-[11px] font-bold uppercase tracking-wider"
                  >
                    Featured
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value={SORT_OPTIONS.PRICE_LOW}
                    className="text-[11px] font-bold uppercase tracking-wider"
                  >
                    Price: Low to High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value={SORT_OPTIONS.PRICE_HIGH}
                    className="text-[11px] font-bold uppercase tracking-wider"
                  >
                    Price: High to Low
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value={SORT_OPTIONS.RATING}
                    className="text-[11px] font-bold uppercase tracking-wider"
                  >
                    Rating
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="text-[10px] md:text-[11px] font-medium text-foreground/40 uppercase tracking-widest px-1 lg:px-0">
          Showing {filteredAndSortedProducts.length} Results
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border/40">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className="border-r border-b border-border/40"
            >
              <ProductCard {...product} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-r border-b border-border/40">
            <p className="text-foreground/40 uppercase tracking-widest text-xs">
              No products found for this filter.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-4 mt-16 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40">
        <button className="hover:text-foreground transition-colors">
          &lt;
        </button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center">
            1
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-foreground/5 transition-colors flex items-center justify-center">
            2
          </button>
          <span>...</span>
          <button className="w-8 h-8 rounded-full hover:bg-foreground/5 transition-colors flex items-center justify-center">
            18
          </button>
        </div>
        <button className="hover:text-foreground transition-colors">
          &gt;
        </button>
      </div>
    </section>
  );
}
