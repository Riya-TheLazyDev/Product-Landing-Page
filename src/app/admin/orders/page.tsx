"use client";

import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Download,
  Filter,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

// Mock Data
const ORDERS_DATA = [
  {
    id: "#ORD-1258",
    customer: { name: "Arjun Mehta", email: "arjun@example.com", avatar: "/assets/product.jpeg" },
    products: [
      { image: "/assets/product.jpeg", count: 2 },
    ],
    amount: "₹4,299",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    date: "May 26, 2025",
    time: "10:30 AM",
  },
  {
    id: "#ORD-1257",
    customer: { name: "Sneha Kapoor", email: "sneha@example.com", avatar: "/assets/product.jpeg" },
    products: [
      { image: "/assets/product.jpeg", count: 1 },
    ],
    amount: "₹2,999",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    date: "May 26, 2025",
    time: "09:15 AM",
  },
  {
    id: "#ORD-1256",
    customer: { name: "Rohan Verma", email: "rohan@example.com", avatar: "/assets/product.jpeg" },
    products: [
      { image: "/assets/product.jpeg", count: 3 },
    ],
    amount: "₹1,199",
    paymentStatus: "Paid",
    orderStatus: "Confirmed",
    date: "May 26, 2025",
    time: "08:45 AM",
  },
  {
    id: "#ORD-1255",
    customer: { name: "Ishita Rao", email: "ishita@example.com", avatar: "/assets/product.jpeg" },
    products: [
      { image: "/assets/product.jpeg", count: 1 },
    ],
    amount: "₹3,499",
    paymentStatus: "COD",
    orderStatus: "Confirmed",
    date: "May 25, 2025",
    time: "07:20 PM",
  },
  {
    id: "#ORD-1254",
    customer: { name: "Karan Malhotra", email: "karan@example.com", avatar: "/assets/product.jpeg" },
    products: [
      { image: "/assets/product.jpeg", count: 2 },
    ],
    amount: "₹2,199",
    paymentStatus: "Paid",
    orderStatus: "Cancelled",
    date: "May 25, 2025",
    time: "06:10 PM",
  },
  {
    id: "#ORD-1253",
    customer: { name: "Meera Joshi", email: "meera@example.com", avatar: "/assets/product.jpeg" },
    products: [
      { image: "/assets/product.jpeg", count: 1 },
    ],
    amount: "₹1,899",
    paymentStatus: "Paid",
    orderStatus: "Cancelled",
    date: "May 24, 2025",
    time: "05:35 PM",
  },
  {
    id: "#ORD-1252",
    customer: { name: "Dev Sharma", email: "dev@example.com", avatar: "/assets/product.jpeg" },
    products: [
      { image: "/assets/product.jpeg", count: 2 },
    ],
    amount: "₹2,499",
    paymentStatus: "Refunded",
    orderStatus: "Returned",
    date: "May 24, 2025",
    time: "04:50 PM",
  },
  {
    id: "#ORD-1251",
    customer: { name: "Aditi Singh", email: "aditi@example.com", avatar: "/assets/product.jpeg" },
    products: [
      { image: "/assets/product.jpeg", count: 1 },
    ],
    amount: "₹1,299",
    paymentStatus: "COD",
    orderStatus: "Pending",
    date: "May 24, 2025",
    time: "03:40 PM",
  },
];

const ANALYTICS_CARDS = [
  { label: "Total Orders", value: "1,248", change: "+12.4%", icon: ShoppingCart, color: "text-primary" },
  { label: "Pending", value: "86", change: "+8.6%", icon: Clock, color: "text-amber-500" },
  { label: "Shipped", value: "342", change: "+5.3%", icon: Truck, color: "text-blue-500" },
  { label: "Delivered", value: "786", change: "+14.2%", icon: CheckCircle2, color: "text-emerald-500" },
  { label: "Cancelled", value: "34", change: "-2.1%", icon: XCircle, color: "text-rose-500" },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  Shipped: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  Confirmed: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  Pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  Cancelled: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  Returned: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  Processing: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
};

