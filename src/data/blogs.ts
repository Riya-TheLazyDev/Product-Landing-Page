export interface Blog {
  id: string;
  title: string;
  publishedAt: string;
  author: string;
  image: string;
  content: string;
  excerpt: string;
  category: string;
  isFeatured?: boolean;
}

export const BLOGS: Blog[] = [
  {
    id: "alchemy-of-scents",
    title: "The Alchemy of Scents: A Journey Through Midnight Orchids",
    publishedAt: "March 12, 2024",
    author: "Julian Thorne",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1200",
    excerpt: "Explore the dark, seductive world of midnight-blooming florals and the precise science of extracting their most elusive essences.",
    content: "Full content for the alchemy of scents blog post goes here. It describes the deep process of scent extraction and the mystique of midnight orchids...",
    category: "Editorial",
    isFeatured: true
  },
  {
    id: "liquid-gold",
    title: "Liquid Gold: Rare Botanical Extracts of the East",
    publishedAt: "March 15, 2024",
    author: "Elena Vance",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800",
    excerpt: "Uncovering the ancient extraction methods for rare resins and precious woods.",
    content: "Liquid Gold explores the rich history of botanical extracts in Eastern traditions, focusing on the preservation of rare resins...",
    category: "Journal"
  },
  {
    id: "whispers-of-velvet",
    title: "Whispers of Velvet: Designing the Fragrance of Memory",
    publishedAt: "March 20, 2024",
    author: "Marcus Aurelius",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800",
    excerpt: "How scent triggers emotional recall and the art of composing nostalgic notes.",
    content: "Whispers of Velvet delves into the psychological connection between scent and memory, explaining how certain notes can transport us back in time...",
    category: "Artisan"
  },
];
