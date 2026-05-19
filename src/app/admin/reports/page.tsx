"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Download,
  Search,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Percent,
  ChevronDown,
  ArrowUpRight,
  MapPin,
  Clock,
  ChevronRight,
  Eye,
  Award,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";

// Mock Data
const ANALYTICS_CARDS = [
  { label: "Total Revenue", value: "₹ 24,68,450", change: "+18.6%", trend: "up", sub: "vs last month", icon: DollarSign },
  { label: "Monthly Revenue", value: "₹ 8,42,300", change: "+12.4%", trend: "up", sub: "vs last month", icon: TrendingUp },
  { label: "Average Order Value", value: "₹ 2,845", change: "+8.7%", trend: "up", sub: "vs last month", icon: ShoppingBag },
  { label: "Revenue Growth", value: "18.6%", change: "+4.3%", trend: "up", sub: "vs last month", icon: Percent },
];

const TOP_PRODUCTS = [
  { rank: 1, name: "Oud Noir", type: "Extrait de Parfum", revenue: "₹4,25,600", sold: "852 Sold", image: "/assets/product.jpeg" },
  { rank: 2, name: "Amber Majesty", type: "Extrait de Parfum", revenue: "₹3,15,750", sold: "631 Sold", image: "/assets/product.jpeg" },
  { rank: 3, name: "Velvet Rose", type: "Eau de Parfum", revenue: "₹2,85,300", sold: "572 Sold", image: "/assets/product.jpeg" },
  { rank: 4, name: "Royal Musk", type: "Extrait de Parfum", revenue: "₹2,25,450", sold: "451 Sold", image: "/assets/product.jpeg" },
  { rank: 5, name: "Citrus Bleu", type: "Eau de Toilette", revenue: "₹1,98,250", sold: "396 Sold", image: "/assets/product.jpeg" },
];

const CUSTOMER_STATS = [
  { label: "New Customers", value: "1,248", change: "+15.3%", sub: "vs last month", sparkline: [10, 15, 8, 20, 18, 25, 30] },
  { label: "Repeat Customers", value: "842", change: "+10.8%", sub: "vs last month", sparkline: [5, 10, 15, 12, 20, 22, 28] },
  { label: "Customer Retention", value: "68.4%", change: "+7.2%", sub: "vs last month", sparkline: [50, 52, 55, 58, 60, 64, 68.4] },
  { label: "Customer Lifetime Value", value: "₹ 8,450", change: "+11.6%", sub: "vs last month", sparkline: [6000, 6500, 7000, 7200, 7500, 8000, 8450] },
];

const ORDER_STATS = [
  { label: "Total Orders", value: "8,672", change: "+12.4%", status: "up" },
  { label: "Completed Orders", value: "7,485", change: "+14.6%", status: "up" },
  { label: "Cancelled Orders", value: "842", change: "+6.3%", status: "down" },
  { label: "Returned Orders", value: "345", change: "+3.8%", status: "down" },
  { label: "Return Rate", value: "3.98%", change: "+1.2%", status: "down" },
];

const TOP_LOCATIONS = [
  { name: "Mumbai, MH", revenue: "₹4,25,600", percent: 28 },
  { name: "Delhi, DL", revenue: "₹3,75,450", percent: 25 },
  { name: "Bangalore, KA", revenue: "₹2,85,300", percent: 19 },
  { name: "Hyderabad, TG", revenue: "₹2,15,250", percent: 14 },
  { name: "Chennai, TN", revenue: "₹1,66,850", percent: 11 },
];

