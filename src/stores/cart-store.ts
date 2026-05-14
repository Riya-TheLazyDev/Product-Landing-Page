import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine, WishlistEntry } from "@/types/cart";
import {
  defaultCheckoutDraft,
  type CheckoutDraft,
} from "@/types/checkout";
import { makeLineId } from "@/lib/cart-line";

type Toast = { message: string; id: number } | null;

export type AddToCartPayload = {
  productId: string | number;
  name: string;
  image?: string;
  price: number;
  perfumeType: string;
  size: string;
  quantity?: number;
};

interface CartState {
  items: CartLine[];
  wishlist: WishlistEntry[];
  toast: Toast;
  checkoutStep: number;
  checkoutDraft: CheckoutDraft;
  addItem: (p: AddToCartPayload) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  incrementQuantity: (lineId: string) => void;
  decrementQuantity: (lineId: string) => void;
  clearCart: () => void;
  moveToWishlist: (lineId: string) => void;
  showToast: (message: string) => void;
  dismissToast: () => void;
  setCheckoutStep: (step: number) => void;
  updateCheckoutDraft: (patch: Partial<CheckoutDraft>) => void;
  resetCheckoutSession: () => void;
  placeOrder: () => void;
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      toast: null,
      checkoutStep: 0,
      checkoutDraft: defaultCheckoutDraft(),

      setCheckoutStep: (step) =>
        set({ checkoutStep: Math.max(0, Math.min(3, Math.floor(step))) }),

      updateCheckoutDraft: (patch) =>
        set((s) => ({
          checkoutDraft: { ...s.checkoutDraft, ...patch },
        })),

      resetCheckoutSession: () =>
        set({
          checkoutStep: 0,
          checkoutDraft: defaultCheckoutDraft(),
        }),

      placeOrder: () => {
        set({
          items: [],
          checkoutStep: 0,
          checkoutDraft: defaultCheckoutDraft(),
        });
        get().showToast("Merci — your Elevāra order is confirmed.");
      },

      showToast: (message) => {
        if (toastTimer) clearTimeout(toastTimer);
        const id = Date.now();
        set({ toast: { message, id } });
        toastTimer = setTimeout(() => {
          set((s) => (s.toast?.id === id ? { toast: null } : {}));
          toastTimer = null;
        }, 3800);
      },

      dismissToast: () => {
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = null;
        set({ toast: null });
      },

      addItem: (p) => {
        const qty = p.quantity ?? 1;
        const image = p.image ?? "/assets/product.jpeg";
        const lineId = makeLineId(p.productId, p.size);

        set((state) => {
          const existing = state.items.find((i) => i.lineId === lineId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.lineId === lineId
                  ? { ...i, quantity: Math.min(99, i.quantity + qty) }
                  : i
              ),
            };
          }
          const line: CartLine = {
            lineId,
            productId: p.productId,
            name: p.name,
            image,
            price: p.price,
            perfumeType: p.perfumeType,
            size: p.size,
            quantity: Math.min(99, qty),
          };
          return { items: [...state.items, line] };
        });

        get().showToast(`${p.name} · added to your collection`);
      },

      removeItem: (lineId) => {
        set((state) => ({
          items: state.items.filter((i) => i.lineId !== lineId),
        }));
      },

      setQuantity: (lineId, quantity) => {
        const q = Math.max(1, Math.min(99, Math.floor(quantity)));
        set((state) => ({
          items: state.items.map((i) =>
            i.lineId === lineId ? { ...i, quantity: q } : i
          ),
        }));
      },

      incrementQuantity: (lineId) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.lineId === lineId
              ? { ...i, quantity: Math.min(99, i.quantity + 1) }
              : i
          ),
        }));
      },

      decrementQuantity: (lineId) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.lineId === lineId && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
        get().showToast("Your cart has been cleared");
      },

      moveToWishlist: (lineId) => {
        const line = get().items.find((i) => i.lineId === lineId);
        if (!line) return;
        set((state) => {
          const exists = state.wishlist.some(
            (w) => w.productId === line.productId
          );
          const wishlist = exists
            ? state.wishlist
            : [
                ...state.wishlist,
                {
                  productId: line.productId,
                  name: line.name,
                  image: line.image,
                },
              ];
          return {
            items: state.items.filter((i) => i.lineId !== lineId),
            wishlist,
          };
        });
        get().showToast(`${line.name} · moved to wishlist`);
      },
    }),
    {
      name: "elevara-commerce",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        items: s.items,
        wishlist: s.wishlist,
        checkoutStep: s.checkoutStep,
        checkoutDraft: s.checkoutDraft,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<CartState>;
        return {
          ...current,
          ...p,
          checkoutDraft: {
            ...defaultCheckoutDraft(),
            ...(p.checkoutDraft ?? {}),
          },
        };
      },
    }
  )
);

export function selectCartQuantity(items: CartLine[]): number {
  return items.reduce((n, i) => n + i.quantity, 0);
}
