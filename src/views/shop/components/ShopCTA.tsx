"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ShopCTA() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden group">
          <Image
            src="/assets/product.jpeg"
            alt="Discover Your Scent"
            fill
            className="object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="subtitle-luxury mb-8 text-primary"
            >
              Fragrance Finder
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="title-luxury text-4xl md:text-7xl text-white mb-10"
            >
              Discover Your <br />
              <span className="text-white/20 italic">Signature Scent</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-12 max-w-md"
            >
              Not sure which fragrance is right for you? Take our quiz and find your perfect match.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="btn-luxury px-12 group"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Take The Quiz</span>
            </motion.button>
          </div>
        </div>

        {/* Brand Promises */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-24 py-16 border-t border-white/[0.03]">
          {[
            { title: "Free Shipping", detail: "On orders over $150" },
            { title: "Premium Quality", detail: "Finest ingredients" },
            { title: "Secure Payments", detail: "100% protected" },
            { title: "Easy Returns", detail: "30-day returns" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">{item.title}</h4>
              <p className="text-[9px] uppercase tracking-widest text-white/20">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
