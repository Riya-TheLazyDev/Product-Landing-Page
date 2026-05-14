"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { selectCartQuantity, useCartStore } from "@/stores/cart-store";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);

  const cartCount = useCartStore((s) => selectCartQuantity(s.items));

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const displayCount = mounted ? cartCount : 0;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-premium fixed top-0 left-0 right-0 z-[100] border-b border-white/[0.02]"
      >
        <div className="container-page flex items-center justify-between h-12 md:h-14 relative">
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <h1 className="text-sm md:text-base font-serif font-light tracking-[0.4em] uppercase text-white transition-all duration-1000 group-hover:tracking-[0.5em]">
              ELEVARA
            </h1>
          </Link>

          <nav className="hidden lg:flex gap-16 text-[8px] font-bold uppercase tracking-[0.5em] text-white/30 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-all duration-1000 relative group ${activeSection === link.id ? "text-primary" : "hover:text-white"}`}
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault();
                    document
                      .getElementById(link.href.split("#")[1])
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-primary transition-all duration-1000 ${activeSection === link.id ? "w-3" : "w-0 group-hover:w-3"}`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6 md:gap-8 text-[8px] font-bold uppercase tracking-[0.5em] text-white/30">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-white/30 transition-all hover:text-primary group"
            >
              <ShoppingBag
                size={12}
                strokeWidth={1}
                className="transition-transform duration-700 group-hover:-translate-y-0.5"
              />
              <span className="hidden sm:inline tabular-nums opacity-40 transition-opacity group-hover:opacity-100">
                ({displayCount})
              </span>
              {displayCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[7px] font-bold text-[#0a0a0c] sm:hidden">
                  {displayCount > 99 ? "99+" : displayCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="lg:hidden text-white/40 hover:text-white transition-all z-[110]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X size={16} strokeWidth={1} />
              ) : (
                <Menu size={16} strokeWidth={1} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

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
                transition={{ delay: 0.35 }}
              >
                <Link
                  href="/cart"
                  className="gradient-text inline-flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart
                  <span className="rounded-full border border-primary/40 px-2 py-0.5 text-[10px] font-sans tracking-normal text-primary">
                    {displayCount}
                  </span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-8 pt-8 border-t border-white/10 w-48 text-center"
              >
                <button
                  type="button"
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary"
                >
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
