"use client";

import { motion } from "framer-motion";
import {
  Search,
  Download,
  Filter,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  UserCheck,
  UserPlus,
  Crown,
  RefreshCw,
  Plus,
} from "lucide-react";
import { useState } from "react";

// Mock Data
const CUSTOMERS_DATA = [
  {
    id: 1,
    name: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 98765 43210",
    avatar: "/assets/product.jpeg",
    orders: 12,
    spent: "₹45,780",
    segment: "VIP",
    status: "Active",
    lastActivity: "2 hours ago",
    joinedDate: "May 12, 2024",
  },
  {
    id: 2,
    name: "Sneha Kapoor",
    email: "sneha@example.com",
    phone: "+91 91234 56789",
    avatar: "/assets/product.jpeg",
    orders: 8,
    spent: "₹32,450",
    segment: "Repeat Buyer",
    status: "Active",
    lastActivity: "1 day ago",
    joinedDate: "Mar 18, 2024",
  },
  {
    id: 3,
    name: "Rohan Verma",
    email: "rohan@example.com",
    phone: "+91 99887 76655",
    avatar: "/assets/product.jpeg",
    orders: 15,
    spent: "₹67,890",
    segment: "High Spending",
    status: "Active",
    lastActivity: "3 hours ago",
    joinedDate: "Jan 22, 2024",
  },
  {
    id: 4,
    name: "Ishita Rao",
    email: "ishita@example.com",
    phone: "+91 90909 90909",
    avatar: "/assets/product.jpeg",
    orders: 6,
    spent: "₹18,760",
    segment: "New Customer",
    status: "Active",
    lastActivity: "5 hours ago",
    joinedDate: "May 24, 2025",
  },
  {
    id: 5,
    name: "Karan Malhotra",
    email: "karan@example.com",
    phone: "+91 88776 65544",
    avatar: "/assets/product.jpeg",
    orders: 10,
    spent: "₹38,990",
    segment: "Repeat Buyer",
    status: "Active",
    lastActivity: "1 day ago",
    joinedDate: "Apr 30, 2024",
  },
  {
    id: 6,
    name: "Meera Joshi",
    email: "meera@example.com",
    phone: "+91 77665 54433",
    avatar: "/assets/product.jpeg",
    orders: 4,
    spent: "₹12,450",
    segment: "New Customer",
    status: "Active",
    lastActivity: "2 days ago",
    joinedDate: "May 20, 2025",
  },
  {
    id: 7,
    name: "Dev Sharma",
    email: "dev@example.com",
    phone: "+91 66554 43322",
    avatar: "/assets/product.jpeg",
    orders: 0,
    spent: "₹0",
    segment: "Inactive",
    status: "Inactive",
    lastActivity: "15 days ago",
    joinedDate: "Nov 12, 2023",
  },
  {
    id: 8,
    name: "Aditi Singh",
    email: "aditi@example.com",
    phone: "+91 55443 32211",
    avatar: "/assets/product.jpeg",
    orders: 7,
    spent: "₹25,600",
    segment: "Repeat Buyer",
    status: "Active",
    lastActivity: "4 hours ago",
    joinedDate: "Feb 14, 2024",
  },
  {
    id: 9,
    name: "Vikram Menon",
    email: "vikram@example.com",
    phone: "+91 44332 21100",
    avatar: "/assets/product.jpeg",
    orders: 11,
    spent: "₹41,230",
    segment: "High Spending",
    status: "Active",
    lastActivity: "1 day ago",
    joinedDate: "Dec 03, 2023",
  },
  {
    id: 10,
    name: "Ananya Iyer",
    email: "ananya@example.com",
    phone: "+91 33221 10099",
    avatar: "/assets/product.jpeg",
    orders: 3,
    spent: "₹9,870",
    segment: "New Customer",
    status: "Active",
    lastActivity: "3 days ago",
    joinedDate: "May 18, 2025",
  },
];

const ANALYTICS_CARDS = [
  { label: "Total Customers", value: "2,548", change: "+18.6%", icon: Users },
  { label: "Active Customers", value: "1,897", change: "+14.2%", icon: UserCheck },
  { label: "Repeat Customers", value: "986", change: "+12.8%", icon: RefreshCw },
  { label: "New Customers", value: "432", change: "+8.4%", icon: UserPlus },
  { label: "VIP Customers", value: "213", change: "+16.3%", icon: Crown },
];

