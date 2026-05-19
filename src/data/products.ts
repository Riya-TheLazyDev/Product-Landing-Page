export interface Product {
  id: string;
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
  isLuxuryPerfume?: boolean;
  perfumeType?: string;
  sizeOptions?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "noir-eternel",
    name: "Noir Éternel",
    slug: "noir-eternel",
    description: "A deep, dark, and sensual fragrance blooming with midnight orchids, rare resins, and rich spices.",
    price: 385,
    discountPrice: 350,
    images: ["/assets/product.jpeg"],
    category: "Luxury",
    stock: 45,
    sku: "ELEV-NOIR-ET-001",
    featured: true,
    status: "Active",
    ratings: 4.9,
    isLuxuryPerfume: true,
    perfumeType: "Eau de Parfum",
    sizeOptions: ["50 ml", "100 ml", "200 ml · Maison"],
  },
  {
    id: "harmony",
    name: "Harmony",
    slug: "harmony",
    description: "A calming blend of natural botanicals that offers lightweight skin protection and aromatic relaxation.",
    price: 25,
    images: ["/assets/product.jpeg"],
    category: "Protect",
    stock: 120,
    sku: "ELEV-HARMONY-002",
    featured: false,
    status: "Active",
    ratings: 5.0,
  },
  {
    id: "luxe",
    name: "Luxe",
    slug: "luxe",
    description: "A rejuvenating formula that restores skin's natural glow with rich, premium elements.",
    price: 22,
    images: ["/assets/product.jpeg"],
    category: "Regenerates",
    stock: 90,
    sku: "ELEV-LUXE-003",
    featured: false,
    status: "Active",
    ratings: 4.9,
  },
  {
    id: "opulent",
    name: "Opulent",
    slug: "opulent",
    description: "Rich, velvety nutrients that deeply revitalize and rejuvenate skin cells for maximum longevity.",
    price: 17.5,
    images: ["/assets/product.jpeg"],
    category: "Revitalizes",
    stock: 110,
    sku: "ELEV-OPULENT-004",
    featured: false,
    status: "Active",
    ratings: 5.0,
  },
  {
    id: "cocoon",
    name: "Cocoon",
    slug: "cocoon",
    description: "Deep, rich nourishment providing ultimate protection and skin cocooning from daily elements.",
    price: 23,
    images: ["/assets/product.jpeg"],
    category: "Feeds",
    stock: 80,
    sku: "ELEV-COCOON-005",
    featured: true,
    status: "Active",
    ratings: 5.0,
  },
];
