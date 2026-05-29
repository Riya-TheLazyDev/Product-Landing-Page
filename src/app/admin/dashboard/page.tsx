"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { productService } from "@/services/productService";
import { formatPriceINR } from "@/lib/productMapper";
import type { Product } from "@/data/products";
import { subscribeProductCatalog } from "@/lib/productCatalog";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ChevronRight,
  Eye,
} from "lucide-react";

// Mock Data
const STATS = [
  {
    label: "Total Revenue",
    value: "₹2,45,890",
    change: "+ 12.4%",
    trend: "up",
    icon: TrendingUp,
    color: "from-amber-500/20 to-transparent",
  },
  {
    label: "Total Orders",
    value: "1,248",
    change: "+ 8.6%",
    trend: "up",
    icon: ShoppingBag,
    color: "from-blue-500/20 to-transparent",
  },
  {
    label: "Total Products",
    value: "—",
    change: "+ 3.2%",
    trend: "up",
    icon: Package,
    color: "from-emerald-500/20 to-transparent",
  },
  {
    label: "Total Customers",
    value: "3,682",
    change: "+ 11.7%",
    trend: "up",
    icon: Users,
    color: "from-purple-500/20 to-transparent",
  },
];

const RECENT_ORDERS = [
  { id: "#ORD-1258", customer: "Arjun Mehta", amount: "₹4,299", status: "Delivered", time: "2m ago" },
  { id: "#ORD-1257", customer: "Sneha Kapoor", amount: "₹2,999", status: "Shipped", time: "15m ago" },
  { id: "#ORD-1256", customer: "Rohan Verma", amount: "₹1,199", status: "Confirmed", time: "1h ago" },
  { id: "#ORD-1255", customer: "Ishita Rao", amount: "₹3,499", status: "Pending", time: "2h ago" },
  { id: "#ORD-1254", customer: "Karan Malhotra", amount: "₹2,199", status: "Processing", time: "3h ago" },
];

