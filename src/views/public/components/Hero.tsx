"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const floatingVariants = {
    animate: {
      y: [0, -16, 0],
      x: [-4, 4, -4],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const outlineVariants = {
    animate: {
      y: [0, -12, 0],
      x: [-3, 3, -3],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#050307]"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/product.jpeg"
          alt="Dark luxury perfume background"
          fill
          className="object-cover object-center opacity-60 blur-sm grayscale contrast-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-[#020202]/95" />
        <div className="pointer-events-none absolute left-1/3 top-20 h-96 w-96 rounded-full bg-[#8b7355]/8 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <span className="inline-block text-[10px] uppercase tracking-[0.55em] text-white/40 font-semibold">
                L'Essence de l'Éthéré
              </span>
              <h1 className="text-5xl font-serif uppercase tracking-[-0.04em] text-white sm:text-6xl lg:text-[5.5rem] leading-[0.9] drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                ELEVARA
              </h1>
              <p className="max-w-xl text-sm leading-8 text-white/70 md:text-base">
                A cinematic fragrance narrative woven in midnight mist, luminous
                spice, and glass-clear elegance. Refined, layered, and crafted
                for the modern luxury ritual.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full bg-white px-10 py-4 text-[10px] uppercase tracking-[0.35em] text-black shadow-[0_18px_60px_rgba(255,255,255,0.12)] transition duration-500 hover:bg-white/90"
              >
                Discover Collection
              </button>
              <button className="rounded-full border border-white/15 bg-white/5 px-10 py-4 text-[10px] uppercase tracking-[0.35em] text-white transition duration-500 hover:border-white/30 hover:bg-white/10">
                Shop Signature
              </button>
            </motion.div>
          </motion.div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <motion.div
              variants={outlineVariants}
              animate="animate"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="absolute inset-0 rounded-[3rem] border border-white/10 lg:inset-auto lg:h-[620px] lg:w-[420px]"
              style={{
                boxShadow:
                  "inset 0 0 40px rgba(255,255,255,0.05), 0 0 60px rgba(0,0,0,0.3)",
              }}
            />

            <motion.div
              variants={floatingVariants}
              animate="animate"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 rounded-[2.75rem] border border-white/10 bg-white/8 p-5 shadow-[0_50px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:h-[600px] lg:w-[400px]"
            >
              <div className="absolute inset-0 rounded-[2.75rem] bg-gradient-to-br from-white/5 via-transparent to-black/20" />
              <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-[#08080a]">
                <Image
                  src="/assets/product.jpeg"
                  alt="Premium perfume bottle"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
              </div>
            </motion.div>

            <div className="pointer-events-none absolute -right-32 top-0 h-56 w-56 rounded-full bg-white/5 blur-3xl opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}
