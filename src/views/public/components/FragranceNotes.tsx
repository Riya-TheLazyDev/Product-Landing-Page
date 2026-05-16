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
    <section className="cinematic-section cinematic-section--b section-padding relative overflow-hidden">
      <div className="environment-scene environment-scene--rain" />
      <div className="liquid-blob liquid-blob--gold pointer-events-none absolute -left-20 bottom-0 h-[280px] w-[280px] opacity-25" />
      <motion.div className="container-page relative z-10">
        <div className="editorial-grid mb-24">
          <div>
            <span className="subtitle-luxury mb-6 block">Olfactory Pyramid</span>
            <h2 className="heading-section">
              The Architecture <br />
              <span className="text-accent-gold">of Scent</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm font-light leading-relaxed tracking-wide text-white/60 md:text-base max-w-sm">
              Each Elevara fragrance is a complex structure of carefully balanced layers, evolving over time on the skin.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-12 lg:gap-16">
          {NOTES.map((note) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: note.delay, ease: [0.16, 1, 0.3, 1] }}
              className="glass-liquid glass-shine group relative overflow-hidden rounded-2xl p-8 md:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_38%_at_50%_0%,rgba(214,195,165,0.055),transparent_62%),linear-gradient(180deg,transparent,rgba(2,4,8,0.28))]" />
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
                  <span key={item} className="glass-chip px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-white/70 transition-colors group-hover:border-primary/25">
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-xs font-light leading-relaxed tracking-wide text-white/50 md:text-sm">
                {note.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
