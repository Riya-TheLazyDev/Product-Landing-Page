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
  ChevronRight as ChevronRightIcon,
  Package,
  AlertTriangle,
  XCircle,
  Truck,
  IndianRupee,
  Edit2,
  X,
  History,
  Activity,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

// Mock Data
const INVENTORY_DATA = [
  {
    id: 1,
    product: { name: "Oud Noir", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    sku: "ELV-OUD-100",
    category: "Luxury",
    currentStock: 320,
    reserved: 25,
    available: 295,
    status: "In Stock",
    lastUpdated: "May 29, 2024\n10:30 AM",
  },
  {
    id: 2,
    product: { name: "Amber Royale", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    sku: "ELV-AMB-100",
    category: "Luxury",
    currentStock: 150,
    reserved: 10,
    available: 140,
    status: "Low Stock",
    lastUpdated: "May 29, 2024\n09:15 AM",
  },
  {
    id: 3,
    product: { name: "Velvet Oud", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    sku: "ELV-VEL-100",
    category: "Premium",
    currentStock: 0,
    reserved: 0,
    available: 0,
    status: "Out of Stock",
    lastUpdated: "May 28, 2024\n05:45 PM",
  },
  {
    id: 4,
    product: { name: "Mystic Rose", type: "Eau de Parfum", image: "/assets/product.jpeg" },
    sku: "ELV-MYR-100",
    category: "Floral",
    currentStock: 85,
    reserved: 5,
    available: 80,
    status: "Low Stock",
    lastUpdated: "May 28, 2024\n03:20 PM",
  },
  {
    id: 5,
    product: { name: "Citrus Zest", type: "Eau de Toilette", image: "/assets/product.jpeg" },
    sku: "ELV-CIT-100",
    category: "Fresh",
    currentStock: 420,
    reserved: 20,
    available: 400,
    status: "In Stock",
    lastUpdated: "May 27, 2024\n11:10 AM",
  },
  {
    id: 6,
    product: { name: "Night Shadow", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    sku: "ELV-NIG-100",
    category: "Luxury",
    currentStock: 60,
    reserved: 5,
    available: 55,
    status: "Low Stock",
    lastUpdated: "May 27, 2024\n10:05 AM",
  },
  {
    id: 7,
    product: { name: "Sandal Essence", type: "Eau de Parfum", image: "/assets/product.jpeg" },
    sku: "ELV-SAN-100",
    category: "Woody",
    currentStock: 200,
    reserved: 15,
    available: 185,
    status: "Restocking",
    lastUpdated: "May 26, 2024\n04:50 PM",
  },
  {
    id: 8,
    product: { name: "Pure Aqua", type: "Eau de Toilette", image: "/assets/product.jpeg" },
    sku: "ELV-PUR-100",
    category: "Fresh",
    currentStock: 0,
    reserved: 0,
    available: 0,
    status: "Out of Stock",
    lastUpdated: "May 26, 2024\n01:30 PM",
  },
  {
    id: 9,
    product: { name: "Golden Musk", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    sku: "ELV-GOL-100",
    category: "Luxury",
    currentStock: 110,
    reserved: 10,
    available: 100,
    status: "Low Stock",
    lastUpdated: "May 25, 2024\n09:45 AM",
  },
  {
    id: 10,
    product: { name: "Royal Leather", type: "Extrait de Parfum", image: "/assets/product.jpeg" },
    sku: "ELV-ROY-100",
    category: "Premium",
    currentStock: 75,
    reserved: 5,
    available: 70,
    status: "In Stock",
    lastUpdated: "May 25, 2024\n08:20 AM",
  },
];

const ANALYTICS_CARDS = [
  { label: "Total Stock (Units)", value: "8,245", change: "+12.5%", icon: Package, trend: "up", color: "text-amber-500" },
  { label: "Low Stock Products", value: "23", change: "+5.3%", icon: AlertTriangle, trend: "up", color: "text-amber-500" },
  { label: "Out of Stock", value: "7", change: "-2.1%", icon: XCircle, trend: "down", color: "text-rose-500" },
  { label: "Restock Requests", value: "11", change: "+10.8%", icon: Truck, trend: "up", color: "text-blue-500" },
  { label: "Inventory Value", value: "₹ 24.6L", change: "+18.6%", icon: IndianRupee, trend: "up", color: "text-amber-500" },
];

const STATUS_COLORS: Record<string, string> = {
  "In Stock": "text-emerald-500 bg-emerald-500/10",
  "Low Stock": "text-amber-500 bg-amber-500/10",
  "Out of Stock": "text-rose-500 bg-rose-500/10",
  "Restocking": "text-blue-500 bg-blue-500/10",
};

const CATEGORY_STATS = [
  { label: "Luxury", value: "2,885", percent: "35%", color: "bg-emerald-500" },
  { label: "Premium", value: "2,309", percent: "28%", color: "bg-purple-500" },
  { label: "Fresh", value: "1,649", percent: "20%", color: "bg-cyan-500" },
  { label: "Floral", value: "824", percent: "10%", color: "bg-rose-500" },
  { label: "Woody", value: "577", percent: "7%", color: "bg-amber-500" },
];

const TOP_MOVING = [
  { name: "Oud Noir", units: "1,245 units", rank: 1, image: "/assets/product.jpeg" },
  { name: "Amber Royale", units: "987 units", rank: 2, image: "/assets/product.jpeg" },
  { name: "Velvet Oud", units: "756 units", rank: 3, image: "/assets/product.jpeg" },
  { name: "Mystic Rose", units: "523 units", rank: 4, image: "/assets/product.jpeg" },
  { name: "Citrus Zest", units: "412 units", rank: 5, image: "/assets/product.jpeg" },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(INVENTORY_DATA);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  // Modals state
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    addStock: 0,
    removeStock: 0,
    reason: "New delivery",
  });

  const toggleSelectAll = () => {
    if (selectedItems.length === inventory.length) setSelectedItems([]);
    else setSelectedItems(inventory.map((item) => item.id));
  };

  const toggleSelect = (id: number) => {
    if (selectedItems.includes(id)) setSelectedItems(selectedItems.filter((item) => item !== id));
    else setSelectedItems([...selectedItems, id]);
  };

  const openUpdateModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      addStock: 0,
      removeStock: 0,
      reason: "New delivery",
    });
    setIsUpdateOpen(true);
  };

  const handleUpdateStock = () => {
    if (editingItem) {
      const netChange = Number(formData.addStock) - Number(formData.removeStock);
      const newStock = editingItem.currentStock + netChange;
      const newAvailable = editingItem.available + netChange;
      
      let newStatus = "In Stock";
      if (newStock === 0) newStatus = "Out of Stock";
      else if (newStock < 100) newStatus = "Low Stock";

      setInventory(inventory.map(item => 
        item.id === editingItem.id 
          ? { 
              ...item, 
              currentStock: newStock, 
              available: newAvailable, 
              status: newStatus,
              lastUpdated: `${new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}\n${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
            } 
          : item
      ));
    }
    setIsUpdateOpen(false);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-10">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-serif text-white tracking-tight">Inventory Overview</h1>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
              Real-time overview of your inventory and stock status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/[0.05]">
              <Download size={14} className="text-primary/60" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-[#d6c3a5] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-[#d6c3a5]/90 shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]">
              <Layers size={14} />
              Bulk Update Stock
            </button>
          </div>
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
                 <div className={`flex items-center gap-1 text-[9px] font-bold ${card.trend === 'up' ? 'text-amber-500' : 'text-rose-500'}`}>
                  {card.trend === 'up' ? '↗' : '↘'} {card.change} <span className="text-white/20 ml-1 font-medium">vs last month</span>
                 </div>
                 {/* Micro Sparkline */}
                 <div className="h-4 w-12 opacity-50">
                   <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                     <path d={card.trend === 'up' ? "M0,25 Q10,22 20,28 T40,25 T60,15 T80,20 T100,5" : "M0,5 Q10,12 20,8 T40,15 T60,25 T80,20 T100,25"} fill="none" stroke="currentColor" strokeWidth="2" className={card.trend === 'up' ? "text-amber-500" : "text-rose-500"} />
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
                  placeholder="Search inventory..."
                  className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Category:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>Luxury</option>
                    <option>Premium</option>
                    <option>Fresh</option>
                    <option>Floral</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Stock Status:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Supplier:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>Givaudan</option>
                    <option>Firmenich</option>
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
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Product</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">SKU</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Category</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold text-center">Current Stock</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold text-center">Reserved</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold text-center">Available</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Stock Status</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Last Updated</th>
                  <th className="py-4 px-4 text-center text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                {inventory.map((item) => (
                  <motion.tr 
                    key={item.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-black/40 overflow-hidden border border-white/[0.05]">
                          <img src={item.product.image} className="w-full h-full object-cover opacity-70" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white tracking-wide">{item.product.name}</p>
                          <p className="text-[9px] text-white/40 font-medium mt-0.5">{item.product.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[11px] text-white/60 font-medium">{item.sku}</td>
                    <td className="py-4 px-4 text-[11px] text-white/60 font-medium">{item.category}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-[12px] text-white font-bold">{item.currentStock}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-[11px] text-white/40">{item.reserved}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-[12px] text-white font-bold">{item.available}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${STATUS_COLORS[item.status] || 'text-white/40 bg-white/5'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[10px] text-white/50 leading-snug whitespace-pre-line">{item.lastUpdated}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          onClick={() => openUpdateModal(item)}
                          className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all">
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
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Showing 1 to 10 of 120 products</p>
            <div className="flex items-center gap-2">
               <button className="p-2 rounded-lg border border-white/[0.05] text-white/20 hover:text-white transition-all">
                  <ChevronLeft size={16} />
               </button>
               {[1, 2, 3, 4, 5, "...", 12].map((p, i) => (
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
        
        {/* Stock Alerts */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Stock Alerts</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] p-2 -mx-2 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                  <AlertTriangle size={14} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white tracking-wide">Low Stock Alerts</p>
                  <p className="text-[9px] text-white/40">Products running low</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-white">23</span>
                <ChevronRightIcon size={14} className="text-white/20 group-hover:text-white transition-all" />
              </div>
            </div>

            <div className="flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] p-2 -mx-2 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center">
                  <XCircle size={14} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white tracking-wide">Out of Stock</p>
                  <p className="text-[9px] text-white/40">Products out of stock</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-white">7</span>
                <ChevronRightIcon size={14} className="text-white/20 group-hover:text-white transition-all" />
              </div>
            </div>

            <div className="flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] p-2 -mx-2 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center">
                  <Truck size={14} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white tracking-wide">Restock Requests</p>
                  <p className="text-[9px] text-white/40">Awaiting restock</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-white">11</span>
                <ChevronRightIcon size={14} className="text-white/20 group-hover:text-white transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Analytics Chart */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Inventory Analytics</h3>
            <select className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-white/40 focus:outline-none">
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="mb-2">
             <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">Stock Trend</p>
             <p className="text-[8px] text-white/20 mb-2">Total Stock (Units)</p>
             <div className="flex items-center gap-2">
                <h4 className="text-xl font-bold text-white tracking-tight">8,245</h4>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center">↗ 12.5%</span>
             </div>
          </div>

          <div className="relative h-28 w-full mt-4">
            <div className="absolute inset-0 flex flex-col justify-between opacity-5">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-[1px] w-full bg-white" />)}
            </div>
            <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="invGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(214, 195, 165, 0.2)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M0,110 L20,105 L40,110 L60,95 L80,100 L100,90 L120,85 L140,95 L160,80 L180,85 L200,70 L220,75 L240,60 L260,65 L280,45 L300,50 L320,35 L340,40 L360,20 L380,25 L400,10 V120 H0 Z"
                fill="url(#invGrowthGradient)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M0,110 L20,105 L40,110 L60,95 L80,100 L100,90 L120,85 L140,95 L160,80 L180,85 L200,70 L220,75 L240,60 L260,65 L280,45 L300,50 L320,35 L340,40 L360,20 L380,25 L400,10"
                fill="none"
                stroke="rgba(214, 195, 165, 1)"
                strokeWidth="2"
                className="drop-shadow-[0_0_8px_rgba(214,195,165,0.4)]"
              />
              <circle cx="400" cy="10" r="3" fill="rgba(214, 195, 165, 1)" />
            </svg>
            <div className="absolute -left-6 inset-y-0 flex flex-col justify-between text-[7px] text-white/20 font-bold text-right pr-2">
               <span>10K</span>
               <span>7.5K</span>
               <span>5K</span>
               <span>2.5K</span>
               <span>0</span>
            </div>
            <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[7px] text-white/20 font-bold uppercase pl-2">
               <span>May 1</span>
               <span>May 8</span>
               <span>May 15</span>
               <span>May 22</span>
               <span>May 29</span>
            </div>
          </div>
        </div>

        {/* Stock by Category Donut */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <h3 className="text-sm font-serif text-white tracking-wide mb-6">Stock by Category</h3>
          
          <div className="flex items-center gap-6">
            <div className="relative flex justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                {/* Luxury */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.35 }}
                  transition={{ duration: 1 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round"
                />
                {/* Premium */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.28 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-87.9" strokeLinecap="round"
                />
                {/* Fresh */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.20 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-158.2" strokeLinecap="round"
                />
                {/* Floral */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.10 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#f43f5e" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-208.5" strokeLinecap="round"
                />
                {/* Woody */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.07 }}
                  transition={{ duration: 1, delay: 1 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-233.6" strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex-1 space-y-2.5">
              {CATEGORY_STATS.map(item => (
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

        {/* Top Moving Products */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Top Moving Products</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-4">
            {TOP_MOVING.map((product) => (
              <div key={product.rank} className="flex items-center gap-3 group cursor-pointer hover:bg-white/[0.02] p-1.5 -mx-1.5 rounded-xl transition-all">
                <span className="text-[10px] font-bold text-white/20 w-3 text-center">{product.rank}.</span>
                <div className="h-8 w-8 rounded-lg bg-black/40 border border-white/[0.1] flex items-center justify-center overflow-hidden shrink-0">
                  <img src={product.image} className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-white tracking-wide truncate">{product.name}</p>
                  <p className="text-[9px] text-white/40">{product.units}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Edit Stock Modal */}
      <AnimatePresence>
        {isUpdateOpen && editingItem && (
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
                <div>
                   <h2 className="text-lg font-serif text-white tracking-wide">Update Stock</h2>
                   <p className="text-[10px] text-white/40 mt-1">{editingItem.product.name} ({editingItem.sku})</p>
                </div>
                <button 
                  onClick={() => setIsUpdateOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/[0.05] text-white/40 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                 {/* Current Status Box */}
                 <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                    <div className="text-center flex-1 border-r border-white/[0.05]">
                       <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Current Stock</p>
                       <p className="text-xl font-bold text-white">{editingItem.currentStock}</p>
                    </div>
                    <div className="text-center flex-1 border-r border-white/[0.05]">
                       <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Reserved</p>
                       <p className="text-xl font-bold text-white/50">{editingItem.reserved}</p>
                    </div>
                    <div className="text-center flex-1">
                       <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Available</p>
                       <p className="text-xl font-bold text-primary">{editingItem.available}</p>
                    </div>
                 </div>

                 {/* Adjustments */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          Add Stock (+)
                       </label>
                       <input 
                         type="number" 
                         min="0"
                         value={formData.addStock}
                         onChange={(e) => setFormData({...formData, addStock: parseInt(e.target.value) || 0})}
                         className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3 text-lg text-emerald-500 font-bold placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 transition-all text-center" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-rose-500" />
                          Remove Stock (-)
                       </label>
                       <input 
                         type="number" 
                         min="0"
                         value={formData.removeStock}
                         onChange={(e) => setFormData({...formData, removeStock: parseInt(e.target.value) || 0})}
                         className="w-full bg-rose-500/5 border border-rose-500/20 rounded-xl px-4 py-3 text-lg text-rose-500 font-bold placeholder:text-white/20 focus:outline-none focus:border-rose-500/50 transition-all text-center" 
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Reason for Adjustment</label>
                    <select 
                      value={formData.reason}
                      onChange={(e) => setFormData({...formData, reason: e.target.value})}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white focus:outline-none focus:border-primary/40 appearance-none"
                    >
                      <option>New delivery</option>
                      <option>Stock correction (found items)</option>
                      <option>Stock correction (missing items)</option>
                      <option>Damaged goods</option>
                      <option>Returned items</option>
                    </select>
                 </div>
              </div>

              <div className="border-t border-white/[0.05] px-6 py-5 flex items-center justify-end gap-4 bg-[#0a0810]">
                <button 
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateStock}
                  className="px-6 py-2.5 rounded-xl bg-primary text-[#050308] text-[10px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-[0_4px_15px_-4px_rgba(214,195,165,0.4)]"
                >
                  Confirm Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
