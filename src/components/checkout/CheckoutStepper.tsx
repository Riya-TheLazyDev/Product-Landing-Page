"use client";

import { motion } from "framer-motion";
import { CHECKOUT_STEP_LABELS } from "@/types/checkout";

type Props = {
  activeStep: number;
};

export default function CheckoutStepper({ activeStep }: Props) {
  const progress =
    CHECKOUT_STEP_LABELS.length <= 1
      ? 0
      : (activeStep / (CHECKOUT_STEP_LABELS.length - 1)) * 100;

  return (
    <nav aria-label="Checkout progress" className="mb-12 md:mb-14">
      <div className="relative mb-6 h-px w-full bg-white/[0.06]">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/40 to-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <ol className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
        {CHECKOUT_STEP_LABELS.map((label, idx) => {
          const active = idx === activeStep;
          const complete = idx < activeStep;
          return (
            <li key={label} className="flex flex-col items-center text-center">
              <motion.div
                initial={false}
                animate={{
                  scale: active ? 1.06 : 1,
                  borderColor: active
                    ? "rgba(214,195,165,0.55)"
                    : complete
                      ? "rgba(214,195,165,0.25)"
                      : "rgba(255,255,255,0.08)",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full border text-[11px] font-semibold tracking-widest md:h-11 md:w-11 ${
                  active
                    ? "bg-primary/15 text-primary shadow-[0_0_28px_-8px_rgba(214,195,165,0.45)]"
                    : complete
                      ? "bg-primary/8 text-primary/90"
                      : "bg-white/[0.02] text-white/25"
                }`}
              >
                {idx + 1}
              </motion.div>
              <span
                className={`text-[8px] md:text-[9px] uppercase tracking-[0.32em] font-bold max-w-[8rem] leading-relaxed ${
                  active
                    ? "text-primary"
                    : complete
                      ? "text-white/50"
                      : "text-white/25"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
