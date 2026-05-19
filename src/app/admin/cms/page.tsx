"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Filter,
  Plus,
  Edit2,
  Trash2,
  X,
  History,
  Image as ImageIcon,
  Eye,
  MousePointerClick,
  Monitor,
  Tag,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

// Mock Data for CMS Banners
const INITIAL_BANNERS = [
  {
    id: 1,
    title: "Oud Noir: Extrait de Parfum",
    subtitle: "Experience our signature deep-black luxury collection.",
    placement: "Homepage Hero",
    type: "Hero Banner",
    device: "All Devices",
    clicks: "12,450",
    ctr: "8.4%",
    image: "/assets/product.jpeg",
    status: "Active",
    link: "/shop/oud-noir",
  },
  {
    id: 2,
    title: "Summer Collection 2024",
    subtitle: "A handpicked selection of premium summer scents.",
    placement: "Homepage Grid",
    type: "Collection Card",
    device: "All Devices",
    clicks: "8,240",
    ctr: "6.2%",
    image: "/assets/product.jpeg",
    status: "Active",
    link: "/collections/summer",
  },
  {
    id: 3,
    title: "Complimentary Luxury Sample",
    subtitle: "Get a free 2ml sample with every purchase above ₹2,499.",
    placement: "Top Promo Bar",
    type: "Promo Banner",
    device: "All Devices",
    clicks: "3,120",
    ctr: "11.5%",
    image: "/assets/product.jpeg",
    status: "Active",
    link: "/offers",
  },
  {
    id: 4,
    title: "The Art of Layering",
    subtitle: "Learn how to combine and customize your signature notes.",
    placement: "Mid-Page Feature",
    type: "Content Block",
    device: "Desktop Only",
    clicks: "1,890",
    ctr: "4.1%",
    image: "/assets/product.jpeg",
    status: "Draft",
    link: "/blog/art-of-layering",
  },
  {
    id: 5,
    title: "Amber Royale Campaign",
    subtitle: "Discover the golden essence of sweet and woody warmth.",
    placement: "Homepage Hero",
    type: "Hero Banner",
    device: "All Devices",
    clicks: "950",
    ctr: "7.8%",
    image: "/assets/product.jpeg",
    status: "Scheduled",
    link: "/shop/amber-royale",
  },
];

const ANALYTICS_CARDS = [
  { label: "Total Banners", value: "8", change: "+2 New", icon: ImageIcon, trend: "up", color: "text-amber-500" },
  { label: "Active Banners", value: "4", change: "Max Capacity", icon: Eye, trend: "up", color: "text-emerald-500" },
  { label: "Draft & Pending", value: "3", change: "1 Scheduled", icon: History, trend: "down", color: "text-white/40" },
  { label: "Total Banner Clicks", value: "26,650", change: "+14.2% CTR", icon: MousePointerClick, trend: "up", color: "text-amber-500" },
];

const PLACEMENT_STATS = [
  { label: "Homepage Hero", value: "3", percent: "37.5%", color: "bg-emerald-500" },
  { label: "Homepage Grid", value: "2", percent: "25.0%", color: "bg-blue-500" },
  { label: "Top Promo Bar", value: "2", percent: "25.0%", color: "bg-cyan-500" },
  { label: "Content Block", value: "1", percent: "12.5%", color: "bg-white/20" },
];

const TOP_BANNERS = [
  { title: "Oud Noir Hero", placement: "Hero Banner", ctr: "8.4% CTR", rank: 1, image: "/assets/product.jpeg" },
  { title: "Complimentary Sample", placement: "Promo Banner", ctr: "11.5% CTR", rank: 2, image: "/assets/product.jpeg" },
  { title: "Summer Collection", placement: "Collection Card", ctr: "6.2% CTR", rank: 3, image: "/assets/product.jpeg" },
];

const RECENT_ACTIVITY = [
  { action: "Hero banner \"Oud Noir\" updated", time: "1 hour ago", icon: History },
  { action: "Promo banner \"Complimentary Sample\" activated", time: "4 hours ago", icon: Eye },
  { action: "New draft banner \"Amber Royale\" created", time: "1 day ago", icon: Plus },
];

const TYPE_COLORS: Record<string, string> = {
  "Hero Banner": "text-purple-500 bg-purple-500/10 border-purple-500/20",
  "Collection Card": "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "Promo Banner": "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  "Content Block": "text-amber-500 bg-amber-500/10 border-amber-500/20",
};

