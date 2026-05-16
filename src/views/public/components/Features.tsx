"use client";

import { Shield, Star, Globe } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Eco-Conscious Craft",
    details: "Sustainability is woven into our essence. We use recyclable liquid glass and ethically sourced botanical extracts.",
    icon: Shield,
    delay: 0,
  },
  {
    title: "Artisanally Poured",
    details: "Each vessel is hand-poured in small batches to ensure the highest concentration of fragrance oils.",
    icon: Star,
    delay: 0.2,
  },
  {
    title: "Global Presence",
    details: "Bringing the cinematic experience of Elevara to over 40 countries with white-glove delivery.",
    icon: Globe,
    delay: 0.4,
  },
];

export default function Features() {
  return (
    <section id="about" className="cinematic-section cinematic-section--c section-padding relative overflow-hidden">
      <div className="environment-scene environment-scene--rain" />
      <div className="container-page relative z-10">
        <div className="editorial-grid mb-16 md:mb-20">
          <div>
            <span className="subtitle-luxury mb-6 block">Our Philosophy</span>
            <h2 className="heading-section">
              Conscious{" "}
              <span className="text-accent-gold">Excellence</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm font-light leading-relaxed tracking-wide text-white/60 md:text-base max-w-sm">
              We believe in beauty that respects the earth. Our commitment to sustainability is as deep as our commitment to quality.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
              className="glass-liquid glass-shine relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl p-8 md:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(140,72,210,0.1),transparent_64%)]" />
              <div className="mb-8 text-primary">
                <feature.icon size={24} strokeWidth={1} />
              </div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-6">
                {feature.title}
              </h3>
              <p className="text-xs font-light leading-relaxed tracking-wide text-white/50 md:text-sm">
                {feature.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