const SEGMENT_COLORS: Record<string, string> = {
  "VIP": "text-amber-500 bg-amber-500/10 border-amber-500/20",
  "Repeat Buyer": "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "High Spending": "text-purple-500 bg-purple-500/10 border-purple-500/20",
  "New Customer": "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  "Inactive": "text-white/40 bg-white/5 border-white/10",
};

const STATUS_COLORS: Record<string, string> = {
  "Active": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "Inactive": "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

const SEGMENT_STATS = [
  { label: "VIP", value: "213", percent: "8.4%", color: "bg-amber-500", stroke: "#f59e0b" },
  { label: "Repeat Buyer", value: "986", percent: "38.7%", color: "bg-blue-500", stroke: "#3b82f6" },
  { label: "New Customer", value: "432", percent: "17.0%", color: "bg-emerald-500", stroke: "#10b981" },
  { label: "High Spending", value: "547", percent: "21.5%", color: "bg-purple-500", stroke: "#a855f7" },
  { label: "Inactive", value: "370", percent: "14.5%", color: "bg-white/20", stroke: "rgba(255,255,255,0.2)" },
];

const TOP_SPENDING = [
  { name: "Rohan Verma", orders: 15, spent: "₹67,890", avatar: "/assets/product.jpeg" },
  { name: "Arjun Mehta", orders: 12, spent: "₹45,780", avatar: "/assets/product.jpeg" },
  { name: "Vikram Menon", orders: 11, spent: "₹41,230", avatar: "/assets/product.jpeg" },
  { name: "Karan Malhotra", orders: 10, spent: "₹38,990", avatar: "/assets/product.jpeg" },
  { name: "Sneha Kapoor", orders: 8, spent: "₹32,450", avatar: "/assets/product.jpeg" },
];

const RECENT_ACTIVITY = [
  { user: "Arjun Mehta", action: "placed a new order", time: "2 hours ago", avatar: "/assets/product.jpeg" },
  { user: "Sneha Kapoor", action: "updated their profile", time: "1 day ago", avatar: "/assets/product.jpeg" },
  { user: "Ishita Rao", action: "added items to wishlist", time: "5 hours ago", avatar: "/assets/product.jpeg" },
  { user: "Rohan Verma", action: "placed a new order", time: "1 day ago", avatar: "/assets/product.jpeg" },
];

export default function CustomersPage() {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedCustomers.length === CUSTOMERS_DATA.length) setSelectedCustomers([]);
    else setSelectedCustomers(CUSTOMERS_DATA.map((c) => c.id));
  };

  const toggleSelect = (id: number) => {
    if (selectedCustomers.includes(id)) setSelectedCustomers(selectedCustomers.filter((c) => c !== id));
    else setSelectedCustomers([...selectedCustomers, id]);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-10">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-serif text-white tracking-tight">Customers Management</h1>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
              Manage your customers and view their details and activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/[0.05]">
              <Download size={14} className="text-primary/60" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-primary/90 shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]">
              <Plus size={14} />
              Add Customer
            </button>
          </div>
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
                 <div className="flex items-center gap-1 text-[9px] font-bold text-amber-500">
                  ↗ {card.change} <span className="text-white/20 ml-1 font-medium">vs last month</span>
                 </div>
                 {/* Micro Sparkline */}
                 <div className="h-4 w-12 opacity-50">
                   <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                     <path d="M0,25 Q10,22 20,28 T40,25 T60,15 T80,20 T100,5" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary" />
                   </svg>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full max-w-4xl">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Status:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Spending:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>High Spending</option>
                    <option>Low Spending</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Activity:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>Recent</option>
                    <option>Inactive (30d+)</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Segment:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>VIP</option>
                    <option>Repeat Buyer</option>
                 </select>
              </div>
              <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                <Filter size={14} />
                Filter
              </button>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold whitespace-nowrap">Sort by:</span>
              <select className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Highest Spent</option>
                <option>Most Orders</option>
              </select>
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
                      checked={selectedCustomers.length === CUSTOMERS_DATA.length}
                      onChange={toggleSelectAll}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                    />
                  </th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Customer</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Email</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Phone</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Total Orders</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Total Spent</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Segment</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Status</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Last Activity</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Joined Date</th>
                  <th className="py-4 px-4 text-center text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {CUSTOMERS_DATA.map((customer) => (
                  <tr key={customer.id} className="group border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                    <td className="py-5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => toggleSelect(customer.id)}
                        className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                      />
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden">
                          <img src={customer.avatar} className="w-full h-full object-cover opacity-80" />
                        </div>
                        <p className="text-[11px] font-bold text-white tracking-wide">{customer.name}</p>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-[11px] text-white/50">{customer.email}</td>
                    <td className="py-5 px-4 text-[11px] text-white/50">{customer.phone}</td>
                    <td className="py-5 px-4 text-[11px] text-white font-bold">{customer.orders}</td>
                    <td className="py-5 px-4 text-[11px] text-white font-bold">{customer.spent}</td>
                    <td className="py-5 px-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${SEGMENT_COLORS[customer.segment]}`}>
                        {customer.segment}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${STATUS_COLORS[customer.status]}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-[10px] text-white/50">{customer.lastActivity}</td>
                    <td className="py-5 px-4 text-[10px] text-white/50">{customer.joinedDate}</td>
                    <td className="py-5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all">
                          <Eye size={14} />
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
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Showing 1 to 10 of 2,548 customers</p>
            <div className="flex items-center gap-2">
               <button className="p-2 rounded-lg border border-white/[0.05] text-white/20 hover:text-white transition-all">
                  <ChevronLeft size={16} />
               </button>
               {[1, 2, 3, 4, 5, "...", 255].map((p, i) => (
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
        {/* Customer Growth Chart */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Customer Growth</h3>
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
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(214, 195, 165, 0.2)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M0,130 L40,110 L80,120 L120,80 L160,90 L200,60 L240,70 L280,40 L320,50 L360,20 L400,10 V150 H0 Z"
                fill="url(#growthGradient)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M0,130 L40,110 L80,120 L120,80 L160,90 L200,60 L240,70 L280,40 L320,50 L360,20 L400,10"
                fill="none"
                stroke="rgba(214, 195, 165, 1)"
                strokeWidth="2"
                className="drop-shadow-[0_0_8px_rgba(214,195,165,0.4)]"
              />
              <circle cx="400" cy="10" r="4" fill="rgba(214, 195, 165, 1)" />
              <rect x="360" y="-15" width="40" height="18" rx="4" fill="rgba(214, 195, 165, 0.1)" stroke="rgba(214, 195, 165, 0.3)" />
              <text x="380" y="-3" fill="rgba(214, 195, 165, 1)" fontSize="9" fontWeight="bold" textAnchor="middle">2,548</text>
            </svg>
            <div className="absolute -left-6 inset-y-0 flex flex-col justify-between text-[8px] text-white/20 font-bold text-right pr-2">
               <span>3K</span>
               <span>2.5K</span>
               <span>2K</span>
               <span>1.5K</span>
               <span>1K</span>
               <span>500</span>
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

        {/* Customers by Segment Donut */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <h3 className="text-sm font-serif text-white tracking-wide mb-6">Customers by Segment</h3>
          
          <div className="relative flex justify-center py-4">
            <svg viewBox="0 0 100 100" className="w-40 h-40 -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
              {/* VIP */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.084 }}
                transition={{ duration: 1 }}
                cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round"
              />
              {/* Repeat Buyer */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.387 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-21.1" strokeLinecap="round"
              />
              {/* New Customer */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.17 }}
                transition={{ duration: 1, delay: 0.6 }}
                cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-118.3" strokeLinecap="round"
              />
              {/* High Spending */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.215 }}
                transition={{ duration: 1, delay: 0.8 }}
                cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-161" strokeLinecap="round"
              />
              {/* Inactive */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.145 }}
                transition={{ duration: 1, delay: 1 }}
                cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-215" strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-white tracking-tight">2,548</p>
              <p className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Total</p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {SEGMENT_STATS.map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-[10px] text-white/50">{item.label}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/40"><span className="font-bold text-white mr-2">{item.value}</span>({item.percent})</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Spending Customers */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Top Spending Customers</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-4">
            {TOP_SPENDING.map((customer, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden">
                    <img src={customer.avatar} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <p className="text-[10px] font-bold text-white tracking-wide">{customer.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white">{customer.spent}</p>
                  <p className="text-[8px] text-white/30 font-medium mt-0.5">{customer.orders} Orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Recent Customer Activity</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-5">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden">
                  <img src={activity.avatar} className="w-full h-full object-cover opacity-60" />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 leading-snug">
                    <span className="font-bold text-white">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-[8px] font-bold text-white/20 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