const PAYMENT_COLORS: Record<string, string> = {
  Paid: "text-emerald-500",
  COD: "text-blue-500",
  Refunded: "text-purple-500",
};

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedOrders.length === ORDERS_DATA.length) setSelectedOrders([]);
    else setSelectedOrders(ORDERS_DATA.map((o) => o.id));
  };

  const toggleSelect = (id: string) => {
    if (selectedOrders.includes(id)) setSelectedOrders(selectedOrders.filter((o) => o !== id));
    else setSelectedOrders([...selectedOrders, id]);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-10">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Orders Management</h1>
          <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
            Track, manage and fulfill customer orders
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ANALYTICS_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center ${card.color}`}>
                  <card.icon size={16} strokeWidth={1.5} />
                </div>
                <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{card.label}</p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{card.value}</h3>
                  <p className={`text-[9px] font-bold mt-1 ${card.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {card.change} <span className="text-white/20 font-medium">vs last month</span>
                  </p>
                </div>
                {/* Micro Sparkline */}
                <div className="h-8 w-16 opacity-30">
                  <svg viewBox="0 0 100 40" className="w-full h-full">
                    <path d="M0,35 Q10,32 20,28 T40,25 T60,15 T80,20 T100,10" fill="none" stroke="currentColor" strokeWidth="3" className={card.color} />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full max-w-4xl">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="text"
                  placeholder="Search by order ID or customer..."
                  className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2.5 cursor-pointer hover:bg-white/[0.04] transition-colors">
                <Calendar size={14} className="text-primary/60" />
                <span className="text-[11px] text-white/60 font-medium whitespace-nowrap">May 20, 2025 - May 26, 2025</span>
              </div>
              <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                <option>All Payment Status</option>
                <option>Paid</option>
                <option>COD</option>
                <option>Refunded</option>
              </select>
              <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                <option>All Order Status</option>
                <option>Delivered</option>
                <option>Shipped</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                <Filter size={14} />
                Filter
              </button>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <button className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/[0.05]">
                <Download size={14} className="text-primary/60" />
                Export
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-primary/90">
                <TrendingUp size={14} />
                New Order
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-8 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  <th className="py-4 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === ORDERS_DATA.length}
                      onChange={toggleSelectAll}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                    />
                  </th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Order ID</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Customer</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Products</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Total Amount</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Payment Status</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Order Status</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Date</th>
                  <th className="py-4 px-4 text-center text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS_DATA.map((order) => (
                  <tr key={order.id} className="group border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                    <td className="py-5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                        className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                      />
                    </td>
                    <td className="py-5 px-4 text-[11px] font-bold text-white tracking-wide">{order.id}</td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden">
                          <img src={order.customer.avatar} className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white tracking-wide">{order.customer.name}</p>
                          <p className="text-[9px] text-white/30 font-medium mt-0.5">{order.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center -space-x-3">
                        {order.products.map((p, idx) => (
                          <div key={idx} className="h-10 w-8 rounded-lg bg-black/40 overflow-hidden border border-white/[0.1] relative z-10 hover:z-20 transition-all hover:scale-110">
                            <img src={p.image} className="w-full h-full object-cover opacity-70" />
                          </div>
                        ))}
                        {order.products[0].count > 1 && (
                          <div className="h-10 w-10 flex items-center justify-center text-[10px] font-bold text-white/40 pl-4">
                            +{order.products[0].count}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-4 text-[11px] font-bold text-white">{order.amount}</td>
                    <td className="py-5 px-4">
                      <span className={`text-[10px] font-bold ${PAYMENT_COLORS[order.paymentStatus] || 'text-white/60'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${STATUS_COLORS[order.orderStatus] || 'text-white/20 border-white/10'}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-[10px] font-bold text-white/60">{order.date}</p>
                      <p className="text-[9px] text-white/20 mt-1">{order.time}</p>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center justify-center">
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all">
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.05] pt-8">
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Showing 1 to 10 of 1,248 orders</p>
            <div className="flex items-center gap-2">
               <button className="p-2 rounded-lg border border-white/[0.05] text-white/20 hover:text-white transition-all">
                  <ChevronLeft size={16} />
               </button>
               {[1, 2, 3, 4, 5, "...", 125].map((p, i) => (
                  <button key={i} className={`h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                    p === 1 ? 'bg-primary text-[#050308]' : 'text-white/40 hover:bg-white/[0.05]'
                  }`}>
                    {p}
                  </button>
               ))}
               <button className="p-2 rounded-lg border border-white/[0.05] text-white/20 hover:text-white transition-all">
                  <ChevronRight size={16} />
               </button>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold whitespace-nowrap">10 / page</span>
               <MoreVertical size={14} className="text-white/20 rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Analytics */}
      <aside className="w-full xl:w-[320px] space-y-6">
        {/* Order Analytics Donut */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-serif text-white tracking-wide">Order Analytics</h3>
            <select className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white/40 focus:outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          
          <div className="relative flex justify-center py-6">
            <svg viewBox="0 0 100 100" className="w-40 h-40 -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.62 }}
                transition={{ duration: 2, ease: "easeOut" }}
                cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="251.2" strokeLinecap="round"
              />
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.27 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="-155.7" strokeLinecap="round"
              />
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.07 }}
                transition={{ duration: 1, delay: 1 }}
                cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="-223.5" strokeLinecap="round"
              />
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.03 }}
                transition={{ duration: 1, delay: 1.2 }}
                cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="-241.1" strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-white tracking-tight">1,248</p>
              <p className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Total Orders</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {[
              { label: "Delivered", value: "786", percent: "62.9%", color: "bg-emerald-500" },
              { label: "Shipped", value: "342", percent: "27.4%", color: "bg-blue-500" },
              { label: "Pending", value: "86", percent: "6.9%", color: "bg-amber-500" },
              { label: "Cancelled", value: "34", percent: "2.8%", color: "bg-rose-500" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white">{item.value} <span className="text-[8px] text-white/20 ml-1">({item.percent})</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Recent Orders</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-4">
            {ORDERS_DATA.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden">
                    <img src={order.customer.avatar} className="w-full h-full object-cover opacity-60" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white tracking-wide">{order.id}</p>
                    <p className="text-[9px] text-white/30 font-medium">{order.customer.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white">{order.amount}</p>
                  <p className={`text-[7px] font-bold uppercase tracking-wider mt-0.5 ${order.orderStatus === 'Delivered' ? 'text-emerald-500' : 'text-amber-500'}`}>{order.orderStatus}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-white/[0.05] bg-white/[0.02] text-[9px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/[0.04] hover:text-white transition-all">
            View All Orders
          </button>
        </div>
      </aside>
    </div>
  );
}
