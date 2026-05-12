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
    <section id="subscribe" className="section-padding bg-[#050505]">
      <div className="container-page">
        <div className="max-w-4xl mx-auto glass-card p-12 md:p-24 text-center border-white/[0.03]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="subtitle-luxury mb-8 block text-primary">Private List</span>
            <h2 className="title-luxury text-4xl md:text-6xl text-white mb-10">
              Join the <br /> 
              <span className="text-white/20 italic">Inner Circle</span>
            </h2>
            <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.2em] font-light mb-16 max-w-md mx-auto leading-relaxed">
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
