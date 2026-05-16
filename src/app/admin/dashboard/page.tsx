"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  FileText,
  Image as ImageIcon,
  PackageCheck,
  Users,
} from "lucide-react";
import AuthGate from "@/components/auth/AuthGate";

const modules = [
  { title: "Products", detail: "Inventory, pricing, scent notes", icon: Boxes },
  { title: "Orders", detail: "Fulfillment and private clients", icon: PackageCheck },
  { title: "Customers", detail: "Profiles, addresses, lifetime value", icon: Users },
  { title: "Blogs", detail: "Editorial fragrance stories", icon: FileText },
  { title: "Banners / CMS", detail: "Campaign surfaces and hero scenes", icon: ImageIcon },
  { title: "Analytics", detail: "Revenue, conversion, collection demand", icon: BarChart3 },
];

export default function AdminDashboardPage() {
  return (
    <AuthGate role="admin">
    <main className="cinematic-page cinematic-section cinematic-section--b min-h-screen pb-20 pt-28">
      <div className="environment-scene environment-scene--rain" />
      <div className="container-page relative z-10">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="subtitle-luxury mb-5">Admin Atelier</p>
            <h1 className="title-luxury text-5xl text-white md:text-7xl">
              Maison Dashboard
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/52">
            Protected command center for the Elevara fragrance house.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module, index) => (
            <motion.article
              key={module.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="glass-liquid glass-shine rounded-3xl p-7"
            >
              <module.icon className="mb-8 text-primary" size={26} strokeWidth={1} />
              <h2 className="mb-3 font-serif text-3xl text-white">
                {module.title}
              </h2>
              <p className="text-sm leading-relaxed text-white/48">
                {module.detail}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
    </AuthGate>
  );
}
