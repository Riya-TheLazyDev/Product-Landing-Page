"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0, 0.2, 1] as any },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </motion.div>

      <div className="container-page relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          <motion.span 
            variants={itemVariants}
            className="text-[10px] uppercase tracking-[0.4em] text-primary font-medium mb-6 block"
          >
            The Essence of Radiance
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[100px] leading-[0.9] mb-8 gradient-text"
          >
            Elevara <br />
            <span className="font-cursive italic opacity-80">Skincare</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-foreground/60 text-lg max-w-lg mb-10 leading-relaxed"
          >
            A cinematic experience for your skin. Infused with liquid glass technology 
            and premium botanical extracts for a timeless glow.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-6"
          >
            <button className="btn-luxury group">
              <span className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                Shop Collection
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </button>
            <button className="px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold border border-white/5 hover:border-white/20 transition-all">
              Discover Story
            </button>
          </motion.div>
        </motion.div>

        {/* Right Content - Floating Video */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-square max-w-[500px] mx-auto lg:mx-0 w-full"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-full h-full rounded-3xl overflow-hidden glass-card"
          >
            <video
              src="/assets/Video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter drop-shadow-[0_20px_50px_rgba(214,195,165,0.2)]"
            />
          </motion.div>
          
          {/* Decorative Layers */}
          <div className="absolute -inset-4 border border-white/5 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-8 border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
