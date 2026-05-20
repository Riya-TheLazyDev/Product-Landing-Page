"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Loader2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { productService } from "@/services/productService";
import {
  formatCreatedAt,
  formatPriceINR,
  getStockStatus,
} from "@/lib/productMapper";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  category: "Men",
  stock: "",
  sku: "",
  featured: false,
  status: "Active",
  imageUrl: "/assets/product.jpeg",
};

type FormState = typeof EMPTY_FORM;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [stockFilter, setStockFilter] = useState("Stock Status");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await productService.getProducts();
    if (res.success && res.data) {
      setProducts(res.data);
    } else {
      setError(res.error || "Failed to load products");
      setProducts([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "All Categories" || p.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All Status" || p.status === statusFilter;
      const stockStatus = getStockStatus(p.stock);
      const matchesStock =
        stockFilter === "Stock Status" ||
        stockFilter === stockStatus;
      return matchesSearch && matchesCategory && matchesStatus && matchesStock;
    });
  }, [products, searchQuery, categoryFilter, statusFilter, stockFilter]);

  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.status === "Active").length;
    const outOfStock = products.filter((p) => p.stock <= 0).length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
    const categories = new Set(products.map((p) => p.category)).size;
    return [
      { label: "Total Products", value: String(total), change: "—", icon: Package, trend: "up" as const },
      { label: "Active Products", value: String(active), change: "—", icon: CheckCircle2, trend: "up" as const },
      { label: "Out of Stock", value: String(outOfStock), change: "—", icon: XCircle, trend: "up" as const },
      { label: "Low Stock", value: String(lowStock), change: "—", icon: AlertTriangle, trend: "down" as const },
      { label: "Total Categories", value: String(categories), change: "—", icon: Layers, trend: "up" as const },
    ];
  }, [products]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) setSelectedProducts([]);
    else setSelectedProducts(filteredProducts.map((p) => p.id));
  };

  const toggleSelect = (id: string | number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData(EMPTY_FORM);
    setFormError("");
    setIsEditorOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
      category: product.category,
      stock: String(product.stock),
      sku: product.sku,
      featured: product.featured,
      status: product.status,
      imageUrl: product.images[0] || "/assets/product.jpeg",
    });
    setFormError("");
    setIsEditorOpen(true);
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Product name is required.";
    if (!formData.category.trim()) return "Category is required.";
    const price = parseFloat(formData.price);
    if (Number.isNaN(price) || price < 0) return "Enter a valid price.";
    const stock = parseInt(formData.stock, 10);
    if (Number.isNaN(stock) || stock < 0) return "Enter a valid stock quantity.";
    if (formData.discountPrice) {
      const discount = parseFloat(formData.discountPrice);
      if (Number.isNaN(discount) || discount < 0) return "Enter a valid discount price.";
    }
    return null;
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setSaving(true);
    setFormError("");

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
      category: formData.category,
      stock: parseInt(formData.stock, 10),
      sku: formData.sku.trim() || undefined,
      featured: formData.featured,
      status: formData.status,
      images: [formData.imageUrl.trim() || "/assets/product.jpeg"],
    };

    const res = editingProduct
      ? await productService.updateProduct(editingProduct.id, payload)
      : await productService.createProduct(payload as Omit<Product, "id">);

    setSaving(false);

    if (!res.success) {
      setFormError(res.error || "Failed to save product");
      return;
    }

    setIsEditorOpen(false);
    await loadProducts();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await productService.deleteProduct(deleteTarget.id);
    setDeleting(false);
    if (!res.success) {
      setError(res.error || "Failed to delete product");
      setDeleteTarget(null);
      return;
    }
    setDeleteTarget(null);
    setSelectedProducts([]);
    await loadProducts();
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    setBulkDeleting(true);
    setError("");
    const results = await Promise.all(
      selectedProducts.map((id) => productService.deleteProduct(id))
    );
    setBulkDeleting(false);
    const failed = results.find((r) => !r.success);
    if (failed) {
      setError(failed.error || "Some products could not be deleted");
      return;
    }
    setSelectedProducts([]);
    await loadProducts();
  };

  return (
    <div className="space-y-8 pb-10">
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
          {selectedProducts.length > 0 ? (
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-rose-300 transition-all hover:bg-rose-500/20 disabled:opacity-50"
            >
              {bulkDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Delete ({selectedProducts.length})
            </button>
          ) : null}
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#050308] transition-all hover:bg-primary/90 shadow-[0_8px_20px_-6px_rgba(214,195,165,0.4)]"
          >
            <Plus size={14} />
            Add Product
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, i) => (
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
            <div className="mt-4 h-6 w-full opacity-20">
               <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                  <path d="M0,25 Q10,22 20,28 T40,25 T60,15 T80,20 T100,10" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
               </svg>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/[0.05] bg-white/[0.01] p-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 max-w-4xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/[0.05] bg-white/[0.02] py-2.5 pl-11 pr-4 text-[11px] text-white placeholder:text-white/20 focus:border-primary/40 focus:outline-none transition-all"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none"
            >
              <option>All Categories</option>
              <option>Men</option>
              <option>Women</option>
              <option>Unisex</option>
              <option>Luxury</option>
              <option>Protect</option>
              <option>Regenerates</option>
              <option>Revitalizes</option>
              <option>Feeds</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60 focus:outline-none"
            >
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

        {error ? (
          <p className="mt-6 text-xs text-red-300/90">{error}</p>
        ) : null}

        <div className="mt-8 overflow-x-auto custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-white/40">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span className="text-[11px] uppercase tracking-widest">Loading products...</span>
            </div>
          ) : (
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
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
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                const displayPrice = product.discountPrice ?? product.price;
                return (
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
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover opacity-70" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white tracking-wide">{product.name}</p>
                        <p className="text-[9px] text-white/30 font-medium mt-1 uppercase tracking-wider">SKU: {product.sku || "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-[11px] text-white/60 font-medium">{product.category}</td>
                  <td className="py-5 px-4 text-[11px] text-white font-bold">{formatPriceINR(displayPrice)}</td>
                  <td className="py-5 px-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-bold text-white">{product.stock}</span>
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit ${
                        stockStatus === 'In Stock' ? 'text-emerald-500 bg-emerald-500/10' :
                        stockStatus === 'Low Stock' ? 'text-amber-500 bg-amber-500/10' :
                        'text-rose-500 bg-rose-500/10'
                      }`}>
                        {stockStatus}
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
                  <td className="py-5 px-4 text-[10px] text-white/40 font-medium">
                    {formatCreatedAt(product.created_at)}
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-primary transition-all"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-rose-500 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );})}
            </tbody>
          </table>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.05] pt-8">
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex items-center gap-2">
             <button className="p-2 rounded-lg border border-white/[0.05] text-white/20 hover:text-white transition-all">
                <ChevronLeft size={16} />
             </button>
             <button className="h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-bold bg-primary text-[#050308]">
                1
             </button>
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

      {/* Product Editor Modal */}
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
              className="bg-[#050308] border border-white/[0.05] rounded-3xl w-full max-w-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/[0.05] px-8 py-5 bg-[#0a0810]">
                <h2 className="text-lg font-serif text-white tracking-wide">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/[0.05] text-white/40 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {formError ? (
                  <p className="text-xs text-red-300 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3">
                    {formError}
                  </p>
                ) : null}

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Title *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/40"
                    placeholder="Product name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white h-24 resize-none focus:outline-none focus:border-primary/40"
                    placeholder="Product description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Price *</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Discount Price</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.discountPrice}
                      onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white focus:outline-none"
                    >
                      <option>Men</option>
                      <option>Women</option>
                      <option>Unisex</option>
                      <option>Luxury</option>
                      <option>Protect</option>
                      <option>Regenerates</option>
                      <option>Revitalizes</option>
                      <option>Feeds</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Stock *</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[11px] text-white focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Draft</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/40"
                    placeholder="/assets/product.jpeg"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Featured product</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/[0.05] px-8 py-5 bg-[#0a0810]">
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/[0.05] text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-[#050308] text-[10px] font-bold uppercase tracking-wider hover:bg-primary/90 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#050308] border border-white/[0.05] rounded-3xl w-full max-w-md p-8"
            >
              <h3 className="text-lg font-serif text-white mb-3">Delete Product</h3>
              <p className="text-sm text-white/50 mb-8">
                Are you sure you want to delete <strong className="text-white">{deleteTarget.name}</strong>? This cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/[0.05] text-[10px] font-bold uppercase tracking-wider text-white/50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600/90 text-white text-[10px] font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {deleting ? <Loader2 size={14} className="animate-spin" /> : null}
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
