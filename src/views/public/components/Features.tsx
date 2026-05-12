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
    <section id="about" className="section-padding bg-[#050505]">
      <div className="container-page">
        <div className="editorial-grid mb-16 md:mb-20">
          <div>
            <span className="subtitle-luxury mb-6 block">Our Philosophy</span>
            <h2 className="title-luxury text-5xl md:text-7xl text-white">
              Conscious <br /> 
              <span className="text-white/20 italic">Excellence</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-white/40 text-sm md:text-base leading-relaxed font-light tracking-wide max-w-sm">
              We believe in beauty that respects the earth. Our commitment to sustainability is as deep as our commitment to quality.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="mb-8 text-primary">
                <feature.icon size={24} strokeWidth={1} />
              </div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-6">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-white/30 leading-relaxed font-light tracking-wide">
                {feature.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
