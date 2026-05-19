"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Ticket,
  BadgeDollarSign,
  TrendingUp,
  Clock,
  Plus,
  Edit2,
  X,
  History,
} from "lucide-react";
import { useState } from "react";

// Mock Data
const COUPONS_DATA = [
  {
    id: 1,
    code: "WELCOME10",
    description: "Welcome offer for new customers",
    type: "Percentage",
    value: "10% OFF",
    minOrder: "₹999",
    usageLimit: "500",
    used: 231,
    expiry: "May 31, 2025",
    status: "Active",
  },
  {
    id: 2,
    code: "FLAT200",
    description: "Flat ₹200 off on orders above ₹1499",
    type: "Flat",
    value: "₹200 OFF",
    minOrder: "₹1,499",
    usageLimit: "300",
    used: 87,
    expiry: "May 25, 2025",
    status: "Active",
  },
  {
    id: 3,
    code: "FREESHIP",
    description: "Free shipping on orders above ₹799",
    type: "Free Shipping",
    value: "Free Shipping",
    minOrder: "₹799",
    usageLimit: "Unlimited",
    used: 1245,
    expiry: "Jun 30, 2025",
    status: "Active",
  },
  {
    id: 4,
    code: "EXTRA15",
    description: "Extra 15% off on all perfumes",
    type: "Percentage",
    value: "15% OFF",
    minOrder: "₹1,999",
    usageLimit: "400",
    used: 156,
    expiry: "May 20, 2025",
    status: "Active",
  },
  {
    id: 5,
    code: "VIP20",
    description: "20% off for VIP customers",
    type: "Percentage",
    value: "20% OFF",
    minOrder: "₹2,499",
    usageLimit: "200",
    used: 64,
    expiry: "May 18, 2025",
    status: "Active",
  },
  {
    id: 6,
    code: "NEW25",
    description: "25% off on first order",
    type: "Percentage",
    value: "25% OFF",
    minOrder: "₹999",
    usageLimit: "250",
    used: 102,
    expiry: "May 15, 2025",
    status: "Active",
  },
  {
    id: 7,
    code: "SAVE500",
    description: "Flat ₹500 off on orders above ₹3499",
    type: "Flat",
    value: "₹500 OFF",
    minOrder: "₹3,499",
    usageLimit: "150",
    used: 36,
    expiry: "May 10, 2025",
    status: "Active",
  },
  {
    id: 8,
    code: "HOLI10",
    description: "Holi special offer 10% off",
    type: "Percentage",
    value: "10% OFF",
    minOrder: "₹1,499",
    usageLimit: "300",
    used: 289,
    expiry: "Mar 31, 2025",
    status: "Expired",
  },
  {
    id: 9,
    code: "WINTER15",
    description: "Winter season special 15% off",
    type: "Percentage",
    value: "15% OFF",
    minOrder: "₹1,999",
    usageLimit: "200",
    used: 200,
    expiry: "Mar 15, 2025",
    status: "Expired",
  },
  {
    id: 10,
    code: "DIWALI20",
    description: "Diwali mega sale 20% off",
    type: "Percentage",
    value: "20% OFF",
    minOrder: "₹2,999",
    usageLimit: "500",
    used: 500,
    expiry: "Nov 15, 2024",
    status: "Expired",
  },
];

const ANALYTICS_CARDS = [
  { label: "Active Coupons", value: "24", change: "+20.0%", icon: Ticket, trend: "up" },
  { label: "Total Redemptions", value: "8,452", change: "+15.6%", icon: TrendingUp, trend: "up" },
  { label: "Revenue Saved", value: "₹2,45,780", change: "+18.3%", icon: BadgeDollarSign, trend: "up" },
  { label: "Expired Coupons", value: "12", change: "-7.1%", icon: Clock, trend: "down" },
];

