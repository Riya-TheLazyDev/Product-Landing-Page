import ProductCard from "../../../components/common/ProductCard";
import { products } from "../../../mock/product";
import InfoButton from "../../../components/common/InfoButton";
import { ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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

export default function ProductSection() {
  return (
    <section className="container-page pb-12 md:pb-24 bg-background">
      {/* FILTER BAR */}
      <div className="flex flex-col gap-8 mb-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-2 md:gap-3 flex-nowrap ">
            {InfoData.map((data, index) => (
              <InfoButton
                key={data.details}
                details={data.details}
                active={index === 0}
              />
            ))}

            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 border-foreground/20 hover:bg-foreground hover:text-white transition-all"
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
                  className="flex-1 md:flex-none rounded-full px-6 py-1.5 h-auto text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] flex gap-2 border-foreground/20 transition-all outline-none focus:outline-none"
                >
                  Sort by
                  <ChevronDown size={12} strokeWidth={3} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Rating</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="text-[10px] md:text-[11px] font-medium text-foreground/40 uppercase tracking-widest px-1 lg:px-0">
          Showing 16 of 180
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border/40">
        {products.map((product) => (
          <div key={product.id} className="border-r border-b border-border/40">
            <ProductCard {...product} />
          </div>
        ))}
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
