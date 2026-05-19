import { useWishlistStore, WishlistItem } from "@/store/wishlistStore";

export function useWishlist() {
  const {
    items,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
    clearWishlist,
  } = useWishlistStore();

  return {
    wishlistItems: items,
    wishlistCount,
    isInWishlist: (productId: string) => isWishlisted(productId),
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };
}
export default useWishlist;
