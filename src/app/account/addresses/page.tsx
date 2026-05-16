"use client";

import { MapPin } from "lucide-react";
import AuthGate from "@/components/auth/AuthGate";
import { useCartStore } from "@/stores/cart-store";

export default function SavedAddressesPage() {
  const addresses = useCartStore((s) => s.savedAddresses);

  return (
    <AuthGate role="user">
    <main className="cinematic-page cinematic-section cinematic-section--c min-h-screen pb-20 pt-28">
      <div className="environment-scene environment-scene--waterfall" />
      <div className="container-page relative z-10">
        <p className="subtitle-luxury mb-5">Private Delivery</p>
        <h1 className="title-luxury mb-12 text-5xl text-white md:text-7xl">
          Saved Addresses
        </h1>

        {addresses.length === 0 ? (
          <div className="glass-liquid max-w-2xl rounded-3xl p-10 text-center">
            <MapPin className="mx-auto mb-6 text-primary" size={28} strokeWidth={1} />
            <h2 className="mb-4 font-serif text-3xl text-white">
              No saved addresses
            </h2>
            <p className="text-sm text-white/50">
              Save an address during checkout and it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {addresses.map((address) => (
              <article key={address.id} className="glass-liquid rounded-3xl p-7">
                <p className="subtitle-luxury mb-4">
                  {address.isDefault ? "Default Address" : "Maison Address"}
                </p>
                <h2 className="mb-4 font-serif text-3xl text-white">
                  {address.fullName}
                </h2>
                <p className="leading-relaxed text-white/52">
                  {address.address}
                  <br />
                  {address.city}, {address.state} {address.zip}
                  <br />
                  {address.country}
                  <br />
                  {address.phone}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
    </AuthGate>
  );
}
