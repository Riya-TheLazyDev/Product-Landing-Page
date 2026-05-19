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

  // Actions
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlistCount: 0,

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
      name: "elevara-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useWishlistStore;
