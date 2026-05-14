"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/mock/product";
import ProductCard from "@/components/common/ProductCard";

export default function ProductSection() {
  // Show only 2 featured bestsellers for homepage
  const featuredProducts = products.slice(0, 2);

  return (
    <section id="shop" className="section-padding bg-[#010101]">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="subtitle-luxury mb-6 block">The Bestsellers</span>
          <h2 className="title-luxury text-5xl md:text-8xl text-white mb-10">
            Signature <br />
            <span className="text-primary/20 italic">Selections</span>
          </h2>
          <p className="text-editorial text-[10px] md:text-xs uppercase tracking-[0.4em] max-w-lg mx-auto">
            Experience the pinnacle of our olfactory artistry through these two
            iconic compositions.
          </p>
        </motion.div>

        {/* Featured Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 max-w-6xl mx-auto mb-24">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: idx * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group"
            >
              <div className="absolute -inset-4 rounded-full bg-primary/[0.025] opacity-0 blur-2xl transition-opacity duration-1000 group-hover:opacity-100" />
              <ProductCard
                {...product}
                isLuxuryPerfume={product.isLuxuryPerfume}
              />
              <div className="mt-8 px-6 text-center">
                <p className="text-editorial text-[10px] uppercase tracking-widest leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                  {idx === 0
                    ? "A masterclass in complexity, blending rare oud with ethereal floral notes."
                    : "Capture the raw essence of the ocean at midnight, deep and mysterious."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Collection Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Link href="/shop" className="btn-luxury group">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold group-hover:text-primary transition-all">
              Explore All Collection
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
