"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#010102]"
    >
      {/* Deep cinematic field — black-dominant, minimal haze */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(214,195,165,0.045),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-[#010101] to-[#000000]" />
        <div className="absolute bottom-0 left-1/2 h-[45vh] w-[min(140vw,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(214,195,165,0.04),transparent_70%)] opacity-80" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl space-y-10"
          >
            <div className="space-y-7">
              <span className="subtitle-luxury block tracking-[0.55em]">
                Elevāra · Maison de Parfum
              </span>
              <h1 className="font-serif text-[clamp(2.75rem,8vw,5.5rem)] font-light uppercase tracking-[-0.04em] text-white leading-[0.92]">
                ELEVARA
              </h1>
              <p className="max-w-md font-serif text-lg text-primary/90 tracking-[0.02em] md:text-xl">
                Noir luminosity. Silence, then sillage.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-white/70 md:text-[0.95rem]">
                A single composition — carved from obsidian glass, rare resins,
                and moonlit florals. For those who wear the night.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 1.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full bg-white px-10 py-4 text-[10px] uppercase tracking-[0.32em] text-black shadow-[0_20px_70px_-30px_rgba(255,255,255,0.22)] transition duration-700 hover:bg-white/95"
              >
                Discover collection
              </button>
              <Link
                href="/shop"
                className="rounded-full border border-white/[0.12] bg-black/40 px-10 py-4 text-[10px] uppercase tracking-[0.32em] text-white/90 backdrop-blur-sm transition duration-700 hover:border-primary/35 hover:text-primary"
              >
                Shop signature
              </Link>
            </motion.div>
          </motion.div>

          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[min(100%,380px)] sm:max-w-[420px]"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
                className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-[rgba(2,2,4,0.72)] p-[1px] shadow-[0_60px_120px_-50px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md"
              >
                <div className="rounded-[2.45rem] bg-gradient-to-b from-white/[0.04] to-transparent p-1">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-[#030305]">
                    <Image
                      src="/assets/product.jpeg"
                      alt="Elevāra signature fragrance"
                      fill
                      priority
                      className="object-contain object-center scale-[1.02] p-8"
                      sizes="(max-width: 1024px) 90vw, 420px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
