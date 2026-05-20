import pool from "../config/db.js";

const SEED_PRODUCTS = [
  {
    name: "Noir Éternel",
    slug: "noir-eternel",
    description:
      "A deep, dark, and sensual fragrance blooming with midnight orchids, rare resins, and rich spices.",
    price: 385,
    discount_price: 350,
    category: "Luxury",
    stock: 45,
    sku: "ELEV-NOIR-ET-001",
    featured: 1,
    status: "Active",
    image_url: "/assets/product.jpeg",
  },
  {
    name: "Harmony",
    slug: "harmony",
    description:
      "A calming blend of natural botanicals that offers lightweight skin protection and aromatic relaxation.",
    price: 25,
    discount_price: null,
    category: "Protect",
    stock: 120,
    sku: "ELEV-HARMONY-002",
    featured: 0,
    status: "Active",
    image_url: "/assets/product.jpeg",
  },
  {
    name: "Luxe",
    slug: "luxe",
    description:
      "A rejuvenating formula that restores skin's natural glow with rich, premium elements.",
    price: 22,
    discount_price: null,
    category: "Regenerates",
    stock: 90,
    sku: "ELEV-LUXE-003",
    featured: 0,
    status: "Active",
    image_url: "/assets/product.jpeg",
  },
  {
    name: "Opulent",
    slug: "opulent",
    description:
      "Rich, velvety nutrients that deeply revitalize and rejuvenate skin cells for maximum longevity.",
    price: 17.5,
    discount_price: null,
    category: "Revitalizes",
    stock: 110,
    sku: "ELEV-OPULENT-004",
    featured: 0,
    status: "Active",
    image_url: "/assets/product.jpeg",
  },
  {
    name: "Cocoon",
    slug: "cocoon",
    description:
      "Deep, rich nourishment providing ultimate protection and skin cocooning from daily elements.",
    price: 23,
    discount_price: null,
    category: "Feeds",
    stock: 80,
    sku: "ELEV-COCOON-005",
    featured: 1,
    status: "Active",
    image_url: "/assets/product.jpeg",
  },
  {
    name: "Oud Noir",
    slug: "oud-noir",
    description: "Smoky oud with amber warmth and velvet musk.",
    price: 2999,
    discount_price: 2799,
    category: "Men",
    stock: 50,
    sku: "EVR-001",
    featured: 1,
    status: "Active",
    image_url: "/assets/product.jpeg",
  },
  {
    name: "Amber Shade",
    slug: "amber-shade",
    description: "Golden amber and soft woods for day and evening.",
    price: 1999,
    discount_price: null,
    category: "Unisex",
    stock: 34,
    sku: "EVR-002",
    featured: 0,
    status: "Active",
    image_url: "/assets/product.jpeg",
  },
];

export const seedProductsIfEmpty = async (connection) => {
  try {
    const [rows] = await connection.query("SELECT COUNT(*) AS count FROM products");
    const count = rows[0]?.count ?? 0;
    if (count > 0) return;

    for (const product of SEED_PRODUCTS) {
      await connection.query(
        `INSERT INTO products
        (name, slug, description, price, discount_price, category, stock, sku, featured, status, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.name,
          product.slug,
          product.description,
          product.price,
          product.discount_price,
          product.category,
          product.stock,
          product.sku,
          product.featured,
          product.status,
          product.image_url,
        ]
      );
    }
    console.log(`Elevāra: Seeded ${SEED_PRODUCTS.length} products into MySQL`);
  } catch (error) {
    console.warn("Elevāra product seed skipped:", error.message);
  }
};
