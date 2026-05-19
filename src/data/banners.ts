export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  placement: string;
  isActive: boolean;
}

export const BANNERS: Banner[] = [
  {
    id: "ban-01",
    title: "Cinematic Spring Collection",
    subtitle: "Experience luxury in every droplet",
    imageUrl: "/assets/banner1.jpeg",
    linkUrl: "/shop",
    placement: "Main Homepage Hero",
    isActive: true,
  },
  {
    id: "ban-02",
    title: "Oud & Mystery Nocturnal Blend",
    subtitle: "Exclusive Extrait de Parfum launch",
    imageUrl: "/assets/banner2.jpeg",
    linkUrl: "/products/noir-eternel",
    placement: "Featured Products Grid",
    isActive: true,
  },
];
