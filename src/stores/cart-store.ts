import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine, WishlistEntry } from "@/types/cart";
import { cardDigitsLast4 } from "@/lib/format-card-number";
import {
  defaultCheckoutDraft,
  type CheckoutDraft,
  type SavedAddress,
  type SavedAddressInput,
  type SavedContact,
  type SavedContactInput,
  type SavedPaymentMethod,
  type SavedPaymentMethodInput,
  newAddressId,
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
  savedAddresses: SavedAddress[];
  selectedAddressId: string | null;
  savedContacts: SavedContact[];
  selectedContactId: string | null;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentId: string | null;
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
  addSavedAddress: (input: SavedAddressInput) => string;
  updateSavedAddress: (
    id: string,
    patch: Partial<Omit<SavedAddress, "id">>
  ) => void;
  deleteSavedAddress: (id: string) => void;
  setDefaultSavedAddress: (id: string) => void;
  selectCheckoutAddress: (id: string) => void;
  clearCheckoutAddressSelection: () => void;
  addSavedContact: (input: SavedContactInput) => string;
  updateSavedContact: (
    id: string,
    patch: Partial<Omit<SavedContact, "id">>
  ) => void;
  deleteSavedContact: (id: string) => void;
  setDefaultSavedContact: (id: string) => void;
  selectCheckoutContact: (id: string) => void;
  clearCheckoutContactSelection: () => void;
  addSavedPaymentMethod: (input: SavedPaymentMethodInput) => string;
  updateSavedPaymentMethod: (
    id: string,
    patch: Partial<Omit<SavedPaymentMethod, "id">>
  ) => void;
  deleteSavedPaymentMethod: (id: string) => void;
  setDefaultSavedPaymentMethod: (id: string) => void;
  selectCheckoutPayment: (id: string) => void;
  clearCheckoutPaymentSelection: () => void;
  /** Select saved payment for UI only; keeps current draft card fields (use after saving from form). */
  setSelectedPaymentId: (id: string | null) => void;
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
      savedAddresses: [],
      selectedAddressId: null,
      savedContacts: [],
      selectedContactId: null,
      savedPaymentMethods: [],
      selectedPaymentId: null,

      clearCheckoutAddressSelection: () => set({ selectedAddressId: null }),

      clearCheckoutContactSelection: () => set({ selectedContactId: null }),

      selectCheckoutContact: (id) => {
        const c = get().savedContacts.find((x) => x.id === id);
        if (!c) return;
        const d = get().checkoutDraft;
        set({
          selectedContactId: id,
          checkoutDraft: {
            ...d,
            email: c.email,
            fullName: c.fullName,
            phone: c.phone,
          },
        });
      },

      addSavedContact: (input) => {
        const id = newAddressId();
        set((s) => {
          const isFirst = s.savedContacts.length === 0;
          const makeDefault = isFirst || Boolean(input.isDefault);
          const list = s.savedContacts.map((c) => ({
            ...c,
            isDefault: makeDefault ? false : c.isDefault,
          }));
          const row: SavedContact = {
            id,
            email: input.email.trim(),
            fullName: input.fullName.trim(),
            phone: input.phone.trim(),
            isDefault: makeDefault,
          };
          return { savedContacts: [...list, row] };
        });
        get().showToast("Contact saved to your maison profile");
        return id;
      },

      updateSavedContact: (id, patch) => {
        set((s) => {
          let list: SavedContact[] = s.savedContacts.map((c) =>
            c.id === id ? { ...c, ...patch, id: c.id } : c
          );
          if (patch.isDefault === true) {
            list = list.map((c) => ({ ...c, isDefault: c.id === id }));
          }
          if (!list.some((c) => c.isDefault) && list.length > 0) {
            list = list.map((c, i) => ({ ...c, isDefault: i === 0 }));
          }
          return { savedContacts: list };
        });
        get().showToast("Contact updated");
      },

      deleteSavedContact: (id) => {
        set((s) => {
          const removed = s.savedContacts.find((c) => c.id === id);
          let list = s.savedContacts.filter((c) => c.id !== id);
          if (removed?.isDefault && list.length > 0) {
            list = list.map((c, i) => ({ ...c, isDefault: i === 0 }));
          }
          return {
            savedContacts: list,
            selectedContactId:
              s.selectedContactId === id ? null : s.selectedContactId,
          };
        });
        get().showToast("Contact removed");
      },

      setDefaultSavedContact: (id) =>
        set((s) => ({
          savedContacts: s.savedContacts.map((c) => ({
            ...c,
            isDefault: c.id === id,
          })),
        })),

      clearCheckoutPaymentSelection: () => set({ selectedPaymentId: null }),

      setSelectedPaymentId: (id) => set({ selectedPaymentId: id }),

      selectCheckoutPayment: (id) => {
        const p = get().savedPaymentMethods.find((x) => x.id === id);
        if (!p) return;
        const d = get().checkoutDraft;
        set({
          selectedPaymentId: id,
          checkoutDraft: {
            ...d,
            cardName: p.cardName,
            cardNumber: "",
            cardExpiry: p.cardExpiry,
            cardCvc: "",
            billingSameAsShipping: p.billingSameAsShipping,
          },
        });
      },

      addSavedPaymentMethod: (input) => {
        const digits = input.cardNumber.replace(/\s/g, "");
        if (digits.length < 13) {
          get().showToast("Enter a valid card number to save");
          return "";
        }
        const id = newAddressId();
        const last4 = cardDigitsLast4(input.cardNumber);
        set((s) => {
          const isFirst = s.savedPaymentMethods.length === 0;
          const makeDefault = isFirst || Boolean(input.isDefault);
          const list = s.savedPaymentMethods.map((m) => ({
            ...m,
            isDefault: makeDefault ? false : m.isDefault,
          }));
          const row: SavedPaymentMethod = {
            id,
            cardName: input.cardName.trim(),
            last4,
            cardExpiry: input.cardExpiry.trim(),
            billingSameAsShipping: input.billingSameAsShipping,
            isDefault: makeDefault,
          };
          return { savedPaymentMethods: [...list, row] };
        });
        get().showToast("Payment method saved (last 4 digits only)");
        return id;
      },

      updateSavedPaymentMethod: (id, patch) => {
        set((s) => {
          let list: SavedPaymentMethod[] = s.savedPaymentMethods.map((m) =>
            m.id === id ? { ...m, ...patch, id: m.id } : m
          );
          if (patch.isDefault === true) {
            list = list.map((m) => ({ ...m, isDefault: m.id === id }));
          }
          if (!list.some((m) => m.isDefault) && list.length > 0) {
            list = list.map((m, i) => ({ ...m, isDefault: i === 0 }));
          }
          return { savedPaymentMethods: list };
        });
        get().showToast("Payment method updated");
      },

      deleteSavedPaymentMethod: (id) => {
        set((s) => {
          const removed = s.savedPaymentMethods.find((m) => m.id === id);
          let list = s.savedPaymentMethods.filter((m) => m.id !== id);
          if (removed?.isDefault && list.length > 0) {
            list = list.map((m, i) => ({ ...m, isDefault: i === 0 }));
          }
          return {
            savedPaymentMethods: list,
            selectedPaymentId:
              s.selectedPaymentId === id ? null : s.selectedPaymentId,
          };
        });
        get().showToast("Payment method removed");
      },

      setDefaultSavedPaymentMethod: (id) =>
        set((s) => ({
          savedPaymentMethods: s.savedPaymentMethods.map((m) => ({
            ...m,
            isDefault: m.id === id,
          })),
        })),

      selectCheckoutAddress: (id) => {
        const addr = get().savedAddresses.find((a) => a.id === id);
        if (!addr) return;
        const d = get().checkoutDraft;
        set({
          selectedAddressId: id,
          checkoutDraft: {
            ...d,
            fullName: addr.fullName,
            phone: addr.phone,
            address: addr.address,
            city: addr.city,
            state: addr.state,
            zip: addr.zip,
            country: addr.country,
          },
        });
      },

      addSavedAddress: (input) => {
        const id = newAddressId();
        set((s) => {
          const isFirst = s.savedAddresses.length === 0;
          const makeDefault = isFirst || Boolean(input.isDefault);
          const list = s.savedAddresses.map((a) => ({
            ...a,
            isDefault: makeDefault ? false : a.isDefault,
          }));
          const addr: SavedAddress = {
            id,
            fullName: input.fullName.trim(),
            phone: input.phone.trim(),
            address: input.address.trim(),
            city: input.city.trim(),
            state: input.state.trim(),
            zip: input.zip.trim(),
            country: input.country.trim(),
            isDefault: makeDefault,
          };
          return { savedAddresses: [...list, addr] };
        });
        get().showToast("Address saved to your maison profile");
        return id;
      },

      updateSavedAddress: (id, patch) => {
        set((s) => {
          let list: SavedAddress[] = s.savedAddresses.map((a) =>
            a.id === id ? { ...a, ...patch, id: a.id } : a
          );
          if (patch.isDefault === true) {
            list = list.map((a) => ({ ...a, isDefault: a.id === id }));
          }
          if (!list.some((a) => a.isDefault) && list.length > 0) {
            list = list.map((a, i) => ({ ...a, isDefault: i === 0 }));
          }
          return { savedAddresses: list };
        });
        get().showToast("Address updated");
      },

      deleteSavedAddress: (id) => {
        set((s) => {
          const removed = s.savedAddresses.find((a) => a.id === id);
          let list = s.savedAddresses.filter((a) => a.id !== id);
          if (removed?.isDefault && list.length > 0) {
            list = list.map((a, i) => ({ ...a, isDefault: i === 0 }));
          }
          return {
            savedAddresses: list,
            selectedAddressId:
              s.selectedAddressId === id ? null : s.selectedAddressId,
          };
        });
        get().showToast("Address removed");
      },

      setDefaultSavedAddress: (id) =>
        set((s) => ({
          savedAddresses: s.savedAddresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),

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
          selectedAddressId: null,
          selectedContactId: null,
          selectedPaymentId: null,
        }),

      placeOrder: () => {
        set({
          items: [],
          checkoutStep: 0,
          checkoutDraft: defaultCheckoutDraft(),
          selectedAddressId: null,
          selectedContactId: null,
          selectedPaymentId: null,
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
        savedAddresses: s.savedAddresses,
        selectedAddressId: s.selectedAddressId,
        savedContacts: s.savedContacts,
        selectedContactId: s.selectedContactId,
        savedPaymentMethods: s.savedPaymentMethods,
        selectedPaymentId: s.selectedPaymentId,
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
          savedAddresses: Array.isArray(p.savedAddresses)
            ? p.savedAddresses
            : [],
          selectedAddressId:
            typeof p.selectedAddressId === "string" ||
            p.selectedAddressId === null
              ? p.selectedAddressId
              : null,
          savedContacts: Array.isArray(p.savedContacts) ? p.savedContacts : [],
          selectedContactId:
            typeof p.selectedContactId === "string" ||
            p.selectedContactId === null
              ? p.selectedContactId
              : null,
          savedPaymentMethods: Array.isArray(p.savedPaymentMethods)
            ? p.savedPaymentMethods
            : [],
          selectedPaymentId:
            typeof p.selectedPaymentId === "string" ||
            p.selectedPaymentId === null
              ? p.selectedPaymentId
              : null,
        };
      },
    }
  )
);

export function selectCartQuantity(items: CartLine[]): number {
  return items.reduce((n, i) => n + i.quantity, 0);
}
