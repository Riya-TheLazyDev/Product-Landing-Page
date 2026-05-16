"use client";

import { motion } from "framer-motion";
import { Headphones, RefreshCw, Shield, Truck } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Secure payments",
    copy: "Encrypted checkout with trusted partners.",
  },
  {
    icon: Truck,
    title: "Complimentary shipping",
    copy: "On orders over $150 — signature packaging.",
  },
  {
    icon: RefreshCw,
    title: "Easy returns",
    copy: "30-day maison return window, effortless.",
  },
  {
    icon: Headphones,
    title: "Concierge support",
    copy: "Dedicated specialists for your fragrance journey.",
  },
];

export default function CartTrustStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="trust-glass-bar mt-20 md:mt-28 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-4"
    >
      {items.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: idx * 0.06,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="trust-glass-item group"
        >
          <div className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 pointer-events-none bg-gradient-to-br from-primary/[0.06] to-transparent" />
          <div className="relative flex flex-col gap-4">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-transform duration-700 group-hover:scale-[1.04]">
              <item.icon size={20} strokeWidth={1.25} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-white tracking-wide mb-2">
                {item.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-white/45 font-light tracking-wide">
                {item.copy}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
