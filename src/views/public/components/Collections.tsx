"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const COLLECTIONS = [
  {
    title: "Ocean Collection",
    tagline: "The freshness of the deep",
    image: "/assets/product.jpeg", // Placeholder
    align: "left",
  },
  {
    title: "Night Collection",
    tagline: "Mysteries of the dark",
    image: "/assets/product.jpeg", // Placeholder
    align: "right",
  },
  {
    title: "Oud Collection",
    tagline: "Ancient sacred wood",
    image: "/assets/product.jpeg", // Placeholder
    align: "left",
  },
];

export default function Collections() {
  return (
    <section className="section-padding bg-[#010101]">
      <div className="container-page">
        <div className="text-center mb-24">
          <span className="subtitle-luxury mb-6 block">Our Worlds</span>
          <h2 className="title-luxury text-5xl md:text-8xl text-white">
            Curated <br /> 
            <span className="text-primary/25 italic">Collections</span>
          </h2>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {COLLECTIONS.map((collection, idx) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                collection.align === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden border border-white/[0.07] md:aspect-[16/9]">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-[2s] hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/55" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <span className="text-[9px] uppercase tracking-[0.5em] text-primary font-bold mb-6 block">
                  Volume 0{idx + 1}
                </span>
                <h3 className="text-4xl md:text-6xl font-serif font-light text-white mb-6">
                  {collection.title}
                </h3>
                <p className="mb-10 text-sm font-light uppercase leading-relaxed tracking-widest text-white/60 md:text-base">
                  {collection.tagline}
                </p>
                <button className="text-[10px] uppercase tracking-[0.4em] font-bold text-white hover:text-primary transition-colors py-2 border-b border-white/10 hover:border-primary/40">
                  Explore Collection
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
