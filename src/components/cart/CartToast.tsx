"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

export default function CartToast() {
  const toast = useCartStore((s) => s.toast);
  const dismissToast = useCartStore((s) => s.dismissToast);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[200] flex justify-end px-4 pb-6 sm:px-8 sm:pb-10"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative max-w-sm w-full sm:w-[min(100%,380px)]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-[rgba(6,8,14,0.92)] px-6 py-5 shadow-[0_28px_100px_-40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(214,195,165,0.08)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent pointer-events-none" />
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <button
                type="button"
                onClick={dismissToast}
                className="absolute right-3 top-3 rounded-full p-1.5 text-white/35 transition-colors hover:text-white/80"
                aria-label="Dismiss notification"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
              <div className="relative flex items-start gap-4 pr-6">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Sparkles size={16} strokeWidth={1.25} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.45em] text-primary font-bold mb-2">
                    Elevāra
                  </p>
                  <p className="font-serif text-lg text-white/95 leading-snug tracking-wide">
                    {toast.message}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
