"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart, MapPin, Menu, Package, Settings, ShoppingBag, UserRound, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { selectCartQuantity, useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { useWishlistStore } from "@/store/wishlistStore";
import { useMedia } from "@/hooks/useMedia";
import { resolveMediaUrl } from "@/services/mediaService";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const { bySection } = useMedia();
  const logoUrl = resolveMediaUrl(bySection.website_logo?.media_url);
  const faviconUrl = resolveMediaUrl(bySection.website_favicon?.media_url);

  const cartCount = useCartStore((s) => selectCartQuantity(s.items));
  const wishlistCount = useWishlistStore((s) => s.wishlistCount);
  const profile = useAuthStore((s) => s.profile);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!faviconUrl) return;

    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  }, [faviconUrl]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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
  const accountLinks = [
    { label: "My Orders", href: "/orders", icon: Package },
    { label: `Wishlist (${mounted ? wishlistCount : 0})`, href: "/wishlist", icon: Heart },
    { label: "Saved Addresses", href: "/account/addresses", icon: MapPin },
    { label: "Account Settings", href: "/account/settings", icon: Settings },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-clear fixed top-0 left-0 right-0 z-[100] border-b border-white/[0.1]"
      >
        <div className="container-page flex items-center justify-between h-12 md:h-14 relative">
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer group"
          >
            {logoUrl ? (
              <img src={logoUrl} alt="Elevara" className="max-h-8 max-w-[140px] object-contain" />
            ) : (
              <h1 className="text-xs font-serif font-light tracking-[0.3em] uppercase text-white transition-all duration-1000 group-hover:tracking-[0.4em] sm:text-sm md:text-base md:group-hover:tracking-[0.5em]">
                ELEVARA
              </h1>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-pill ${activeSection === link.id ? "nav-pill--active" : ""}`}
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
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5 text-[8px] font-bold uppercase tracking-[0.45em] text-white/30 md:gap-7">


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

            <div className="relative hidden sm:block">
              {profile ? (
                <button
                  type="button"
                  onClick={() => setIsAccountOpen((v) => !v)}
                  className="group flex items-center gap-2 text-white/34 transition-all hover:text-primary"
                  aria-expanded={isAccountOpen}
                >
                  <UserRound
                    size={13}
                    strokeWidth={1}
                    className="transition-transform duration-700 group-hover:-translate-y-0.5"
                  />
                  <span className="hidden xl:inline max-w-[92px] truncate">
                    {profile.role === "admin" ? "Admin" : profile.name.split(" ")[0]}
                  </span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="group flex items-center gap-2 text-white/34 transition-all hover:text-primary"
                >
                  <UserRound
                    size={13}
                    strokeWidth={1}
                    className="transition-transform duration-700 group-hover:-translate-y-0.5"
                  />
                  <span className="hidden xl:inline">Login</span>
                </Link>
              )}

              <AnimatePresence>
                {profile && isAccountOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-liquid absolute right-0 top-8 w-72 overflow-hidden rounded-2xl p-3 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.95)]"
                  >
                    <div className="border-b border-white/[0.07] px-4 py-4">
                      <p className="font-serif text-lg normal-case tracking-normal text-white">
                        {profile.name}
                      </p>
                      <p className="mt-1 truncate text-[9px] uppercase tracking-[0.22em] text-white/36">
                        {profile.email}
                      </p>
                    </div>
                    <div className="py-2">
                      {profile.role === "admin" ? (
                        <Link
                          href="/admin/dashboard"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-[9px] uppercase tracking-[0.26em] text-white/54 transition hover:bg-white/[0.04] hover:text-primary"
                        >
                          <Settings size={13} strokeWidth={1.25} />
                          Admin Dashboard
                        </Link>
                      ) : (
                        accountLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsAccountOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-[9px] uppercase tracking-[0.26em] text-white/54 transition hover:bg-white/[0.04] hover:text-primary"
                          >
                            <item.icon size={13} strokeWidth={1.25} />
                            {item.label}
                          </Link>
                        ))
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsAccountOpen(false);
                      }}
                      className="w-full rounded-xl border border-white/[0.07] px-4 py-3 text-left text-[9px] uppercase tracking-[0.26em] text-white/44 transition hover:border-primary/30 hover:text-primary"
                    >
                      Logout
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

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
            className="glass-liquid fixed inset-0 z-[90] lg:hidden flex flex-col items-center justify-center pt-20"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[rgba(140,72,210,0.22)] blur-[100px]" />
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
                transition={{ delay: 0.4 }}
              >
                {profile ? (
                  <Link
                    href={profile.role === "admin" ? "/admin/dashboard" : "/account/settings"}
                    className="gradient-text inline-flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {profile.role === "admin" ? "Admin" : "Account"}
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="gradient-text inline-flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-white/10 w-48 text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (profile) logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary"
                >
                  {profile ? "Logout" : "Private Account"}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
