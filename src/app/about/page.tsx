"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[#010102] text-white overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2000"
            alt="Elevāra brand atmospheric background"
            fill
            className="object-cover scale-105 opacity-40 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010102]/20 via-[#010102]/60 to-[#010102]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,195,165,0.05),transparent_60%)]" />
        </motion.div>

        <div className="relative z-10 text-center px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="subtitle-luxury block tracking-[0.6em] mb-8 text-[#D4AF37]/80">
              The Maison
            </span>
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-serif font-light leading-[0.85] tracking-[-0.02em] mb-10">
              CRAFTING<br />
              <span className="italic text-white/80">Eternity</span>
            </h1>
            <p className="max-w-xl mx-auto text-sm md:text-base text-white/60 tracking-widest uppercase leading-loose">
              Born from darkness. Distilled in light. A study in the silent power of true luxury.
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">Discover</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 relative">
        <div className="container-page px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif leading-[1.1] font-light">
                The Architecture<br />of <span className="italic text-[#D4AF37]">Emotion</span>.
              </h2>
              <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
                <p>
                  At Elevāra, we do not simply mix ingredients; we architect emotions. Each fragrance is conceived as a sanctuary—a private world carved out of scent, designed for those who command the room in silence.
                </p>
                <p>
                  Our philosophy is rooted in the contrast between shadow and illumination. We source the rarest, most volatile nocturnal blooms and anchor them with deep, primordial resins that have been aged in darkness.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] w-full rounded-full overflow-hidden border border-white/10"
            >
              <Image
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Parallax Banner */}
      <section className="h-[80vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2000"
            alt="Dark floral essence"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010102] via-transparent to-[#010102]" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <p className="font-serif text-3xl md:text-5xl italic text-white/90 leading-relaxed mb-10">
              "We measure our craft not by the ingredients we include, but by the memories they are capable of holding."
            </p>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
              — The Master Perfumer
            </span>
          </motion.div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-32 bg-[#010102]">
        <div className="container-page px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4 block">The Process</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-light">From Soil to Soul</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {[
              {
                title: "01. Sourcing",
                desc: "We traverse the globe for ingredients that refuse to compromise—midnight orchids from the tropics, ancient oud from deep forests."
              },
              {
                title: "02. Distillation",
                desc: "Time is our most expensive raw material. Our extracts are cold-pressed and slow-aged, allowing the complex notes to unfold organically."
              },
              {
                title: "03. Composition",
                desc: "Housed in obsidian glass that protects the delicate molecular structure, each flacon is hand-polished and sealed with precision."
              }
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative p-10 border border-white/5 bg-white/[0.01] rounded-[2.5rem] hover:bg-white/[0.03] transition-colors duration-500"
              >
                <div className="absolute top-0 right-10 w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <h3 className="text-xl font-serif mb-6 text-[#D4AF37]">{step.title}</h3>
                <p className="text-white/60 font-light leading-relaxed tracking-wide">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