const TYPE_COLORS: Record<string, string> = {
  "Percentage": "text-purple-500 bg-purple-500/10 border-purple-500/20",
  "Flat": "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "Free Shipping": "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
};

const STATUS_COLORS: Record<string, string> = {
  "Active": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "Expired": "text-rose-500 bg-rose-500/10 border-rose-500/20",
  "Scheduled": "text-amber-500 bg-amber-500/10 border-amber-500/20",
  "Disabled": "text-white/40 bg-white/5 border-white/10",
};

const TYPE_STATS = [
  { label: "Percentage", value: "11", percent: "45.8%", color: "bg-amber-500", stroke: "#f59e0b" },
  { label: "Flat Discount", value: "7", percent: "29.2%", color: "bg-blue-500", stroke: "#3b82f6" },
  { label: "Free Shipping", value: "4", percent: "16.7%", color: "bg-emerald-500", stroke: "#10b981" },
  { label: "Others", value: "2", percent: "8.3%", color: "bg-white/20", stroke: "rgba(255,255,255,0.2)" },
];

const TOP_COUPONS = [
  { code: "FREESHIP", uses: "1,245 uses", icon: Ticket, color: "text-emerald-500" },
  { code: "WELCOME10", uses: "231 uses", icon: Ticket, color: "text-amber-500" },
  { code: "HOLI10", uses: "289 uses", icon: Ticket, color: "text-purple-500" },
  { code: "EXTRA15", uses: "156 uses", icon: Ticket, color: "text-purple-500" },
  { code: "NEW25", uses: "102 uses", icon: Ticket, color: "text-cyan-500" },
];

const RECENT_ACTIVITY = [
  { action: "Coupon FLAT200 updated", time: "2 hours ago", icon: History },
  { action: "New coupon SAVE500 created", time: "5 hours ago", icon: Plus },
  { action: "Coupon VIP20 activated", time: "1 day ago", icon: Ticket },
  { action: "Coupon WINTER15 expired", time: "2 days ago", icon: Clock },
];