export default function AdminDashboard() {
  const [topProducts, setTopProducts] = useState<
    { name: string; category: string; price: string; sales: number; image: string }[]
  >([]);
  const [lowStock, setLowStock] = useState<
    { name: string; type: string; left: number; image: string }[]
  >([]);
  const [productCount, setProductCount] = useState(0);

  const loadProductWidgets = async () => {
    const res = await productService.getProducts();
    if (!res.success || !res.data) return;

    const items = res.data;
    setProductCount(items.length);

    const featured = items.filter((p) => p.featured).slice(0, 3);
    const top = (featured.length ? featured : items.slice(0, 3)).map((p: Product) => ({
      name: p.name,
      category: p.perfumeType || p.category,
      price: formatPriceINR(p.discountPrice ?? p.price),
      sales: p.stock,
      image: p.images[0] || "/assets/product.jpeg",
    }));
    setTopProducts(top);

    const low = items
      .filter((p) => p.stock > 0 && p.stock <= 10)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 3)
      .map((p: Product) => ({
        name: p.name,
        type: p.perfumeType || p.category,
        left: p.stock,
        image: p.images[0] || "/assets/product.jpeg",
      }));
    setLowStock(low);
  };

  useEffect(() => {
    loadProductWidgets();
    return subscribeProductCatalog(loadProductWidgets);
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-serif text-white tracking-tight flex items-center gap-3">
            Welcome back, Admin <span className="text-primary text-xl">✨</span>
          </h2>
          <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2.5">
          <p className="text-[10px] font-bold text-white/60 tracking-[0.1em]">May 20, 2025 - May 26, 2025</p>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <Package size={14} className="text-primary/60" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat, i) => {
          const display =
            stat.label === "Total Products"
              ? { ...stat, value: productCount > 0 ? String(productCount) : "—" }
              : stat;
          return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] transition-all duration-500"
          >
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} blur-3xl opacity-50 transition-opacity group-hover:opacity-80`} />
            
            <div className="relative flex items-center justify-between mb-6">
              <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/[0.05] flex items-center justify-center">
                <stat.icon size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <button className="text-white/20 hover:text-white transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-1">
              {stat.label}
            </p>
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {display.value}
              </h3>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                stat.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
              }`}>
                {stat.change}
                <span className="text-[8px] opacity-60">vs last week</span>
              </div>
            </div>

            {/* Sparkline Mockup */}
            <div className="mt-6 h-10 w-full overflow-hidden">
              <svg viewBox="0 0 100 40" className="w-full h-full">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                  d="M0,35 Q10,32 20,28 T40,25 T60,15 T80,20 T100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary/40"
                />
              </svg>
            </div>
          </motion.div>
        );})}
      </div>

      {/* Charts & Tables Section */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Sales Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-serif text-white tracking-wide">Sales Overview</h3>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] mt-1">Growth analysis over time</p>
            </div>
            <select className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white/60 focus:outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="relative h-[300px] w-full mt-4">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-5">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-[1px] w-full bg-white" />)}
            </div>
            
            {/* Main Graph SVG */}
            <svg viewBox="0 0 800 300" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(var(--cin-gold), 0.2)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,250 C100,240 150,250 200,200 S300,180 400,100 S600,120 700,50 S800,20 800,20"
                fill="none"
                stroke="rgba(var(--cin-gold), 1)"
                strokeWidth="3"
                className="drop-shadow-[0_0_20px_rgba(var(--cin-gold),0.3)]"
              />
              <path
                d="M0,250 C100,240 150,250 200,200 S300,180 400,100 S600,120 700,50 S800,20 800,20 V300 H0 Z"
                fill="url(#chartGradient)"
              />
              <motion.circle
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                cx="400" cy="100" r="5"
                fill="rgba(var(--cin-gold), 1)"
              />
              <motion.text
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
                x="380" y="80"
                fill="white"
                className="text-[14px] font-bold"
              >
                ₹68,450
              </motion.text>
            </svg>

            {/* X-Axis Labels */}
            <div className="absolute bottom-[-30px] w-full flex justify-between px-2 text-[10px] text-white/20 font-bold uppercase tracking-widest">
              <span>May 20</span>
              <span>May 21</span>
              <span>May 22</span>
              <span>May 23</span>
              <span>May 24</span>
              <span>May 25</span>
              <span>May 26</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-serif text-white tracking-wide">Recent Orders</h3>
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-white transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="group flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.03] transition-colors cursor-pointer border border-transparent hover:border-white/[0.05]">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-10 rounded-lg bg-black/40 overflow-hidden border border-white/[0.05]">
                    <img src="/assets/product.jpeg" className="w-full h-full object-cover opacity-60" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white tracking-wide">{order.id}</p>
                    <p className="text-[10px] text-white/30 font-medium mt-0.5">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-white">{order.amount}</p>
                  <div className={`text-[8px] font-bold uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full inline-block ${
                    order.status === 'Delivered' ? 'text-emerald-500 bg-emerald-500/10' :
                    order.status === 'Shipped' ? 'text-amber-500 bg-amber-500/10' :
                    'text-blue-500 bg-blue-500/10'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Selling Products */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-serif text-white tracking-wide">Top Selling</h3>
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-5">
            {(topProducts.length ? topProducts : [{ name: "—", category: "—", price: "—", sales: 0, image: "/assets/product.jpeg" }]).map((p, i) => (
              <div key={p.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-10 rounded-lg bg-black/40 overflow-hidden border border-white/[0.05]">
                    <img src={p.image} className="w-full h-full object-cover opacity-60" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white tracking-wide">{i + 1}. {p.name}</p>
                    <p className="text-[9px] text-white/30 font-medium mt-0.5">{p.category}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                   <p className="text-[11px] font-bold text-white">{p.price}</p>
                   <div className="flex items-center gap-2 bg-white/[0.03] px-2 py-1 rounded-lg border border-white/[0.05]">
                      <ShoppingBag size={10} className="text-primary/60" />
                      <span className="text-[10px] font-bold text-white/60">{p.sales}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-serif text-white tracking-wide">Low Stock Alert</h3>
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-5">
            {(lowStock.length ? lowStock : [{ name: "—", type: "—", left: 0, image: "/assets/product.jpeg" }]).map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-10 rounded-lg bg-black/40 overflow-hidden border border-white/[0.05]">
                    <img src={p.image} className="w-full h-full object-cover opacity-60" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white tracking-wide">{p.name}</p>
                    <p className="text-[9px] text-white/30 font-medium mt-0.5">{p.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-rose-500">{p.left} left</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Overview */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6">
          <h3 className="text-lg font-serif text-white tracking-wide mb-8">Customer Overview</h3>
          <div className="flex items-center justify-center py-4">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.7 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  cx="50" cy="50" r="40" fill="none" stroke="rgba(var(--cin-gold), 0.8)" strokeWidth="8" strokeDasharray="251.2" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-white">3,682</p>
                <p className="text-[9px] uppercase tracking-widest text-white/30">Total</p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {[
              { label: "New Customers", value: "1,245", color: "bg-primary" },
              { label: "Returning Customers", value: "1,892", color: "bg-white/40" },
              { label: "Inactive Customers", value: "545", color: "bg-white/10" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                </div>
                <span className="text-[11px] font-bold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
