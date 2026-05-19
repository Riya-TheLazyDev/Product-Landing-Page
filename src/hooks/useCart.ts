import { useCartStore } from "@/store/cartStore";

export function useCart() {
  const {
    items,
    wishlist,
    toast,
    checkoutStep,
    checkoutDraft,
    savedAddresses,
    selectedAddressId,
    savedContacts,
    selectedContactId,
    savedPaymentMethods,
    selectedPaymentId,
    orders,
    addItem,
    removeItem,
    setQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    moveToWishlist,
    showToast,
    dismissToast,
    setCheckoutStep,
    updateCheckoutDraft,
    resetCheckoutSession,
    placeOrder,
  } = useCartStore();

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return {
    items,
    wishlist,
    toast,
    checkoutStep,
    checkoutDraft,
    savedAddresses,
    selectedAddressId,
    savedContacts,
    selectedContactId,
    savedPaymentMethods,
    selectedPaymentId,
    orders,
    totalQuantity,
    totalPrice,
    addItem,
    removeItem,
    setQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    moveToWishlist,
    showToast,
    dismissToast,
    setCheckoutStep,
    updateCheckoutDraft,
    resetCheckoutSession,
    placeOrder,
  };
}
export default useCart;