export default function CouponsPage() {
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selectedCoupons.length === COUPONS_DATA.length) setSelectedCoupons([]);
    else setSelectedCoupons(COUPONS_DATA.map((c) => c.id));
  };

  const toggleSelect = (id: number) => {
    if (selectedCoupons.includes(id)) setSelectedCoupons(selectedCoupons.filter((c) => c !== id));
    else setSelectedCoupons([...selectedCoupons, id]);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-10">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-serif text-white tracking-tight">Coupons & Discounts Management</h1>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
              Create, manage and track all coupons and discounts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/[0.05]">
              <Download size={14} className="text-primary/60" />
              Export
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-primary/90 shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]"
            >
              <Plus size={14} />
              Create Coupon
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ANALYTICS_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                  <card.icon size={16} strokeWidth={1.5} />
                </div>
                <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{card.label}</p>
              </div>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">{card.value}</h3>
              </div>
              <div className="mt-2 flex items-center justify-between">
                 <div className={`flex items-center gap-1 text-[9px] font-bold ${card.trend === 'up' ? 'text-amber-500' : 'text-rose-500'}`}>
                  {card.trend === 'up' ? '↗' : '↘'} {card.change} <span className="text-white/20 ml-1 font-medium">vs last month</span>
                 </div>
                 {/* Micro Sparkline */}
                 <div className="h-4 w-12 opacity-50">
                   <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                     <path d={card.trend === 'up' ? "M0,25 Q10,22 20,28 T40,25 T60,15 T80,20 T100,5" : "M0,5 Q10,12 20,8 T40,15 T60,25 T80,20 T100,25"} fill="none" stroke="currentColor" strokeWidth="3" className={card.trend === 'up' ? "text-primary" : "text-rose-500"} />
                   </svg>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full max-w-5xl">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="text"
                  placeholder="Search coupon code..."
                  className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Status:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>Active</option>
                    <option>Expired</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Discount Type:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>Percentage</option>
                    <option>Flat</option>
                    <option>Free Shipping</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Usage:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>High Usage</option>
                    <option>Low Usage</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Expiry:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>Expiring Soon</option>
                    <option>Expired</option>
                 </select>
              </div>
              <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                <Filter size={14} />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-8 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  <th className="py-4 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedCoupons.length === COUPONS_DATA.length}
                      onChange={toggleSelectAll}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                    />
                  </th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Coupon Code</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Description</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Discount Type</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Discount Value</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Min. Order</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Usage Limit</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Used</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Expiry Date</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Status</th>
                  <th className="py-4 px-4 text-center text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {COUPONS_DATA.map((coupon) => (
                  <tr key={coupon.id} className="group border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                    <td className="py-5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedCoupons.includes(coupon.id)}
                        onChange={() => toggleSelect(coupon.id)}
                        className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                      />
                    </td>
                    <td className="py-5 px-4">
                      <span className="inline-block border border-primary/20 text-primary bg-primary/5 rounded-lg px-3 py-1.5 text-[11px] font-bold tracking-widest">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-[11px] text-white/60 max-w-[200px] truncate leading-relaxed">{coupon.description}</p>
                    </td>
                    <td className="py-5 px-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${TYPE_COLORS[coupon.type] || 'text-white/40 border-white/10'}`}>
                        {coupon.type}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-[11px] text-white font-bold">{coupon.value}</td>
                    <td className="py-5 px-4 text-[11px] text-white/50">{coupon.minOrder}</td>
                    <td className="py-5 px-4 text-[11px] text-white/50">{coupon.usageLimit}</td>
                    <td className="py-5 px-4 text-[11px] text-white font-bold">{coupon.used}</td>
                    <td className="py-5 px-4 text-[10px] text-white/50">{coupon.expiry}</td>
                    <td className="py-5 px-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${STATUS_COLORS[coupon.status]}`}>
                        {coupon.status}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all">
                          <MoreHorizontal size={14} />
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
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Showing 1 to 10 of 24 coupons</p>
            <div className="flex items-center gap-2">
               <button className="p-2 rounded-lg border border-white/[0.05] text-white/20 hover:text-white transition-all">
                  <ChevronLeft size={16} />
               </button>
               {[1, 2, 3, "...", 24].map((p, i) => (
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
               <ChevronDown size={14} className="text-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Analytics */}
      <aside className="w-full xl:w-[340px] space-y-6">
        {/* Coupons Analytics Chart */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Coupons Analytics</h3>
            <select className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white/40 focus:outline-none">
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="relative h-32 w-full mt-4">
            <div className="absolute inset-0 flex flex-col justify-between opacity-5">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-[1px] w-full bg-white" />)}
            </div>
            <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="couponGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(214, 195, 165, 0.2)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M0,130 L40,120 L80,90 L120,80 L160,95 L200,70 L240,60 L280,30 L320,40 L360,20 L400,10 V150 H0 Z"
                fill="url(#couponGrowthGradient)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M0,130 L40,120 L80,90 L120,80 L160,95 L200,70 L240,60 L280,30 L320,40 L360,20 L400,10"
                fill="none"
                stroke="rgba(214, 195, 165, 1)"
                strokeWidth="2"
                className="drop-shadow-[0_0_8px_rgba(214,195,165,0.4)]"
              />
              <circle cx="400" cy="10" r="4" fill="rgba(214, 195, 165, 1)" />
              <rect x="360" y="-15" width="40" height="18" rx="4" fill="rgba(214, 195, 165, 0.1)" stroke="rgba(214, 195, 165, 0.3)" />
              <text x="380" y="-3" fill="rgba(214, 195, 165, 1)" fontSize="9" fontWeight="bold" textAnchor="middle">8,452</text>
            </svg>
            <div className="absolute -left-6 inset-y-0 flex flex-col justify-between text-[8px] text-white/20 font-bold text-right pr-2">
               <span>10K</span>
               <span>8K</span>
               <span>6K</span>
               <span>4K</span>
               <span>2K</span>
               <span>0</span>
            </div>
            <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[8px] text-white/20 font-bold uppercase pl-2">
               <span>May 1</span>
               <span>May 8</span>
               <span>May 15</span>
               <span>May 22</span>
               <span>May 29</span>
            </div>
          </div>
        </div>

        {/* Discount Types Distribution Donut */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <h3 className="text-sm font-serif text-white tracking-wide mb-6">Discount Types Distribution</h3>
          
          <div className="relative flex justify-center py-4">
            <svg viewBox="0 0 100 100" className="w-40 h-40 -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
              {/* Percentage */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.458 }}
                transition={{ duration: 1 }}
                cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round"
              />
              {/* Flat Discount */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.292 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-115" strokeLinecap="round"
              />
              {/* Free Shipping */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.167 }}
                transition={{ duration: 1, delay: 0.6 }}
                cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-188.4" strokeLinecap="round"
              />
              {/* Others */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.083 }}
                transition={{ duration: 1, delay: 0.8 }}
                cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-230.3" strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-white tracking-tight">24</p>
              <p className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Total</p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {TYPE_STATS.map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-[10px] text-white/50">{item.label}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40"><span className="font-bold text-white mr-2">{item.percent}</span>({item.value})</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Coupons by Usage */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Top Coupons by Usage</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-4">
            {TOP_COUPONS.map((coupon, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] p-2 -mx-2 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center ${coupon.color}`}>
                    <coupon.icon size={14} />
                  </div>
                  <p className="text-[10px] font-bold text-white tracking-widest uppercase">{coupon.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-white/50">{coupon.uses}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Recent Activity</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-5">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 relative">
                <div className="h-8 w-8 shrink-0 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/40 z-10 relative">
                  <activity.icon size={14} />
                </div>
                {i !== RECENT_ACTIVITY.length - 1 && (
                  <div className="absolute top-8 left-4 bottom-[-1.25rem] w-px bg-white/[0.05] z-0" />
                )}
                <div className="pt-1.5">
                  <p className="text-[10px] text-white/60 leading-snug">
                    {activity.action}
                  </p>
                  <p className="text-[8px] font-bold text-white/30 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Create Coupon Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0a0a0c] border border-white/[0.05] rounded-3xl w-full max-w-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative"
            >
              <div className="flex items-center justify-between border-b border-white/[0.05] px-6 py-5">
                <h2 className="text-lg font-serif text-white tracking-wide">Create New Coupon</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/[0.05] text-white/40 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Coupon Code</label>
                    <input type="text" placeholder="e.g. SUMMER25" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 uppercase" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Discount Type</label>
                    <select className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white/60 focus:outline-none appearance-none">
                      <option>Percentage (%)</option>
                      <option>Flat Amount (₹)</option>
                      <option>Free Shipping</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Description</label>
                  <textarea placeholder="Enter coupon description..." className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 h-24 resize-none" />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Discount Value</label>
                    <input type="text" placeholder="e.g. 25" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Minimum Order Amount</label>
                    <input type="text" placeholder="e.g. 999" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Usage Limit</label>
                    <input type="text" placeholder="e.g. 100" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Expiry Date</label>
                    <input type="date" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white/60 focus:outline-none focus:border-primary/40" />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input type="checkbox" id="activeToggle" className="h-4 w-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40 accent-primary" defaultChecked />
                  <label htmlFor="activeToggle" className="text-[11px] text-white/70 font-medium cursor-pointer">Mark coupon as active immediately</label>
                </div>
              </div>

              <div className="border-t border-white/[0.05] px-6 py-5 flex items-center justify-end gap-4 bg-[#050308]/50">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-primary text-[#050308] text-[10px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]"
                >
                  Save Coupon
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
