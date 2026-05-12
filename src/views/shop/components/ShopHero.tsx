"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import heroImage from "@/assets/Product_page_hero.png";

export default function ShopHero() {
  return (
    <section 
      className="relative h-[60vh] md:h-[80vh] flex items-center overflow-hidden pt-14"
      style={{
        width: "calc(100% + var(--site-margin) * 2)",
        marginLeft: "calc(-1 * var(--site-margin))"
      }}
    >
      {/* Background - Full Image with Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Collection Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/20 to-[#020202]/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] z-10" />
        <div className="absolute inset-0 bg-black/10 z-10" />
      </div>

      <div className="container-page relative z-20 flex flex-col items-center md:items-start justify-center w-full">
        <div className="max-w-3xl text-center md:text-left">
          <nav className="flex items-center justify-center md:justify-start gap-4 mb-8">
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/30">Home</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/30">/</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white">Shop</span>
          </nav>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="title-luxury text-6xl md:text-[100px] text-white mb-8 drop-shadow-2xl"
          >
            Our <br />
            <span className="text-white/90">Collection</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-editorial text-xs md:text-sm uppercase tracking-[0.4em] max-w-lg mx-auto md:mx-0 drop-shadow-lg"
          >
            Discover our range of luxury fragrances, crafted with precision and passion for the modern individual.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
