"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="subscribe" className="cinematic-section cinematic-section--c section-padding relative overflow-hidden">
      <div className="environment-scene environment-scene--waterfall" />
      <div className="container-page relative z-10">
        <div className="glass-liquid glass-shine glass-obsidian relative mx-auto max-w-4xl overflow-hidden rounded-2xl p-6 text-center sm:rounded-3xl sm:p-10 md:p-16 lg:p-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(214,195,165,0.09),transparent_62%),radial-gradient(ellipse_100%_42%_at_50%_100%,rgba(140,72,210,0.14),transparent_70%)]" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="subtitle-luxury mb-8 block text-primary">Private List</span>
            <h2 className="heading-section-sm mb-8 sm:mb-10">
              Join the{" "}
              <span className="text-accent-gold">Inner Circle</span>
            </h2>
            <p className="mx-auto mb-16 max-w-md text-xs font-light uppercase leading-relaxed tracking-[0.2em] text-white/60 md:text-sm">
              Receive exclusive access to new collection launches and private olfactory events.
            </p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="relative max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-[10px] tracking-[0.3em] text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/10 uppercase font-bold"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-4 text-[10px] tracking-[0.3em] font-bold text-primary hover:text-white transition-colors"
                  >
                    JOIN
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4"
                >
                  <p className="text-primary text-[10px] tracking-[0.4em] font-bold uppercase">
                    Welcome to the Circle
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
