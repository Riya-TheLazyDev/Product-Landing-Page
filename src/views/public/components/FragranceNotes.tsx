"use client";

import { motion } from "framer-motion";

const NOTES = [
  {
    title: "Top Notes",
    items: ["Bergamot", "Saffron", "Bitter Almond"],
    description: "The initial impression. Vibrant, volatile, and instantly captivating.",
    delay: 0,
  },
  {
    title: "Middle Notes",
    items: ["Egyptian Jasmine", "Cedarwood", "Rose"],
    description: "The heart of the fragrance. Mellow, rounded, and enduring.",
    delay: 0.2,
  },
  {
    title: "Base Notes",
    items: ["Ambergris", "Musk", "Fir Resin"],
    description: "The lasting foundation. Deep, rich, and unforgettable.",
    delay: 0.4,
  },
];

export default function FragranceNotes() {
  return (
    <section className="section-padding bg-[#030303]">
      <div className="container-page">
        <div className="editorial-grid mb-24">
          <div>
            <span className="subtitle-luxury mb-6 block">Olfactory Pyramid</span>
            <h2 className="title-luxury text-5xl md:text-7xl text-white">
              The Architecture <br /> 
              <span className="text-white/20 italic">of Scent</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-white/40 text-sm md:text-base leading-relaxed font-light tracking-wide max-w-sm">
              Each Elevara fragrance is a complex structure of carefully balanced layers, evolving over time on the skin.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {NOTES.map((note) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: note.delay, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="mb-8 h-[1px] w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  transition={{ duration: 2, delay: note.delay }}
                  className="absolute inset-0 bg-primary/40" 
                />
              </div>
              
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-8">
                {note.title}
              </h3>

              <div className="flex flex-wrap gap-3 mb-8">
                {note.items.map((item) => (
                  <span key={item} className="px-4 py-2 bg-white/5 border border-white/5 text-[9px] uppercase tracking-widest text-white/60 font-bold group-hover:border-primary/20 transition-colors">
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-xs md:text-sm text-white/30 leading-relaxed font-light tracking-wide">
                {note.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
