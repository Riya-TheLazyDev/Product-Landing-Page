"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Boxes,
  ShoppingBag,
  Users,
  TicketPercent,
  FileText,
  Image as ImageIcon,
  Warehouse,
  Star,
  LineChart,
  RotateCcw,
  Settings,
  LogOut,
  Bell,
  Search,
  Maximize,
  User,
  ChevronDown,
  Menu,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import AuthGate from "@/components/auth/AuthGate";

const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { id: "products", label: "Products", icon: Boxes, href: "/admin/products" },
  { id: "orders", label: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { id: "customers", label: "Customers", icon: Users, href: "/admin/customers" },
  { id: "coupons", label: "Coupons", icon: TicketPercent, href: "/admin/coupons" },
  { id: "blogs", label: "Blogs", icon: FileText, href: "/admin/blogs" },
  { id: "cms", label: "Media Manager", icon: ImageIcon, href: "/admin/cms" },
  { id: "inventory", label: "Inventory", icon: Warehouse, href: "/admin/inventory" },
  { id: "reviews", label: "Reviews", icon: Star, href: "/admin/reviews" },
  { id: "reports", label: "Reports", icon: LineChart, href: "/admin/reports" },
  { id: "returns", label: "Returns & Refunds", icon: RotateCcw, href: "/admin/returns" },
  { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const profile = useAuthStore((s) => s.profile);
  const logout = useAuthStore((s) => s.logout);

  // Auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AuthGate role="admin">
    <div className="flex min-h-screen bg-[#050308] font-sans text-white selection:bg-primary/20">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? "280px" : "0px",
          x: isSidebarOpen ? 0 : -280,
        }}
        className="fixed inset-y-0 left-0 z-50 flex flex-col bg-[#050308] border-r border-white/[0.05] lg:relative lg:translate-x-0 overflow-hidden"
      >
        {/* Sidebar Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/Side_bar_Background.png" 
            alt="" 
            className="w-full h-full object-cover object-bottom opacity-40 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050308] via-[#050308]/92 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050308] to-transparent" />
        </div>

        <div className="relative z-10 flex h-20 items-center justify-center border-b border-white/[0.05] px-8">
          <Link href="/admin/dashboard" className="flex flex-col items-center">
            <h1 className="text-lg font-serif tracking-[0.3em] uppercase text-primary">
              ELEVARA
            </h1>
            <span className="text-[8px] uppercase tracking-[0.5em] text-white/40 -mt-1">
              Fragrances
            </span>
          </Link>
        </div>

        <nav className="relative z-10 flex-1 overflow-y-auto px-4 py-8 space-y-1 custom-scrollbar">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-300 group ${
                  isActive
                    ? "bg-white/[0.05] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    : "text-white/50 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <item.icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={`transition-colors ${isActive ? "text-primary" : "group-hover:text-white"}`}
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 p-4 border-t border-white/[0.05]">

          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-white/50 transition-all hover:bg-white/[0.05] hover:text-white"
          >
            <LogOut size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
              Logout
            </span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 h-20 bg-[#050308]/80 backdrop-blur-md border-b border-white/[0.05] px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center gap-3 lg:hidden text-white/60 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-serif text-white tracking-wide hidden sm:block">
              {SIDEBAR_ITEMS.find(item => item.href === pathname)?.label || "Admin"}
            </h2>
          </div>

          <div className="hidden lg:flex flex-1 max-w-xl relative mx-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              type="text"
              placeholder="Search anything... (⌘ K)"
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <button className="relative p-2.5 text-white/40 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all">
              <Bell size={18} strokeWidth={1.5} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#050308]" />
            </button>
            <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all hidden sm:block">
              <Maximize size={18} strokeWidth={1.5} />
            </button>

            <div className="h-10 w-[1px] bg-white/[0.05] mx-2 hidden sm:block" />

            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold text-white tracking-wide">Admin</p>
                <p className="text-[9px] text-white/30 font-medium">Super Admin</p>
              </div>
              <div className="relative">
                <div className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                  <User size={18} className="text-white/60" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#050308]" />
              </div>
              <ChevronDown size={14} className="text-white/30 transition-transform group-hover:translate-y-0.5" />
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 custom-scrollbar">
          {children}
          
          <footer className="mt-20 py-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              © 2025 Elevāra Fragrances. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/20">
              Made with <Star size={10} className="text-primary/40" /> for passion
            </div>
          </footer>
        </main>
      </div>
    </div>
    </AuthGate>
  );
}
