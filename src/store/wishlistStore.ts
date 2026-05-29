import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WishlistItem {
  id: string; // Centralized product ID
  productId?: string; // Backwards compatibility
  name: string;
  image?: string;
  price: number;
}

interface WishlistState {
  // State
  items: WishlistItem[];
  wishlistCount: number;
  activeUserId: string | null;

  // Actions
  loadForUser: (userId: string) => void;
  clearSession: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

const getWishlistStorageKey = (userId: string) => `wishlist_${userId}`;

const readWishlistItems = (userId: string): WishlistItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(getWishlistStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.items) ? parsed.items : [];
  } catch {
    return [];
  }
};

const writeWishlistItems = (userId: string | null, items: WishlistItem[]) => {
  if (typeof window === "undefined" || !userId) return;
  localStorage.setItem(getWishlistStorageKey(userId), JSON.stringify({ items }));
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlistCount: 0,
      activeUserId: null,

      loadForUser: (userId) => {
        const items = readWishlistItems(userId);
        set({
          activeUserId: userId,
          items,
          wishlistCount: items.length,
        });
      },

      clearSession: () =>
        set({
          activeUserId: null,
          items: [],
          wishlistCount: 0,
        }),

      addToWishlist: (item) =>
        set((s) => {
          // Standardize ID matching
          const productId = item.id || item.productId || "";
          if (s.items.some((i) => i.id === productId || i.productId === productId)) {
            return {};
          }
          const newItem = { ...item, id: productId, productId };
          const updatedItems = [...s.items, newItem];
          return {
            items: updatedItems,
            wishlistCount: updatedItems.length,
          };
        }),

      removeFromWishlist: (productId) =>
        set((s) => {
          const updatedItems = s.items.filter(
            (i) => i.id !== productId && i.productId !== productId
          );
          return {
            items: updatedItems,
            wishlistCount: updatedItems.length,
          };
        }),

      toggleWishlist: (item) => {
        const productId = item.id || item.productId || "";
        const exists = get().isWishlisted(productId);
        if (exists) {
          get().removeFromWishlist(productId);
        } else {
          get().addToWishlist({ ...item, id: productId, productId });
        }
      },

      isWishlisted: (productId) => {
        return get().items.some((i) => i.id === productId || i.productId === productId);
      },

      clearWishlist: () => set({ items: [], wishlistCount: 0 }),
    }),
    {
      name: "wishlist_guest",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
          items: s.activeUserId ? s.items : [],
          wishlistCount: s.activeUserId ? s.wishlistCount : 0,
          activeUserId: null,
      }),
    }
  )
);

useWishlistStore.subscribe((state) => {
  writeWishlistItems(state.activeUserId, state.items);
});

export default useWishlistStore;
