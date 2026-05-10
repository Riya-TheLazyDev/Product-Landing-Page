"use client";

import { ChevronDown, Menu, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0, 0.2, 1] }}
      className="glass-premium fixed top-0 left-0 right-0 z-[100] border-b border-white/5"
    >
      <div className="container-page flex items-center justify-between h-20 relative">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="flex flex-col">
            <h1 className="text-xl font-serif font-light tracking-[0.2em] uppercase gradient-text transition-all duration-500 group-hover:tracking-[0.3em]">
              ELEVARA
            </h1>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50 absolute left-1/2 -translate-x-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 hover:text-foreground transition-all outline-none">
              Explore <ChevronDown size={12} strokeWidth={2} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card border-white/10 min-w-[160px]">
              <DropdownMenuItem className="text-[10px] uppercase tracking-widest cursor-pointer">
                Fragrances
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[10px] uppercase tracking-widest cursor-pointer">
                Skin Rituals
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[10px] uppercase tracking-widest cursor-pointer">
                Bespoke
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#"
            className="hover:text-foreground transition-all relative group"
          >
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
          </a>
          <a
            href="#"
            className="hover:text-foreground transition-all relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50">
          <button className="hover:text-foreground transition-all">
            Login
          </button>
          <div className="flex items-center gap-3 cursor-pointer hover:text-foreground transition-all group">
            <ShoppingBag size={14} strokeWidth={2} />
            <span className="opacity-50 group-hover:opacity-100 transition-opacity">
              Cart (0)
            </span>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <button className="lg:hidden text-foreground/70 hover:text-foreground transition-all">
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>
    </motion.header>
  );
}
