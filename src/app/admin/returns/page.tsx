"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Download,
  Plus,
  Search,
  ChevronDown,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Percent,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  User,
  Paperclip,
  CheckCircle2,
  X,
  RefreshCw,
  Sparkles,
  Banknote,
  Grid,
  Filter,
} from "lucide-react";
import { useState } from "react";

// Mock Data for Returns with Return Type
const INITIAL_RETURNS = [
  {
    id: "RET-2024-0248",
    orderId: "ORD-2024-0687",
    customer: { name: "Sneha Reddy", email: "sneha@email.com", phone: "+91 98765 43210" },
    product: { name: "Oud Noir", spec: "Eau de Parfum (100ml)", image: "/assets/product.jpeg", price: "₹ 3,499", qty: 1 },
    reason: "Damaged Product",
    note: "The bottle arrived damaged and leaking. Please check the attached images.",
    refundAmount: "₹ 3,499",
    status: "Pending",
    type: "Refund Only",
    date: "May 29, 2024\n10:30 AM",
    attachments: ["/assets/product.jpeg", "/assets/product.jpeg", "/assets/product.jpeg"],
  },
  {
    id: "RET-2024-0247",
    orderId: "ORD-2024-0686",
    customer: { name: "Rohan Mehta", email: "rohan@email.com", phone: "+91 98765 43211" },
    product: { name: "Amber Majesty", spec: "Extrait de Parfum (50ml)", image: "/assets/product.jpeg", price: "₹ 2,799", qty: 1 },
    reason: "Not as Described",
    note: "The fragrance notes are vastly different from the description online.",
    refundAmount: "₹ 2,799",
    status: "Under Review",
    type: "Return",
    date: "May 29, 2024\n09:15 AM",
    attachments: [],
  },
  {
    id: "RET-2024-0246",
    orderId: "ORD-2024-0685",
    customer: { name: "Ananya Sharma", email: "ananya@email.com", phone: "+91 98765 43212" },
    product: { name: "Velvet Rose", spec: "Eau de Parfum (100ml)", image: "/assets/product.jpeg", price: "₹ 3,299", qty: 1 },
    reason: "Changed My Mind",
    note: "Decided to go with another scent instead.",
    refundAmount: "₹ 3,299",
    status: "Approved",
    type: "Exchange",
    date: "May 28, 2024\n06:45 PM",
    attachments: [],
  },
  {
    id: "RET-2024-0245",
    orderId: "ORD-2024-0684",
    customer: { name: "Vikram Singh", email: "vikram@email.com", phone: "+91 98765 43213" },
    product: { name: "Citrus Bleu", spec: "Eau de Toilette (100ml)", image: "/assets/product.jpeg", price: "₹ 1,899", qty: 1 },
    reason: "Damaged Product",
    note: "Atomizer is faulty and doesn't spray properly.",
    refundAmount: "₹ 1,899",
    status: "Refunded",
    type: "Refund Only",
    date: "May 28, 2024\n04:20 PM",
    attachments: [],
  },
  {
    id: "RET-2024-0244",
    orderId: "ORD-2024-0683",
    customer: { name: "Isha Verma", email: "isha@email.com", phone: "+91 98765 43214" },
    product: { name: "Royal Musk", spec: "Extrait de Parfum (50ml)", image: "/assets/product.jpeg", price: "₹ 2,499", qty: 1 },
    reason: "Wrong Item",
    note: "Received Amber Majesty instead of Royal Musk.",
    refundAmount: "₹ 2,499",
    status: "Replacement Sent",
    type: "Replacement",
    date: "May 27, 2024\n11:30 AM",
    attachments: [],
  },
  {
    id: "RET-2024-0243",
    orderId: "ORD-2024-0682",
    customer: { name: "Arjun Kapoor", email: "arjun@email.com", phone: "+91 98765 43215" },
    product: { name: "Oud Noir", spec: "Eau de Parfum (100ml)", image: "/assets/product.jpeg", price: "₹ 3,499", qty: 1 },
    reason: "Not as Expected",
    note: "Longevity is extremely poor, lasts less than an hour.",
    refundAmount: "₹ 3,499",
    status: "Rejected",
    type: "Return",
    date: "May 27, 2024\n10:05 AM",
    attachments: [],
  },
  {
    id: "RET-2024-0242",
    orderId: "ORD-2024-0681",
    customer: { name: "Meera Joshi", email: "meera@email.com", phone: "+91 98765 43216" },
    product: { name: "Amber Majesty", spec: "Extrait de Parfum (50ml)", image: "/assets/product.jpeg", price: "₹ 2,799", qty: 1 },
    reason: "Leaking Bottle",
    note: "Cap was loose and perfume spilled inside the box.",
    refundAmount: "₹ 2,799",
    status: "Refunded",
    type: "Refund Only",
    date: "May 26, 2024\n08:40 PM",
    attachments: [],
  },
];

