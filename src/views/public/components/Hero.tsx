"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const yContent = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          src="/assets/Video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80"
        />
        {/* Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#020202] z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      {/* Centered Editorial Content */}
      <motion.div
        style={{ y: yContent, opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex flex-col items-center text-center mt-20"
      >
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-white/50 font-bold mb-6">
          L'Essence de l'Éthéré
        </span>
        
        <h1 className="title-luxury text-7xl md:text-[120px] text-white leading-none mb-6 drop-shadow-2xl">
          ELEVARA
        </h1>
        
        <p className="text-editorial text-xs md:text-sm uppercase tracking-[0.4em] text-white/70 max-w-md mx-auto mb-12">
          A cinematic fragrance experience <br className="hidden md:block" /> 
          for the modern visionary.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <button 
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="px-12 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-primary hover:text-white transition-all duration-700"
          >
            Discover Collection
          </button>
        </div>
      </motion.div>

      {/* Subtle Scroll Hint */}
      <motion.div 
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 hidden md:flex"
      >
        <span className="text-[7px] uppercase tracking-[0.5em] text-white/30">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