const STATUS_COLORS: Record<string, string> = {
  "Active": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "Draft": "text-amber-500 bg-amber-500/10 border-amber-500/20",
  "Scheduled": "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "Expired": "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

export default function CMSPage() {
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [bannerToDelete, setBannerToDelete] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    placement: "Homepage Hero",
    type: "Hero Banner",
    device: "All Devices",
    link: "",
    status: "Draft",
  });

  const openEditor = (banner?: any) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        subtitle: banner.subtitle,
        placement: banner.placement,
        type: banner.type,
        device: banner.device,
        link: banner.link,
        status: banner.status,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        title: "",
        subtitle: "",
        placement: "Homepage Hero",
        type: "Hero Banner",
        device: "All Devices",
        link: "",
        status: "Draft",
      });
    }
    setIsEditorOpen(true);
  };

  const saveBanner = () => {
    if (editingBanner) {
      setBanners(banners.map(b => b.id === editingBanner.id ? { ...b, ...formData } : b));
    } else {
      const newBanner = {
        id: Math.max(...banners.map(b => b.id)) + 1,
        ...formData,
        clicks: "0",
        ctr: "0.0%",
        image: "/assets/product.jpeg",
      };
      setBanners([newBanner, ...banners]);
    }
    setIsEditorOpen(false);
  };

  const toggleStatus = (id: number) => {
    setBanners(banners.map(b => {
      if (b.id === id) {
        return { ...b, status: b.status === "Active" ? "Draft" : "Active" };
      }
      return b;
    }));
  };

  const confirmDelete = (id: number) => {
    setBannerToDelete(id);
    setIsDeleteOpen(true);
  };

  const executeDelete = () => {
    if (bannerToDelete) {
      setBanners(banners.filter(b => b.id !== bannerToDelete));
    }
    setIsDeleteOpen(false);
    setBannerToDelete(null);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-10">
      {/* Main Column */}
      <div className="flex-1 space-y-8 min-w-0">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-serif text-white tracking-tight">Banners & CMS Management</h1>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
              Manage homepage hero banners, promotional blocks, and collection campaigns
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openEditor()}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-primary/90 shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]"
            >
              <Plus size={14} />
              Create Banner
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
                <div className={`h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center ${card.color}`}>
                  <card.icon size={16} strokeWidth={1.5} />
                </div>
                <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{card.label}</p>
              </div>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">{card.value}</h3>
              </div>
              <div className="mt-2 flex items-center justify-between">
                 <div className="flex items-center gap-1 text-[9px] font-bold text-amber-500">
                   {card.change}
                 </div>
                 <div className="h-4 w-12 opacity-50">
                   <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                     <path d="M0,25 Q10,22 20,28 T40,25 T60,15 T80,20 T100,5" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                   </svg>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Card Grid of Banners */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input
                type="text"
                placeholder="Search banners..."
                className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-all"
              />
            </div>
            <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
              <option>All Types</option>
              <option>Hero Banner</option>
              <option>Promo Banner</option>
              <option>Collection Card</option>
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence>
              {banners.map((banner) => (
                <motion.div
                  key={banner.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-3xl border border-white/[0.05] bg-white/[0.01] overflow-hidden flex flex-col hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Banner Image Container */}
                  <div className="h-44 relative bg-black/40 border-b border-white/[0.05] overflow-hidden">
                    <img src={banner.image} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${TYPE_COLORS[banner.type]}`}>
                        {banner.type}
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-white/60 flex items-center gap-1.5">
                        <Monitor size={10} />
                        {banner.device}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${STATUS_COLORS[banner.status]}`}>
                        {banner.status}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-xl">
                      <h4 className="text-[12px] font-serif text-white tracking-wide">{banner.placement}</h4>
                      <p className="text-[9px] text-white/40 truncate">{banner.link}</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide">{banner.title}</h3>
                      <p className="text-[11px] text-white/50 leading-relaxed mt-2">{banner.subtitle}</p>
                    </div>

                    {/* Stats strip */}
                    <div className="flex items-center justify-between border-t border-white/[0.03] pt-4">
                      <div className="flex items-center gap-4">
                         <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/35 font-bold">Clicks</p>
                            <p className="text-[11px] font-bold text-white mt-0.5">{banner.clicks}</p>
                         </div>
                         <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/35 font-bold">CTR</p>
                            <p className="text-[11px] font-bold text-primary mt-0.5">{banner.ctr}</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-2">
                         <button 
                           onClick={() => toggleStatus(banner.id)}
                           className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-white transition-all"
                         >
                           {banner.status === "Active" ? <ToggleRight size={18} className="text-emerald-500" /> : <ToggleLeft size={18} />}
                         </button>
                         <button 
                           onClick={() => openEditor(banner)}
                           className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all"
                         >
                           <Edit2 size={14} />
                         </button>
                         <button 
                           onClick={() => confirmDelete(banner.id)}
                           className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-rose-500 transition-all"
                         >
                           <Trash2 size={14} />
                         </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Right Column Analytics */}
      <aside className="w-full xl:w-[340px] space-y-6">
        
        {/* Placement Breakdown Donut */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <h3 className="text-sm font-serif text-white tracking-wide mb-6">Placement Breakdown</h3>
          
          <div className="flex items-center gap-6">
            <div className="relative flex justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                {/* Hero */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.375 }}
                  transition={{ duration: 1 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round"
                />
                {/* Grid */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.25 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-94.2" strokeLinecap="round"
                />
                {/* Promo */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.25 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-157" strokeLinecap="round"
                />
                {/* Content Block */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.125 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-219.8" strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex-1 space-y-2.5">
              {PLACEMENT_STATS.map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                    <span className="text-[9px] text-white/50">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-white/40"><span className="font-bold text-white mr-1">{item.percent}</span>({item.value})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Banners by CTR */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Top Banners (CTR)</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-4">
            {TOP_BANNERS.map((banner) => (
              <div key={banner.rank} className="flex items-center gap-3 group cursor-pointer hover:bg-white/[0.02] p-1.5 -mx-1.5 rounded-xl transition-all">
                <span className="text-[10px] font-bold text-white/20 w-3 text-center">{banner.rank}</span>
                <div className="h-8 w-8 rounded-lg bg-black/40 border border-white/[0.1] flex items-center justify-center overflow-hidden shrink-0">
                  <img src={banner.image} className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div>
                     <p className="text-[10px] font-bold text-white tracking-wide truncate">{banner.title}</p>
                     <p className="text-[9px] text-white/40 mt-0.5">{banner.placement}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded text-amber-500">
                     <TrendingUp size={10} />
                     <span className="text-[9px] font-bold">{banner.ctr}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent CMS Activity */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Recent Activity</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-5">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/40 z-10 relative">
                  <activity.icon size={14} />
                </div>
                <div className="pt-1.5 flex-1 min-w-0">
                  <p className="text-[10px] text-white/60 leading-snug truncate">
                    {activity.action}
                  </p>
                  <p className="text-[8px] font-bold text-white/30 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </aside>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-[#050308] border border-white/[0.05] rounded-3xl w-full max-w-lg shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/[0.05] px-6 py-5 bg-[#0a0810]">
                <h2 className="text-lg font-serif text-white tracking-wide">
                  {editingBanner ? "Edit Banner Placement" : "Create New Banner Placement"}
                </h2>
                <button 
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/[0.05] text-white/40 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Banner Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter main heading..." 
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white focus:outline-none focus:border-primary/40 transition-all" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Subtitle / Description</label>
                  <textarea 
                    value={formData.subtitle}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    placeholder="Enter secondary taglines..." 
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white focus:outline-none focus:border-primary/40 h-20 resize-none transition-all" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Placement Slot</label>
                    <select 
                      value={formData.placement}
                      onChange={(e) => setFormData({...formData, placement: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white/60 focus:outline-none"
                    >
                      <option>Homepage Hero</option>
                      <option>Homepage Grid</option>
                      <option>Top Promo Bar</option>
                      <option>Mid-Page Feature</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Banner Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white/60 focus:outline-none"
                    >
                      <option>Hero Banner</option>
                      <option>Collection Card</option>
                      <option>Promo Banner</option>
                      <option>Content Block</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Target Device</label>
                    <select 
                      value={formData.device}
                      onChange={(e) => setFormData({...formData, device: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white/60 focus:outline-none"
                    >
                      <option>All Devices</option>
                      <option>Desktop Only</option>
                      <option>Mobile Only</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Target URL</label>
                    <input 
                      type="text" 
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                      placeholder="e.g. /shop/oud-noir" 
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white focus:outline-none focus:border-primary/40 transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Featured Image</label>
                  <div className="border border-dashed border-white/[0.1] rounded-xl h-24 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-white/[0.02] transition-all">
                    <ImageIcon size={18} className="text-white/20 mb-1" />
                    <p className="text-[9px] font-bold text-white/40 text-center px-4">Click to select banner creative</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white/60 focus:outline-none"
                  >
                    <option>Draft</option>
                    <option>Active</option>
                    <option>Scheduled</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-white/[0.05] px-6 py-5 flex items-center justify-end gap-4 bg-[#0a0810]">
                <button 
                  onClick={() => setIsEditorOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveBanner}
                  className="px-6 py-2.5 rounded-xl bg-primary text-[#050308] text-[10px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-[0_4px_15px_-4px_rgba(214,195,165,0.4)]"
                >
                  Confirm Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteOpen && (
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
              className="bg-[#0a0810] border border-white/[0.05] rounded-3xl w-full max-w-sm p-6 shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={20} />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Delete Banner Creative?</h3>
              <p className="text-[11px] text-white/50 leading-relaxed mb-6">
                Are you sure you want to remove this banner placement? The active space on the homepage will immediately revert to default fallback blocks.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/[0.05] text-white/60 hover:text-white hover:bg-white/[0.05] text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeDelete}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white hover:bg-rose-600 text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
