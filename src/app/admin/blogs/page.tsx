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
  FileText,
  ShieldCheck,
  FileEdit,
  Eye,
  Plus,
  Edit2,
  Trash2,
  X,
  History,
  Image as ImageIcon,
  Type,
  List,
  Bold,
  Italic,
  Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";

// Mock Data
const INITIAL_BLOGS = [
  {
    id: 1,
    title: "The Art of Luxury Perfumery",
    description: "Exploring the craftsmanship behind fine...",
    image: "/assets/product.jpeg",
    category: "Lifestyle",
    author: { name: "John Carter", avatar: "/assets/product.jpeg" },
    status: "Published",
    publishDate: "May 28, 2024",
    createdDate: "May 25, 2024",
    views: "2.4K",
  },
  {
    id: 2,
    title: "Top 10 Fragrances for Summer 2024",
    description: "Our handpicked selection of summer...",
    image: "/assets/product.jpeg",
    category: "Guides",
    author: { name: "Sophia Lee", avatar: "/assets/product.jpeg" },
    status: "Published",
    publishDate: "May 22, 2024",
    createdDate: "May 20, 2024",
    views: "3.8K",
  },
  {
    id: 3,
    title: "Understanding Fragrance Notes",
    description: "A deep dive into top, heart, and base notes...",
    image: "/assets/product.jpeg",
    category: "Education",
    author: { name: "Daniel Kim", avatar: "/assets/product.jpeg" },
    status: "Draft",
    publishDate: "—",
    createdDate: "May 29, 2024",
    views: "0",
  },
  {
    id: 4,
    title: "Oud: The Gold of Perfumery",
    description: "Discover why oud is one of the rarest and...",
    image: "/assets/product.jpeg",
    category: "Ingredients",
    author: { name: "John Carter", avatar: "/assets/product.jpeg" },
    status: "Published",
    publishDate: "May 18, 2024",
    createdDate: "May 16, 2024",
    views: "5.6K",
  },
  {
    id: 5,
    title: "How to Make Your Perfume Last Longer",
    description: "Pro tips to help your fragrance stay all day...",
    image: "/assets/product.jpeg",
    category: "Tips",
    author: { name: "Sophia Lee", avatar: "/assets/product.jpeg" },
    status: "Published",
    publishDate: "May 15, 2024",
    createdDate: "May 14, 2024",
    views: "1.9K",
  },
  {
    id: 6,
    title: "A Guide to Choosing Your Signature Scent",
    description: "Find the perfect fragrance that defines you...",
    image: "/assets/product.jpeg",
    category: "Guides",
    author: { name: "Daniel Kim", avatar: "/assets/product.jpeg" },
    status: "Scheduled",
    publishDate: "Jun 05, 2024",
    createdDate: "May 28, 2024",
    views: "0",
  },
  {
    id: 7,
    title: "The History of Perfume",
    description: "From ancient Egypt to modern luxury...",
    image: "/assets/product.jpeg",
    category: "History",
    author: { name: "Emily Watson", avatar: "/assets/product.jpeg" },
    status: "Published",
    publishDate: "May 10, 2024",
    createdDate: "May 08, 2024",
    views: "4.3K",
  },
  {
    id: 8,
    title: "New Collection: Midnight Series",
    description: "Introducing our new exclusive collection...",
    image: "/assets/product.jpeg",
    category: "Announcements",
    author: { name: "John Carter", avatar: "/assets/product.jpeg" },
    status: "Archived",
    publishDate: "Apr 30, 2024",
    createdDate: "Apr 28, 2024",
    views: "2.1K",
  },
  {
    id: 9,
    title: "Floral vs Oriental: What's the Difference?",
    description: "Understanding fragrance families...",
    image: "/assets/product.jpeg",
    category: "Education",
    author: { name: "Sophia Lee", avatar: "/assets/product.jpeg" },
    status: "Draft",
    publishDate: "—",
    createdDate: "May 27, 2024",
    views: "0",
  },
  {
    id: 10,
    title: "Best Fragrances for Date Night",
    description: "Scents that leave a lasting impression...",
    image: "/assets/product.jpeg",
    category: "Lifestyle",
    author: { name: "Daniel Kim", avatar: "/assets/product.jpeg" },
    status: "Scheduled",
    publishDate: "Jun 02, 2024",
    createdDate: "May 26, 2024",
    views: "0",
  },
];

