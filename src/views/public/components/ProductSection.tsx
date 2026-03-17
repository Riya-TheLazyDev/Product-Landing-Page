import { useState, useMemo, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, activeFilter]);

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

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  const getPaginationItems = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <section className="container-page pb-12 md:pb-24 bg-background">
      {/* FILTER BAR */}
      <div className="flex flex-col gap-8 mb-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="relative flex-1 min-w-0 w-full">
            <div
              id="category-scroll"
              className="flex items-center gap-2 md:gap-3 flex-nowrap overflow-x-auto no-scrollbar pb-2 lg:pb-0 pr-12 w-full"
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

            <div className="absolute right-0 top-0 bottom-2 lg:bottom-0 flex items-center bg-gradient-to-l from-background via-background/90 to-transparent pl-8 pointer-events-none">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-8 h-8 border-foreground/20 hover:bg-foreground hover:text-white transition-all shrink-0 bg-background pointer-events-auto shadow-sm"
                onClick={() => {
                  const scrollContainer =
                    document.getElementById("category-scroll");
                  if (scrollContainer) {
                    scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
                  }
                }}
              >
                <ArrowRight size={14} />
              </Button>
            </div>
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
          Showing{" "}
          {filteredAndSortedProducts.length > 0
            ? (currentPage - 1) * itemsPerPage + 1
            : 0}
          -
          {Math.min(
            currentPage * itemsPerPage,
            filteredAndSortedProducts.length,
          )}{" "}
          of {filteredAndSortedProducts.length} Results
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border/40">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
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
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40">
          <button
            className="hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <div className="flex items-center gap-2">
            {getPaginationItems().map((item, index) => {
              if (item === "...") {
                return <span key={`ellipsis-${index}`}>...</span>;
              }
              return (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item as number)}
                  className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center ${
                    currentPage === item
                      ? "bg-foreground text-background"
                      : "hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <button
            className="hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </section>
  );
}
