"use client";

import { Leaf, Sparkles, Droplet } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const items = [
    {
      icon: Leaf,
      title: "100% Organic",
      desc: "We craft skincare using the most exquisite ingredients from the plant, earth and mineral realms",
    },
    {
      icon: Sparkles,
      title: "Fits your skin",
      desc: "It's all natural and processed based on traditional knowledge with modern technology",
    },
    {
      icon: Droplet,
      title: "Easy to use",
      desc: "Packed with a unique design as well as useful that can help you perform routine skin care",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.2, 0, 0.2, 1] as any }
    },
  };

  return (
    <section className="py-24 relative">
      <div className="container-page relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="glass-card p-10 flex flex-col items-center text-center group"
              >
                <div className="mb-8 p-6 rounded-full bg-white/5 border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-500">
                  <Icon
                    size={32}
                    strokeWidth={1}
                    className="text-primary group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-xl font-serif font-light mb-4 tracking-wide gradient-text">
                  {item.title}
                </h3>

                <p className="text-xs text-foreground/50 leading-relaxed max-w-[260px] font-medium tracking-wide">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
