import { create } from "zustand";
import { Product } from "@/data/products";
import { Order } from "@/data/orders";
import { Customer } from "@/data/customers";

interface AdminFilters {
  searchQuery: string;
  category: string;
  status: string;
  sortBy: string;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  conversionRate: number;
}

interface AdminState {
  // Global Admin Layout
  selectedModule: string;
  isSidebarOpen: boolean;

  // Data Collections
  products: Product[];
  orders: Order[];
  customers: Customer[];
  
  // States
  selectedRows: string[];
  filters: AdminFilters;
  loading: boolean;
  error: string | null;
  stats: DashboardStats;

  // Actions
  setSelectedModule: (mod: string) => void;
  setSidebarOpen: (open: boolean) => void;

  // Data Setters
  setProducts: (products: Product[]) => void;
  setOrders: (orders: Order[]) => void;
  setCustomers: (customers: Customer[]) => void;
  setStats: (stats: DashboardStats) => void;

  // Selection Actions
  setSelectedRows: (ids: string[]) => void;
  toggleRowSelection: (id: string) => void;
  clearRowSelection: () => void;

  // Filter Actions
  updateFilters: (updates: Partial<AdminFilters>) => void;
  resetFilters: () => void;

  // Table Updates & CRUD placeholders
  updateProductInTable: (id: string, updates: Partial<Product>) => void;
  deleteProductFromTable: (id: string) => void;
  updateOrderStatusInTable: (id: string, status: string) => void;

  // Bulk Actions
  bulkUpdateStatus: (ids: string[], newStatus: string) => Promise<void>;
  bulkDeleteProducts: (ids: string[]) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  // Initial States
  selectedModule: "dashboard",
  isSidebarOpen: true,
  products: [],
  orders: [],
  customers: [],
  selectedRows: [],
  loading: false,
  error: null,
  filters: {
    searchQuery: "",
    category: "All",
    status: "All",
    sortBy: "newest",
  },
  stats: {
    totalRevenue: 148250,
    totalOrders: 342,
    totalCustomers: 289,
    averageOrderValue: 433.48,
    conversionRate: 3.42,
  },

  // Actions
  setSelectedModule: (mod) => set({ selectedModule: mod }),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  setProducts: (products) => set({ products }),
  setOrders: (orders) => set({ orders }),
  setCustomers: (customers) => set({ customers }),
  setStats: (stats) => set({ stats }),

  // Selection
  setSelectedRows: (ids) => set({ selectedRows: ids }),
  toggleRowSelection: (id) =>
    set((s) => {
      const exists = s.selectedRows.includes(id);
      return {
        selectedRows: exists
          ? s.selectedRows.filter((rowId) => rowId !== id)
          : [...s.selectedRows, id],
      };
    }),
  clearRowSelection: () => set({ selectedRows: [] }),

  // Filters
  updateFilters: (updates) =>
    set((s) => ({
      filters: { ...s.filters, ...updates },
    })),
  resetFilters: () =>
    set({
      filters: {
        searchQuery: "",
        category: "All",
        status: "All",
        sortBy: "newest",
      },
    }),

  // Table updates
  updateProductInTable: (id, updates) =>
    set((s) => ({
      products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  deleteProductFromTable: (id) =>
    set((s) => ({
      products: s.products.filter((p) => p.id !== id),
    })),

  updateOrderStatusInTable: (id, status) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    })),

  // Async Mock Bulk Actions
  bulkUpdateStatus: async (ids, newStatus) => {
    set({ loading: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        set((s) => ({
          orders: s.orders.map((o) => (ids.includes(o.id) ? { ...o, status: newStatus } : o)),
          selectedRows: [],
          loading: false,
        }));
        resolve();
      }, 500);
    });
  },

  bulkDeleteProducts: async (ids) => {
    set({ loading: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        set((s) => ({
          products: s.products.filter((p) => !ids.includes(p.id)),
          selectedRows: [],
          loading: false,
        }));
        resolve();
      }, 500);
    });
  },
}));

export default useAdminStore;
