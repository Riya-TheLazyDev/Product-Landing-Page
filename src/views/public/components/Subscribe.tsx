"use client";

import { motion } from "framer-motion";

export default function Subscribe() {
  return (
    <section className="py-24 relative">
      <div className="container-page relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-premium rounded-[2.5rem] p-12 md:p-16"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-medium mb-4 block">
                Newsletter
              </span>
              <h3 className="text-4xl md:text-5xl font-serif font-light leading-tight gradient-text">
                Join the exclusive <br className="hidden md:block" /> beauty circle
              </h3>
              <p className="text-foreground/50 text-sm mt-6 font-medium">
                Subscribe to receive private offers and 10% off your first luxury order.
              </p>
            </div>

            <div className="w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  placeholder="Your Email Address"
                  className="flex-1 px-8 py-4 text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 focus:border-primary/50 outline-none transition-all placeholder:text-foreground/20 rounded-full"
                />
                <button className="btn-luxury px-10 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
