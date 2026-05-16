"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ShopCTA() {
  return (
    <section className="cinematic-section cinematic-section--c section-padding relative overflow-hidden">
      <div className="environment-scene environment-scene--rain" />
      <div className="container-page relative z-10">
        <div className="glass-liquid relative h-[420px] overflow-hidden rounded-3xl group md:h-[540px]">
          <Image
            src="/assets/product.jpeg"
            alt="Discover Your Scent"
            fill
            className="object-cover opacity-55 transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_52%_46%_at_50%_34%,rgba(214,195,165,0.15),transparent_66%),radial-gradient(ellipse_80%_42%_at_50%_100%,rgba(140,72,210,0.2),transparent_70%),linear-gradient(180deg,rgba(8,4,18,0.42),rgba(3,1,8,0.9))]" />
          
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
              className="title-luxury mb-10 text-4xl text-white drop-shadow-[0_24px_70px_rgba(0,0,0,0.8)] md:text-7xl"
            >
              Discover Your <br />
              <span className="text-white/20 italic">Signature Scent</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-12 max-w-md text-[10px] uppercase tracking-[0.34em] text-white/54 md:tracking-[0.4em]"
            >
              Not sure which fragrance is right for you? Take our quiz and find your perfect match.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-shine rounded-full border border-white/12 px-12 py-4 transition duration-700 hover:border-primary/35 hover:text-primary"
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
