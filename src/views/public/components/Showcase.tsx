"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  return (
    <section
      ref={containerRef}
      className="section-padding overflow-hidden bg-[#010101]"
    >
      <div className="container-page">
        <div className="mb-16 text-center md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="subtitle-luxury mb-5 block"
          >
            The masterpiece
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="title-luxury text-5xl text-white md:text-7xl lg:text-8xl"
          >
            A symphony of <br />
            <span className="text-primary/25 italic">senses</span>
          </motion.h2>
        </div>

        <div className="relative flex h-[min(72vh,720px)] items-center justify-center md:h-[min(78vh,820px)]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,920px)] w-[min(90vw,920px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.035] blur-[100px]" />

          <motion.div
            style={{ scale, rotate }}
            className="relative w-full max-w-[820px] overflow-hidden rounded-[1.75rem] border border-white/[0.07] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.95)]"
          >
            <video
              src="/assets/Video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