const ANALYTICS_CARDS = [
  { label: "Total Return Requests", value: "248", change: "+18.6%", trend: "up", color: "text-amber-500", icon: RotateCcw },
  { label: "Pending Refunds", value: "52", change: "+12.4%", trend: "up", color: "text-amber-500", icon: AlertTriangle },
  { label: "Approved Returns", value: "132", change: "+15.7%", trend: "up", color: "text-emerald-500", icon: CheckCircle },
  { label: "Rejected Returns", value: "28", change: "-6.3%", trend: "down", color: "text-rose-500", icon: XCircle },
  { label: "Refund Amount", value: "₹ 1,85,640", change: "+22.8%", trend: "up", color: "text-amber-500", icon: TrendingUp },
];

const STATUS_COLORS: Record<string, string> = {
  "Pending": "text-amber-500 bg-amber-500/10 border-amber-500/20",
  "Under Review": "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "Approved": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "Refunded": "text-purple-500 bg-purple-500/10 border-purple-500/20",
  "Replacement Sent": "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  "Rejected": "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

const TYPE_COLORS: Record<string, string> = {
  "Return": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "Exchange": "text-purple-400 bg-purple-500/10 border-purple-500/20",
  "Refund Only": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Replacement": "text-teal-400 bg-teal-500/10 border-teal-500/20",
};

const RETURN_REASONS = [
  { reason: "Damaged Product", count: 87, percent: "35%", color: "#f59e0b" },
  { reason: "Not as Described", count: 50, percent: "20%", color: "#3b82f6" },
  { reason: "Changed My Mind", count: 45, percent: "18%", color: "#a855f7" },
  { reason: "Not as Expected", count: 30, percent: "12%", color: "#10b981" },
  { reason: "Wrong Item", count: 20, percent: "8%", color: "#06b6d4" },
  { reason: "Other", count: 16, percent: "7%", color: "rgba(255,255,255,0.2)" },
];

const MOST_RETURNED = [
  { name: "Oud Noir", spec: "Eau de Parfum (100ml)", count: 38, percent: "15%", image: "/assets/product.jpeg" },
  { name: "Amber Majesty", spec: "Extrait de Parfum (50ml)", count: 32, percent: "13%", image: "/assets/product.jpeg" },
  { name: "Velvet Rose", spec: "Eau de Parfum (100ml)", count: 29, percent: "12%", image: "/assets/product.jpeg" },
  { name: "Royal Musk", spec: "Extrait de Parfum (50ml)", count: 24, percent: "10%", image: "/assets/product.jpeg" },
  { name: "Citrus Bleu", spec: "Eau de Toilette (100ml)", count: 20, percent: "8%", image: "/assets/product.jpeg" },
];

export default function ReturnsPage() {
  const [returns, setReturns] = useState(INITIAL_RETURNS);
  const [selectedReturnId, setSelectedReturnId] = useState("RET-2024-0248");
  const [activeSubTab, setActiveSubTab] = useState("All Returns");
  const [dateRange, setDateRange] = useState("May 1, 2024 - May 29, 2024");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentReturn = returns.find(r => r.id === selectedReturnId) || returns[0];

  const updateStatus = (id: string, newStatus: string) => {
    setReturns(returns.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleRowSelect = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredReturns.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredReturns.map(r => r.id));
    }
  };

  // Bulk operations
  const bulkAccept = () => {
    setReturns(returns.map(r => selectedRows.includes(r.id) ? { ...r, status: "Approved" } : r));
    setSelectedRows([]);
  };

  const bulkReject = () => {
    setReturns(returns.map(r => selectedRows.includes(r.id) ? { ...r, status: "Rejected" } : r));
    setSelectedRows([]);
  };

  const bulkRefund = () => {
    setReturns(returns.map(r => selectedRows.includes(r.id) ? { ...r, status: "Refunded" } : r));
    setSelectedRows([]);
  };

  const bulkExchange = () => {
    setReturns(returns.map(r => selectedRows.includes(r.id) ? { ...r, status: "Replacement Sent" } : r));
    setSelectedRows([]);
  };

  // Intelligent Search System
  const filteredReturns = returns.filter(r => {
    // Sub-tab category filter
    const matchesTab = activeSubTab === "All Returns" || r.status.toLowerCase() === activeSubTab.toLowerCase();
    if (!matchesTab) return false;

    // Search Query Keyword Filters
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    // Match specialized keyword filters like return/exchange/refund
    const matchesType = r.type.toLowerCase().includes(query);
    const matchesReason = r.reason.toLowerCase().includes(query);
    const matchesNote = r.note.toLowerCase().includes(query);
    const matchesCustomer = r.customer.name.toLowerCase().includes(query) || r.customer.email.toLowerCase().includes(query);
    const matchesProduct = r.product.name.toLowerCase().includes(query);
    const matchesOrderId = r.orderId.toLowerCase().includes(query);
    const matchesReturnId = r.id.toLowerCase().includes(query);
    const matchesStatus = r.status.toLowerCase().includes(query);

    return matchesType || matchesReason || matchesNote || matchesCustomer || matchesProduct || matchesOrderId || matchesReturnId || matchesStatus;
  });

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-10 relative">
      
      {/* Floating Bulk Action Bar */}
      <AnimatePresence>
        {selectedRows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-2xl border border-primary/30 bg-[#0a0810]/90 backdrop-blur-md px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center gap-6"
          >
            <div className="flex items-center gap-2 border-r border-white/10 pr-4 shrink-0">
               <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Selected</span>
               <span className="h-5 px-2 rounded-full bg-primary text-[#050308] text-[10px] font-bold flex items-center justify-center">{selectedRows.length}</span>
            </div>

            <div className="flex items-center gap-3">
               <button 
                 onClick={bulkAccept}
                 className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-white transition-all"
               >
                  <CheckCircle2 size={12} />
                  Accept Selected
               </button>
               <button 
                 onClick={bulkReject}
                 className="flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-white transition-all"
               >
                  <X size={12} />
                  Reject Selected
               </button>
               <button 
                 onClick={bulkRefund}
                 className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-[#050308] transition-all"
               >
                  <Banknote size={12} />
                  Mark Refunded
               </button>
               <button 
                 onClick={bulkExchange}
                 className="flex items-center gap-1.5 rounded-lg bg-teal-500 hover:bg-teal-600 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-[#050308] transition-all"
               >
                  <RefreshCw size={12} />
                  Approve Exchange
               </button>
            </div>

            <button 
              onClick={() => setSelectedRows([])}
              className="text-white/40 hover:text-white text-[9px] font-bold uppercase tracking-widest ml-2 border-l border-white/10 pl-4"
            >
               Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Main Content */}
      <div className="flex-1 space-y-8 min-w-0">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-serif text-white tracking-tight">Returns & Refunds</h1>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
               High-Volume platform dashboard for rapid return authorization & smart operations
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 cursor-pointer hover:bg-white/[0.04] transition-all">
                <Calendar size={14} className="text-primary/70" />
                <span>{dateRange}</span>
                <ChevronDown size={14} className="text-white/20" />
             </div>
             <button className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/[0.05]">
                <Download size={14} className="text-primary/60" />
                Export
             </button>
             <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-primary/90 shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]">
               <Plus size={14} />
               New Return
             </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ANALYTICS_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-4 lg:p-5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center ${card.color}`}>
                  <card.icon size={16} strokeWidth={1.5} />
                </div>
                <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold leading-tight">{card.label}</p>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{card.value}</h3>
              <div className="mt-2 flex items-center justify-between">
                 <div className={`flex items-center gap-1 text-[9px] font-bold ${card.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {card.trend === 'up' ? '↗' : '↘'} {card.change} <span className="text-white/20 ml-1 font-medium">vs last month</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search Bar */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 space-y-6">
           <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/[0.05] pb-4">
              <div className="flex border-b border-white/0 gap-6 overflow-x-auto custom-scrollbar">
                 {["All Returns", "Pending", "Under Review", "Approved", "Rejected", "Refunded", "Replacement Sent"].map((tab) => {
                    const isActive = activeSubTab === tab;
                    return (
                       <button
                         key={tab}
                         onClick={() => setActiveSubTab(tab)}
                         className={`pb-3 relative text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 ${
                           isActive ? "text-primary" : "text-white/40 hover:text-white"
                         }`}
                       >
                         {tab}
                         {isActive && (
                            <motion.div
                              layoutId="returns-subtab-indicator"
                              className="absolute bottom-0 inset-x-0 h-0.5 bg-primary"
                            />
                         )}
                       </button>
                    );
                 })}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                 <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white/70">
                    <Filter size={12} />
                    More Filters
                 </button>
                 <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, order ID, product, reason..."
                      className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2 pl-9 pr-3 text-[10px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40" 
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-[10px]">✕</button>
                    )}
                 </div>
              </div>
           </div>

           {/* High-Volume Operations Table */}
           <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                 <thead>
                    <tr className="border-b border-white/[0.03] text-[9px] uppercase tracking-widest text-white/20 font-bold">
                       <th className="py-3 px-3 w-8">
                          <input 
                            type="checkbox"
                            checked={selectedRows.length === filteredReturns.length && filteredReturns.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-white/25 bg-transparent text-primary focus:ring-primary"
                          />
                       </th>
                       <th className="py-3 px-3">Return ID</th>
                       <th className="py-3 px-3">Type</th>
                       <th className="py-3 px-3">Customer</th>
                       <th className="py-3 px-3">Product</th>
                       <th className="py-3 px-3">Reason</th>
                       <th className="py-3 px-3 text-right">Refund</th>
                       <th className="py-3 px-3">Status</th>
                       <th className="py-3 px-3 text-center">Quick Moderation</th>
                       <th className="py-3 px-3 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody>
                    <AnimatePresence>
                    {filteredReturns.map((item) => {
                       const isSelected = item.id === selectedReturnId;
                       const isRowChecked = selectedRows.includes(item.id);
                       return (
                          <motion.tr
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                               setSelectedReturnId(item.id);
                               setIsSidebarOpen(true);
                            }}
                            className={`group border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors cursor-pointer ${
                              isSelected ? 'bg-white/[0.02]' : ''
                            }`}
                          >
                             <td className="py-3.5 px-3" onClick={(e) => e.stopPropagation()}>
                                <input 
                                  type="checkbox"
                                  checked={isRowChecked}
                                  onChange={() => handleRowSelect(item.id)}
                                  className="rounded border-white/25 bg-transparent text-primary focus:ring-primary"
                                />
                             </td>
                             <td className="py-3.5 px-3 text-[10px] font-bold text-white tracking-wide font-mono">{item.id}</td>
                             
                             {/* Return Type Badges */}
                             <td className="py-3.5 px-3">
                                <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${TYPE_COLORS[item.type]}`}>
                                   {item.type}
                                </span>
                             </td>

                             <td className="py-3.5 px-3">
                                <div>
                                   <p className="text-[10px] font-bold text-white tracking-wide">{item.customer.name}</p>
                                   <p className="text-[8px] text-white/30 mt-0.5">{item.customer.email}</p>
                                </div>
                             </td>
                             <td className="py-3.5 px-3">
                                <div className="flex items-center gap-2.5">
                                   <div className="h-7 w-7 rounded-md bg-black/40 overflow-hidden border border-white/[0.05] shrink-0">
                                      <img src={item.product.image} className="w-full h-full object-cover opacity-75" />
                                   </div>
                                   <div>
                                      <p className="text-[10px] font-bold text-white truncate max-w-[100px]">{item.product.name}</p>
                                      <p className="text-[8px] text-white/30 truncate max-w-[100px]">{item.product.spec}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="py-3.5 px-3 text-[10px] text-white/60 font-medium">{item.reason}</td>
                             <td className="py-3.5 px-3 text-[10px] font-bold text-white text-right">{item.refundAmount}</td>
                             
                             {/* Inline Interactive Status Picker */}
                             <td className="py-3.5 px-3" onClick={(e) => e.stopPropagation()}>
                                <select
                                  value={item.status}
                                  onChange={(e) => updateStatus(item.id, e.target.value)}
                                  className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm border bg-[#050308] border-white/10 text-white/70 focus:outline-none`}
                                >
                                   <option>Pending</option>
                                   <option>Under Review</option>
                                   <option>Approved</option>
                                   <option>Refunded</option>
                                   <option>Replacement Sent</option>
                                   <option>Rejected</option>
                                </select>
                             </td>

                             {/* QUICK MODERATION BUTTONS IN TABLE CELL */}
                             <td className="py-3.5 px-3" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-center gap-2">
                                   <button 
                                     onClick={() => updateStatus(item.id, "Approved")}
                                     title="Accept / Approve Return"
                                     className="p-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 transition-all"
                                   >
                                      <CheckCircle2 size={12} />
                                   </button>
                                   <button 
                                     onClick={() => updateStatus(item.id, "Rejected")}
                                     title="Reject Return Claim"
                                     className="p-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500/20 transition-all"
                                   >
                                      <X size={12} />
                                   </button>
                                   <button 
                                     onClick={() => updateStatus(item.id, "Refunded")}
                                     title="Trigger Refund Payment"
                                     className="p-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500/20 transition-all"
                                   >
                                      <Banknote size={12} />
                                   </button>
                                   <button 
                                     onClick={() => updateStatus(item.id, "Replacement Sent")}
                                     title="Authorize Replacement Exchange"
                                     className="p-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-500 hover:bg-teal-500/20 transition-all"
                                   >
                                      <RefreshCw size={12} />
                                   </button>
                                </div>
                             </td>

                             <td className="py-3.5 px-3" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-center gap-2">
                                   <button 
                                     onClick={() => {
                                        setSelectedReturnId(item.id);
                                        setIsSidebarOpen(true);
                                     }}
                                     className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/50 hover:text-white transition-all"
                                   >
                                      <Eye size={12} />
                                   </button>
                                   <button className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/50 hover:text-white transition-all">
                                      <MoreVertical size={12} />
                                   </button>
                                </div>
                             </td>
                          </motion.tr>
                       );
                    })}
                    </AnimatePresence>
                 </tbody>
              </table>
           </div>

           {/* Pagination */}
           <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.03] pt-6 text-[9px] font-bold uppercase tracking-wider text-white/20">
              <p>Showing 1 to {filteredReturns.length} of {filteredReturns.length} results</p>
              <div className="flex items-center gap-1.5">
                 <button className="p-1.5 rounded border border-white/[0.05] text-white/20 hover:text-white transition-all">
                    <ChevronLeft size={12} />
                 </button>
                 <button className="h-6 w-6 rounded bg-primary text-[#050308] flex items-center justify-center text-[9px]">1</button>
                 <button className="p-1.5 rounded border border-white/[0.05] text-white/20 hover:text-white transition-all">
                    <ChevronRight size={12} />
                 </button>
              </div>
              <div className="flex items-center gap-2.5">
                 <span className="text-white/25">10 / page</span>
                 <ChevronDown size={12} />
              </div>
           </div>
        </div>

        {/* Lower Row of Analytics */}
        <div className="grid gap-6 lg:grid-cols-3">
           
           {/* Return Trends Chart */}
           <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-sm font-serif text-white tracking-wide">Return Trends</h3>
                 <select className="bg-white/[0.03] border border-white/[0.05] rounded px-2 py-0.5 text-[8px] font-bold uppercase text-white/40 focus:outline-none">
                    <option>This Month</option>
                 </select>
              </div>
              
              <div className="relative h-40 w-full px-2 mt-4">
                 <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
                    <path
                      d="M0,100 L50,60 L100,90 L150,55 L200,85 L250,30 L300,10"
                      fill="none"
                      stroke="#d4a017"
                      strokeWidth="2"
                    />
                    {[
                      {x: 0, y: 100}, {x: 50, y: 60}, {x: 100, y: 90}, 
                      {x: 150, y: 55}, {x: 200, y: 85}, {x: 250, y: 30}, {x: 300, y: 10}
                    ].map((pt, idx) => (
                      <circle key={idx} cx={pt.x} cy={pt.y} r="2.5" fill="#d4a017" stroke="#050308" strokeWidth="1" />
                    ))}
                 </svg>
                 <div className="absolute top-[20px] left-[130px] bg-black/80 border border-white/10 rounded px-2 py-1 text-[7px] text-center leading-normal z-20">
                    <p className="text-white/45">May 16, 2024</p>
                    <p className="font-bold text-primary">Returns: 42</p>
                 </div>
                 <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[7px] text-white/20 font-bold uppercase">
                    <span>May 1</span>
                    <span>May 8</span>
                    <span>May 15</span>
                    <span>May 22</span>
                    <span>May 29</span>
                 </div>
              </div>
           </div>

           {/* Return Reasons Donut Chart */}
           <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-serif text-white tracking-wide">Return Reasons</h3>
                 <select className="bg-white/[0.03] border border-white/[0.05] rounded px-2 py-0.5 text-[8px] font-bold uppercase text-white/40 focus:outline-none">
                    <option>This Month</option>
                 </select>
              </div>

              <div className="flex items-center gap-6 flex-1 py-2">
                 <div className="relative shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                      {/* Damaged Product */}
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="0" />
                      {/* Not as Described */}
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-87.9" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <p className="text-[12px] font-bold text-white">248</p>
                       <p className="text-[6px] uppercase tracking-widest text-white/30 font-bold mt-0.5">Total</p>
                    </div>
                 </div>

                 <div className="flex-1 space-y-1.5">
                    {RETURN_REASONS.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[8px]">
                         <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-white/60 font-semibold truncate max-w-[80px]">{item.reason}</span>
                         </div>
                         <span className="text-white/30 font-bold">{item.percent} <span className="font-normal">({item.count})</span></span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Most Returned Products */}
           <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-3">
                 <h3 className="text-sm font-serif text-white tracking-wide">Most Returned Products</h3>
                 <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
              </div>
              <div className="space-y-3.5 flex-1">
                 {MOST_RETURNED.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-3">
                      <span className="text-[9px] font-bold text-white/20 w-3">{idx + 1}</span>
                      <div className="h-7 w-7 rounded-md bg-black/40 overflow-hidden border border-white/[0.05] shrink-0">
                         <img src={item.image} className="w-full h-full object-cover opacity-75" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-[9px] font-bold text-white truncate">{item.name}</p>
                         <p className="text-[7px] text-white/30 mt-0.5 truncate">{item.spec}</p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                         <p className="text-[9px] font-bold text-white">{item.count}</p>
                         <p className="text-[7px] text-white/30 mt-0.5">({item.percent})</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

        </div>

      </div>

      {/* Right Detailed Sidebar Drawer (opens on Eye click or Row select) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="w-full xl:w-[350px] rounded-3xl border border-white/[0.05] bg-[#0a0810]/95 backdrop-blur-md p-6 flex flex-col justify-between space-y-6 shrink-0 h-fit"
          >
             <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
                   <div>
                      <h3 className="text-[12px] font-serif text-white tracking-wide">Return Case Review</h3>
                      <p className="text-[10px] font-bold text-primary mt-1 font-mono">{currentReturn.id}</p>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border ${STATUS_COLORS[currentReturn.status]}`}>
                         {currentReturn.status}
                      </span>
                      <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1 rounded-md hover:bg-white/5 text-white/40 hover:text-white"
                      >
                         ✕
                      </button>
                   </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-2 border-b border-white/[0.03] pb-4">
                   <div className="flex items-center justify-between text-[10px]">
                      <span className="text-white/35 font-bold uppercase tracking-wider">Order ID</span>
                      <span className="text-white font-semibold font-mono">{currentReturn.orderId}</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px]">
                      <span className="text-white/35 font-bold uppercase tracking-wider">Customer</span>
                      <span className="text-white font-semibold flex items-center gap-1"><User size={10} className="text-primary/70" /> {currentReturn.customer.name}</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px]">
                      <span className="text-white/35 font-bold uppercase tracking-wider">Email</span>
                      <span className="text-white/70 font-semibold">{currentReturn.customer.email}</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px]">
                      <span className="text-white/35 font-bold uppercase tracking-wider">Phone</span>
                      <span className="text-white/70 font-semibold">{currentReturn.customer.phone}</span>
                   </div>
                </div>

                {/* Product Details */}
                <div className="space-y-3.5 border-b border-white/[0.03] pb-4">
                   <p className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Product Details</p>
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-black/40 overflow-hidden border border-white/[0.1] shrink-0">
                         <img src={currentReturn.product.image} className="w-full h-full object-cover opacity-85" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-[10px] font-bold text-white truncate">{currentReturn.product.name}</p>
                         <p className="text-[8px] text-white/40 mt-0.5 truncate">{currentReturn.product.spec}</p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                         <p className="text-[10px] font-bold text-white">{currentReturn.product.price}</p>
                         <p className="text-[8px] text-white/45 mt-0.5">x {currentReturn.product.qty}</p>
                      </div>
                   </div>
                   <div className="flex items-center justify-between text-[10px] pt-1">
                      <span className="text-white/35 font-bold uppercase tracking-wider">Reason</span>
                      <span className="text-white font-semibold">{currentReturn.reason}</span>
                   </div>
                </div>

                {/* Customer Note */}
                <div className="space-y-2 border-b border-white/[0.03] pb-4">
                   <p className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Customer Note</p>
                   <div className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-3 text-[10px] text-white/60 italic leading-relaxed">
                      "{currentReturn.note}"
                   </div>
                </div>

                {/* Attachments */}
                {currentReturn.attachments && currentReturn.attachments.length > 0 && (
                   <div className="space-y-2.5 border-b border-white/[0.03] pb-4">
                      <p className="text-[8px] uppercase tracking-widest text-white/35 font-bold flex items-center gap-1.5">
                         <Paperclip size={10} className="text-primary/70" /> Attachments (3)
                      </p>
                      <div className="flex items-center gap-2">
                         {currentReturn.attachments.map((img, i) => (
                            <div key={i} className="h-14 w-14 rounded-lg bg-black/40 overflow-hidden border border-white/[0.05] cursor-pointer hover:border-primary/50 transition-all shrink-0">
                               <img src={img} className="w-full h-full object-cover opacity-80" />
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                {/* Request Date */}
                <div className="flex items-center justify-between text-[10px]">
                   <span className="text-white/35 font-bold uppercase tracking-wider">Request Date</span>
                   <span className="text-white/70 font-semibold">{currentReturn.date.replace("\n", " at ")}</span>
                </div>

                {/* Return Status Picker */}
                <div className="space-y-1 pt-1">
                   <label className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Change Case Status</label>
                   <select 
                     value={currentReturn.status}
                     onChange={(e) => updateStatus(currentReturn.id, e.target.value)}
                     className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2 text-[10px] text-white/60 focus:outline-none"
                   >
                      <option>Pending</option>
                      <option>Under Review</option>
                      <option>Approved</option>
                      <option>Refunded</option>
                      <option>Replacement Sent</option>
                      <option>Rejected</option>
                   </select>
                </div>
             </div>

             {/* Action buttons */}
             <div className="space-y-2.5 pt-4">
                <div className="grid grid-cols-2 gap-3">
                   <button 
                     onClick={() => updateStatus(currentReturn.id, "Approved")}
                     className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-widest transition-all shadow-[0_4px_12px_rgba(16,185,129,0.2)] flex items-center justify-center gap-1.5"
                   >
                      ✓ Approve Return
                   </button>
                   <button 
                     onClick={() => updateStatus(currentReturn.id, "Rejected")}
                     className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[9px] font-bold uppercase tracking-widest transition-all shadow-[0_4px_12px_rgba(244,63,94,0.2)] flex items-center justify-center gap-1.5"
                   >
                      ✗ Reject Return
                   </button>
                </div>
                
                <button 
                  onClick={() => updateStatus(currentReturn.id, "Refunded")}
                  className="w-full py-2.5 rounded-xl bg-primary text-[#050308] text-[9px] font-bold uppercase tracking-widest hover:bg-primary/95 transition-all shadow-[0_4px_15px_rgba(214,195,165,0.4)] flex items-center justify-center gap-1.5"
                >
                   Refund Amount
                   <ChevronDown size={12} className="text-current" />
                </button>
             </div>
          </motion.aside>
        )}
      </AnimatePresence>

    </div>
  );
}
