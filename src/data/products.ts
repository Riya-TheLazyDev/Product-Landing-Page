/** Canonical product shape for Elevāra UI (mapped from MySQL API). */
export interface Product {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  stock: number;
  sku: string;
  featured: boolean;
  status: string;
  ratings?: number;
  created_at?: string;
  updated_at?: string;
  isLuxuryPerfume?: boolean;
  perfumeType?: string;
  sizeOptions?: string[];
  /** Reserved for future multi-image upload integration. */
  image_url?: string;
}
