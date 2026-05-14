export type CartLine = {
  lineId: string;
  productId: string | number;
  name: string;
  image: string;
  price: number;
  perfumeType: string;
  size: string;
  quantity: number;
};

export type WishlistEntry = {
  productId: string | number;
  name: string;
  image: string;
};
