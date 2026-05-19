"use client";

import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Download,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Layers,
} from "lucide-react";
import { useState } from "react";

// Mock Data
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Oud Noir",
    sku: "EVR-001",
    category: "Men",
    price: "₹2,999",
    stock: 50,
    stockStatus: "In Stock",
    status: "Active",
    featured: true,
    createdAt: "May 24, 2025",
    image: "/assets/product.jpeg",
  },
  {
    id: 2,
    name: "Amber Shade",
    sku: "EVR-002",
    category: "Unisex",
    price: "₹1,999",
    stock: 34,
    stockStatus: "In Stock",
    status: "Active",
    featured: false,
    createdAt: "May 23, 2025",
    image: "/assets/product.jpeg",
  },
  {
    id: 3,
    name: "Midnight Whisper",
    sku: "EVR-003",
    category: "Men",
    price: "₹2,299",
    stock: 18,
    stockStatus: "Low Stock",
    status: "Active",
    featured: true,
    createdAt: "May 22, 2025",
    image: "/assets/product.jpeg",
  },
  {
    id: 4,
    name: "Citrus Cedrat",
    sku: "EVR-004",
    category: "Unisex",
    price: "₹1,799",
    stock: 12,
    stockStatus: "Low Stock",
    status: "Active",
    featured: false,
    createdAt: "May 21, 2025",
    image: "/assets/product.jpeg",
  },
  {
    id: 5,
    name: "Velvet Musk",
    sku: "EVR-005",
    category: "Men",
    price: "₹1,899",
    stock: 0,
    stockStatus: "Out of Stock",
    status: "Active",
    featured: true,
    createdAt: "May 20, 2025",
    image: "/assets/product.jpeg",
  },
  {
    id: 6,
    name: "Royal Leather",
    sku: "EVR-006",
    category: "Men",
    price: "₹2,499",
    stock: 6,
    stockStatus: "Low Stock",
    status: "Active",
    featured: false,
    createdAt: "May 19, 2025",
    image: "/assets/product.jpeg",
  },
  {
    id: 7,
    name: "Jasmine Noir",
    sku: "EVR-007",
    category: "Women",
    price: "₹1,699",
    stock: 22,
    stockStatus: "In Stock",
    status: "Active",
    featured: false,
    createdAt: "May 18, 2025",
    image: "/assets/product.jpeg",
  },
];

const STATS = [
  { label: "Total Products", value: "86", change: "12.4%", icon: Package, trend: "up" },
  { label: "Active Products", value: "72", change: "8.6%", icon: CheckCircle2, trend: "up" },
  { label: "Out of Stock", value: "6", change: "2.1%", icon: XCircle, trend: "up" },
  { label: "Low Stock", value: "8", change: "5.3%", icon: AlertTriangle, trend: "down" },
  { label: "Total Categories", value: "12", change: "3.4%", icon: Layers, trend: "up" },
];

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === PRODUCTS_DATA.length) setSelectedProducts([]);
    else setSelectedProducts(PRODUCTS_DATA.map((p) => p.id));
  };

  const toggleSelect = (id: number) => {
    if (selectedProducts.includes(id)) setSelectedProducts(selectedProducts.filter((p) => p !== id));
    else setSelectedProducts([...selectedProducts, id]);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Product Management</h1>
          <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
            Add, edit and manage all your products
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/[0.05]">
            <Download size={14} className="text-primary/60" />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-primary/90 shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]">
            <Plus size={14} />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-9 w-9 rounded-xl bg-white/[0.03] flex items-center justify-center text-primary/70">
                <stat.icon size={18} strokeWidth={1.5} />
              </div>
              <button className="text-white/20 hover:text-white transition-colors">
                <MoreVertical size={14} />
              </button>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{stat.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
              <div className={`flex items-center gap-1 text-[9px] font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-amber-500'}`}>
                {stat.trend === 'up' ? '↗' : '↘'} {stat.change}
              </div>
            </div>
            {/* Small Sparkline */}
            <div className="mt-4 h-6 w-full opacity-20">
               <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                  <path d="M0,25 Q10,22 20,28 T40,25 T60,15 T80,20 T100,10" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
               </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 max-w-4xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-all"
              />
            </div>
            <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
              <option>All Categories</option>
              <option>Men</option>
              <option>Women</option>
              <option>Unisex</option>
            </select>
            <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
            <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
              <option>Stock Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
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
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === PRODUCTS_DATA.length}
                    onChange={toggleSelectAll}
                    className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                  />
                </th>
                <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Product</th>
                <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Category</th>
                <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Price</th>
                <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Stock</th>
                <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Status</th>
                <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Featured</th>
                <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Created At</th>
                <th className="py-4 px-4 text-center text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS_DATA.map((product) => (
                <tr key={product.id} className="group border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                  <td className="py-5 px-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                    />
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-10 shrink-0 rounded-lg bg-black/40 overflow-hidden border border-white/[0.05]">
                        <img src={product.image} className="w-full h-full object-cover opacity-70" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white tracking-wide">{product.name}</p>
                        <p className="text-[9px] text-white/30 font-medium mt-1 uppercase tracking-wider">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-[11px] text-white/60 font-medium">{product.category}</td>
                  <td className="py-5 px-4 text-[11px] text-white font-bold">{product.price}</td>
                  <td className="py-5 px-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-white">{product.stock}</span>
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit ${
                        product.stockStatus === 'In Stock' ? 'text-emerald-500 bg-emerald-500/10' :
                        product.stockStatus === 'Low Stock' ? 'text-amber-500 bg-amber-500/10' :
                        'text-rose-500 bg-rose-500/10'
                      }`}>
                        {product.stockStatus}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      {product.status}
                    </span>
                  </td>
                  <td className="py-5 px-4">
                    <Star size={14} className={product.featured ? "text-primary fill-primary" : "text-white/10"} />
                  </td>
                  <td className="py-5 px-4 text-[10px] text-white/40 font-medium">{product.createdAt}</td>
                  <td className="py-5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all">
                        <Edit size={14} />
                      </button>
                      <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-rose-500 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.05] pt-8">
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Showing 1 to 10 of 86 products</p>
          <div className="flex items-center gap-2">
             <button className="p-2 rounded-lg border border-white/[0.05] text-white/20 hover:text-white transition-all">
                <ChevronLeft size={16} />
             </button>
             {[1, 2, 3, 4, 5, "...", 9].map((p, i) => (
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
             <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">10 / page</span>
             <ChevronDown size={14} className="text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDown({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
