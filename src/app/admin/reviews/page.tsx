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
  Star,
  MessageSquare,
  AlertOctagon,
  Flag,
  ThumbsUp,
  Eye,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";

// Mock Data
const REVIEWS_DATA = [
  {
    id: 1,
    customer: { name: "Sophia Lee", email: "sophia.lee@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Oud Noir", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    rating: 5,
    review: "Absolutely amazing scent! Long lasting and perfect for evening...",
    status: "Published",
    date: "May 29, 2024\n10:30 AM",
  },
  {
    id: 2,
    customer: { name: "Michael Brown", email: "michael.b@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Amber Majesty", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    rating: 4,
    review: "Great fragrance with premium quality. The packaging is also...",
    status: "Pending",
    date: "May 29, 2024\n09:15 AM",
  },
  {
    id: 3,
    customer: { name: "Emma Wilson", email: "emma.w@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Velvet Rose", type: "Eau de Parfum", image: "/assets/product.jpeg" },
    rating: 5,
    review: "This is my new favorite perfume! The rose notes are divine...",
    status: "Published",
    date: "May 28, 2024\n06:20 PM",
  },
  {
    id: 4,
    customer: { name: "Daniel Carter", email: "daniel.c@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Citrus Bleu", type: "Eau de Toilette", image: "/assets/product.jpeg" },
    rating: 3,
    review: "Nice and fresh. Good for daily wear but doesn't last long.",
    status: "Hidden",
    date: "May 28, 2024\n04:45 PM",
  },
  {
    id: 5,
    customer: { name: "Olivia Martinez", email: "olivia.m@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Royal Musk", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    rating: 5,
    review: "Luxury in a bottle! Worth every penny. Projection is excellent.",
    status: "Published",
    date: "May 28, 2024\n02:10 PM",
  },
  {
    id: 6,
    customer: { name: "Liam Johnson", email: "liam.j@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Midnight Oud", type: "Parfum", image: "/assets/product.jpeg" },
    rating: 2,
    review: "Too strong for me. Not suitable for daytime.",
    status: "Reported",
    date: "May 27, 2024\n11:00 AM",
  },
  {
    id: 7,
    customer: { name: "Ava Taylor", email: "ava.t@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Blush Jasmine", type: "Eau de Parfum", image: "/assets/product.jpeg" },
    rating: 4,
    review: "Floral and classy. Gets me compliments every time!",
    status: "Published",
    date: "May 27, 2024\n09:30 AM",
  },
  {
    id: 8,
    customer: { name: "Noah Anderson", email: "noah.a@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Ocean Mist", type: "Eau de Toilette", image: "/assets/product.jpeg" },
    rating: 4,
    review: "Refreshing and perfect for summer. Would love better longevity.",
    status: "Pending",
    date: "May 26, 2024\n05:50 PM",
  },
  {
    id: 9,
    customer: { name: "Isabella Thomas", email: "isabella.t@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Saffron Luxe", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    rating: 5,
    review: "Rich, warm and exotic. The saffron note is just wow!",
    status: "Published",
    date: "May 26, 2024\n01:20 PM",
  },
  {
    id: 10,
    customer: { name: "James White", email: "james.w@email.com", avatar: "/assets/product.jpeg" },
    product: { name: "Vanilla Essence", type: "Eau de Parfum", image: "/assets/product.jpeg" },
    rating: 1,
    review: "Did not like the scent. Too sweet and overpowering.",
    status: "Spam",
    date: "May 26, 2024\n10:10 AM",
  },
];

const ANALYTICS_CARDS = [
  { label: "Total Reviews", value: "1,246", change: "+18.6%", icon: Star, trend: "up", color: "text-amber-500" },
  { label: "Average Rating", value: "4.6", change: "+0.3", icon: Star, trend: "up", color: "text-amber-500" },
  { label: "Pending Reviews", value: "42", change: "+12.4%", icon: MessageSquare, trend: "up", color: "text-amber-500" },
  { label: "Flagged Reviews", value: "17", change: "-5.6%", icon: Flag, trend: "down", color: "text-rose-500" },
  { label: "Positive Feedback", value: "92%", change: "+8.9%", icon: ThumbsUp, trend: "up", color: "text-emerald-500" },
];

const STATUS_COLORS: Record<string, string> = {
  "Published": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "Pending": "text-amber-500 bg-amber-500/10 border-amber-500/20",
  "Hidden": "text-white/40 bg-white/5 border-white/10",
  "Reported": "text-rose-500 bg-rose-500/10 border-rose-500/20",
  "Spam": "text-purple-500 bg-purple-500/10 border-purple-500/20",
};

const RATING_DISTRIBUTION = [
  { stars: "5 Star", percent: "74%", count: "922", color: "bg-amber-500", stroke: "#f59e0b" },
  { stars: "4 Star", percent: "17%", count: "212", color: "bg-blue-500", stroke: "#3b82f6" },
  { stars: "3 Star", percent: "6%", count: "75", color: "bg-emerald-500", stroke: "#10b981" },
  { stars: "2 Star", percent: "2%", count: "24", color: "bg-purple-500", stroke: "#a855f7" },
  { stars: "1 Star", percent: "1%", count: "13", color: "bg-rose-500", stroke: "#f43f5e" },
];

const TOP_PRODUCTS = [
  { name: "Oud Noir", reviews: "256 reviews", rating: "4.8", rank: 1, image: "/assets/product.jpeg" },
  { name: "Amber Majesty", reviews: "210 reviews", rating: "4.7", rank: 2, image: "/assets/product.jpeg" },
  { name: "Velvet Rose", reviews: "186 reviews", rating: "4.6", rank: 3, image: "/assets/product.jpeg" },
  { name: "Royal Musk", reviews: "162 reviews", rating: "4.5", rank: 4, image: "/assets/product.jpeg" },
  { name: "Citrus Bleu", reviews: "148 reviews", rating: "4.4", rank: 5, image: "/assets/product.jpeg" },
];

const RECENT_REVIEWS = [
  { customer: "Sophia Lee", action: "reviewed Oud Noir", rating: 5, time: "10:30 AM", avatar: "/assets/product.jpeg" },
  { customer: "Michael Brown", action: "reviewed Amber Majesty", rating: 4, time: "09:15 AM", avatar: "/assets/product.jpeg" },
  { customer: "Emma Wilson", action: "reviewed Velvet Rose", rating: 5, time: "Yesterday", avatar: "/assets/product.jpeg" },
  { customer: "Daniel Carter", action: "reviewed Citrus Bleu", rating: 3, time: "Yesterday", avatar: "/assets/product.jpeg" },
];

const STATUS_OVERVIEW = [
  { label: "Published", value: "1,012", percent: "81.3%", color: "bg-emerald-500", text: "text-emerald-500" },
  { label: "Pending", value: "42", percent: "3.4%", color: "bg-amber-500", text: "text-amber-500" },
  { label: "Hidden", value: "76", percent: "6.1%", color: "bg-white/20", text: "text-white/40" },
  { label: "Reported", value: "17", percent: "1.4%", color: "bg-rose-500", text: "text-rose-500" },
  { label: "Spam", value: "99", percent: "7.8%", color: "bg-purple-500", text: "text-purple-500" },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(REVIEWS_DATA);
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedReviews.length === reviews.length) setSelectedReviews([]);
    else setSelectedReviews(reviews.map((r) => r.id));
  };

  const toggleSelect = (id: number) => {
    if (selectedReviews.includes(id)) setSelectedReviews(selectedReviews.filter((r) => r !== id));
    else setSelectedReviews([...selectedReviews, id]);
  };

  const updateStatus = (id: number, newStatus: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const deleteReview = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-10">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Header - Different layout based on reference */}
        <div className="hidden">
           {/* Topbar search is in layout, but reference shows "Reviews Management" header inline or top */}
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
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
                <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{card.label}</p>
              </div>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">{card.value}</h3>
              </div>
              <div className="mt-2 flex items-center justify-between">
                 <div className={`flex items-center gap-1 text-[9px] font-bold ${card.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {card.trend === 'up' ? '↗' : '↘'} {card.change} <span className="text-white/20 ml-1 font-medium">vs last month</span>
                 </div>
                 {/* Micro Sparkline */}
                 <div className="h-4 w-12 opacity-50">
                   <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                     <path d={card.trend === 'up' ? "M0,25 Q10,22 20,28 T40,25 T60,15 T80,20 T100,5" : "M0,5 Q10,12 20,8 T40,15 T60,25 T80,20 T100,25"} fill="none" stroke="currentColor" strokeWidth="2" className={card.trend === 'up' ? "text-emerald-500" : "text-rose-500"} />
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
                  placeholder="Search reviews..."
                  className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-all"
                />
              </div>
              <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                <option>All Products</option>
                <option>Oud Noir</option>
                <option>Velvet Rose</option>
              </select>
              <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                <option>All Ratings</option>
                <option>5 Stars</option>
                <option>4 Stars & Up</option>
                <option>3 Stars & Below</option>
              </select>
              <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                <option>All Status</option>
                <option>Published</option>
                <option>Pending</option>
                <option>Reported</option>
              </select>
              <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                <option>All Customers</option>
                <option>Verified Buyers</option>
              </select>
              <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                <Filter size={14} />
                More Filters
              </button>
            </div>
            <div className="flex items-center gap-3 ml-auto">
               <button className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/[0.05]">
                 <Download size={14} className="text-primary/60" />
                 Export
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
                      checked={selectedReviews.length === reviews.length && reviews.length > 0}
                      onChange={toggleSelectAll}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                    />
                  </th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Customer</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Product</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Rating</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Review</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Status</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Date</th>
                  <th className="py-4 px-4 text-center text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                {reviews.map((review) => (
                  <motion.tr 
                    key={review.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedReviews.includes(review.id)}
                        onChange={() => toggleSelect(review.id)}
                        className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-black/40 overflow-hidden border border-white/[0.05] shrink-0">
                          <img src={review.customer.avatar} className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white tracking-wide whitespace-nowrap">{review.customer.name}</p>
                          <p className="text-[9px] text-white/40 font-medium mt-0.5">{review.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-black/40 overflow-hidden border border-white/[0.05] shrink-0">
                          <img src={review.product.image} className="w-full h-full object-cover opacity-70" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white tracking-wide whitespace-nowrap">{review.product.name}</p>
                          <p className="text-[9px] text-white/40 font-medium mt-0.5">{review.product.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                       <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                             <Star key={i} size={12} className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-white/10 fill-white/10"} />
                          ))}
                       </div>
                    </td>
                    <td className="py-4 px-4">
                       <p className="text-[11px] text-white/60 leading-relaxed max-w-[240px] truncate">{review.review}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${STATUS_COLORS[review.status]}`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[10px] text-white/50 leading-snug whitespace-pre-line">{review.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/60 hover:text-primary transition-all">
                          <Eye size={14} />
                        </button>
                        {review.status === "Pending" && (
                           <button onClick={() => updateStatus(review.id, "Published")} className="p-2 rounded-lg bg-white/[0.03] border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 transition-all">
                             <CheckCircle2 size={14} />
                           </button>
                        )}
                        {review.status === "Published" && (
                           <button onClick={() => updateStatus(review.id, "Hidden")} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/60 hover:text-white transition-all">
                             <Edit2 size={14} />
                           </button>
                        )}
                        {review.status === "Reported" && (
                           <button onClick={() => updateStatus(review.id, "Hidden")} className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500/20 transition-all">
                             <ShieldAlert size={14} />
                           </button>
                        )}
                        {review.status === "Spam" && (
                           <button onClick={() => deleteReview(review.id)} className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500/20 transition-all">
                             <Trash2 size={14} />
                           </button>
                        )}
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/60 hover:text-white transition-all">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.05] pt-8">
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Showing 1 to 10 of 1,246 reviews</p>
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
               <ChevronDown size={14} className="text-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Analytics */}
      <aside className="w-full xl:w-[340px] space-y-6">
        
        {/* Rating Distribution Donut */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <h3 className="text-sm font-serif text-white tracking-wide mb-6">Rating Distribution</h3>
          
          <div className="flex items-center gap-6">
            <div className="relative flex justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="14" />
                {/* 5 Star */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.74 }}
                  transition={{ duration: 1 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray="251.2" strokeLinecap="round"
                />
                {/* 4 Star */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.17 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="14" strokeDasharray="251.2" strokeDashoffset="-185.8" strokeLinecap="round"
                />
                {/* 3 Star */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.06 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray="251.2" strokeDashoffset="-228.5" strokeLinecap="round"
                />
                {/* 2 Star */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.02 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="14" strokeDasharray="251.2" strokeDashoffset="-243.6" strokeLinecap="round"
                />
                {/* 1 Star */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.01 }}
                  transition={{ duration: 1, delay: 1 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#f43f5e" strokeWidth="14" strokeDasharray="251.2" strokeDashoffset="-248.6" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-white tracking-tight">1,246</p>
                <p className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Total</p>
              </div>
            </div>

            <div className="flex-1 space-y-2.5">
              {RATING_DISTRIBUTION.map(item => (
                <div key={item.stars} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span className="text-[10px] text-white/70 font-medium">{item.stars}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-white/40"><span className="font-bold text-white mr-1">{item.percent}</span>({item.count})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Reviewed Products */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Top Reviewed Products</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-4">
            {TOP_PRODUCTS.map((product) => (
              <div key={product.rank} className="flex items-center gap-3 group cursor-pointer hover:bg-white/[0.02] p-1.5 -mx-1.5 rounded-xl transition-all">
                <span className="text-[10px] font-bold text-white/20 w-3 text-center">{product.rank}</span>
                <div className="h-8 w-8 rounded-lg bg-black/40 border border-white/[0.1] flex items-center justify-center overflow-hidden shrink-0">
                  <img src={product.image} className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div>
                     <p className="text-[10px] font-bold text-white tracking-wide truncate">{product.name}</p>
                     <p className="text-[9px] text-white/40 mt-0.5">{product.reviews}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded text-amber-500">
                     <Star size={10} className="fill-amber-500" />
                     <span className="text-[9px] font-bold">{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews Activity */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Recent Reviews</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-5">
            {RECENT_REVIEWS.map((review, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden">
                  <img src={review.avatar} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/60 leading-snug">
                    <span className="font-bold text-white">{review.customer}</span> {review.action}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                     <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                           <Star key={idx} size={8} className={idx < review.rating ? "text-amber-500 fill-amber-500" : "text-white/10 fill-white/10"} />
                        ))}
                     </div>
                     <span className="text-[8px] font-bold text-white/30">• {review.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Status Overview (Horizontal Bar) */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Review Status Overview</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          
          {/* Stacked Bar */}
          <div className="w-full h-2 rounded-full overflow-hidden flex bg-white/5 mb-6">
             <div className="bg-emerald-500 h-full" style={{ width: '81.3%' }} />
             <div className="bg-amber-500 h-full" style={{ width: '3.4%' }} />
             <div className="bg-white/20 h-full" style={{ width: '6.1%' }} />
             <div className="bg-rose-500 h-full" style={{ width: '1.4%' }} />
             <div className="bg-purple-500 h-full" style={{ width: '7.8%' }} />
          </div>

          <div className="space-y-3">
            {STATUS_OVERVIEW.map(status => (
              <div key={status.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${status.color}`} />
                  <span className={`text-[10px] ${status.text}`}>{status.label}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white/60">{status.value} <span className="text-[8px] font-normal text-white/30 ml-1">({status.percent})</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
