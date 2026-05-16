"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const COLLECTIONS = [
  {
    title: "Luxe Noir",
    tagline: "Extrait de Parfum",
    price: "$285",
    image: "/assets/hero-brand.png",
  },
  {
    title: "Velvet Oud",
    tagline: "Eau de Parfum",
    price: "$240",
    image: "/assets/product.jpeg",
  },
  {
    title: "Midnight Bloom",
    tagline: "Parfum Intense",
    price: "$265",
    image: "/assets/product.jpeg",
  },
  {
    title: "Amber Veil",
    tagline: "Extrait de Parfum",
    price: "$295",
    image: "/assets/product.jpeg",
  },
];

export default function Collections() {
  return (
    <section
      id="collections"
      className="cinematic-section cinematic-section--a section-padding relative overflow-hidden"
    >
      <div className="container-page relative z-10">
        <div className="mb-12 text-center sm:mb-16">
          <span className="subtitle-luxury mb-6 block">Our Worlds</span>
          <h2 className="heading-section">
            Curated <span className="text-accent-gold">Collections</span>
          </h2>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:gap-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {COLLECTIONS.map((collection, idx) => (
              <motion.article
                key={collection.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: idx * 0.08 }}
                className="glass-clear glass-clear--card group relative w-[min(82vw,280px)] shrink-0 snap-center overflow-hidden sm:w-[300px] md:w-[320px]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.38em] text-white/45">
                    {collection.tagline}
                  </p>
                  <h3 className="mb-3 font-serif text-xl text-white">
                    {collection.title}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    {collection.price}
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="absolute inset-0 z-10"
                  aria-label={`Shop ${collection.title}`}
                />
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-clear glass-clear--card relative min-h-[320px] overflow-hidden p-10 md:min-h-[380px]"
          >
            <div className="absolute inset-0">
              <Image
                src="/assets/hero-brand.png"
                alt=""
                fill
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 max-w-sm">
              <span className="subtitle-luxury mb-4 block">Our Story</span>
              <h3 className="mb-4 font-serif text-3xl text-white md:text-4xl">
                Liquid light & legacy
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-white/62">
                Born from contrast — shadow and gold — each composition is
                architected to hold memory in silence.
              </p>
              <Link
                href="/about"
                className="btn-liquid inline-block px-8 py-3.5 text-[9px]"
              >
                Discover the maison
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-clear glass-clear--card relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden p-8 md:min-h-[380px]"
          >
            <div className="absolute inset-0">
              <Image
                src="/assets/product.jpeg"
                alt="Luxe Noir bestseller"
                fill
                className="object-contain p-12 opacity-90"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(140,72,210,0.25),transparent_65%)]" />
            </div>
            <div className="relative z-10 text-center">
              <span className="subtitle-luxury mb-4 block">Bestseller</span>
              <h3 className="mb-6 font-serif text-3xl text-white">Luxe Noir</h3>
              <Link href="/shop" className="btn-liquid inline-block px-10 py-4 text-[9px]">
                Shop now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
