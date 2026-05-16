"use client";

import { motion } from "framer-motion";
import AuthGate from "@/components/auth/AuthGate";
import { useAuthStore } from "@/stores/auth-store";

export default function AccountSettingsPage() {
  const profile = useAuthStore((s) => s.profile);

  return (
    <AuthGate role="user">
    <main className="cinematic-page cinematic-section cinematic-section--b min-h-screen pb-20 pt-28">
      <div className="environment-scene environment-scene--rain" />
      <div className="container-page relative z-10 max-w-5xl">
        <p className="subtitle-luxury mb-5">Maison Profile</p>
        <h1 className="title-luxury mb-12 text-5xl text-white md:text-7xl">
          Account Settings
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-liquid rounded-3xl p-6 md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label>
              <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.34em] text-white/35">
                Name
              </span>
              <input
                value={profile?.name ?? ""}
                readOnly
                className="w-full rounded-full border border-white/[0.08] bg-black/24 px-5 py-4 text-white outline-none"
              />
            </label>
            <label>
              <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.34em] text-white/35">
                Email
              </span>
              <input
                value={profile?.email ?? ""}
                readOnly
                className="w-full rounded-full border border-white/[0.08] bg-black/24 px-5 py-4 text-white outline-none"
              />
            </label>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-white/48">
            This demo stores your session, cart, wishlist, saved addresses, and
            order history locally for a persistent ecommerce experience. It is
            ready to swap to Supabase or Firebase when backend credentials are
            available.
          </p>
        </motion.div>
      </div>
    </main>
    </AuthGate>
  );
}