const RECENT_ACTIVITY = [
  { action: "High order volume detected", time: "2 min ago", type: "warning" },
  { action: "Revenue target achieved", time: "1 hour ago", type: "success" },
  { action: "New best selling product", time: "3 hours ago", type: "info" },
  { action: "Low stock alert for 5 products", time: "5 hours ago", type: "error" },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("May 1, 2024 - May 29, 2024");
  const [salesPeriod, setSalesPeriod] = useState("Daily");

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-10">
      {/* Left Main Content */}
      <div className="flex-1 space-y-8 min-w-0">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-serif text-white tracking-tight">Reports & Analytics</h1>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
              Real-time platform insights, custom business intelligence and predictive metrics
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 cursor-pointer hover:bg-white/[0.04] transition-all">
                <Calendar size={14} className="text-primary/70" />
                <span>{dateRange}</span>
                <ChevronDown size={14} className="text-white/20" />
             </div>
             <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-primary/90 shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]">
               <Download size={14} />
               Export Report
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
              <div className="flex items-center justify-between mb-4">
                <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{card.label}</p>
                <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary/70">
                  <card.icon size={16} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{card.value}</h3>
              <div className="mt-3 flex items-center justify-between">
                 <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5">
                   ↗ {card.change} <span className="text-white/20 ml-1 font-medium">{card.sub}</span>
                 </span>
                 <div className="h-4 w-12 opacity-50">
                   <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                     <path d="M0,25 Q10,22 20,28 T40,25 T60,15 T80,20 T100,5" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary" />
                   </svg>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts & Categorization */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Sales Overview Line Chart */}
          <div className="lg:col-span-2 rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between">
             <div className="flex items-center justify-between mb-6">
                <div>
                   <h3 className="text-sm font-serif text-white tracking-wide">Sales Overview</h3>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 text-white/60"><div className="h-2 w-2 rounded-full bg-primary" /> Revenue (₹)</span>
                      <span className="flex items-center gap-1.5 text-white/60"><div className="h-2 w-2 rounded-full bg-blue-500" /> Orders</span>
                   </div>
                   <select 
                     value={salesPeriod}
                     onChange={(e) => setSalesPeriod(e.target.value)}
                     className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white/40 focus:outline-none"
                   >
                     <option>Daily</option>
                     <option>Weekly</option>
                     <option>Monthly</option>
                   </select>
                </div>
             </div>

             <div className="relative h-64 w-full px-2">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                   {[1,2,3,4,5].map(i => <div key={i} className="h-[1px] w-full bg-white" />)}
                </div>

                <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible">
                   {/* Area/Line for Revenue */}
                   <path
                     d="M0,180 L50,140 L100,160 L155,130 L210,145 L260,110 L310,120 L365,95 L420,110 L470,80 L520,95 L570,60 L600,50"
                     fill="none"
                     stroke="rgba(214, 195, 165, 1)"
                     strokeWidth="2.5"
                     className="drop-shadow-[0_0_8px_rgba(214,195,165,0.4)]"
                   />
                   {/* Dots on points for Revenue */}
                   {[
                     {x: 0, y: 180}, {x: 50, y: 140}, {x: 100, y: 160}, {x: 155, y: 130},
                     {x: 210, y: 145}, {x: 260, y: 110}, {x: 310, y: 120}, {x: 365, y: 95},
                     {x: 420, y: 110}, {x: 470, y: 80}, {x: 520, y: 95}, {x: 570, y: 60}, {x: 600, y: 50}
                   ].map((pt, i) => (
                     <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="rgba(214, 195, 165, 1)" stroke="#050308" strokeWidth="1.5" />
                   ))}

                   {/* Line for Orders */}
                   <path
                     d="M0,200 L50,180 L100,190 L155,170 L210,185 L260,150 L310,165 L365,140 L420,155 L470,120 L520,135 L570,110 L600,90"
                     fill="none"
                     stroke="#3b82f6"
                     strokeWidth="2.5"
                     className="drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                   />
                </svg>

                {/* Left Y Axis */}
                <div className="absolute left-[-2rem] inset-y-0 flex flex-col justify-between text-[7px] text-white/20 font-bold text-right pr-2">
                   <span>₹1,00,000</span>
                   <span>₹80,000</span>
                   <span>₹60,000</span>
                   <span>₹40,000</span>
                   <span>₹20,000</span>
                   <span>₹0</span>
                </div>
                {/* Right Y Axis */}
                <div className="absolute right-[-1.5rem] inset-y-0 flex flex-col justify-between text-[7px] text-white/20 font-bold text-left pl-2">
                   <span>500</span>
                   <span>400</span>
                   <span>300</span>
                   <span>200</span>
                   <span>100</span>
                   <span>0</span>
                </div>
                {/* X Axis */}
                <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[7px] text-white/20 font-bold uppercase px-2">
                   <span>May 1</span>
                   <span>May 5</span>
                   <span>May 9</span>
                   <span>May 13</span>
                   <span>May 17</span>
                   <span>May 21</span>
                   <span>May 25</span>
                   <span>May 29</span>
                </div>
             </div>
          </div>

          {/* Sales by Category Donut */}
          <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between">
             <h3 className="text-sm font-serif text-white tracking-wide mb-4">Sales by Category</h3>

             <div className="relative flex justify-center py-4">
                <svg viewBox="0 0 100 100" className="w-36 h-36 -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                  {/* Men */}
                  <motion.circle
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.45 }}
                    transition={{ duration: 1 }}
                    cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round"
                  />
                  {/* Women */}
                  <motion.circle
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.30 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-113" strokeLinecap="round"
                  />
                  {/* Unisex */}
                  <motion.circle
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.15 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-188.4" strokeLinecap="round"
                  />
                  {/* Gift Sets */}
                  <motion.circle
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.10 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-226" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[13px] font-bold text-white tracking-tight">₹24,68,450</p>
                  <p className="text-[7px] uppercase tracking-widest text-white/30 font-bold mt-0.5">Total</p>
                </div>
             </div>

             <div className="space-y-2 mt-4">
                {[
                  { label: "Men", val: "45%", amt: "₹11,10,800", color: "bg-blue-500" },
                  { label: "Women", val: "30%", amt: "₹7,40,535", color: "bg-purple-500" },
                  { label: "Unisex", val: "15%", amt: "₹3,70,268", color: "bg-cyan-500" },
                  { label: "Gift Sets", val: "10%", amt: "₹2,46,847", color: "bg-amber-500" },
                ].map((cat, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${cat.color}`} />
                        <span className="text-[9px] text-white/60 font-semibold">{cat.label}</span>
                     </div>
                     <p className="text-[9px] text-white/40"><span className="font-bold text-white mr-2">{cat.val}</span>({cat.amt})</p>
                  </div>
                ))}
             </div>
          </div>

        </div>

        {/* Lower Row: Top Selling, Customer Overview, Order Overview */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Top Selling Products */}
          <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between">
             <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-3">
                <h3 className="text-sm font-serif text-white tracking-wide">Top Selling Products</h3>
                <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
             </div>
             <div className="space-y-4 flex-1">
                {TOP_PRODUCTS.map((prod) => (
                  <div key={prod.rank} className="flex items-center gap-3">
                     <span className="text-[10px] font-bold text-white/20 w-3">{prod.rank}</span>
                     <div className="h-8 w-8 rounded-lg bg-black/40 overflow-hidden border border-white/[0.05] shrink-0">
                        <img src={prod.image} className="w-full h-full object-cover opacity-75" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-white truncate">{prod.name}</p>
                        <p className="text-[8px] text-white/40 mt-0.5 truncate">{prod.type}</p>
                     </div>
                     <div className="text-right whitespace-nowrap">
                        <p className="text-[10px] font-bold text-white">{prod.revenue}</p>
                        <p className="text-[8px] text-white/40 mt-0.5">{prod.sold}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Customer Overview */}
          <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between">
             <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-3">
                <h3 className="text-sm font-serif text-white tracking-wide">Customer Overview</h3>
             </div>
             <div className="grid grid-cols-2 gap-4 flex-1">
                {CUSTOMER_STATS.map((stat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-colors flex flex-col justify-between">
                     <div>
                        <p className="text-[8px] uppercase tracking-widest text-white/35 font-bold">{stat.label}</p>
                        <p className="text-lg font-bold text-white mt-1">{stat.value}</p>
                     </div>
                     <div className="mt-3 flex items-center justify-between">
                        <span className="text-[8px] font-bold text-emerald-500">{stat.change}</span>
                        {/* Custom Micro Sparkline */}
                        <div className="h-4 w-12 opacity-50">
                           <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                              <path 
                                d={`M0,${30 - stat.sparkline[0]} L16,${30 - stat.sparkline[1]} L32,${30 - stat.sparkline[2]} L48,${30 - stat.sparkline[3]} L64,${30 - stat.sparkline[4]} L80,${30 - stat.sparkline[5]} L100,${30 - stat.sparkline[6]}`} 
                                fill="none" 
                                stroke="#f59e0b" 
                                strokeWidth="2.5" 
                              />
                           </svg>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Order Overview */}
          <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between">
             <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-3">
                <h3 className="text-sm font-serif text-white tracking-wide">Order Overview</h3>
                <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
             </div>
             <div className="space-y-3 flex-1 flex flex-col justify-center">
                {ORDER_STATS.map((order, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <span className="text-[10px] text-white/60 font-medium">{order.label}</span>
                     <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold text-white">{order.value}</span>
                        <span className={`text-[8px] font-bold ${order.status === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                           {order.status === 'up' ? '↗' : '↘'} {order.change}
                        </span>
                     </div>
                  </div>
                ))}
             </div>
          </div>

        </div>

        {/* Sales Trend Chart (Full Width Lower Section) */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
           <div className="flex items-center justify-between mb-6">
              <div>
                 <h3 className="text-sm font-serif text-white tracking-wide">Sales Trend</h3>
              </div>
              <select className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white/40 focus:outline-none">
                 <option>This Year</option>
                 <option>This Quarter</option>
              </select>
           </div>
           
           <div className="relative h-44 w-full px-2">
              <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                 {[1,2,3].map(i => <div key={i} className="h-[1px] w-full bg-white" />)}
              </div>
              
              <svg viewBox="0 0 800 120" className="w-full h-full overflow-visible">
                 <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="rgba(214, 195, 165, 0.2)" />
                       <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                 </defs>
                 <path
                   d="M0,100 L72,80 L144,95 L216,70 L288,85 L360,60 L432,65 L504,45 L576,55 L648,35 L720,40 L800,20 V120 H0 Z"
                   fill="url(#trendGradient)"
                 />
                 <motion.path
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 1.5 }}
                   d="M0,100 L72,80 L144,95 L216,70 L288,85 L360,60 L432,65 L504,45 L576,55 L648,35 L720,40 L800,20"
                   fill="none"
                   stroke="rgba(214, 195, 165, 1)"
                   strokeWidth="2.5"
                 />
              </svg>
              
              <div className="absolute -left-6 inset-y-0 flex flex-col justify-between text-[7px] text-white/20 font-bold text-right pr-2">
                 <span>₹15L</span>
                 <span>₹10L</span>
                 <span>₹5L</span>
                 <span>₹0</span>
              </div>
              <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[7px] text-white/20 font-bold uppercase pl-2">
                 {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
                    <span key={m}>{m}</span>
                 ))}
              </div>
           </div>
        </div>

      </div>

      {/* Right Column Intelligence */}
      <aside className="w-full xl:w-[340px] space-y-6">
        
        {/* Revenue by Month Bar Chart */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-serif text-white tracking-wide">Revenue by Month</h3>
              <select className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white/40 focus:outline-none">
                 <option>This Year</option>
              </select>
           </div>
           
           <div className="relative h-44 w-full mt-4 flex items-end justify-between px-2">
              <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between opacity-5 pointer-events-none">
                 {[1,2,3,4,5].map(i => <div key={i} className="h-[1px] w-full bg-white" />)}
              </div>

              {/* December to May Bars */}
              {[
                { label: "Dec", val: "40%" },
                { label: "Jan", val: "55%" },
                { label: "Feb", val: "70%" },
                { label: "Mar", val: "80%" },
                { label: "Apr", val: "85%" },
                { label: "May", val: "95%", highlight: true },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center w-8 group">
                   <div className="relative w-4 h-32 bg-white/[0.02] border border-white/[0.05] rounded-t-sm overflow-hidden flex items-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: bar.val }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`w-full rounded-t-sm ${bar.highlight ? 'bg-primary' : 'bg-primary/40 group-hover:bg-primary/60 transition-colors'}`} 
                      />
                   </div>
                   <span className="text-[7px] text-white/40 font-bold uppercase mt-2">{bar.label}</span>
                </div>
              ))}

              <div className="absolute -left-6 inset-y-0 flex flex-col justify-between text-[7px] text-white/20 font-bold text-right pr-2">
                 <span>₹10L</span>
                 <span>₹8L</span>
                 <span>₹6L</span>
                 <span>₹4L</span>
                 <span>₹2L</span>
                 <span>₹0</span>
              </div>
           </div>
        </div>

        {/* Sales by Channel Donut */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
           <h3 className="text-sm font-serif text-white tracking-wide mb-6">Sales by Channel</h3>

           <div className="relative flex justify-center py-4">
              <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                {/* Website */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.65 }}
                  transition={{ duration: 1 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round"
                />
                {/* Mobile App */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.20 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-163.2" strokeLinecap="round"
                />
                {/* Marketplace */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.10 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-213.5" strokeLinecap="round"
                />
                {/* Others */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.05 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#f43f5e" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-238.6" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[11px] font-bold text-white tracking-tight">₹24,68,450</p>
                <p className="text-[6px] uppercase tracking-widest text-white/30 font-bold mt-0.5">Total</p>
              </div>
           </div>

           <div className="space-y-2 mt-6">
              {[
                { label: "Website", val: "65%", amt: "₹16,03,493", color: "bg-blue-500" },
                { label: "Mobile App", val: "20%", amt: "₹4,93,690", color: "bg-emerald-500" },
                { label: "Marketplace", val: "10%", amt: "₹2,46,847", color: "bg-purple-500" },
                { label: "Others", val: "5%", amt: "₹1,24,420", color: "bg-rose-500" },
              ].map((channel, i) => (
                <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${channel.color}`} />
                      <span className="text-[9px] text-white/60 font-semibold">{channel.label}</span>
                   </div>
                   <p className="text-[9px] text-white/40"><span className="font-bold text-white mr-2">{channel.val}</span>({channel.amt})</p>
                </div>
              ))}
           </div>
        </div>

        {/* Top Locations */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-serif text-white tracking-wide">Top Locations</h3>
              <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
           </div>
           <div className="space-y-4">
              {TOP_LOCATIONS.map((loc, i) => (
                <div key={i} className="space-y-1.5">
                   <div className="flex items-center justify-between text-[10px] font-medium text-white/60">
                      <span className="flex items-center gap-1.5"><MapPin size={10} className="text-primary/70" /> {loc.name}</span>
                      <span>{loc.revenue} <span className="text-white/30 ml-2">({loc.percent}%)</span></span>
                   </div>
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${loc.percent}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="bg-primary h-full" 
                      />
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
           <div className="space-y-4">
              {RECENT_ACTIVITY.map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className="h-2 w-2 rounded-full shrink-0 bg-primary animate-pulse" />
                   <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white/70 font-semibold truncate">{activity.action}</p>
                      <p className="text-[8px] text-white/30 mt-0.5">{activity.time}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

      </aside>
    </div>
  );
}