const ANALYTICS_CARDS = [
  { label: "Total Blogs", value: "42", change: "+16.2%", icon: FileText, trend: "up" },
  { label: "Published Blogs", value: "28", change: "+12.5%", icon: ShieldCheck, trend: "up" },
  { label: "Draft Blogs", value: "8", change: "-5.3%", icon: FileEdit, trend: "down" },
  { label: "Total Views", value: "126.8K", change: "+28.4%", icon: Eye, trend: "up" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Lifestyle": "text-purple-500 bg-purple-500/10 border-purple-500/20",
  "Guides": "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "Education": "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  "Ingredients": "text-amber-500 bg-amber-500/10 border-amber-500/20",
  "Tips": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "History": "text-orange-500 bg-orange-500/10 border-orange-500/20",
  "Announcements": "text-pink-500 bg-pink-500/10 border-pink-500/20",
};

const STATUS_COLORS: Record<string, string> = {
  "Published": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  "Draft": "text-amber-500 bg-amber-500/10 border-amber-500/20",
  "Scheduled": "text-blue-500 bg-blue-500/10 border-blue-500/20",
  "Archived": "text-white/40 bg-white/5 border-white/10",
};

const CONTENT_STATS = [
  { label: "Published", value: "28", percent: "66.7%", color: "bg-emerald-500", stroke: "#10b981" },
  { label: "Draft", value: "8", percent: "19.0%", color: "bg-amber-500", stroke: "#f59e0b" },
  { label: "Scheduled", value: "3", percent: "7.1%", color: "bg-blue-500", stroke: "#3b82f6" },
  { label: "Archived", value: "3", percent: "7.1%", color: "bg-white/20", stroke: "rgba(255,255,255,0.2)" },
];

const TOP_VIEWED = [
  { title: "Oud: The Gold of Perfumery", views: "5.6K views", rank: 1, image: "/assets/product.jpeg" },
  { title: "Top 10 Fragrances for Summer", views: "3.8K views", rank: 2, image: "/assets/product.jpeg" },
  { title: "The Art of Luxury Perfumery", views: "2.4K views", rank: 3, image: "/assets/product.jpeg" },
  { title: "How to Make Your Perfume", views: "1.9K views", rank: 4, image: "/assets/product.jpeg" },
  { title: "The History of Perfume", views: "1.4K views", rank: 5, image: "/assets/product.jpeg" },
];

const RECENT_ACTIVITY = [
  { action: "New blog \"Understanding Fragrance Notes\" created", time: "2 hours ago", icon: History },
  { action: "Blog \"The Art of Luxury Perfumery\" published", time: "5 hours ago", icon: ShieldCheck },
  { action: "Blog \"New Collection: Midnight Series\" archived", time: "1 day ago", icon: FileText },
  { action: "Blog \"Best Fragrances for Date Night\" scheduled", time: "2 days ago", icon: FileEdit },
  { action: "Blog \"Floral vs Oriental: What's the Difference?\" created", time: "2 days ago", icon: History },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [selectedBlogs, setSelectedBlogs] = useState<number[]>([]);
  
  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);

  // Form state for creating/editing
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Lifestyle",
    status: "Draft",
    content: "",
  });

  const toggleSelectAll = () => {
    if (selectedBlogs.length === blogs.length) setSelectedBlogs([]);
    else setSelectedBlogs(blogs.map((b) => b.id));
  };

  const toggleSelect = (id: number) => {
    if (selectedBlogs.includes(id)) setSelectedBlogs(selectedBlogs.filter((b) => b !== id));
    else setSelectedBlogs([...selectedBlogs, id]);
  };

  const openEditor = (blog?: any) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        description: blog.description,
        category: blog.category,
        status: blog.status,
        content: "<p>Sample blog content...</p>",
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        description: "",
        category: "Lifestyle",
        status: "Draft",
        content: "",
      });
    }
    setIsEditorOpen(true);
  };

  const saveBlog = () => {
    if (editingBlog) {
      setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...b, ...formData } : b));
    } else {
      const newBlog = {
        id: Math.max(...blogs.map(b => b.id)) + 1,
        ...formData,
        image: "/assets/product.jpeg",
        author: { name: "Admin", avatar: "/assets/product.jpeg" },
        publishDate: formData.status === "Published" ? new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "—",
        createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        views: "0",
      };
      setBlogs([newBlog, ...blogs]);
    }
    setIsEditorOpen(false);
  };

  const confirmDelete = (id: number) => {
    setBlogToDelete(id);
    setIsDeleteOpen(true);
  };

  const executeDelete = () => {
    if (blogToDelete) {
      setBlogs(blogs.filter(b => b.id !== blogToDelete));
      setSelectedBlogs(selectedBlogs.filter(id => id !== blogToDelete));
    }
    setIsDeleteOpen(false);
    setBlogToDelete(null);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-10">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-serif text-white tracking-tight">Blogs Management</h1>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] mt-2 font-semibold">
              Create, manage and organize your blog posts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/70 transition-all hover:bg-white/[0.05]">
              <Download size={14} className="text-primary/60" />
              Export
            </button>
            <button 
              onClick={() => openEditor()}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-primary/90 shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]"
            >
              <Plus size={14} />
              Create Blog
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
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full max-w-4xl">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Category:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>Lifestyle</option>
                    <option>Guides</option>
                    <option>Education</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Status:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>All</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Scheduled</option>
                 </select>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold hidden sm:inline-block">Sort by:</span>
                 <select className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none">
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Most Views</option>
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
                  <th className="py-4 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedBlogs.length > 0 && selectedBlogs.length === blogs.length}
                      onChange={toggleSelectAll}
                      className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                    />
                  </th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Blog</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Category</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Author</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Status</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Publish Date</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Created Date</th>
                  <th className="py-4 px-4 text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Views</th>
                  <th className="py-4 px-4 text-center text-[10px] uppercase tracking-[0.15em] text-white/20 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                {blogs.map((blog) => (
                  <motion.tr 
                    key={blog.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="py-5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedBlogs.includes(blog.id)}
                        onChange={() => toggleSelect(blog.id)}
                        className="h-3.5 w-3.5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/40"
                      />
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 shrink-0 rounded-lg bg-black/40 overflow-hidden border border-white/[0.05]">
                          <img src={blog.image} className="w-full h-full object-cover opacity-70" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white tracking-wide">{blog.title}</p>
                          <p className="text-[9px] text-white/30 font-medium mt-1 w-[180px] truncate">{blog.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${CATEGORY_COLORS[blog.category] || 'text-white/40 border-white/10'}`}>
                        {blog.category}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2">
                        <img src={blog.author.avatar} className="h-6 w-6 rounded-full opacity-80" />
                        <span className="text-[11px] text-white/60">{blog.author.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${STATUS_COLORS[blog.status] || 'text-white/40 border-white/10'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-[10px] text-white/50">{blog.publishDate}</td>
                    <td className="py-5 px-4 text-[10px] text-white/50">{blog.createdDate}</td>
                    <td className="py-5 px-4 text-[11px] text-white font-bold">{blog.views}</td>
                    <td className="py-5 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-amber-500 transition-all">
                          <Eye size={14} />
                        </button>
                        <button 
                          onClick={() => openEditor(blog)}
                          className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => confirmDelete(blog.id)}
                          className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-rose-500 transition-all"
                        >
                          <Trash2 size={14} />
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
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Showing 1 to {Math.min(10, blogs.length)} of {blogs.length} blogs</p>
            <div className="flex items-center gap-2">
               <button className="p-2 rounded-lg border border-white/[0.05] text-white/20 hover:text-white transition-all">
                  <ChevronLeft size={16} />
               </button>
               {[1, 2, 3, "...", 5].map((p, i) => (
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
        {/* Blog Performance Chart */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Blog Performance</h3>
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
                <linearGradient id="blogGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(214, 195, 165, 0.2)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M0,140 L40,130 L80,100 L120,90 L160,80 L200,60 L240,65 L280,30 L320,40 L360,20 L400,10 V150 H0 Z"
                fill="url(#blogGrowthGradient)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M0,140 L40,130 L80,100 L120,90 L160,80 L200,60 L240,65 L280,30 L320,40 L360,20 L400,10"
                fill="none"
                stroke="rgba(214, 195, 165, 1)"
                strokeWidth="2"
                className="drop-shadow-[0_0_8px_rgba(214,195,165,0.4)]"
              />
              <circle cx="400" cy="10" r="4" fill="rgba(214, 195, 165, 1)" />
              <rect x="360" y="-15" width="40" height="18" rx="4" fill="rgba(214, 195, 165, 0.1)" stroke="rgba(214, 195, 165, 0.3)" />
              <text x="380" y="-3" fill="rgba(214, 195, 165, 1)" fontSize="9" fontWeight="bold" textAnchor="middle">28.6K</text>
            </svg>
            <div className="absolute -left-6 inset-y-0 flex flex-col justify-between text-[8px] text-white/20 font-bold text-right pr-2">
               <span>40K</span>
               <span>30K</span>
               <span>20K</span>
               <span>10K</span>
               <span>10</span>
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

        {/* Top Viewed Blogs */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-serif text-white tracking-wide">Top Viewed Blogs</h3>
            <button className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">View All</button>
          </div>
          <div className="space-y-4">
            {TOP_VIEWED.map((blog) => (
              <div key={blog.rank} className="flex items-center gap-3 group cursor-pointer">
                <span className="text-[10px] font-bold text-white/20 w-3">{blog.rank}</span>
                <div className="h-10 w-12 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden shrink-0">
                  <img src={blog.image} className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-white tracking-wide truncate">{blog.title}</p>
                  <p className="text-[8px] text-white/40 mt-0.5">{blog.views}</p>
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

        {/* Content Overview Donut */}
        <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
          <h3 className="text-sm font-serif text-white tracking-wide mb-6">Content Overview</h3>
          
          <div className="flex items-center gap-6">
            <div className="relative flex justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                {/* Published */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.667 }}
                  transition={{ duration: 1 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeLinecap="round"
                />
                {/* Draft */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.19 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-167.5" strokeLinecap="round"
                />
                {/* Scheduled */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.071 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-215.3" strokeLinecap="round"
                />
                {/* Archived */}
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.071 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="-233.1" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-white tracking-tight">42</p>
                <p className="text-[7px] uppercase tracking-widest text-white/30 font-bold">Total</p>
              </div>
            </div>

            <div className="flex-1 space-y-2.5">
              {CONTENT_STATS.map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                    <span className="text-[9px] text-white/50">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-white/40"><span className="font-bold text-white mr-1">{item.value}</span>({item.percent})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Editor Modal (Create / Edit Blog) */}
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
              className="bg-[#050308] border border-white/[0.05] rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/[0.05] px-8 py-5 shrink-0 bg-[#0a0810]">
                <h2 className="text-lg font-serif text-white tracking-wide">
                  {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>
                <button 
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/[0.05] text-white/40 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar grid lg:grid-cols-[1fr_300px] gap-8">
                {/* Main Editor Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Blog Title</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter a captivating title..." 
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-lg text-white font-serif placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Short Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Write a brief excerpt for the blog preview..." 
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 h-20 resize-none transition-all" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex justify-between">
                      <span>Content</span>
                      <span className="text-white/20">Rich Text Editor</span>
                    </label>
                    {/* Mock Premium Rich Text Editor */}
                    <div className="border border-white/[0.05] rounded-xl overflow-hidden bg-white/[0.01] flex flex-col">
                      {/* Editor Toolbar */}
                      <div className="flex items-center gap-1 border-b border-white/[0.05] p-2 bg-white/[0.02] overflow-x-auto">
                        <button className="p-2 text-white/40 hover:text-white hover:bg-white/[0.05] rounded-lg"><Type size={14} /></button>
                        <button className="p-2 text-white/40 hover:text-white hover:bg-white/[0.05] rounded-lg"><Bold size={14} /></button>
                        <button className="p-2 text-white/40 hover:text-white hover:bg-white/[0.05] rounded-lg"><Italic size={14} /></button>
                        <div className="w-px h-4 bg-white/[0.1] mx-2" />
                        <button className="p-2 text-white/40 hover:text-white hover:bg-white/[0.05] rounded-lg"><List size={14} /></button>
                        <button className="p-2 text-white/40 hover:text-white hover:bg-white/[0.05] rounded-lg"><LinkIcon size={14} /></button>
                        <button className="p-2 text-white/40 hover:text-white hover:bg-white/[0.05] rounded-lg"><ImageIcon size={14} /></button>
                      </div>
                      {/* Editor Body */}
                      <textarea 
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full h-[400px] bg-transparent p-6 text-[12px] leading-relaxed text-white/80 placeholder:text-white/20 focus:outline-none resize-none"
                        placeholder="Start writing your masterpiece..."
                      />
                    </div>
                  </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                  {/* Status & Publish */}
                  <div className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] space-y-4">
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-widest border-b border-white/[0.05] pb-3">Publishing</h3>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 font-bold">Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-3 py-2.5 text-[11px] text-white/80 focus:outline-none"
                      >
                        <option>Draft</option>
                        <option>Published</option>
                        <option>Scheduled</option>
                        <option>Archived</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button 
                        onClick={saveBlog}
                        className="w-full py-3 rounded-xl bg-primary text-[#050308] text-[10px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-[0_4px_15px_-4px_rgba(214,195,165,0.4)]"
                      >
                        {editingBlog ? "Save Changes" : "Publish Blog"}
                      </button>
                    </div>
                  </div>

                  {/* Category & Metadata */}
                  <div className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] space-y-4">
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-widest border-b border-white/[0.05] pb-3">Metadata</h3>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 font-bold">Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-3 py-2.5 text-[11px] text-white/80 focus:outline-none"
                      >
                        <option>Lifestyle</option>
                        <option>Guides</option>
                        <option>Education</option>
                        <option>Ingredients</option>
                        <option>History</option>
                      </select>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] text-white/40 font-bold">Tags</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Perfume, Summer, Oud" 
                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl px-3 py-2.5 text-[11px] text-white focus:outline-none placeholder:text-white/20" 
                      />
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] space-y-4">
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-widest border-b border-white/[0.05] pb-3">Featured Image</h3>
                    
                    <div className="border-2 border-dashed border-white/[0.1] rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-white/[0.02] transition-all">
                      <ImageIcon size={20} className="text-white/20 mb-2" />
                      <p className="text-[10px] font-bold text-white/40 text-center px-4">Click to upload or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
              <h3 className="text-lg font-serif text-white mb-2">Delete Blog Post?</h3>
              <p className="text-[11px] text-white/50 leading-relaxed mb-6">
                Are you sure you want to delete this blog post? This action cannot be undone and will remove it from the CMS permanently.
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
