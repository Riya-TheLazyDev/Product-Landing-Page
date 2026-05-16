"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Flower2, Shield, Truck } from "lucide-react";

/** Served from public/assets — reliable in all browsers (no bundler image URL) */
const HERO_BG = "/assets/hero-brand.png";

const TRUST_ITEMS = [
  {
    icon: Flower2,
    title: "Premium Ingredients",
    copy: "Rare botanicals & resins",
  },
  {
    icon: Clock,
    title: "Long Lasting",
    copy: "Extrait concentration",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    copy: "Complimentary over $150",
  },
  {
    icon: Shield,
    title: "Authenticity",
    copy: "Maison guaranteed",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="cinematic-hero hero-fullbleed relative -mt-14 min-h-[100dvh] overflow-hidden pt-14 md:-mt-16 md:pt-16"
    >
      <div
        className="hero-environment hero-environment--brand"
        role="img"
        aria-label="Elevāra Luxe Noir fragrance — purple and gold atmospheric background"
      >
        <img
          src={HERO_BG}
          alt=""
          className="hero-environment__image hero-environment__image--brand"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-environment__scrim hero-environment__scrim--readable" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-8 md:min-h-[calc(100dvh-4rem)] lg:px-16">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="subtitle-luxury mb-6 block text-primary drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Essence of elegance
          </span>
          <h1 className="heading-display mb-6 text-white drop-shadow-[0_8px_48px_rgba(0,0,0,0.85)]">
            Crafted to Leave a{" "}
            <span className="text-accent-gold">Legacy</span>
          </h1>
          <p className="mb-10 max-w-lg text-sm leading-relaxed text-white/88 drop-shadow-[0_4px_32px_rgba(0,0,0,0.75)] md:text-base">
            Luxe Noir unfolds in liquid light — rare resins, moonlit florals, and
            a sillage that lingers long after the room falls silent.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <button
              type="button"
              onClick={() =>
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-liquid w-full sm:w-auto sm:px-10 sm:py-4 sm:text-[10px] sm:tracking-[0.32em]"
            >
              Explore collection
            </button>
            <Link
              href="/about"
              className="glass-clear glass-clear--pill inline-flex w-full items-center justify-center gap-2 px-8 py-3.5 text-[9px] font-bold uppercase tracking-[0.32em] text-white/90 transition duration-700 hover:text-white sm:w-auto sm:px-10 sm:py-4 sm:text-[10px] sm:tracking-[0.32em]"
            >
              Our story
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-8 lg:px-16"
      >
        <div className="trust-glass-bar grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TRUST_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.08, duration: 0.7 }}
              className="trust-glass-item flex items-start gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass-clear">
                <item.icon size={16} strokeWidth={1.25} className="text-primary" />
              </div>
              <div>
                <h3 className="mb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white">
                  {item.title}
                </h3>
                <p className="text-[10px] leading-relaxed text-white/50">{item.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
