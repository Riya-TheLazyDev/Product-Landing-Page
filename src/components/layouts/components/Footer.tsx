"use client";

import { Instagram, Twitter, Facebook } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.2, 0, 0.2, 1] as any } 
    }
  };

  return (
    <footer className="relative pt-24 pb-12 border-t border-white/5">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-serif mb-4 tracking-[0.2em] gradient-text">ELEVARA</h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-8">Facial & skincare</p>
          
          <div className="flex gap-6 text-foreground/40">
            <Instagram size={18} className="hover:text-primary transition-all cursor-pointer" />
            <Twitter size={18} className="hover:text-primary transition-all cursor-pointer" />
            <Facebook size={18} className="hover:text-primary transition-all cursor-pointer" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center md:text-left">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-primary/60">Collection</h4>
          <ul className="space-y-4 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
            <li className="hover:text-foreground transition-all cursor-pointer">Fragrances</li>
            <li className="hover:text-foreground transition-all cursor-pointer">Rituals</li>
            <li className="hover:text-foreground transition-all cursor-pointer">Bespoke</li>
            <li className="hover:text-foreground transition-all cursor-pointer">Gifts</li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center md:text-left">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-primary/60">Assistance</h4>
          <ul className="space-y-4 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
            <li className="hover:text-foreground transition-all cursor-pointer">Contact</li>
            <li className="hover:text-foreground transition-all cursor-pointer">Shipping</li>
            <li className="hover:text-foreground transition-all cursor-pointer">Policies</li>
            <li className="hover:text-foreground transition-all cursor-pointer">FAQ</li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center md:text-left">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-primary/60">Philosophy</h4>
          <p className="text-[10px] uppercase tracking-widest text-foreground/30 leading-loose font-bold">
            Crafting cinematic experiences through the art of scent and liquid glass technology.
          </p>
        </motion.div>
      </motion.div>

      <div className="container-page pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[9px] uppercase tracking-[0.3em] text-foreground/30 font-bold">
        <p>© 2024 ELEVARA BEAUTY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-10">
          <span className="hover:text-foreground cursor-pointer transition-all">Privacy</span>
          <span className="hover:text-foreground cursor-pointer transition-all">Terms</span>
          <span className="hover:text-foreground cursor-pointer transition-all">Cookies</span>
        </div>
      </div>
    </footer>
  );
}
