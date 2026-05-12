"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "shop", "about", "journal", "subscribe"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", id: "hero" },
    { name: "Collections", href: "/#collections", id: "collections" },
    { name: "Shop", href: "/shop", id: "shop" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Blog", href: "/#journal", id: "journal" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-premium fixed top-0 left-0 right-0 z-[100] border-b border-white/[0.02]"
      >
        <div className="container-page flex items-center justify-between h-12 md:h-14 relative">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <h1 className="text-sm md:text-base font-serif font-light tracking-[0.4em] uppercase text-white transition-all duration-1000 group-hover:tracking-[0.5em]">
              ELEVARA
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-16 text-[8px] font-bold uppercase tracking-[0.5em] text-white/30 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-all duration-1000 relative group ${activeSection === link.id ? "text-primary" : "hover:text-white"}`}
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault();
                    document.getElementById(link.href.split("#")[1])?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-primary transition-all duration-1000 ${activeSection === link.id ? "w-3" : "w-0 group-hover:w-3"}`} />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-8 md:gap-10 text-[8px] font-bold uppercase tracking-[0.5em] text-white/30">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-all group">
              <ShoppingBag size={12} strokeWidth={1} />
              <span className="hidden sm:inline opacity-30 group-hover:opacity-100 transition-opacity">
                (0)
              </span>
            </div>

            {/* Mobile Menu Icon */}
            <button 
              className="lg:hidden text-white/40 hover:text-white transition-all z-[110]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={16} strokeWidth={1} /> : <Menu size={16} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-[#050505]/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center pt-20"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px]" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            </div>

            <nav className="flex flex-col items-center gap-8 text-xl font-serif tracking-[0.2em] uppercase">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                  href={link.href}
                  className="gradient-text"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-8 border-t border-white/10 w-48 text-center"
              >
                <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  Login / Account
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
