"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={containerRef} className="section-padding bg-[#050505] overflow-hidden">
      <div className="container-page">
        <div className="text-center mb-20 md:mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="subtitle-luxury mb-6 block"
          >
            The Masterpiece
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="title-luxury text-5xl md:text-8xl text-white"
          >
            A Symphony of <br /> 
            <span className="text-white/20 italic">Senses</span>
          </motion.h2>
        </div>

        <div className="relative h-[600px] md:h-[800px] flex items-center justify-center">
          {/* Ambient Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-primary/5 rounded-full blur-[160px] opacity-50" />
          
          <motion.div 
            style={{ scale, rotate }}
            className="relative w-full max-w-[800px] aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
          >
            <video
              src="/assets/Video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Floating Accents */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-10 md:left-20 max-w-[150px] text-left hidden md:block"
          >
            <p className="text-[8px] uppercase tracking-[0.4em] text-primary font-bold mb-4">Discovery</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 leading-relaxed">
              Exploration of rare elements gathered from the edges of the world.
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-10 md:right-20 max-w-[150px] text-right hidden md:block"
          >
            <p className="text-[8px] uppercase tracking-[0.4em] text-primary font-bold mb-4">Craftsmanship</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 leading-relaxed">
              Poured by hand into artisanal liquid glass vessels.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
