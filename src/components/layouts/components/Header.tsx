import { ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="bg-background">
      <div className="container-page flex items-center justify-between py-6 md:py-4 relative">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-serif font-medium tracking-tight leading-none uppercase">
            VELVETY
          </h1>
          <span className="text-[8px] md:text-[10px] font-cursive opacity-70 mt-1 md:mt-1.5 ml-0.5 whitespace-nowrap">
            Facial & skincare
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-14 text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/70 absolute left-1/2 -translate-x-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 hover:text-foreground transition-colors outline-none focus:outline-none">
              Pages <ChevronDown size={12} strokeWidth={3} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Skincare</DropdownMenuItem>
              <DropdownMenuItem>Facial</DropdownMenuItem>
              <DropdownMenuItem>Soap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="#" className="hover:text-foreground transition-colors">
            Shop
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            About
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/70">
          <button className="hover:text-foreground transition-colors">
            Login
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors group">
            <span>Cart</span>
            <span className="opacity-60 group-hover:opacity-100">(0)</span>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <button className="lg:hidden text-foreground">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
